"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Activity, CATEGORY_EMOJIS } from "../types";
import { fetchActivities, createActivity, deleteActivity } from "../lib/api";

// Like a C# service interface — defines what callers can do
interface ActivitiesContextType {
  activities: Activity[];
  loading: boolean;
  error: string | null;
  addActivity: (activity: Omit<Activity, "id" | "completed">) => Promise<void>;
  removeActivity: (id: string) => Promise<void>;
  toggleComplete: (id: string) => void;
}

const ActivitiesContext = createContext<ActivitiesContextType | null>(null);

export function ActivitiesProvider({ children }: { children: ReactNode }) {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch from backend on mount — replaces hardcoded SAMPLE_ACTIVITIES
  useEffect(() => {
    fetchActivities()
      .then(setActivities)
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  async function addActivity(activity: Omit<Activity, "id" | "completed">): Promise<void> {
    const created = await createActivity({
      ...activity,
      emoji: activity.emoji || CATEGORY_EMOJIS[activity.category],
    });
    setActivities((prev) => [...prev, created]);
  }

  async function removeActivity(id: string): Promise<void> {
    await deleteActivity(id);
    setActivities((prev) => prev.filter((a) => a.id !== id));
  }

  // Completed stays as local UI state for now — WeeklyPlan will own persistence (Day 4)
  function toggleComplete(id: string): void {
    setActivities((prev) =>
      prev.map((a) => (a.id === id ? { ...a, completed: !a.completed } : a))
    );
  }

  return (
    <ActivitiesContext.Provider value={{ activities, loading, error, addActivity, removeActivity, toggleComplete }}>
      {children}
    </ActivitiesContext.Provider>
  );
}

// Custom hook — like GetRequiredService<IActivitiesService>() in C# DI
export function useActivities(): ActivitiesContextType {
  const context = useContext(ActivitiesContext);
  if (!context) throw new Error("useActivities must be used inside ActivitiesProvider");
  return context;
}
