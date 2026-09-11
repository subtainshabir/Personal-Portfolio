from sqlalchemy import Column, Integer, String
from app.database import Base


class Project(Base):
    __tablename__ = "projects"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    description = Column(String, nullable=False)
    image = Column(String, nullable=True)
    github = Column(String, nullable=True)
    demo = Column(String, nullable=True)