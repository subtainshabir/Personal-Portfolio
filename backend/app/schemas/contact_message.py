from pydantic import BaseModel


class ContactMessageCreate(BaseModel):
    name: str
    email: str
    message: str


class ContactMessage(BaseModel):
    id: int
    name: str
    email: str
    message: str