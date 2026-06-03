from pydantic import BaseModel, Field
from typing import Optional
from enum import Enum


class Category(str, Enum):
    numbers = "Numbers"
    colors = "Colors"
    shapes = "Shapes"
    letters = "Letters"
    stories = "Stories"


class Activity(BaseModel):
    id: Optional[str] = Field(None, alias="_id")
    title: str
    category: Category
    description: Optional[str] = None
    emoji: Optional[str] = None
    duration_minutes: int = 15

    class Config:
        populate_by_name = True


class ActivityCreate(BaseModel):
    title: str
    category: Category
    description: Optional[str] = None
    emoji: Optional[str] = None
    duration_minutes: int = 15


class DayPlan(BaseModel):
    day: str  # "Monday", "Tuesday", etc.
    activity_ids: list[str] = []
    completed_ids: list[str] = []


class WeeklyPlan(BaseModel):
    id: Optional[str] = Field(None, alias="_id")
    week_id: str  # e.g. "2024-W01"
    days: list[DayPlan] = []

    class Config:
        populate_by_name = True
