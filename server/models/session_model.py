# Focus session schema
from pydantic import BaseModel

class Session(BaseModel):
    id: int
    start_time: str
    end_time: str
    tasks_completed: int
