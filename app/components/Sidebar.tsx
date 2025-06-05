// components/Sidebar.tsx
"use client";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Book, FlaskConical, Calculator } from "lucide-react";

type SidebarProps = {
  onSelectSubject: (subject: string) => void;
};

const iconMap: Record<string, React.ReactElement> = {
  Physics: <Book className="h-4 w-4 mr-2" />,
  Chemistry: <FlaskConical className="h-4 w-4 mr-2 text-green-500" />,
  Mathematics: <Calculator className="h-4 w-4 mr-2 text-blue-500" />,
};

export default function Sidebar({ onSelectSubject }: SidebarProps) {
  const dispatch = useDispatch();
  const subject = useSelector((state: any) => state.filters.subject);
  const [active, setActive] = useState("Physics");

  const subjects = ["Physics", "Chemistry", "Mathematics"];

  return (
    <aside className="p-4 w-full sm:w-70 border-r border-border dark:border-gray-700 min-h-screen">
      <div className="mb-6">
        <h1 className="text-lg font-extrabold text-foreground text-center">
          JEE Main
        </h1>
        <p className="text-muted-foreground text-sm">
          2009 - 2025 | 173 Papers | 15825 Qs
        </p>
      </div>

      <nav className="space-y-2">
        {subjects.map((subj) => (
          <button
            key={subj}
            onClick={() => {
              setActive(subj);
              onSelectSubject(subj);
              dispatch({ type: "filters/setSubject", payload: subj });
            }}
            className={`mb-4 flex items-center px-3 py-2 rounded-lg w-full text-left transition-colors duration-200
              ${
                active === subj
                  ? "bg-[rgba(29,41,51,1)] text-white"
                  : "hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
          >
            {iconMap[subj]}
            {subj} PYQs
          </button>
        ))}
      </nav>
    </aside>
  );
}
