from typing import Optional

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

    def get_model(self) -> type[Source]:
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

    def create_batch(self, sources: list[SourceIn]) -> list[Source]:
        # TODO: bulk upsert
        created = []
        for s in sources:
            new_source = self.create(s)
            if new_source:
                created.append(new_source)
        return created

    def find_by_provider_and_content_ids(
        self, queries: list[tuple[SourceProvider, str]]
    ) -> list[Source]:
        # Monta uma query para retornar todos os items correspondentes às combinações (provider, content_id)
        # Abordagem: usar um filtro com "should" e "minimum_should_match" para retornar todos os matches
        should_clauses = []
        for provider, content_id in queries:
            should_clauses.append(
                {
                    "bool": {
                        "must": [
                            {"term": {"provider": provider}},
                            {"term": {"content_id": content_id}},
                        ]
                    }
                }
            )

        query = {"bool": {"should": should_clauses, "minimum_should_match": 1}}

        results = self.search(query)
        return results
