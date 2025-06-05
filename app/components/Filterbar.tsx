// FilterBar.tsx
"use client";
import { Button } from "./ui/button";
import { RootState } from "../store/store";
import { useDispatch, useSelector } from "react-redux";
import {
  toggleWeak,
  setStatus,
  setClasses,
  setUnits,
} from "../store/filtersSlice";
import { useMemo, useState, useRef, useEffect } from "react";
import chaptersData from "../data/mockChapters.json";

export default function FilterBar() {
  const dispatch = useDispatch();
  const { subject, filters } = useSelector((state: RootState) => state.filters);
  const {
    weakOnly,
    status,
    class: selectedClasses,
    units: selectedUnits,
  } = filters;

  const filteredChapters = chaptersData.filter((c) => c.subject === subject);

  const uniqueClasses = useMemo(
    () => [...new Set(filteredChapters.map((c) => c.class))],
    [filteredChapters]
  );
  const uniqueUnits = useMemo(
    () => [...new Set(filteredChapters.map((c) => c.unit))],
    [filteredChapters]
  );

  const toggleMultiSelect = (
    value: string,
    selected: string[],
    setAction: (payload: string[]) => any // Accepts a function returning an action object
  ) => {
    const updated = selected.includes(value)
      ? selected.filter((v) => v !== value)
      : [...selected, value];
    dispatch(setAction(updated));
  };

  // State to control dropdown visibility
  const [classOpen, setClassOpen] = useState(false);
  const [unitOpen, setUnitOpen] = useState(false);

  // Close dropdown on outside click
  const classRef = useRef<HTMLDivElement>(null);
  const unitRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        classRef.current &&
        !classRef.current.contains(event.target as Node)
      ) {
        setClassOpen(false);
      }
      if (unitRef.current && !unitRef.current.contains(event.target as Node)) {
        setUnitOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex flex-wrap gap-4 items-start">
      {/* Class Dropdown */}
      <div className="relative" ref={classRef}>
        <Button
          onClick={() => setClassOpen((prev) => !prev)}
          variant="outline"
          className="min-w-[100px]"
        >
          Class
          <svg
            className={`w-4 h-4 transition-transform duration-200 ${
              classOpen ? "rotate-180" : "rotate-0"
            }`}
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </Button>
        {classOpen && (
          <div className="absolute z-10 mt-1 w-48 max-h-60 overflow-auto rounded-md border border-gray-300 bg-white shadow-lg dark:border-gray-600 dark:bg-gray-800">
            {uniqueClasses.map((cls) => (
              <button
                key={cls}
                className={`w-full text-left px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 ${
                  selectedClasses.includes(cls)
                    ? "bg-blue-100 dark:bg-blue-600 font-semibold"
                    : "dark:text-gray-300"
                }`}
                onClick={() =>
                  toggleMultiSelect(cls, selectedClasses, setClasses)
                }
              >
                {cls}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Units Dropdown */}
      <div className="relative" ref={unitRef}>
        <Button
          onClick={() => setUnitOpen((prev) => !prev)}
          variant="outline"
          className="min-w-[100px]"
        >
          Units
          <svg
            className={`w-4 h-4 transition-transform duration-200 ${
              unitOpen ? "rotate-180" : "rotate-0"
            }`}
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </Button>
        {unitOpen && (
          <div className="absolute z-10 mt-1 w-48 max-h-60 overflow-auto rounded-md border border-gray-300 bg-white shadow-lg dark:border-gray-600 dark:bg-gray-800">
            {uniqueUnits.map((unit) => (
              <button
                key={unit}
                className={`w-full text-left px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 ${
                  selectedUnits.includes(unit)
                    ? "bg-blue-100 dark:bg-blue-600 font-semibold"
                    : "dark:text-gray-300"
                }`}
                onClick={() => toggleMultiSelect(unit, selectedUnits, setUnits)}
              >
                {unit}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Status & Weak Toggles */}
      <Button
        variant={status === "Not Started" ? "default" : "outline"}
        onClick={() => dispatch(setStatus("Not Started"))}
      >
        Not Started
      </Button>
      <Button
        variant={weakOnly ? "default" : "outline"}
        onClick={() => dispatch(toggleWeak())}
      >
        Weak Chapters
      </Button>
    </div>
  );
}
