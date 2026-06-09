"use client";

import CategoryBadge from "./CategoryBadge";

interface ActivityCardProps {
  id: string;
  title: string;
  category: "Numbers" | "Colors" | "Shapes" | "Letters" | "Stories";
  emoji: string;
  durationMinutes: number;
  completed: boolean;
  onToggle: (id: string) => void;
  onDelete?: (id: string) => void; // optional — only the Activities page passes this
}

function getCategoryColor(category: ActivityCardProps["category"]): string {
  const colors: Record<ActivityCardProps["category"], string> = {
    Numbers: "bg-blue-200",
    Colors: "bg-pink-200",
    Shapes: "bg-yellow-200",
    Letters: "bg-green-200",
    Stories: "bg-purple-200",
  };
  return colors[category];
}

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
      className={`relative p-4 rounded-xl cursor-pointer transition-opacity ${getCategoryColor(category)} ${
        completed ? "opacity-60" : "opacity-100"
      }`}
    >
      {/* Delete button — only rendered when onDelete is provided */}
      {onDelete && (
        <button
          onClick={(e) => {
            e.stopPropagation(); // prevent toggling when clicking delete
            onDelete(id);
          }}
          className="absolute top-2 right-2 text-gray-400 hover:text-red-500 text-lg leading-none"
          aria-label="Delete activity"
        >
          ×
        </button>
      )}

      <span className="text-4xl">{emoji}</span>
      <h2 className="text-xl font-semibold mt-2">{title}</h2>
      <div className="mt-2 flex items-center gap-2">
        <CategoryBadge category={category} />
        <span className="text-sm text-gray-500">{durationMinutes} min</span>
      </div>
      <p className="mt-2">{completed ? "✅ Done" : "⬜ Not started"}</p>
    </div>
  );
}
