from fastapi import APIRouter, HTTPException

from dependencies import ESSourceDep
from models.source import Source, SourceIn, SourceProvider

router = APIRouter(tags=["Source Manager"])


@router.post("/", response_model=Source)
async def create_source(source: SourceIn, es_source: ESSourceDep):
    return es_source.create(source)


@router.get("/{source_id}", response_model=Source)
async def read_source(source_id: str, provider: SourceProvider, es_source: ESSourceDep):
    source = es_source.find_by_provider_and_content_id(provider, source_id)
    if not source:
        raise HTTPException(status_code=404, detail="Source not found")
    return source
