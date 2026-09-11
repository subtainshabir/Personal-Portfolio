from sqlalchemy import Column, Integer, String
from app.database import Base


class Experience(Base):
    __tablename__ = "experience"

    id = Column(Integer, primary_key=True, index=True)
    role = Column(String, nullable=False)
    org = Column(String, nullable=False)
    start = Column(String, nullable=True)
    end = Column(String, nullable=True)
    start_month = Column(Integer, nullable=True)
    start_year = Column(Integer, nullable=True)
    end_month = Column(Integer, nullable=True)
    end_year = Column(Integer, nullable=True)
    description = Column(String, nullable=False)
    tech = Column(String, nullable=True)