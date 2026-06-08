import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { ActivitiesProvider } from "./context/ActivitiesContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

// Metadata — Next.js puts this in the <head> tag automatically
export const metadata: Metadata = {
  title: "Learning Planner 🌟",
  description: "A weekly learning planner for kids",
};

// RootLayout wraps every page — like a master layout in ASP.NET
// children = whatever page.tsx renders
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} h-full`}>
      <body className="min-h-full flex flex-col bg-gray-50">

        {/* Navigation bar — appears on every page */}
        <nav className="bg-white shadow-sm px-8 py-4 flex items-center gap-8">
          <h1 className="text-xl font-bold text-purple-600">🌟 Learning Planner</h1>

          {/* Link is Next.js's version of <a> — handles client-side navigation */}
          <Link
            href="/"
            className="text-gray-600 hover:text-purple-600 font-medium"
          >
            Weekly Plan
          </Link>
          <Link
            href="/activities"
            className="text-gray-600 hover:text-purple-600 font-medium"
          >
            Activities
          </Link>
        </nav>

        {/* Page content renders here */}
        {/* ActivitiesProvider wraps all pages — any page can now access shared activities state */}
        <main className="flex-1 p-8">
          <ActivitiesProvider>
            {children}
          </ActivitiesProvider>
        </main>

      </body>
    </html>
  );
}
