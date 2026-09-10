import os

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from sqlalchemy import inspect, text

from app.database import Base, engine, SessionLocal
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
from app.models.admin_user import AdminUser
from app.auth import hash_password
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
from app.routes.auth import router as auth_router
from app.routes.upload import router as upload_router

Base.metadata.create_all(bind=engine)


def sync_missing_columns():
    """Adds any column defined on a model but missing from its existing table.
    Never drops or renames columns. Always adds as nullable, regardless of the
    model's own nullable setting, so this is safe to run against tables that
    already have rows."""
    inspector = inspect(engine)

    with engine.begin() as conn:
        for table in Base.metadata.sorted_tables:
            if not inspector.has_table(table.name):
                continue

            existing_columns = {col["name"] for col in inspector.get_columns(table.name)}

            for column in table.columns:
                if column.name in existing_columns:
                    continue

                column_type = column.type.compile(dialect=engine.dialect)
                print(f"Migrating: adding column '{column.name}' to table '{table.name}'")
                conn.execute(
                    text(f'ALTER TABLE "{table.name}" ADD COLUMN "{column.name}" {column_type}')
                )


sync_missing_columns()


def seed_admin_user():
    email = os.getenv("ADMIN_EMAIL")
    password = os.getenv("ADMIN_PASSWORD")

    if not email or not password:
        return

    db = SessionLocal()
    try:
        existing = db.query(AdminUser).filter(AdminUser.email == email).first()
        if not existing:
            db.add(AdminUser(email=email, hashed_password=hash_password(password)))
            db.commit()
    finally:
        db.close()


seed_admin_user()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router, prefix="/api")
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
app.include_router(upload_router, prefix="/api")

app.mount("/static", StaticFiles(directory=os.path.join(os.path.dirname(__file__), "static")), name="static")


@app.get("/")
def home():
    return {"message": "Portfolio API is running"}