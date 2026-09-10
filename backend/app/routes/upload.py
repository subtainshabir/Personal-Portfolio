import os
import uuid

from fastapi import APIRouter, Depends, HTTPException, UploadFile, File

from app.auth import get_current_admin

router = APIRouter()

UPLOAD_DIR = os.path.join(os.path.dirname(os.path.dirname(__file__)), "static", "uploads")
ALLOWED_EXTENSIONS = {".jpg", ".jpeg", ".png", ".webp", ".gif"}
MAX_FILE_SIZE = 5 * 1024 * 1024  # 5MB

os.makedirs(UPLOAD_DIR, exist_ok=True)


@router.post("/upload")
async def upload_image(file: UploadFile = File(...), admin: str = Depends(get_current_admin)):
    extension = os.path.splitext(file.filename or "")[1].lower()

    if extension not in ALLOWED_EXTENSIONS:
        raise HTTPException(status_code=400, detail="Only jpg, jpeg, png, webp, and gif files are allowed")

    contents = await file.read()

    if len(contents) > MAX_FILE_SIZE:
        raise HTTPException(status_code=400, detail="File must be under 5MB")

    filename = f"{uuid.uuid4().hex}{extension}"
    filepath = os.path.join(UPLOAD_DIR, filename)

    with open(filepath, "wb") as f:
        f.write(contents)

    return {"url": f"/static/uploads/{filename}"}