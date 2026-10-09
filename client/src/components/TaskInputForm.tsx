import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { useTask } from '../context/TaskContext';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface Note {
  task: string,
  priority: 'high' | 'medium' | 'low',
  category: 'Work' | 'Personal' | 'Other',
  completed: boolean
}

export const TaskInputForm: React.FC = () => {
  const queryClient = useQueryClient()
  const { addNote } = useTask()

  const [note, setNote] = useState<Note>({
    task: '',
    priority: 'low',
    category: 'Personal',
    completed: false
  })

  const { mutateAsync: addNoteMutation } = useMutation({
    mutationFn: addNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] })
    }
  })

  return (
    <div className="bg-gray-50/80 rounded-2xl p-4 md:p-5 border border-gray-200/80 shadow-sm mb-6">
      <div className="flex flex-col md:flex-row gap-3 mb-4">
        <input
          type="text"
          value={note.task}
          onChange={(e) => setNote({ ...note, task: e.target.value })}
          placeholder="Add a new task..."
          className="flex-grow bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-gray-700 focus:outline-none placeholder-gray-400 text-sm"
        />
        <button
          type="button"
          onClick={async () => {
            try {
              await addNoteMutation(note)
              setNote({ ...note, task: '', priority: "low" })
            } catch (error) {
              console.error(error)
            }
          }}
          className="bg-gray-600 text-white font-medium px-5 py-2.5 rounded-xl flex items-center justify-center gap-1.5 text-sm shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>Add</span>
        </button>
      </div>

      <div className="flex flex-wrap items-center gap-4 text-sm font-medium text-gray-700">
        <div className="flex items-center gap-2">
          <span className="text-gray-800 font-semibold">Category</span>
          <select
            defaultValue="Personal"
            onChange={(e) => setNote({ ...note, category: e.target.value })}
            className="bg-white border border-gray-200 rounded-xl px-3 py-1.5 text-gray-700 text-sm focus:outline-none cursor-default"
            required
          >
            <option value="Personal">Personal</option>
            <option value="Work">Work</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-gray-800 font-semibold">Priority</span>
          <select
            defaultValue="Medium"
            onChange={(e) => setNote({ ...note, priority: e.target.value.toLowerCase() })}
            className="bg-white border border-gray-200 rounded-xl px-3 py-1.5 text-gray-700 text-sm focus:outline-none cursor-default"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
      </div>
    </div>
  );
};