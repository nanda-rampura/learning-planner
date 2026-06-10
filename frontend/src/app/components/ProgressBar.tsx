"use client"; // must be a Client Component — re-renders when activities state changes

import { Category } from "../types";

interface ProgressBarProps {
  category: Category;
  completed: number;
  total: number;
}

const categoryColors: Record<Category, { bar: string; bg: string; text: string }> = {
  Numbers: { bar: "bg-blue-500",   bg: "bg-blue-100",   text: "text-blue-700" },
  Colors:  { bar: "bg-pink-500",   bg: "bg-pink-100",   text: "text-pink-700" },
  Shapes:  { bar: "bg-yellow-500", bg: "bg-yellow-100", text: "text-yellow-700" },
  Letters: { bar: "bg-green-500",  bg: "bg-green-100",  text: "text-green-700" },
  Stories: { bar: "bg-purple-500", bg: "bg-purple-100", text: "text-purple-700" },
};

export default function ProgressBar({ category, completed, total }: ProgressBarProps) {
  const pct = total > 0 ? Math.round((completed / total) * 100) : 0;
  const style = categoryColors[category];

  return (
    <div className="flex items-center gap-3">
      <span className={`text-sm font-semibold w-16 ${style.text}`}>{category}</span>

      <div className={`flex-1 h-4 rounded-full ${style.bg} overflow-hidden`}>
        <div
          className={`h-full rounded-full transition-all duration-500 ${style.bar}`}
          style={{ width: `${pct}%` }}
        />
      </div>

      <span className="text-sm text-gray-500 w-16 text-right">
        {total === 0 ? "none" : `${completed}/${total}`}
      </span>
    </div>
  );
}
