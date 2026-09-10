from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import SessionLocal
from app.models.admin_user import AdminUser
from app.schemas.auth import LoginRequest, Token
from app.auth import verify_password, create_access_token, get_current_admin

router = APIRouter()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/auth/login", response_model=Token)
def login(credentials: LoginRequest, db: Session = Depends(get_db)):
    admin = db.query(AdminUser).filter(AdminUser.email == credentials.email).first()

    if not admin or not verify_password(credentials.password, admin.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid email or password")

    token = create_access_token(admin.email)
    return Token(access_token=token)


@router.get("/auth/me")
def me(email: str = Depends(get_current_admin)):
    return {"email": email}