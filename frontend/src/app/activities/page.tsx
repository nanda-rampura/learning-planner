"use client";

import { useState } from "react";
import { useActivities } from "../context/ActivitiesContext";
import { Category, CATEGORY_EMOJIS } from "../types";
import ActivityCard from "../components/ActivityCard";

export default function ActivitiesPage() {
  // Pull shared state from context
  const { activities, addActivity, toggleComplete } = useActivities();

  // Local form state — only this page needs these
  const [title, setTitle] = useState<string>("");
  const [category, setCategory] = useState<Category>("Numbers");
  const [duration, setDuration] = useState<number>(15);

  function handleAddActivity(): void {
    if (!title.trim()) return;

    addActivity({
      id: Date.now().toString(),
      title: title.trim(),
      category,
      emoji: CATEGORY_EMOJIS[category],
      durationMinutes: duration,
      completed: false,
    });

    setTitle("");
    setDuration(15);
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">All Activities</h2>

      {/* Add Activity Form */}
      <div className="bg-white rounded-xl p-6 shadow-sm mb-8">
        <h3 className="text-lg font-semibold mb-4">Add New Activity</h3>
        <div className="flex gap-4 flex-wrap">
          <input
            type="text"
            placeholder="Activity title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border rounded-lg px-4 py-2 flex-1 min-w-48"
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as Category)}
            className="border rounded-lg px-4 py-2"
          >
            {Object.keys(CATEGORY_EMOJIS).map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
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

      {/* Activity Grid */}
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
