from __future__ import annotations

from typing import TYPE_CHECKING

from infrahub.worker import WORKER_IDENTITY

from .registry import refresh_branches

if TYPE_CHECKING:
    from infrahub.services import InfrahubServices


async def trigger_branch_refresh(service: InfrahubServices) -> None:
    service.log.info("Running branch refresh task")
    async with service.database.start_session() as db:
        await refresh_branches(db=db)


async def resync_repositories(service: InfrahubServices) -> None:
    primary_identity = await service.cache.get("primary_api_server_id")
    if primary_identity == WORKER_IDENTITY:
        service.log.info(
            f"Primary identity={primary_identity} matches my identity={WORKER_IDENTITY}. Posting sync of repo message."
        )
    else:
        service.log.info(
            f"Primary identity={primary_identity} does not match my identity={WORKER_IDENTITY}. Not posting."
        )
