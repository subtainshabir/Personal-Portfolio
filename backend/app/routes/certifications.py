from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.database import SessionLocal
from app.models.certification import Certification
from app.schemas.certification import Certification as CertificationSchema, CertificationCreate

router = APIRouter()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.get("/certifications", response_model=List[CertificationSchema])
def get_certifications(db: Session = Depends(get_db)):
    return db.query(Certification).all()


@router.get("/certifications/{certification_id}", response_model=CertificationSchema)
def get_certification(certification_id: int, db: Session = Depends(get_db)):
    certification = db.query(Certification).filter(Certification.id == certification_id).first()

    if not certification:
        raise HTTPException(status_code=404, detail="Certification not found")

    return certification


@router.post("/certifications", response_model=CertificationSchema)
def create_certification(certification: CertificationCreate, db: Session = Depends(get_db)):
    new_certification = Certification(
        name=certification.name,
        issuer=certification.issuer,
        date=certification.date,
        url=certification.url
    )

    db.add(new_certification)
    db.commit()
    db.refresh(new_certification)

    return new_certification


@router.put("/certifications/{certification_id}", response_model=CertificationSchema)
def update_certification(
    certification_id: int,
    certification: CertificationCreate,
    db: Session = Depends(get_db)
):
    existing_certification = db.query(Certification).filter(
        Certification.id == certification_id
    ).first()

    if not existing_certification:
        raise HTTPException(status_code=404, detail="Certification not found")

    existing_certification.name = certification.name
    existing_certification.issuer = certification.issuer
    existing_certification.date = certification.date
    existing_certification.url = certification.url

    db.commit()
    db.refresh(existing_certification)

    return existing_certification


@router.delete("/certifications/{certification_id}")
def delete_certification(certification_id: int, db: Session = Depends(get_db)):
    certification = db.query(Certification).filter(
        Certification.id == certification_id
    ).first()

    if not certification:
        raise HTTPException(status_code=404, detail="Certification not found")

    db.delete(certification)
    db.commit()

    return {"message": "Certification deleted successfully"}