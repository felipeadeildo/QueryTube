import importlib

from fastapi import FastAPI

from .startup import lifespan

app = FastAPI(lifespan=lifespan)


routers = ["source"]

for router_name in routers:
    router_module = importlib.import_module(f"routes.{router_name}")
    router_prefix = "/".join(router_name.split("."))
    app.include_router(router_module.router, prefix=f"/{router_prefix}")


@app.get("/")
def read_root():
    return {"msg": "Hello World"}
