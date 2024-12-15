from pydantic import BaseModel


class BaseIndexItem(BaseModel):
    id: str
