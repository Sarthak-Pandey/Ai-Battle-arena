import { Sparkles, Star } from 'lucide-react';

export default function SolutionCard({ title, solution, score, reasoning, isWinner }) {
  return (
    <div className={`flex flex-col bg-white dark:bg-[#18181B] rounded-2xl ${isWinner ? 'ring-2 ring-blue-500/30 dark:ring-blue-500/40 shadow-md shadow-blue-500/5' : 'border border-gray-200 dark:border-[#27272A]'} overflow-hidden h-full`}>
      <div className={`px-5 py-4 flex justify-between items-center ${isWinner ? 'bg-blue-50/40 dark:bg-blue-900/10' : 'bg-transparent'}`}>
        <div className="flex items-center gap-2.5">
          <div className={`w-6 h-6 rounded-md flex items-center justify-center ${isWinner ? 'bg-blue-600 text-white shadow-sm' : 'bg-gray-100 dark:bg-[#27272A] text-gray-700 dark:text-gray-300'}`}>
            <Sparkles size={14} />
          </div>
          <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-sm tracking-tight">{title}</h3>
        </div>
        {score && (
          <div className="flex items-center gap-1.5 px-2.5 py-1 bg-white dark:bg-[#27272A] border border-gray-200 dark:border-[#3F3F46] rounded-lg shadow-sm">
            <Star size={13} className={score >= 8 ? "text-amber-500 fill-amber-500" : "text-gray-400 dark:text-gray-500"} />
            <span className="font-bold text-sm text-gray-800 dark:text-gray-200">{score.toFixed(1)}</span>
            <span className="text-xs text-gray-400 dark:text-gray-500 font-medium">/ 10</span>
          </div>
        )}
      </div>
      
      <div className="px-5 pb-5 pt-2 flex-1 prose-custom overflow-auto text-[15px] text-gray-700 dark:text-gray-300">
        {solution.split('\n\n').map((paragraph, idx) => (
          <p key={idx}>{paragraph}</p>
        ))}
      </div>
      
      {reasoning && (
        <div className="px-5 py-4 bg-gray-50 dark:bg-[#27272A]/50 border-t border-gray-100 dark:border-[#27272A]">
          <div className="text-[11px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
            Judge Notes
          </div>
          <div className="text-[13px] text-gray-600 dark:text-gray-400 leading-relaxed">
            {reasoning}
          </div>
        </div>
      )}
    </div>
  );
}
