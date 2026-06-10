"use client";

import { useActivities } from "./context/ActivitiesContext";
import ActivityCard from "./components/ActivityCard";
import ProgressBar from "./components/ProgressBar";
import { Category } from "./types";

// All 5 categories in display order
const CATEGORIES: Category[] = ["Numbers", "Colors", "Shapes", "Letters", "Stories"];

export default function Home() {
  const { activities, loading, error, toggleComplete, resetAll } = useActivities();

  if (loading) {
    return <p className="text-gray-500 text-lg">Loading activities... ⏳</p>;
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-700">
        <strong>Could not load activities.</strong> Is the backend running on port 8000?
        <p className="text-sm mt-1">{error}</p>
      </div>
    );
  }

  // Derived state — computed from activities, not stored separately
  // Like a C# LINQ query: activities.Where(a => a.Completed).Count()
  const completedCount = activities.filter((a) => a.completed).length;
  const totalCount = activities.length;

  return (
    <div>
      {/* Header row */}
      <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">This Week's Activities 🌟</h2>
          <p className="text-gray-500 mt-1">
            {completedCount} of {totalCount} completed
          </p>
        </div>

        {/* Reset button — only shown if something is completed */}
        {completedCount > 0 && (
          <button
            onClick={resetAll}
            className="bg-white border-2 border-gray-200 text-gray-600 px-5 py-2 rounded-xl
              font-semibold hover:border-red-300 hover:text-red-500 transition-colors"
          >
            🔄 Reset Week
          </button>
        )}
      </div>

      {/* Progress bars — one per category that has activities */}
      {/* Always show all 5 category bars — "none" label when a category has no activities */}
      {totalCount > 0 && (
        <div className="bg-white rounded-2xl p-5 shadow-sm mb-8 space-y-3">
          <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-4">
            Progress by category
          </h3>
          {CATEGORIES.map((cat) => {
            // Derived values — filter the shared activities array for this category
            const catActivities = activities.filter((a) => a.category === cat);
            const catCompleted = catActivities.filter((a) => a.completed).length;
            return (
              <ProgressBar
                key={cat}
                category={cat}
                completed={catCompleted}
                total={catActivities.length}
              />
            );
          })}
        </div>
      )}

      {/* Activity grid — responsive: 1 col → 2 col → 3 col */}
      {activities.length === 0 ? (
        <p className="text-gray-400 text-lg">No activities yet — add some on the Activities page.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
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
