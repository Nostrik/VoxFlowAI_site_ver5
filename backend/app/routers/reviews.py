from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List

from app.database import get_db
from app.schemas import ReviewCreate, Review
from app import crud

router = APIRouter(prefix="/reviews", tags=["Reviews"])


@router.post("/", response_model=Review)
async def create_review(
    review_data: ReviewCreate,
    db: AsyncSession = Depends(get_db)
):
    """
    Receives feedback form data and stores it in the database.
    """
    db_review = await crud.create_review(db=db, review_data=review_data)
    return db_review


@router.get("/", response_model=List[Review])
async def read_reviews(
    skip: int = 0,
    limit: int = 100,
    db: AsyncSession = Depends(get_db)
):
    """
    Returns a list of all reviews from the database.
    """
    reviews = await crud.get_reviews(db, skip=skip, limit=limit)
    return reviews


@router.get("/published", response_model=List[Review])
async def read_published_reviews(
    skip: int = 0,
    limit: int = 100,
    db: AsyncSession = Depends(get_db)
):
    """
    Returns only published reviews.
    """
    return await crud.get_reviews_is_published_true(
        db=db,
        skip=skip,
        limit=limit
    )
