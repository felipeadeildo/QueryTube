import importlib

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

routers = ["source"]

for router_name in routers:
    router_module = importlib.import_module(f"routes.{router_name}")
    router_prefix = "/".join(router_name.split("."))
    app.include_router(router_module.router, prefix=f"/api/{router_prefix}")


@app.get("/")
def read_root():
    return {"msg": "Hello World"}
