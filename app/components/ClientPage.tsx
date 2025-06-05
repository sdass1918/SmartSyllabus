"use client";

import ChapterList from "./Chapterlist";
import FilterBar from "./Filterbar";
import Sidebar from "./Sidebar";
import DarkModeToggle from "./DarkModeToggle";
import { useSelector } from "react-redux";

export default function clientPage() {
  const subject = useSelector((state: any) => state.filters.subject);
  const filteredLength = useSelector(
    (state: any) => state.filters.filteredLength
  );
  return (
    <main className="min-h-screen flex flex-col sm:flex-row bg-white dark:bg-black text-black dark:text-white">
      {/* Sidebar for Subject Tabs */}
      <Sidebar
        onSelectSubject={(subject: string) => console.log("Selected:", subject)}
      />

      {/* Main Content */}
      <div className="flex-1 p-4 space-y-4">
        {/* Header with title and dark mode toggle */}
        <div className="fixed bottom-0 left-0 z-50">
          <DarkModeToggle />
        </div>
        <h2 className="text-2xl font-bold text-center">{subject} PYQs</h2>
        <p className="text-center text-gray-400">
          Chapter wise collection of {subject} PYQs
        </p>

        {/* Filters */}
        <FilterBar />
        <div>
          <p>Showing all chapters ({filteredLength})</p>
        </div>
        {/* Chapter List */}
        <ChapterList />
      </div>
    </main>
  );
}
