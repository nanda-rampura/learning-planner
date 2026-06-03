from fastapi import APIRouter, HTTPException
from bson import ObjectId
from database import get_db
from models import Activity, ActivityCreate

router = APIRouter()


def serialize_activity(doc) -> dict:
    doc["_id"] = str(doc["_id"])
    return doc


@router.get("/", response_model=list[Activity])
async def get_activities():
    db = get_db()
    activities = await db.activities.find().to_list(100)
    return [serialize_activity(a) for a in activities]


@router.post("/", response_model=Activity, status_code=201)
async def create_activity(activity: ActivityCreate):
    db = get_db()
    result = await db.activities.insert_one(activity.model_dump())
    created = await db.activities.find_one({"_id": result.inserted_id})
    return serialize_activity(created)


@router.delete("/{activity_id}", status_code=204)
async def delete_activity(activity_id: str):
    db = get_db()
    result = await db.activities.delete_one({"_id": ObjectId(activity_id)})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Activity not found")
