import ProblemCard from './ProblemCard';
import { Loader2, Scale } from 'lucide-react';

export default function LoadingState({ problem, phase }) {
  return (
    <div className="py-8 px-4 md:px-8">
      <ProblemCard problem={problem} />
      
      {phase === 'generating' && (
        <div className="w-full max-w-4xl mx-auto px-4">
          <div className="flex items-center justify-center gap-2 mb-6 text-gray-500 dark:text-gray-400 font-medium text-[13px]">
            <Loader2 size={14} className="animate-spin" />
            Generating dual solutions...
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-50 dark:bg-[#18181B] rounded-2xl border border-gray-100 dark:border-[#27272A] p-5">
              <div className="h-3 bg-gray-200 dark:bg-[#27272A] rounded w-1/4 mb-5 animate-pulse"></div>
              <div className="space-y-3">
                <div className="h-2 bg-gray-200 dark:bg-[#27272A] rounded w-full animate-pulse"></div>
                <div className="h-2 bg-gray-200 dark:bg-[#27272A] rounded w-5/6 animate-pulse"></div>
                <div className="h-2 bg-gray-200 dark:bg-[#27272A] rounded w-4/6 animate-pulse"></div>
              </div>
            </div>
            <div className="bg-gray-50 dark:bg-[#18181B] rounded-2xl border border-gray-100 dark:border-[#27272A] p-5">
              <div className="h-3 bg-gray-200 dark:bg-[#27272A] rounded w-1/4 mb-5 animate-pulse"></div>
              <div className="space-y-3">
                <div className="h-2 bg-gray-200 dark:bg-[#27272A] rounded w-full animate-pulse"></div>
                <div className="h-2 bg-gray-200 dark:bg-[#27272A] rounded w-5/6 animate-pulse"></div>
                <div className="h-2 bg-gray-200 dark:bg-[#27272A] rounded w-4/6 animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {phase === 'judging' && (
        <div className="w-full max-w-4xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 opacity-40 pointer-events-none grayscale">
            <div className="bg-gray-50 dark:bg-[#18181B] rounded-2xl border border-gray-100 dark:border-[#27272A] p-5">
               <div className="h-3 bg-gray-200 dark:bg-[#27272A] rounded w-1/4 mb-5"></div>
               <div className="h-2 bg-gray-200 dark:bg-[#27272A] rounded w-full mb-3"></div>
               <div className="h-2 bg-gray-200 dark:bg-[#27272A] rounded w-5/6"></div>
            </div>
            <div className="bg-gray-50 dark:bg-[#18181B] rounded-2xl border border-gray-100 dark:border-[#27272A] p-5">
               <div className="h-3 bg-gray-200 dark:bg-[#27272A] rounded w-1/4 mb-5"></div>
               <div className="h-2 bg-gray-200 dark:bg-[#27272A] rounded w-full mb-3"></div>
               <div className="h-2 bg-gray-200 dark:bg-[#27272A] rounded w-5/6"></div>
            </div>
          </div>
          
          <div className="bg-blue-50/50 dark:bg-blue-900/10 rounded-2xl border border-blue-100/50 dark:border-blue-900/30 p-5 relative overflow-hidden flex items-center justify-center gap-3 text-blue-600 dark:text-blue-400">
            <Scale size={16} className="animate-pulse" />
            <span className="font-medium text-sm">AI Judge is evaluating solutions...</span>
          </div>
        </div>
      )}
    </div>
  );
}
