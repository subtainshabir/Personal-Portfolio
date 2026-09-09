from typing import Optional
from pydantic import BaseModel


class EducationCreate(BaseModel):
    degree: str
    school: str
    start: str
    end: str
    description: str
    tech: Optional[str] = None


class Education(BaseModel):
    id: int
    degree: str
    school: str
    start: str
    end: str
    description: str
    tech: Optional[str] = None