// Chapterlist.tsx
"use client";
import React from "react";
import { RootState } from "../store/store";
import { useDispatch, useSelector } from "react-redux";
import chaptersData from "../data/mockChapters.json";
import { getRandomIcon } from "../lib/getIcons";
import { setFilteredLength } from "../store/filtersSlice";

interface Chapter {
  subject: string;
  chapter: string;
  class: string;
  unit: string;
  yearWiseQuestionCount: { [year: string]: number };
  questionSolved: number;
  status: string;
  isWeakChapter: boolean;
}

const chapters: Chapter[] = chaptersData;

export default function ChapterList() {
  const dispatch = useDispatch();
  const { subject, filters } = useSelector((state: RootState) => state.filters);
  const {
    weakOnly,
    status,
    class: selectedClasses,
    units: selectedUnits,
  } = filters as typeof filters & {
    class: string[];
    units: string[];
  };

  const filteredChapters = chapters.filter((chapter) => {
    const matchesSubject = chapter.subject === subject;
    const matchesWeak = !weakOnly || chapter.isWeakChapter;
    const matchesStatus = !status || chapter.status === status;
    const matchesClass =
      selectedClasses.length === 0 || selectedClasses.includes(chapter.class);
    const matchesUnit =
      selectedUnits.length === 0 || selectedUnits.includes(chapter.unit);

    return (
      matchesSubject &&
      matchesWeak &&
      matchesStatus &&
      matchesClass &&
      matchesUnit
    );
  });

  React.useEffect(() => {
    dispatch(setFilteredLength(filteredChapters.length));
  }, [dispatch, filteredChapters.length]);

  return (
    <div className="flex flex-col gap-4">
      {filteredChapters.map((chapter, index) => {
        const totalQuestions = Object.values(
          chapter.yearWiseQuestionCount
        ).reduce((sum, count) => sum + count, 0);

        const progressPercent =
          totalQuestions === 0
            ? 0
            : Math.round((chapter.questionSolved / totalQuestions) * 100);
        const years = Object.keys(chapter.yearWiseQuestionCount);
        const lastYear = years[years.length - 1];
        const prevYear = years[years.length - 2];

        const lastCount = chapter.yearWiseQuestionCount[lastYear] || 0;
        const prevCount = chapter.yearWiseQuestionCount[prevYear] || 0;

        const trend =
          lastCount > prevCount
            ? "up"
            : lastCount < prevCount
            ? "down"
            : "same";

        return (
          <div
            key={index}
            className="flex justify-between items-center p-4 rounded-lg border dark:border-gray-700 shadow-sm"
          >
            <div className="flex items-center gap-4">
              <div className="text-blue-500">
                {getRandomIcon(chapter.chapter)}
              </div>
              <div>
                <div className="text-lg font-semibold">{chapter.chapter}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {chapter.unit} • {chapter.class}
                </div>
                <div className="text-xs text-gray-400">
                  {totalQuestions}+ Qs • {chapter.status}
                </div>
                {trend === "up" && <span className="text-green-500">↑</span>}
                {trend === "down" && <span className="text-red-500">↓</span>}
                {trend === "same" && <span className="text-gray-400">→</span>}
              </div>
            </div>

            <div className="text-right">
              <div className="text-sm font-medium text-gray-700 dark:text-gray-200">
                Solved: {chapter.questionSolved}/{totalQuestions}
              </div>
              <div className="w-32 h-2 bg-gray-200 dark:bg-gray-700 rounded-full mt-1">
                <div
                  className={`h-full rounded-full ${
                    progressPercent < 50
                      ? "bg-red-500"
                      : progressPercent < 100
                      ? "bg-yellow-500"
                      : "bg-green-500"
                  }`}
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
