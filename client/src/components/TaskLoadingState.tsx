import { Loader2 } from 'lucide-react';

export const TaskItemSkeleton: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl border border-gray-200/80 p-4 mb-3 shadow-sm flex items-center justify-between gap-3 animate-pulse">
      <div className="flex items-start gap-3.5 flex-grow min-w-0">
        {/* Checkbox Placeholder */}
        <div className="mt-0.5 flex-shrink-0 w-5 h-5 rounded bg-gray-200" />

        <div className="min-w-0 flex-1 space-y-3">
          {/* Title Placeholder */}
          <div className="h-4 bg-gray-200 rounded-md w-3/4" />

          {/* Category & Priority Badge Placeholders */}
          <div className="flex items-center gap-2">
            <div className="h-5 w-16 bg-gray-200 rounded-md" />
            <div className="h-5 w-14 bg-gray-200 rounded-md" />
          </div>
        </div>
      </div>

      {/* Action Button Placeholders */}
      <div className="flex items-center gap-2 flex-shrink-0">
        <div className="w-7 h-7 bg-gray-200 rounded-lg" />
        <div className="w-7 h-7 bg-gray-200 rounded-lg" />
      </div>
    </div>
  );
};

export const TaskLoadingState: React.FC = () => {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-center gap-2 py-2 text-indigo-600 text-sm font-medium animate-pulse">
        <Loader2 className="w-4 h-4 animate-spin" />
        <span>Loading tasks...</span>
      </div>
      <TaskItemSkeleton />
      <TaskItemSkeleton />
      <TaskItemSkeleton />
    </div>
  );
};