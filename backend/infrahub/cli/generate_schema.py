import enum
import json
from pathlib import Path

import typer

app = typer.Typer()


@app.callback()
def callback():
    """
    Generate some Schema files used by Infrahub
    """


class ExportFormat(str, enum.Enum):
    JSONSCHEMA = "jsonschema"


@app.command(name="schema")
def generate_schema(
    output_file: Path = typer.Argument("infrahub_schema.schema.json"),
    output_format: ExportFormat = ExportFormat.JSONSCHEMA,  # pylint: disable=unused-argument
):
    """Generate a the schema expected by infrahub for the schema `infrahubctl schema load`."""

    from infrahub.api.schema import (  # pylint: disable=import-outside-toplevel
        SchemaLoadAPI,
    )

    schema_str = SchemaLoadAPI.schema_json()
    schema = json.loads(schema_str)

    schema["title"] = "InfrahubSchema"

    output_file.write_text(json.dumps(schema, indent=4))
    print(f"JSONSchema file saved in '{output_file}'")
