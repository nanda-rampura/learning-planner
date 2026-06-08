"use client";

import { useState, useEffect } from "react";
import ActivityCard from "./components/ActivityCard";

interface Activity {
  id: string;
  title: string;
  category: "Numbers" | "Colors" | "Shapes" | "Letters" | "Stories";
  emoji: string;
  durationMinutes: number;
  completed: boolean;
}

const initialActivities: Activity[] = [
  { id: "1", title: "Count to 10", category: "Numbers", emoji: "🔢", durationMinutes: 15, completed: false },
  { id: "2", title: "Draw a Circle", category: "Shapes", emoji: "⭕", durationMinutes: 10, completed: false },
  { id: "3", title: "Learn letter A", category: "Letters", emoji: "🔤", durationMinutes: 20, completed: true },
];

export default function Home() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setActivities(initialActivities);
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  function toggleComplete(id: string): void {
    setActivities((prev) =>
      prev.map((activity) =>
        activity.id === id
          ? { ...activity, completed: !activity.completed }
          : activity
      )
    );
  }

  if (isLoading) {
    return <p className="text-gray-500">Loading activities...</p>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">This Week's Activities</h2>
      <div className="grid grid-cols-3 gap-4">
        {activities.map((activity) => (
          // ActivityCard is now a reusable component — clean and readable
          // onToggle passes the handler down to the card
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
