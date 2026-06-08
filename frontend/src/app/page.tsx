"use client";

import { useActivities } from "./context/ActivitiesContext";
import ActivityCard from "./components/ActivityCard";

export default function Home() {
  // useActivities() pulls from the global context — no local state needed
  // Like injecting a service in C#: private readonly IActivitiesService _service;
  const { activities, toggleComplete } = useActivities();

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">This Week's Activities</h2>
      <div className="grid grid-cols-3 gap-4">
        {activities.map((activity) => (
          <ActivityCard
            key={activity.id}
            {...activity}
            onToggle={toggleComplete}
          />
        ))}
      </div>
    </div>
  );
}
