from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.database import SessionLocal
from app.models.education import Education
from app.schemas.education import Education as EducationSchema, EducationCreate

router = APIRouter()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.get("/education", response_model=List[EducationSchema])
def get_education(db: Session = Depends(get_db)):
    return db.query(Education).all()


@router.get("/education/{education_id}", response_model=EducationSchema)
def get_education_item(education_id: int, db: Session = Depends(get_db)):
    education = db.query(Education).filter(Education.id == education_id).first()

    if not education:
        raise HTTPException(status_code=404, detail="Education not found")

    return education


@router.post("/education", response_model=EducationSchema)
def create_education(education: EducationCreate, db: Session = Depends(get_db)):
    new_education = Education(
        degree=education.degree,
        school=education.school,
        start=education.start,
        end=education.end,
        description=education.description,
        tech=education.tech
    )

    db.add(new_education)
    db.commit()
    db.refresh(new_education)

    return new_education


@router.put("/education/{education_id}", response_model=EducationSchema)
def update_education(
    education_id: int,
    education: EducationCreate,
    db: Session = Depends(get_db)
):
    existing_education = db.query(Education).filter(
        Education.id == education_id
    ).first()

    if not existing_education:
        raise HTTPException(status_code=404, detail="Education not found")

    existing_education.degree = education.degree
    existing_education.school = education.school
    existing_education.start = education.start
    existing_education.end = education.end
    existing_education.description = education.description
    existing_education.tech = education.tech

    db.commit()
    db.refresh(existing_education)

    return existing_education


@router.delete("/education/{education_id}")
def delete_education(education_id: int, db: Session = Depends(get_db)):
    education = db.query(Education).filter(
        Education.id == education_id
    ).first()

    if not education:
        raise HTTPException(status_code=404, detail="Education not found")

    db.delete(education)
    db.commit()

    return {"message": "Education deleted successfully"}