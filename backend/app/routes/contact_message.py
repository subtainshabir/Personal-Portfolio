from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.database import SessionLocal
from app.models.contact_message import ContactMessage
from app.schemas.contact_message import ContactMessage as ContactMessageSchema, ContactMessageCreate

router = APIRouter()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.get("/contact", response_model=List[ContactMessageSchema])
def get_contact_messages(db: Session = Depends(get_db)):
    return db.query(ContactMessage).all()


@router.get("/contact/{contact_id}", response_model=ContactMessageSchema)
def get_contact_message(contact_id: int, db: Session = Depends(get_db)):
    contact_message = db.query(ContactMessage).filter(ContactMessage.id == contact_id).first()

    if not contact_message:
        raise HTTPException(status_code=404, detail="Contact message not found")

    return contact_message


@router.post("/contact", response_model=ContactMessageSchema)
def create_contact_message(contact_message: ContactMessageCreate, db: Session = Depends(get_db)):
    new_contact_message = ContactMessage(
        name=contact_message.name,
        email=contact_message.email,
        message=contact_message.message
    )

    db.add(new_contact_message)
    db.commit()
    db.refresh(new_contact_message)

    return new_contact_message


@router.put("/contact/{contact_id}", response_model=ContactMessageSchema)
def update_contact_message(
    contact_id: int,
    contact_message: ContactMessageCreate,
    db: Session = Depends(get_db)
):
    existing_contact_message = db.query(ContactMessage).filter(
        ContactMessage.id == contact_id
    ).first()

    if not existing_contact_message:
        raise HTTPException(status_code=404, detail="Contact message not found")

    existing_contact_message.name = contact_message.name
    existing_contact_message.email = contact_message.email
    existing_contact_message.message = contact_message.message

    db.commit()
    db.refresh(existing_contact_message)

    return existing_contact_message


@router.delete("/contact/{contact_id}")
def delete_contact_message(contact_id: int, db: Session = Depends(get_db)):
    contact_message = db.query(ContactMessage).filter(
        ContactMessage.id == contact_id
    ).first()

    if not contact_message:
        raise HTTPException(status_code=404, detail="Contact message not found")

    db.delete(contact_message)
    db.commit()

    return {"message": "Contact message deleted successfully"}