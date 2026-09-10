from sqlalchemy import Column, Integer, String
from app.database import Base


class About(Base):
    __tablename__ = "about"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    title = Column(String, nullable=False)
    tagline = Column(String, nullable=False)
    location = Column(String, nullable=True)
    bio = Column(String, nullable=False)
    resume_url = Column(String, nullable=True)
    image = Column(String, nullable=True)