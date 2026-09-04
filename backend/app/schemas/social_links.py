from pydantic import BaseModel


class SocialLinkCreate(BaseModel):
    platform: str
    url: str


class SocialLink(BaseModel):
    id: int
    platform: str
    url: str