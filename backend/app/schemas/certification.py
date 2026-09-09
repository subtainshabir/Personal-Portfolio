from typing import Optional
from pydantic import BaseModel


class CertificationCreate(BaseModel):
    name: str
    issuer: str
    date: str
    url: Optional[str] = None


class Certification(BaseModel):
    id: int
    name: str
    issuer: str
    date: str
    url: Optional[str] = None