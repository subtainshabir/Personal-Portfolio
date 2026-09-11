from datetime import date

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.database import SessionLocal
from app.models.experience import Experience
from app.schemas.experience import Experience as ExperienceSchema, ExperienceCreate
from app.auth import get_current_admin

router = APIRouter()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def compute_duration(start_month, start_year, end_month, end_year):
    if not start_month or not start_year:
        return None

    if end_month and end_year:
        end_total = end_year * 12 + end_month
    else:
        today = date.today()
        end_total = today.year * 12 + today.month

    start_total = start_year * 12 + start_month
    total_months = max(end_total - start_total + 1, 1)

    years, months = divmod(total_months, 12)
    parts = []
    if years:
        parts.append(f"{years} yr" + ("s" if years != 1 else ""))
    if months:
        parts.append(f"{months} mo" + ("s" if months != 1 else ""))
    if not parts:
        parts.append("1 mo")

    return " ".join(parts)


def serialize(item):
    return ExperienceSchema(
        id=item.id,
        role=item.role,
        org=item.org,
        start=item.start,
        end=item.end,
        start_month=item.start_month,
        start_year=item.start_year,
        end_month=item.end_month,
        end_year=item.end_year,
        description=item.description,
        tech=item.tech,
        duration=compute_duration(item.start_month, item.start_year, item.end_month, item.end_year)
    )


@router.get("/experience", response_model=List[ExperienceSchema])
def get_experience(db: Session = Depends(get_db)):
    return [serialize(item) for item in db.query(Experience).all()]


@router.get("/experience/{experience_id}", response_model=ExperienceSchema)
def get_experience_item(experience_id: int, db: Session = Depends(get_db)):
    experience = db.query(Experience).filter(Experience.id == experience_id).first()

    if not experience:
        raise HTTPException(status_code=404, detail="Experience not found")

    return serialize(experience)


@router.post("/experience", response_model=ExperienceSchema)
def create_experience(experience: ExperienceCreate, db: Session = Depends(get_db), admin: str = Depends(get_current_admin)):
    new_experience = Experience(
        role=experience.role,
        org=experience.org,
        start=experience.start,
        end=experience.end,
        start_month=experience.start_month,
        start_year=experience.start_year,
        end_month=experience.end_month,
        end_year=experience.end_year,
        description=experience.description,
        tech=experience.tech
    )

    db.add(new_experience)
    db.commit()
    db.refresh(new_experience)

    return serialize(new_experience)


@router.put("/experience/{experience_id}", response_model=ExperienceSchema)
def update_experience(
    experience_id: int,
    experience: ExperienceCreate,
    db: Session = Depends(get_db),
    admin: str = Depends(get_current_admin)
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
    existing_experience.start_month = experience.start_month
    existing_experience.start_year = experience.start_year
    existing_experience.end_month = experience.end_month
    existing_experience.end_year = experience.end_year
    existing_experience.description = experience.description
    existing_experience.tech = experience.tech

    db.commit()
    db.refresh(existing_experience)

    return serialize(existing_experience)


@router.delete("/experience/{experience_id}")
def delete_experience(experience_id: int, db: Session = Depends(get_db), admin: str = Depends(get_current_admin)):
    experience = db.query(Experience).filter(
        Experience.id == experience_id
    ).first()

    if not experience:
        raise HTTPException(status_code=404, detail="Experience not found")

    db.delete(experience)
    db.commit()

    return {"message": "Experience deleted successfully"}