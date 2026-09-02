from fastapi import APIRouter, HTTPException
from typing import List
from app.schemas.project import Project, ProjectCreate

router = APIRouter()

projects = [
    {
        "id": 1,
        "title": "PersonaAI",
        "description": "AI chatbot with RAG",
        "image": "/images/personaai.png"
    },
    {
        "id": 2,
        "title": "Leaf Guard",
        "description": "Plant leaf disease detection system",
        "image": "/images/leafguard.png"
    }
]


@router.get("/projects", response_model=List[Project])
def get_projects():
    return projects


@router.get("/projects/{project_id}", response_model=Project)
def get_project(project_id: int):
    for project in projects:
        if project["id"] == project_id:
            return project

    raise HTTPException(status_code=404, detail="Project not found")


@router.post("/projects", response_model=Project)
def create_project(project: ProjectCreate):
    new_project = {
        "id": len(projects) + 1,
        "title": project.title,
        "description": project.description,
        "image": project.image
    }

    projects.append(new_project)

    return new_project