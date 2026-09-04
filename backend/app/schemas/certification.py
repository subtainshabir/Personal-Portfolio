from pydantic import BaseModel


class SkillCreate(BaseModel):
    category: str
    name: str


class Skill(BaseModel):
    id: int
    category: str
    name: str