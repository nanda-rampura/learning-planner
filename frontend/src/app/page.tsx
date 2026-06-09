"use client";

import { useActivities } from "./context/ActivitiesContext";
import ActivityCard from "./components/ActivityCard";

export default function Home() {
  const { activities, loading, error, toggleComplete } = useActivities();

  if (loading) {
    return <p className="text-gray-500">Loading activities...</p>;
  }

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
      <h2 className="text-2xl font-bold mb-6">This Week's Activities</h2>
      {activities.length === 0 ? (
        <p className="text-gray-400">No activities yet — add some on the Activities page.</p>
      ) : (
        <div className="grid grid-cols-3 gap-4">
          {activities.map((activity) => (
            <ActivityCard
              key={activity.id}
              {...activity}
              onToggle={toggleComplete}
            />
          ))}
        </div>
      )}
    </div>
  );
}
