"use client";

import { useState, useEffect } from "react";

interface Activity {
  id: string;
  title: string;
  category: "Numbers" | "Colors" | "Shapes" | "Letters" | "Stories";
  emoji: string;
  durationMinutes: number;
  completed: boolean;
}

function getCategoryColor(category: Activity["category"]): string {
  const colors: Record<Activity["category"], string> = {
    Numbers: "bg-blue-200",
    Colors: "bg-pink-200",
    Shapes: "bg-yellow-200",
    Letters: "bg-green-200",
    Stories: "bg-purple-200",
  };
  return colors[category];
}

const initialActivities: Activity[] = [
  { id: "1", title: "Count to 10", category: "Numbers", emoji: "🔢", durationMinutes: 15, completed: false },
  { id: "2", title: "Draw a Circle", category: "Shapes", emoji: "⭕", durationMinutes: 10, completed: false },
  { id: "3", title: "Learn letter A", category: "Letters", emoji: "🔤", durationMinutes: 20, completed: true },
];

export default function Home() {
  const [activities, setActivities] = useState<Activity[]>([]);

  // isLoading tracks whether we are still fetching data
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // useEffect runs AFTER the component renders
  // The empty array [] at the end means "run this only once — on first load"
  // Like OnInitializedAsync() in C# Blazor or Page_Load in WebForms
  useEffect(() => {
    // Simulating an API call with a 1 second delay
    // On Day 3 we will replace this with a real fetch() to the FastAPI backend
    const timer = setTimeout(() => {
      setActivities(initialActivities); // set the data
      setIsLoading(false);              // loading is done
    }, 1000);

    // cleanup function — runs when component unmounts
    // like IDisposable in C#
    return () => clearTimeout(timer);
  }, []); // <- empty array = run once on mount

  function toggleComplete(id: string): void {
    setActivities((prev) =>
      prev.map((activity) =>
        activity.id === id
          ? { ...activity, completed: !activity.completed }
          : activity
      )
    );
  }

  // Show a loading state while data is being fetched
  if (isLoading) {
    return (
      <main className="p-8">
        <h1 className="text-3xl font-bold mb-6">Learning Planner 🌟</h1>
        <p className="text-gray-500">Loading activities...</p>
      </main>
    );
  }

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-6">Learning Planner 🌟</h1>
      <div className="grid grid-cols-3 gap-4">
        {activities.map((activity) => (
          <div
            key={activity.id}
            onClick={() => toggleComplete(activity.id)}
            className={`p-4 rounded-xl cursor-pointer ${getCategoryColor(activity.category)} ${
              activity.completed ? "opacity-60" : "opacity-100"
            }`}
          >
            <span className="text-4xl">{activity.emoji}</span>
            <h2 className="text-xl font-semibold mt-2">{activity.title}</h2>
            <p className="text-sm text-gray-600">{activity.category} · {activity.durationMinutes} min</p>
            <p className="mt-2">{activity.completed ? "✅ Done" : "⬜ Not started"}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
