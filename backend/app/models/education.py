from sqlalchemy import Column, Integer, String
from app.database import Base


class Education(Base):
    __tablename__ = "education"

    id = Column(Integer, primary_key=True, index=True)
    degree = Column(String, nullable=False)
    school = Column(String, nullable=False)
    start = Column(String, nullable=False)
    end = Column(String, nullable=False)
    description = Column(String, nullable=False)
    tech = Column(String, nullable=True)