from typing import List

from fastapi import APIRouter, HTTPException, Query

from dependencies import ESSourceDep
from models.source import Source, SourceIn, SourceProvider

router = APIRouter(tags=["Source Manager"])


@router.post("/", response_model=list[Source])
async def create_sources(sources: list[SourceIn], es_source: ESSourceDep):
    created = es_source.create_batch(sources)
    if not created or len(created) != len(sources):
        raise HTTPException(status_code=500, detail="Failed to create all sources")
    return created


@router.get("/", response_model=list[Source])
async def read_sources(
    es_source: ESSourceDep,
    providers: List[SourceProvider] = Query(...),
    content_ids: List[str] = Query(...),
):
    queries = list(zip(providers, content_ids))
    results = es_source.find_by_provider_and_content_ids(queries)
    return results
