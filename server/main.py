# ✅ main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from . import models, database
from .routes import tasks

app = FastAPI()

# Create DB tables
models.Base.metadata.create_all(bind=database.engine)

# CORS config
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routers
app.include_router(tasks.router, prefix="/tasks")

@app.get("/")
def root():
    return {"message": "FocusFlow+ API with PostgreSQL is running 🚀"}