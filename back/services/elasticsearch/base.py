from typing import Generic, Optional, TypeVar

from elasticsearch import Elasticsearch
from pydantic import BaseModel

from config import settings
from models.elasticsearch import BaseIndexItem

OUT = TypeVar("OUT", bound=BaseIndexItem)
IN = TypeVar("IN", bound=BaseModel)


class ElasticsearchIndex(Generic[IN, OUT]):
    def __init__(self, client: Elasticsearch):
        self.client = client
        self.index_name = self.get_index_name()
        self.mapping = self.get_mapping()
        self.model = self.get_model()
        self.check_or_create_index()

    def get_index_name(self) -> str:
        raise NotImplementedError("get_index_name must be implemented")

    def get_mapping(self) -> dict:
        raise NotImplementedError("get_mapping must be implemented")

    def get_model(self) -> type[OUT]:
        raise NotImplementedError("get_model must be implemented")

    def check_or_create_index(self):
        if not self.client.indices.exists(index=self.index_name):
            self.client.indices.create(index=self.index_name, mappings=self.mapping)

    def create(self, obj: IN) -> OUT:
        res = self.client.index(index=self.index_name, document=obj.model_dump())

        data = {"id": res["_id"], **res["_source"]}

        return self.model.model_validate(data)

    def read(self, id: str) -> Optional[OUT]:
        res = self.client.get(index=self.index_name, id=id)
        if res["found"]:
            return self.model.model_validate({"id": res["_id"], **res["_source"]})

    def read_by_query(self, query: dict, **kwargs) -> Optional[OUT]:
        res = self.client.search(index=self.index_name, query=query, **kwargs)
        for hit in res["hits"]["hits"]:
            return self.model.model_validate({"id": hit["_id"], **hit["_source"]})

    def search(self, query: dict, **kwargs) -> list[OUT]:
        res = self.client.search(index=self.index_name, query=query, **kwargs)
        return [
            self.model.model_validate({"id": hit["_id"], **hit["_source"]})
            for hit in res["hits"]["hits"]
        ]

    def update(self, obj: OUT, **kwargs) -> OUT:
        res = self.client.update(
            index=self.index_name, id=obj.id, doc=obj.model_dump(), **kwargs
        )
        data = {"id": res["_id"], **res["_source"]}
        return self.model.model_validate(data)

    def delete(self, id: str):
        self.client.delete(index=self.index_name, id=id)


def get_es_instance() -> Elasticsearch:
    return Elasticsearch(settings.es_host)
