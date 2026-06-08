// No "use client" — this is a Server Component
// It has no interactivity, no hooks — just takes props and renders

type Category = "Numbers" | "Colors" | "Shapes" | "Letters" | "Stories";

interface CategoryBadgeProps {
  category: Category;
}

const categoryStyles: Record<Category, { bg: string; text: string; emoji: string }> = {
  Numbers: { bg: "bg-blue-100", text: "text-blue-700", emoji: "🔢" },
  Colors:  { bg: "bg-pink-100", text: "text-pink-700", emoji: "🎨" },
  Shapes:  { bg: "bg-yellow-100", text: "text-yellow-700", emoji: "⭕" },
  Letters: { bg: "bg-green-100", text: "text-green-700", emoji: "🔤" },
  Stories: { bg: "bg-purple-100", text: "text-purple-700", emoji: "📖" },
};

export default function CategoryBadge({ category }: CategoryBadgeProps) {
  const style = categoryStyles[category];
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${style.bg} ${style.text}`}>
      {style.emoji} {category}
    </span>
  );
}
