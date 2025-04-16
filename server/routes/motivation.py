# Motivation quote/image generation routes
from fastapi import APIRouter

router = APIRouter()

@router.get("/")
def get_motivation_quote():
    return {"quote": "Your only limit is your mind."}
