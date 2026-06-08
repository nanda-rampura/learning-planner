// Shared types — imported by any file that needs them
// This is a .ts file (not .tsx) because it has no JSX

export type Category = "Numbers" | "Colors" | "Shapes" | "Letters" | "Stories";

export interface Activity {
  id: string;
  title: string;
  category: Category;
  emoji: string;
  durationMinutes: number;
  completed: boolean;
}

export const CATEGORY_EMOJIS: Record<Category, string> = {
  Numbers: "🔢",
  Colors: "🎨",
  Shapes: "⭕",
  Letters: "🔤",
  Stories: "📖",
};

export const SAMPLE_ACTIVITIES: Activity[] = [
  { id: "1", title: "Count to 10", category: "Numbers", emoji: "🔢", durationMinutes: 15, completed: false },
  { id: "2", title: "Draw a Circle", category: "Shapes", emoji: "⭕", durationMinutes: 10, completed: false },
  { id: "3", title: "Learn letter A", category: "Letters", emoji: "🔤", durationMinutes: 20, completed: false },
  { id: "4", title: "Name 5 colors", category: "Colors", emoji: "🎨", durationMinutes: 10, completed: false },
  { id: "5", title: "Bedtime story", category: "Stories", emoji: "📖", durationMinutes: 20, completed: false },
];
