# ✅ schemas.py
from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class TaskBase(BaseModel):
    title: str

class TaskCreate(TaskBase):
    pass

class TaskUpdate(TaskBase):
    is_completed: Optional[bool] = None

class TaskOut(BaseModel):
    id: int
    title: str
    is_completed: bool
    created_at: datetime
    completed_at: Optional[datetime]

    class Config:
        orm_mode = True
