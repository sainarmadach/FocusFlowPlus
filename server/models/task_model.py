# Task schema
from pydantic import BaseModel
from typing import Optional, List

class Task(BaseModel):
    id: int
    title: str
    description: Optional[str] = None
    due_date: Optional[str] = None
    priority: Optional[str] = "Medium"
    tags: Optional[List[str]] = []
    is_completed: bool = False
