from fastapi import FastAPI
from app.routes.projects import router as projects_router

app = FastAPI()

app.include_router(projects_router, prefix="/api")

@app.get("/")
def home():
    return {"message": "Portfolio API is running"}