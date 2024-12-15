from typing import Annotated

from elasticsearch import Elasticsearch
from fastapi import Depends

from services.elasticsearch import ElasticsearchSource, get_es_instance

ESDep = Annotated[Elasticsearch, Depends(get_es_instance)]


def get_es_source_service(es_client: ESDep) -> ElasticsearchSource:
    return ElasticsearchSource(es_client)


ESSourceDep = Annotated[ElasticsearchSource, Depends(get_es_source_service)]
