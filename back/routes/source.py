from dependencies import ESSourceDep
from fastapi import APIRouter, HTTPException
from models.source import Source, SourceIn, SourceProvider

router = APIRouter(tags=["Source Manager"])


@router.post("/", response_model=Source)
async def create_source(source: SourceIn, es_source: ESSourceDep):
    return es_source.create(source)


@router.get("/", response_model=Source)
async def read_source(
    content_id: str, provider: SourceProvider, es_source: ESSourceDep
):
    source = es_source.find_by_provider_and_content_id(provider, content_id)
    if not source:
        raise HTTPException(status_code=404, detail="Source not found")
    return source
