from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.database import SessionLocal
from app.models.experience import Experience
from app.schemas.experience import Experience as ExperienceSchema, ExperienceCreate

router = APIRouter()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.get("/experience", response_model=List[ExperienceSchema])
def get_experience(db: Session = Depends(get_db)):
    return db.query(Experience).all()


@router.get("/experience/{experience_id}", response_model=ExperienceSchema)
def get_experience_item(experience_id: int, db: Session = Depends(get_db)):
    experience = db.query(Experience).filter(Experience.id == experience_id).first()

    if not experience:
        raise HTTPException(status_code=404, detail="Experience not found")

    return experience


@router.post("/experience", response_model=ExperienceSchema)
def create_experience(experience: ExperienceCreate, db: Session = Depends(get_db)):
    new_experience = Experience(
        role=experience.role,
        org=experience.org,
        start=experience.start,
        end=experience.end,
        description=experience.description,
        tech=experience.tech
    )

    db.add(new_experience)
    db.commit()
    db.refresh(new_experience)

    return new_experience


@router.put("/experience/{experience_id}", response_model=ExperienceSchema)
def update_experience(
    experience_id: int,
    experience: ExperienceCreate,
    db: Session = Depends(get_db)
):
    existing_experience = db.query(Experience).filter(
        Experience.id == experience_id
    ).first()

    if not existing_experience:
        raise HTTPException(status_code=404, detail="Experience not found")

    existing_experience.role = experience.role
    existing_experience.org = experience.org
    existing_experience.start = experience.start
    existing_experience.end = experience.end
    existing_experience.description = experience.description
    existing_experience.tech = experience.tech

    db.commit()
    db.refresh(existing_experience)

    return existing_experience


@router.delete("/experience/{experience_id}")
def delete_experience(experience_id: int, db: Session = Depends(get_db)):
    experience = db.query(Experience).filter(
        Experience.id == experience_id
    ).first()

    if not experience:
        raise HTTPException(status_code=404, detail="Experience not found")

    db.delete(experience)
    db.commit()

    return {"message": "Experience deleted successfully"}