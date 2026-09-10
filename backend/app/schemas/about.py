from typing import Optional
from pydantic import BaseModel


class AboutCreate(BaseModel):
    name: str
    title: str
    tagline: str
    location: Optional[str] = None
    bio: str
    resume_url: Optional[str] = None
    image: Optional[str] = None


class About(BaseModel):
    id: int
    name: str
    title: str
    tagline: str
    location: Optional[str] = None
    bio: str
    resume_url: Optional[str] = None
    image: Optional[str] = None