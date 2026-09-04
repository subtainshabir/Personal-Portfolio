from sqlalchemy import Column, Integer, String
from app.database import Base


class Certification(Base):
    __tablename__ = "certifications"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    issuer = Column(String, nullable=False)
    date = Column(String, nullable=False)
    url = Column(String, nullable=True)