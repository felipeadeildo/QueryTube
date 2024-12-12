from contextlib import asynccontextmanager

from fastapi import FastAPI
from prisma import Prisma

db = Prisma(auto_register=True)


@asynccontextmanager
async def lifespan(app: FastAPI):
    db.connect()
    yield
    db.disconnect()
