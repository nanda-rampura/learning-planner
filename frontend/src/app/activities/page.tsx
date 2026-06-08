"use client";

import { useState } from "react";
import ActivityCard from "../components/ActivityCard";

// Reusing the same Activity type — on Day 3 we'll move this to a shared types file
interface Activity {
  id: string;
  title: string;
  category: "Numbers" | "Colors" | "Shapes" | "Letters" | "Stories";
  emoji: string;
  durationMinutes: number;
  completed: boolean;
}

// Emoji map per category — makes the UI fun for a 4-year-old
const categoryEmojis: Record<Activity["category"], string> = {
  Numbers: "🔢",
  Colors: "🎨",
  Shapes: "⭕",
  Letters: "🔤",
  Stories: "📖",
};

const sampleActivities: Activity[] = [
  { id: "1", title: "Count to 10", category: "Numbers", emoji: "🔢", durationMinutes: 15, completed: false },
  { id: "2", title: "Draw a Circle", category: "Shapes", emoji: "⭕", durationMinutes: 10, completed: false },
  { id: "3", title: "Learn letter A", category: "Letters", emoji: "🔤", durationMinutes: 20, completed: false },
  { id: "4", title: "Name 5 colors", category: "Colors", emoji: "🎨", durationMinutes: 10, completed: false },
  { id: "5", title: "Bedtime story", category: "Stories", emoji: "📖", durationMinutes: 20, completed: false },
];

export default function ActivitiesPage() {
  const [activities, setActivities] = useState<Activity[]>(sampleActivities);

  // Form state — controlled inputs in React
  // Each field is a piece of state that updates as the user types
  const [title, setTitle] = useState<string>("");
  const [category, setCategory] = useState<Activity["category"]>("Numbers");
  const [duration, setDuration] = useState<number>(15);

  function toggleComplete(id: string): void {
    setActivities((prev) =>
      prev.map((a) => (a.id === id ? { ...a, completed: !a.completed } : a))
    );
  }

  // Add a new activity to the list
  function handleAddActivity(): void {
    if (!title.trim()) return; // don't add empty titles

    const newActivity: Activity = {
      id: Date.now().toString(), // temporary ID — on Day 3 MongoDB generates this
      title: title.trim(),
      category,
      emoji: categoryEmojis[category],
      durationMinutes: duration,
      completed: false,
    };

    setActivities((prev) => [...prev, newActivity]); // spread existing + add new
    setTitle(""); // reset form
    setDuration(15);
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">All Activities</h2>

      {/* Add Activity Form */}
      <div className="bg-white rounded-xl p-6 shadow-sm mb-8">
        <h3 className="text-lg font-semibold mb-4">Add New Activity</h3>
        <div className="flex gap-4 flex-wrap">

          {/* Controlled input — value tied to state */}
          <input
            type="text"
            placeholder="Activity title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)} // update state on every keystroke
            className="border rounded-lg px-4 py-2 flex-1 min-w-48"
          />

          {/* Select dropdown — typed as Activity["category"] */}
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as Activity["category"])}
            className="border rounded-lg px-4 py-2"
          >
            {Object.keys(categoryEmojis).map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>

          {/* Number input for duration */}
          <input
            type="number"
            value={duration}
            onChange={(e) => setDuration(Number(e.target.value))}
            min={5}
            max={60}
            className="border rounded-lg px-4 py-2 w-24"
          />

          <button
            onClick={handleAddActivity}
            className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 font-medium"
          >
            Add Activity
          </button>
        </div>
      </div>

      {/* Activity Grid — reusing ActivityCard component */}
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
