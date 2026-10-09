import React, { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import { useTask } from '../context/TaskContext';
import { useDebouncedValue } from '@/hooks/useDebouncedValue';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useSearch } from '../context/searchContext';

export const TaskFilter: React.FC = () => {
  const { input, setInput, category, setCategory } = useSearch()

  return (
    <div className="flex flex-col sm:flex-row items-center gap-3 mb-6">
      <div className="relative w-full sm:flex-1">
        <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search tasks..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full bg-gray-100/80 border border-transparent rounded-xl pl-10 pr-4 py-2.5 text-sm text-gray-700 focus:outline-none placeholder-gray-400"
        />
      </div>

      <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
        <Filter className="w-4 h-4 text-gray-500" />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-medium text-gray-700 focus:outline-none cursor-default"
        >
          <option value="All Categories">All Categories</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
        </select>
      </div>
    </div>
  );
};