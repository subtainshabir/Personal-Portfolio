from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.database import SessionLocal
from app.models.project import Project
from app.schemas.project import Project as ProjectSchema, ProjectCreate

router = APIRouter()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.get("/projects", response_model=List[ProjectSchema])
def get_projects(db: Session = Depends(get_db)):
    return db.query(Project).all()


@router.get("/projects/{project_id}", response_model=ProjectSchema)
def get_project(project_id: int, db: Session = Depends(get_db)):
    project = db.query(Project).filter(Project.id == project_id).first()

    if not project:
        raise HTTPException(status_code=404, detail="Project not found")

    return project


@router.post("/projects", response_model=ProjectSchema)
def create_project(project: ProjectCreate, db: Session = Depends(get_db)):
    new_project = Project(
        title=project.title,
        description=project.description,
        image=project.image
    )

    db.add(new_project)
    db.commit()
    db.refresh(new_project)

    return new_project


@router.put("/projects/{project_id}", response_model=ProjectSchema)
def update_project(
    project_id: int,
    project: ProjectCreate,
    db: Session = Depends(get_db)
):
    existing_project = db.query(Project).filter(
        Project.id == project_id
    ).first()

    if not existing_project:
        raise HTTPException(status_code=404, detail="Project not found")

    existing_project.title = project.title
    existing_project.description = project.description
    existing_project.image = project.image

    db.commit()
    db.refresh(existing_project)

    return existing_project


@router.delete("/projects/{project_id}")
def delete_project(project_id: int, db: Session = Depends(get_db)):
    project = db.query(Project).filter(
        Project.id == project_id
    ).first()

    if not project:
        raise HTTPException(status_code=404, detail="Project not found")

    db.delete(project)
    db.commit()

    return {"message": "Project deleted successfully"}