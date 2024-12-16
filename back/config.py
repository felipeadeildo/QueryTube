from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    es_host: str = "http://localhost:9200"


settings = Settings()
