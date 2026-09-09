from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import Base, engine
from app.models.project import Project
from app.models.skill import Skill
from app.models.experience import Experience
from app.models.education import Education
from app.models.certification import Certification
from app.models.service import Service
from app.models.social_link import SocialLink
from app.models.about import About
from app.models.highlight import Highlight
from app.models.contact_message import ContactMessage
from app.routes.projects import router as projects_router
from app.routes.skills import router as skills_router
from app.routes.experience import router as experience_router
from app.routes.education import router as education_router
from app.routes.certifications import router as certifications_router
from app.routes.services import router as services_router
from app.routes.social_links import router as social_links_router
from app.routes.about import router as about_router
from app.routes.highlight import router as highlights_router
from app.routes.contact_message import router as contact_router

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(projects_router, prefix="/api")
app.include_router(skills_router, prefix="/api")
app.include_router(experience_router, prefix="/api")
app.include_router(education_router, prefix="/api")
app.include_router(certifications_router, prefix="/api")
app.include_router(services_router, prefix="/api")
app.include_router(social_links_router, prefix="/api")
app.include_router(about_router, prefix="/api")
app.include_router(highlights_router, prefix="/api")
app.include_router(contact_router, prefix="/api")


@app.get("/")
def home():
    return {"message": "Portfolio API is running"}