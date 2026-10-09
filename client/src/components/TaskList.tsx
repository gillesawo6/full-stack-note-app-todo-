/* eslint-disable react-hooks/exhaustive-deps */
import { useTask } from '../context/TaskContext';
import { Pencil, X, Check, CheckCircle } from 'lucide-react';
import { TaskItemSkeleton, TaskLoadingState } from './TaskLoadingState';
import { useState } from 'react';
import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useSearch } from '@/context/searchContext';

interface TaskItemProps {
  id: string
  title: string;
  category: string;
  priority: 'high' | 'medium' | 'low';
  completed: boolean;
}

const TaskItem: React.FC<TaskItemProps> = ({ id, title, category, priority, completed }) => {
  const priorityStyles = {
    high: 'bg-red-100/80 text-red-500 border-red-200',
    medium: 'bg-amber-100/80 text-amber-600 border-amber-200',
    low: 'bg-emerald-100/80 text-emerald-600 border-emerald-200',
  };

  const queryClient = useQueryClient()

  const [completedState, setCompleted] = useState(completed)
  const [toggleEdit, setToggleEdit] = useState(false)
  const [inputTitle, setTitle] = useState(title)
  const { deleteNote, updateNote } = useTask()

  const { mutateAsync: deleteNoteMutation, isPending: deletePending } = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] })
    }
  })

  const { mutateAsync: updateNoteMutation, isPending: updatePending } = useMutation({
    mutationFn: updateNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] })
    }
  })

  return (
    <div className="bg-white rounded-2xl border border-gray-200/80 p-4 mb-3 shadow-sm flex items-center justify-between gap-3">
      {
        !toggleEdit && (
          <>
            <div className="flex items-start gap-3.5 flex-grow min-w-0">
              <div
                onClick={async () => {
                  try {
                    await updateNoteMutation({ id: id, task: title, completed: !completedState })
                    setCompleted(!completedState)
                  } catch (error) {
                    console.error(error)
                  }
                }}
                className={`mt-0.5 flex-shrink-0 w-5 h-5 rounded border cursor-pointer flex items-center justify-center ${completedState
                  ? 'bg-gray-600 border-gray-600 text-white'
                  : 'border-gray-300 bg-white'
                  }`}
              >
                {completedState && <Check className="w-3.5 h-3.5 stroke-[3]" />}
              </div>

              <div className="min-w-0 flex-1">
                <h3
                  className={`text-base font-normal tracking-tight break-words ${completedState ? 'line-through text-gray-400' : 'text-gray-800'
                    }`}
                >
                  {title}
                </h3>

                <div className="flex items-center gap-2 mt-2">
                  <span className="bg-gray-100 text-gray-600 text-xs px-2.5 py-0.5 rounded-md font-medium border border-gray-200/50">
                    {category}
                  </span>
                  <span className={`text-xs px-2.5 py-0.5 rounded-md font-medium lowercase ${priorityStyles[priority.toLowerCase() as keyof typeof priorityStyles]}`}>
                    {priority}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 flex-shrink-0">
              <button onClick={() => setToggleEdit(!toggleEdit)} type="button" className="p-1.5 text-gray-500 rounded-lg" aria-label="Edit">
                <Pencil className="w-4 h-4" />
              </button>
              <button type="button" onClick={async () => {
                try {
                  await deleteNoteMutation(id)
                } catch (error) {
                  console.error(error)
                }
              }} className="p-1.5 text-red-500 rounded-lg" aria-label="Delete">
                <X className="w-4 h-4" />
              </button>
            </div>
          </>
        )
      }
      {toggleEdit && (
        <>
          <input
            type="text"
            value={inputTitle}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Add a new task..."
            className="flex-grow bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-gray-700 focus:outline-none placeholder-gray-400 text-sm"
          />
          <div className="flex items-center gap-2 flex-shrink-0">
            <button type="button" onClick={async () => {
              try {
                await updateNoteMutation({ id, task: inputTitle, completed: completedState })
                setToggleEdit(!toggleEdit)
              } catch (error) {
                console.error(error)
              }
            }} className="p-1.5 text-green-500 rounded-lg" aria-label="Delete">
              <CheckCircle className="w-4 h-4" />
            </button>
            <button type="button" onClick={() => setToggleEdit(!toggleEdit)} className="p-1.5 text-red-500 rounded-lg" aria-label="Delete">
              <X className="w-4 h-4" />
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export const TaskList: React.FC = () => {
  const { getNotes } = useTask()
  const { debounced, category, setCategory } = useSearch()

  console.log(category)

  const { data: notes, isLoading } = useQuery({
    queryKey: ["notes"],
    queryFn: getNotes,
    select: (data) => {
      if (category === "All Categories" && !debounced) {
        return data
      }

      if (category !== "All Categories" && !debounced) {
        return data?.filter((note) => note.category.includes(category))
      }

      if (category !== "All Categories" && debounced) {
        setCategory("All Categories")
        return data?.filter((note) => note.task.toLocaleLowerCase().includes(debounced.toLocaleLowerCase()))
      }
      return data?.filter((note) => note.task.toLocaleLowerCase().includes(debounced.toLocaleLowerCase()))
    }, placeholderData: keepPreviousData
  })

  if (isLoading) {
    return <TaskLoadingState />
  }

  if (notes?.length === 0) {
    return (
      <div className='py-3 text-center capitalize bg-[#F4F5F8] rounded-lg font-semibold text-sm'>no note found</div>
    )
  }

  return (
    <div className="mb-6">

      {
        notes?.map((note, index) => (
          <TaskItem
            key={index}
            id={note._id}
            title={note.task}
            category={note.category}
            priority={note.priority}
            completed={note.completed}
          />
        ))
      }
    </div>
  );
};