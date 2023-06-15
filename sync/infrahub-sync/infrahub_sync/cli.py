import glob
import importlib
import logging
import os
from pathlib import Path
from typing import List, Optional

import typer
import yaml
from infrahub_sync import SyncAdapter, SyncConfig, SyncInstance
from infrahub_sync.generator import render_template
from potenda import Potenda
from rich.console import Console

from infrahub_client import InfrahubClientSync

app = typer.Typer()


logging.basicConfig(level=logging.WARNING)


def import_adapter(adapter: SyncAdapter, directory: str):
    here = os.path.abspath(os.path.dirname(__file__))
    relative_directory = directory.replace(here, "")[1:]
    module = importlib.import_module(f"infrahub_sync.{relative_directory.replace('/', '.')}.{adapter.name}.adapter")
    return getattr(module, f"{adapter.name.title()}Sync")


def get_all_sync() -> List[SyncInstance]:
    results = []
    here = os.path.abspath(os.path.dirname(__file__))

    for config_file in glob.glob(f"{here}/sync/**/config.yml", recursive=True):
        directory_name = os.path.dirname(config_file)
        config_data = yaml.safe_load(Path(config_file).read_text())
        SyncConfig(**config_data)
        results.append(SyncInstance(**config_data, directory=directory_name))

    return results


def get_instance(name: str) -> Optional[SyncInstance]:
    for item in get_all_sync():
        if item.name == name:
            return item

    return None


@app.command()
def list():
    for item in get_all_sync():
        print(f"{item.name} | {item.source.name} >> {item.destination.name} | {item.directory}")


@app.command()
def diff(
    name: str = typer.Argument(..., help="Name of the sync to use"),
    branch: str = typer.Option("main", help="Branch to use for the sync."),
):
    sync_instance = get_instance(name=name)
    if not sync_instance:
        raise typer.Abort(f"Unable to find the sync {name}")

    source = import_adapter(adapter=sync_instance.source, directory=sync_instance.directory)
    destination = import_adapter(adapter=sync_instance.destination, directory=sync_instance.directory)

    src = source(config=sync_instance, target="source", adapter=sync_instance.source)
    dst = destination(config=sync_instance, target="destination", adapter=sync_instance.destination)

    ptd = Potenda(destination=dst, source=src, config=sync_instance, top_level=sync_instance.order)
    ptd.load()

    mydiff = ptd.diff()

    print(mydiff.str())


@app.command()
def sync(
    name: str = typer.Argument(..., help="Name of the sync to use"),
    branch: str = typer.Option("main", help="Branch to use for the sync."),
):
    sync_instance = get_instance(name=name)
    if not sync_instance:
        raise typer.Abort(f"Unable to find the sync {name}")

    source = import_adapter(adapter=sync_instance.source, directory=sync_instance.directory)
    destination = import_adapter(adapter=sync_instance.destination, directory=sync_instance.directory)

    src = source(config=sync_instance, target="source", adapter=sync_instance.source)
    dst = destination(config=sync_instance, target="destination", adapter=sync_instance.destination)

    ptd = Potenda(destination=dst, source=src, config=sync_instance, top_level=sync_instance.order)
    ptd.load()

    mydiff = ptd.diff()

    print(mydiff.str())

    ptd.sync(diff=mydiff)


@app.command()
def generate(
    name: str = typer.Argument(..., help="Name of the sync to use"),
):
    """Generate all the python files for a given sync based on the configuration."""

    console = Console()

    sync_instance = get_instance(name=name)
    if not sync_instance:
        raise typer.Abort(f"Unable to find the sync {name}")

    files_to_render = (
        ("diffsync_models.j2", "models.py"),
        ("diffsync_adapter.j2", "adapter.py"),
    )

    client = InfrahubClientSync()

    here = os.path.abspath(os.path.dirname(__file__))
    current_dir = str(os.getcwd())

    template_dir_absolute = str(os.path.join(here, "generator/templates"))
    template_dir_relative = template_dir_absolute.replace(current_dir, "")

    schema = client.schema.all()

    for adapter in [sync_instance.source, sync_instance.destination]:
        output_dir_absolute = str(os.path.join(sync_instance.directory, adapter.name))

        if not Path(output_dir_absolute).is_dir():
            Path(output_dir_absolute).mkdir(exist_ok=True)

        for item in files_to_render:
            render_template(
                template_dir=template_dir_relative,
                template_file=item[0],
                output_dir=output_dir_absolute,
                output_file=item[1],
                context={"schema": schema, "adapter": adapter, "config": sync_instance},
            )

            console.print(f"Saved {item[0]} in {item[1]}")
