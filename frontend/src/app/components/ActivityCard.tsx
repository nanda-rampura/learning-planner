"use client"; // needs "use client" because it handles onClick (user interaction)

import CategoryBadge from "./CategoryBadge";

// Props interface — defines what data this component expects
// Like a C# method signature — caller must pass these in
interface ActivityCardProps {
  id: string;
  title: string;
  category: "Numbers" | "Colors" | "Shapes" | "Letters" | "Stories";
  emoji: string;
  durationMinutes: number;
  completed: boolean;
  onToggle: (id: string) => void; // function prop — parent passes the handler
}

// Color map — each category gets its own background color
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

// ActivityCard component — takes props, renders a single activity card
// This is now reusable — any page can render this card by passing props
export default function ActivityCard({
  id,
  title,
  category,
  emoji,
  durationMinutes,
  completed,
  onToggle,
}: ActivityCardProps) {
  return (
    <div
      onClick={() => onToggle(id)}
      className={`p-4 rounded-xl cursor-pointer transition-opacity ${getCategoryColor(category)} ${
        completed ? "opacity-60" : "opacity-100"
      }`}
    >
      <span className="text-4xl">{emoji}</span>
      <h2 className="text-xl font-semibold mt-2">{title}</h2>
      <div className="mt-2 flex items-center gap-2">
        {/* Using CategoryBadge — a Server Component inside a Client Component */}
        <CategoryBadge category={category} />
        <span className="text-sm text-gray-500">{durationMinutes} min</span>
      </div>
      <p className="mt-2">{completed ? "✅ Done" : "⬜ Not started"}</p>
    </div>
  );
}
