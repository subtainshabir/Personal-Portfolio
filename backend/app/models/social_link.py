from sqlalchemy import Column, Integer, String
from app.database import Base


class SocialLink(Base):
    __tablename__ = "social_links"

    id = Column(Integer, primary_key=True, index=True)
    platform = Column(String, nullable=False)
    url = Column(String, nullable=False)