from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.database import SessionLocal
from app.models.about import About
from app.schemas.about import About as AboutSchema, AboutCreate

router = APIRouter()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.get("/about", response_model=List[AboutSchema])
def get_about(db: Session = Depends(get_db)):
    return db.query(About).all()


@router.get("/about/{about_id}", response_model=AboutSchema)
def get_about_item(about_id: int, db: Session = Depends(get_db)):
    about = db.query(About).filter(About.id == about_id).first()

    if not about:
        raise HTTPException(status_code=404, detail="About entry not found")

    return about


@router.post("/about", response_model=AboutSchema)
def create_about(about: AboutCreate, db: Session = Depends(get_db)):
    new_about = About(
        name=about.name,
        title=about.title,
        tagline=about.tagline,
        location=about.location,
        bio=about.bio,
        resume_url=about.resume_url
    )

    db.add(new_about)
    db.commit()
    db.refresh(new_about)

    return new_about


@router.put("/about/{about_id}", response_model=AboutSchema)
def update_about(
    about_id: int,
    about: AboutCreate,
    db: Session = Depends(get_db)
):
    existing_about = db.query(About).filter(
        About.id == about_id
    ).first()

    if not existing_about:
        raise HTTPException(status_code=404, detail="About entry not found")

    existing_about.name = about.name
    existing_about.title = about.title
    existing_about.tagline = about.tagline
    existing_about.location = about.location
    existing_about.bio = about.bio
    existing_about.resume_url = about.resume_url

    db.commit()
    db.refresh(existing_about)

    return existing_about


@router.delete("/about/{about_id}")
def delete_about(about_id: int, db: Session = Depends(get_db)):
    about = db.query(About).filter(
        About.id == about_id
    ).first()

    if not about:
        raise HTTPException(status_code=404, detail="About entry not found")

    db.delete(about)
    db.commit()

    return {"message": "About entry deleted successfully"}