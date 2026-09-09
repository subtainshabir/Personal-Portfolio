from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.database import SessionLocal
from app.models.service import Service
from app.schemas.service import Service as ServiceSchema, ServiceCreate

router = APIRouter()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.get("/services", response_model=List[ServiceSchema])
def get_services(db: Session = Depends(get_db)):
    return db.query(Service).all()


@router.get("/services/{service_id}", response_model=ServiceSchema)
def get_service(service_id: int, db: Session = Depends(get_db)):
    service = db.query(Service).filter(Service.id == service_id).first()

    if not service:
        raise HTTPException(status_code=404, detail="Service not found")

    return service


@router.post("/services", response_model=ServiceSchema)
def create_service(service: ServiceCreate, db: Session = Depends(get_db)):
    new_service = Service(
        title=service.title,
        description=service.description
    )

    db.add(new_service)
    db.commit()
    db.refresh(new_service)

    return new_service


@router.put("/services/{service_id}", response_model=ServiceSchema)
def update_service(
    service_id: int,
    service: ServiceCreate,
    db: Session = Depends(get_db)
):
    existing_service = db.query(Service).filter(
        Service.id == service_id
    ).first()

    if not existing_service:
        raise HTTPException(status_code=404, detail="Service not found")

    existing_service.title = service.title
    existing_service.description = service.description

    db.commit()
    db.refresh(existing_service)

    return existing_service


@router.delete("/services/{service_id}")
def delete_service(service_id: int, db: Session = Depends(get_db)):
    service = db.query(Service).filter(
        Service.id == service_id
    ).first()

    if not service:
        raise HTTPException(status_code=404, detail="Service not found")

    db.delete(service)
    db.commit()

    return {"message": "Service deleted successfully"}