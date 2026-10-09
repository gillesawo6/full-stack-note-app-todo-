import { useTask } from '@/context/TaskContext';
import { useQuery } from '@tanstack/react-query';
import React from 'react';

export const Header: React.FC = () => {
  const { getNotes } = useTask()

  const { data: progress, isLoading, } = useQuery({
    queryFn: () => getNotes(),
    queryKey: ["notes"],
    select: (notes) => {
      const total = notes?.length
      const completed = notes?.filter(n => n.completed).length

      return {
        total,
        completed
      }
    }
  })

  return (
    <div className="text-center mb-8">
      <h1 className="text-4xl font-extrabold text-indigo-600 tracking-tight mb-1">
        My Todo App
      </h1>
      <p className="text-gray-500 font-medium mb-2">
        Stay organized and productive
      </p>
      <div className="text-gray-500 text-sm font-medium flex items-center justify-center gap-2">
        <span>{progress?.completed} completed</span>
        <span>•</span>
        <span>{progress?.total} total tasks</span>
      </div>
    </div>
  );
};