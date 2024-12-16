from datetime import datetime
from enum import Enum
from typing import Optional

from pydantic import BaseModel, ConfigDict, Field

from models.elasticsearch import BaseIndexItem


class SourceProvider(str, Enum):
    YOUTUBE = "youtube"


class SourceStatus(str, Enum):
    PENDING = "pending"
    PROCESSING = "processing"
    DONE = "done"
    ERROR = "error"


class SourceBase(BaseModel):
    model_config = ConfigDict(populate_by_name=True)

    provider: SourceProvider
    content_id: str = Field(alias="contentId")


class SourceIn(SourceBase):
    metadata: Optional[dict] = Field(default_factory=dict)


class SourceInModifier(SourceBase):
    status: SourceStatus = SourceStatus.PENDING
    metadata: dict = Field(default_factory=dict)
    created_at: datetime = Field(default_factory=datetime.now)


class Source(SourceInModifier, BaseIndexItem):
    pass
