"use client";

import CategoryBadge from "./CategoryBadge";
import { Category } from "../types";

interface ActivityCardProps {
  id: string;
  title: string;
  category: Category;
  emoji: string;
  durationMinutes: number;
  completed: boolean;
  onToggle: (id: string) => void;
  onDelete?: (id: string) => void;
}

// Stronger background colors — easier to distinguish for a 4-year-old
const categoryColors: Record<Category, string> = {
  Numbers: "bg-blue-300",
  Colors:  "bg-pink-300",
  Shapes:  "bg-yellow-300",
  Letters: "bg-green-300",
  Stories: "bg-purple-300",
};

export default function ActivityCard({
  id,
  title,
  category,
  emoji,
  durationMinutes,
  completed,
  onToggle,
  onDelete,
}: ActivityCardProps) {
  return (
    <div
      onClick={() => onToggle(id)}
      // active:scale-95 gives a satisfying "press" feel when tapped on a tablet
      className={`relative p-6 rounded-2xl cursor-pointer select-none
        transition-all duration-150 active:scale-95 shadow-md
        ${categoryColors[category]}
        ${completed ? "opacity-50" : "opacity-100 hover:brightness-105"}`}
    >
      {/* Delete button */}
      {onDelete && (
        <button
          onClick={(e) => { e.stopPropagation(); onDelete(id); }}
          className="absolute top-3 right-3 w-7 h-7 flex items-center justify-center
            rounded-full bg-white/50 text-gray-500 hover:bg-red-100 hover:text-red-500
            text-lg font-bold leading-none"
          aria-label="Delete activity"
        >
          ×
        </button>
      )}

      {/* Big emoji — the main visual cue for a pre-reader */}
      <div className="text-6xl mb-3">{emoji}</div>

      {/* Large title — easy to read */}
      <h2 className="text-xl font-bold text-gray-800 leading-tight mb-3">{title}</h2>

      <div className="flex items-center gap-2 flex-wrap">
        <CategoryBadge category={category} />
        <span className="text-sm font-medium text-gray-600">{durationMinutes} min</span>
      </div>

      {/* Clear done/not-done indicator at the bottom */}
      <div className={`mt-4 text-sm font-semibold ${completed ? "text-green-700" : "text-gray-500"}`}>
        {completed ? "✅ Done!" : "⬜ Tap to complete"}
      </div>
    </div>
  );
}
