from typing import Optional
from pydantic import BaseModel


class ProjectCreate(BaseModel):
    title: str
    description: str
    image: Optional[str] = None
    github: str
    demo: Optional[str] = None


class Project(BaseModel):
    id: int
    title: str
    description: str
    image: Optional[str] = None
    github: Optional[str] = None
    demo: Optional[str] = None