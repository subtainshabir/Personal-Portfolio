from pydantic import BaseModel


class HighlightCreate(BaseModel):
    value: str
    label: str


class Highlight(BaseModel):
    id: int
    value: str
    label: str