from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app.database import get_db
from app.schemas import Lead, LeadCreate
from app import crud

router = APIRouter(prefix="/leads", tags=["Contact Forms"])


@router.post("/", response_model=Lead)
async def create_lead(
    lead_data: LeadCreate,
    db: AsyncSession = Depends(get_db)
):
    """
    Receives feedback form data and stores it in the database
    (which now sends a Telegram notification internally).
    """
    db_lead = await crud.create_lead(db=db, lead_data=lead_data)
    return db_lead
