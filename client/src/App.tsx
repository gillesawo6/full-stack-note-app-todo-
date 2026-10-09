import React from 'react';
import { Header } from './components/Header';
import { TaskInputForm } from './components/TaskInputForm';
import { TaskFilter } from './components/TaskFilter';
import { TaskList } from './components/TaskList';
import { ProgressBar } from './components/ProgressBar';
import {useQuery} from '@tanstack/react-query'

export default function App() {
  return (
    <div className="min-h-screen bg-slate-50/50 py-10 px-4 sm:px-6 flex justify-center font-sans">
      <div className="w-full max-w-2xl">
        <Header />
        <TaskInputForm />
        <TaskFilter />

        {/* Loaded View Example */}
        <div className="mb-8">
          <TaskList />
        </div>

        <ProgressBar />
      </div>
    </div>
  );
}