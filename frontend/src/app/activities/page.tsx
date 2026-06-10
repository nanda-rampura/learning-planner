"use client";

import { useState } from "react";
import { useActivities } from "../context/ActivitiesContext";
import { Category, CATEGORY_EMOJIS } from "../types";
import ActivityCard from "../components/ActivityCard";

export default function ActivitiesPage() {
  const { activities, loading, error, addActivity, removeActivity, toggleComplete } = useActivities();

  const [title, setTitle] = useState<string>("");
  const [category, setCategory] = useState<Category>("Numbers");
  const [duration, setDuration] = useState<number>(15);
  const [saving, setSaving] = useState(false);

  async function handleAddActivity(): Promise<void> {
    if (!title.trim()) return;
    setSaving(true);
    try {
      await addActivity({ title: title.trim(), category, emoji: CATEGORY_EMOJIS[category], durationMinutes: duration });
      setTitle("");
      setDuration(15);
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <p className="text-gray-500">Loading activities...</p>;

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-700">
        <strong>Could not load activities.</strong> Is the backend running on port 8000?
        <p className="text-sm mt-1">{error}</p>
      </div>
    );
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
            onKeyDown={(e) => e.key === "Enter" && handleAddActivity()}
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
            disabled={saving || !title.trim()}
            className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 font-medium disabled:opacity-50"
          >
            {saving ? "Saving..." : "Add Activity"}
          </button>
        </div>
      </div>

      {/* Activity Grid */}
      {activities.length === 0 ? (
        <p className="text-gray-400">No activities yet — add one above.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {activities.map((activity) => (
            <ActivityCard
              key={activity.id}
              {...activity}
              onToggle={toggleComplete}
              onDelete={removeActivity}
            />
          ))}
        </div>
      )}
    </div>
  );
}
