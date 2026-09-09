from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.database import SessionLocal
from app.models.social_link import SocialLink
from app.schemas.social_link import SocialLink as SocialLinkSchema, SocialLinkCreate

router = APIRouter()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.get("/social-links", response_model=List[SocialLinkSchema])
def get_social_links(db: Session = Depends(get_db)):
    return db.query(SocialLink).all()


@router.get("/social-links/{social_link_id}", response_model=SocialLinkSchema)
def get_social_link(social_link_id: int, db: Session = Depends(get_db)):
    social_link = db.query(SocialLink).filter(SocialLink.id == social_link_id).first()

    if not social_link:
        raise HTTPException(status_code=404, detail="Social link not found")

    return social_link


@router.post("/social-links", response_model=SocialLinkSchema)
def create_social_link(social_link: SocialLinkCreate, db: Session = Depends(get_db)):
    new_social_link = SocialLink(
        platform=social_link.platform,
        url=social_link.url
    )

    db.add(new_social_link)
    db.commit()
    db.refresh(new_social_link)

    return new_social_link


@router.put("/social-links/{social_link_id}", response_model=SocialLinkSchema)
def update_social_link(
    social_link_id: int,
    social_link: SocialLinkCreate,
    db: Session = Depends(get_db)
):
    existing_social_link = db.query(SocialLink).filter(
        SocialLink.id == social_link_id
    ).first()

    if not existing_social_link:
        raise HTTPException(status_code=404, detail="Social link not found")

    existing_social_link.platform = social_link.platform
    existing_social_link.url = social_link.url

    db.commit()
    db.refresh(existing_social_link)

    return existing_social_link


@router.delete("/social-links/{social_link_id}")
def delete_social_link(social_link_id: int, db: Session = Depends(get_db)):
    social_link = db.query(SocialLink).filter(
        SocialLink.id == social_link_id
    ).first()

    if not social_link:
        raise HTTPException(status_code=404, detail="Social link not found")

    db.delete(social_link)
    db.commit()

    return {"message": "Social link deleted successfully"}