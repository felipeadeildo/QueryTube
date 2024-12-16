from typing import Optional, Type

from models.source import Source, SourceIn, SourceProvider, SourceStatus

from .base import ElasticsearchIndex


class ElasticsearchSource(ElasticsearchIndex[SourceIn, Source]):
    def get_index_name(self) -> str:
        return "sources"

    def get_mapping(self) -> dict:
        return {
            "properties": {
                "provider": {"type": "keyword"},
                "content_id": {"type": "keyword"},
                "metadata": {"type": "object"},
                "status": {"type": "keyword"},
                "created_at": {"type": "date"},
            }
        }

    def get_model(self) -> Type[Source]:
        return Source

    def update_status(self, id: str, status: SourceStatus) -> Optional[Source]:
        source = self.read(id)
        if source:
            source.status = status
            return self.update(source)

    def find_by_provider_and_content_id(
        self, provider: SourceProvider, content_id: str
    ) -> Optional[Source]:
        query = {
            "bool": {
                "must": [
                    {"term": {"provider": provider}},
                    {"term": {"content_id": content_id}},
                ]
            }
        }
        results = self.search(query)
        for result in results:
            return result
