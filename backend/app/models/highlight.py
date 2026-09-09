from sqlalchemy import Column, Integer, String
from app.database import Base


class Highlight(Base):
    __tablename__ = "highlights"

    id = Column(Integer, primary_key=True, index=True)
    value = Column(String, nullable=False)
    label = Column(String, nullable=False)