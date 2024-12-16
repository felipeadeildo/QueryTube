from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from dependencies import ESSourceDep
from models.source import Source, SourceIn, SourceProvider

router = APIRouter(tags=["Source Manager"])


class BatchGetRequest(BaseModel):
    queries: list[tuple[SourceProvider, str]]


@router.post("/", response_model=list[Source])
async def create_sources(sources: list[SourceIn], es_source: ESSourceDep):
    created = es_source.create_batch(sources)
    if not created or len(created) != len(sources):
        raise HTTPException(status_code=500, detail="Failed to create all sources")
    return created


@router.get("/", response_model=list[Source])
async def read_sources(request: BatchGetRequest, es_source: ESSourceDep):
    results = es_source.find_by_provider_and_content_ids(request.queries)
    return results
