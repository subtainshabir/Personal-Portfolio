from pydantic import BaseModel


class ServiceCreate(BaseModel):
    title: str
    description: str


class Service(BaseModel):
    id: int
    title: str
    description: str