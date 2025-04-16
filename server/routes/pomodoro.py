# Pomodoro session tracking routes
from fastapi import APIRouter

router = APIRouter()

@router.get("/")
def get_pomodoro_status():
    return {"status": "Pomodoro session not started."}
