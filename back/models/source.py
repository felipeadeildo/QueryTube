from datetime import datetime
from enum import Enum
from typing import Optional

from pydantic import BaseModel, Field

from .elasticsearch import BaseIndexItem


class SourceProvider(str, Enum):
    YOUTUBE = "youtube"


class SourceStatus(str, Enum):
    PENDING = "pending"
    PROCESSING = "processing"
    DONE = "done"
    ERROR = "error"


class SourceBase(BaseModel):
    provider: SourceProvider
    content_id: str = Field(..., alias="contentId")


class SourceIn(SourceBase):
    metadata: Optional[dict] = Field(default_factory=dict)


class Source(SourceBase, BaseIndexItem):
    status: SourceStatus = SourceStatus.PENDING
    metadata: dict
    created_at: datetime = Field(default_factory=datetime.now)
