from fastapi import APIRouter, HTTPException
from database import get_db
from models import WeeklyPlan, DayPlan

router = APIRouter()

DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]


def serialize_plan(doc) -> dict:
    doc["_id"] = str(doc["_id"])
    return doc


@router.get("/{week_id}", response_model=WeeklyPlan)
async def get_plan(week_id: str):
    db = get_db()
    plan = await db.weekly_plans.find_one({"week_id": week_id})
    if not plan:
        # Return an empty plan for the week
        return WeeklyPlan(
            week_id=week_id,
            days=[DayPlan(day=d) for d in DAYS]
        )
    return serialize_plan(plan)


@router.put("/{week_id}", response_model=WeeklyPlan)
async def update_plan(week_id: str, plan: WeeklyPlan):
    db = get_db()
    plan_data = plan.model_dump(exclude={"id"})
    plan_data["week_id"] = week_id
    await db.weekly_plans.update_one(
        {"week_id": week_id},
        {"$set": plan_data},
        upsert=True
    )
    updated = await db.weekly_plans.find_one({"week_id": week_id})
    return serialize_plan(updated)


@router.patch("/{week_id}/{day}/complete/{activity_id}", response_model=WeeklyPlan)
async def toggle_complete(week_id: str, day: str, activity_id: str):
    db = get_db()
    plan = await db.weekly_plans.find_one({"week_id": week_id})
    if not plan:
        raise HTTPException(status_code=404, detail="Plan not found")

    for day_plan in plan["days"]:
        if day_plan["day"] == day:
            completed = day_plan.get("completed_ids", [])
            if activity_id in completed:
                completed.remove(activity_id)
            else:
                completed.append(activity_id)
            day_plan["completed_ids"] = completed
            break

    await db.weekly_plans.update_one(
        {"week_id": week_id},
        {"$set": {"days": plan["days"]}}
    )
    updated = await db.weekly_plans.find_one({"week_id": week_id})
    return serialize_plan(updated)
