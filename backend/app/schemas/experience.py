from typing import Optional
from pydantic import BaseModel, model_validator


class ExperienceCreate(BaseModel):
    role: str
    org: str
    start: Optional[str] = None
    end: Optional[str] = None
    start_month: int
    start_year: int
    end_month: Optional[int] = None
    end_year: Optional[int] = None
    description: str
    tech: Optional[str] = None

    @model_validator(mode="after")
    def check_end_fields(self):
        if (self.end_month is None) != (self.end_year is None):
            raise ValueError("end_month and end_year must both be set, or both left empty for an ongoing role")
        return self


class Experience(BaseModel):
    id: int
    role: str
    org: str
    start: Optional[str] = None
    end: Optional[str] = None
    start_month: Optional[int] = None
    start_year: Optional[int] = None
    end_month: Optional[int] = None
    end_year: Optional[int] = None
    description: str
    tech: Optional[str] = None
    duration: Optional[str] = None