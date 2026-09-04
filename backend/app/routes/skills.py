from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.database import SessionLocal
from app.models.skill import Skill
from app.schemas.skill import Skill as SkillSchema, SkillCreate

router = APIRouter()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.get("/skills", response_model=List[SkillSchema])
def get_skills(db: Session = Depends(get_db)):
    return db.query(Skill).all()


@router.get("/skills/{skill_id}", response_model=SkillSchema)
def get_skill(skill_id: int, db: Session = Depends(get_db)):
    skill = db.query(Skill).filter(Skill.id == skill_id).first()

    if not skill:
        raise HTTPException(status_code=404, detail="Skill not found")

    return skill


@router.post("/skills", response_model=SkillSchema)
def create_skill(skill: SkillCreate, db: Session = Depends(get_db)):
    new_skill = Skill(
        category=skill.category,
        name=skill.name
    )

    db.add(new_skill)
    db.commit()
    db.refresh(new_skill)

    return new_skill


@router.put("/skills/{skill_id}", response_model=SkillSchema)
def update_skill(
    skill_id: int,
    skill: SkillCreate,
    db: Session = Depends(get_db)
):
    existing_skill = db.query(Skill).filter(
        Skill.id == skill_id
    ).first()

    if not existing_skill:
        raise HTTPException(status_code=404, detail="Skill not found")

    existing_skill.category = skill.category
    existing_skill.name = skill.name

    db.commit()
    db.refresh(existing_skill)

    return existing_skill


@router.delete("/skills/{skill_id}")
def delete_skill(skill_id: int, db: Session = Depends(get_db)):
    skill = db.query(Skill).filter(
        Skill.id == skill_id
    ).first()

    if not skill:
        raise HTTPException(status_code=404, detail="Skill not found")

    db.delete(skill)
    db.commit()

    return {"message": "Skill deleted successfully"}