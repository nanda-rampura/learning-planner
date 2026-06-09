// All fetch calls to the FastAPI backend live here.
// This is the only file that knows about snake_case backend field names —
// everything else in the frontend uses camelCase (standard TypeScript convention).

import { Activity, Category } from "../types";

const BASE_URL = "http://localhost:8000";

// Shape the backend sends — snake_case, no `completed` field
interface ActivityResponse {
  _id: string;
  title: string;
  category: Category;
  emoji: string | null;
  duration_minutes: number;
  description: string | null;
}

// Transform backend shape → frontend Activity type
function toActivity(r: ActivityResponse): Activity {
  return {
    id: r._id,
    title: r.title,
    category: r.category,
    emoji: r.emoji ?? "",
    durationMinutes: r.duration_minutes,
    completed: false, // completion is local UI state; WeeklyPlan handles persistence
  };
}

export async function fetchActivities(): Promise<Activity[]> {
  const res = await fetch(`${BASE_URL}/activities/`);
  if (!res.ok) throw new Error("Failed to fetch activities");
  const data: ActivityResponse[] = await res.json();
  return data.map(toActivity);
}

export async function createActivity(
  activity: Omit<Activity, "id" | "completed">
): Promise<Activity> {
  const res = await fetch(`${BASE_URL}/activities/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      title: activity.title,
      category: activity.category,
      emoji: activity.emoji,
      duration_minutes: activity.durationMinutes,
    }),
  });
  if (!res.ok) throw new Error("Failed to create activity");
  const data: ActivityResponse = await res.json();
  return toActivity(data);
}

export async function deleteActivity(id: string): Promise<void> {
  const res = await fetch(`${BASE_URL}/activities/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete activity");
}
