"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { Activity, SAMPLE_ACTIVITIES } from "../types";

// 1. Define what the context holds — like a C# interface for a service
interface ActivitiesContextType {
  activities: Activity[];
  addActivity: (activity: Activity) => void;
  toggleComplete: (id: string) => void;
}

// 2. Create the context — like registering a service in DI container
const ActivitiesContext = createContext<ActivitiesContextType | null>(null);

// 3. Provider — wraps the app and holds the actual state
// Any component inside the Provider can access the context
export function ActivitiesProvider({ children }: { children: ReactNode }) {
  const [activities, setActivities] = useState<Activity[]>(SAMPLE_ACTIVITIES);

  function addActivity(activity: Activity): void {
    setActivities((prev) => [...prev, activity]);
  }

  function toggleComplete(id: string): void {
    setActivities((prev) =>
      prev.map((a) => (a.id === id ? { ...a, completed: !a.completed } : a))
    );
  }

  return (
    <ActivitiesContext.Provider value={{ activities, addActivity, toggleComplete }}>
      {children}
    </ActivitiesContext.Provider>
  );
}

// 4. Custom hook — easy way to consume the context
// Like calling a service from DI in C#: _services.GetRequiredService<IActivitiesService>()
export function useActivities(): ActivitiesContextType {
  const context = useContext(ActivitiesContext);
  if (!context) {
    throw new Error("useActivities must be used inside ActivitiesProvider");
  }
  return context;
}
