from __future__ import annotations

from typing import TYPE_CHECKING, Optional

if TYPE_CHECKING:
    from infrahub.message_bus import InfrahubMessage
    from infrahub.message_bus.types import MessageTTL
    from infrahub.services import InfrahubServices


class InfrahubMessageBus:
    async def initialize(self, service: InfrahubServices) -> None:
        """Initialize the Message bus"""

    async def publish(self, message: InfrahubMessage, routing_key: str, delay: Optional[MessageTTL] = None) -> None:
        raise NotImplementedError()

    async def reply(self, message: InfrahubMessage, routing_key: str) -> None:
        raise NotImplementedError()
