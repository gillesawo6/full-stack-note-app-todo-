import { useQuery } from "@tanstack/react-query";
import { Note, useTask } from "../context/TaskContext";

type progressData = {
  total: number,
  completed: number,
  percent: number
}

export const ProgressBar: React.FC = () => {
  const { getNotes } = useTask()

  const { data: progress, isLoading, } = useQuery({
    queryFn: () => getNotes(),
    queryKey: ["notes"],
    select: (notes) => {
      const total = notes?.length
      const completed = notes?.filter(n => n.completed).length

      return {
        percent: total ? Math.round((completed / total) * 100) : 0
      }
    }
  })

  return (
    <div className="bg-white rounded-2xl border border-gray-200/80 p-5 shadow-sm">
      <div className="flex items-center justify-between text-sm font-semibold text-gray-800 mb-2.5">
        <span>Progress</span>
        <span>{isLoading ? 0 : progress?.percent}%</span>
      </div>
      <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
        <div
          className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2.5 rounded-full duration-300 transition-all"
          style={{ width: `${isLoading ? 0 : progress?.percent}%` }}
        />
      </div>
    </div>
  );
};