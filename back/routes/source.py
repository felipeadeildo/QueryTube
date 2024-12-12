from fastapi import APIRouter, HTTPException
from prisma.enums import SourceProvider
from prisma.fields import Json
from prisma.models import Source
from prisma.partials import SourceIn, SourceOut
from prisma.types import SourceCreateInput

router = APIRouter(tags=["Source Manager"])


@router.post("/", response_model=SourceOut)
async def create_source(source: SourceIn):
    create_source: SourceCreateInput = {
        "content_id": source.content_id,
        "provider": source.provider,
        "metadata": Json({}),
    }

    return Source.prisma().create(data=create_source)


@router.get("/{source_id}", response_model=SourceOut)
async def read_source(source_id: str, provider: SourceProvider):
    # The "source_id" is the "content_id".

    source = Source.prisma().find_first(
        where={"content_id": source_id, "provider": provider}
    )

    if not source:
        raise HTTPException(status_code=404, detail="Source not found")

    return source
