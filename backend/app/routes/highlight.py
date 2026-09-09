from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.database import SessionLocal
from app.models.highlight import Highlight
from app.schemas.highlight import Highlight as HighlightSchema, HighlightCreate

router = APIRouter()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.get("/highlights", response_model=List[HighlightSchema])
def get_highlights(db: Session = Depends(get_db)):
    return db.query(Highlight).all()


@router.get("/highlights/{highlight_id}", response_model=HighlightSchema)
def get_highlight(highlight_id: int, db: Session = Depends(get_db)):
    highlight = db.query(Highlight).filter(Highlight.id == highlight_id).first()

    if not highlight:
        raise HTTPException(status_code=404, detail="Highlight not found")

    return highlight


@router.post("/highlights", response_model=HighlightSchema)
def create_highlight(highlight: HighlightCreate, db: Session = Depends(get_db)):
    new_highlight = Highlight(
        value=highlight.value,
        label=highlight.label
    )

    db.add(new_highlight)
    db.commit()
    db.refresh(new_highlight)

    return new_highlight


@router.put("/highlights/{highlight_id}", response_model=HighlightSchema)
def update_highlight(
    highlight_id: int,
    highlight: HighlightCreate,
    db: Session = Depends(get_db)
):
    existing_highlight = db.query(Highlight).filter(
        Highlight.id == highlight_id
    ).first()

    if not existing_highlight:
        raise HTTPException(status_code=404, detail="Highlight not found")

    existing_highlight.value = highlight.value
    existing_highlight.label = highlight.label

    db.commit()
    db.refresh(existing_highlight)

    return existing_highlight


@router.delete("/highlights/{highlight_id}")
def delete_highlight(highlight_id: int, db: Session = Depends(get_db)):
    highlight = db.query(Highlight).filter(
        Highlight.id == highlight_id
    ).first()

    if not highlight:
        raise HTTPException(status_code=404, detail="Highlight not found")

    db.delete(highlight)
    db.commit()

    return {"message": "Highlight deleted successfully"}