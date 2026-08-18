import { Trophy, Scale, ChevronDown, CheckCircle2 } from 'lucide-react';

export default function JudgeCard({ judge }) {
  if (!judge) return null;

  const isSol1Winner = judge.solution_1_score >= judge.solution_2_score;
  const winnerTitle = isSol1Winner ? "Solution 1" : "Solution 2";
  const winnerScore = isSol1Winner ? judge.solution_1_score : judge.solution_2_score;
  const loserScore = isSol1Winner ? judge.solution_2_score : judge.solution_1_score;

  return (
    <div className="w-full max-w-4xl mx-auto mt-6 bg-blue-50/30 dark:bg-blue-900/10 rounded-2xl border border-blue-100/50 dark:border-blue-900/30 shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-blue-100/50 dark:border-blue-900/30 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center text-blue-600 dark:text-blue-400 shadow-sm">
            <Scale size={15} />
          </div>
          <div>
            <h3 className="font-semibold text-blue-900 dark:text-blue-100 text-sm tracking-tight">Judge Recommendation</h3>
            <p className="text-[11px] text-blue-500/80 dark:text-blue-400/80 font-medium">Evaluation complete</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 rounded-lg">
            <Trophy size={14} className="text-blue-600 dark:text-blue-400" />
            <span className="font-semibold text-[13px]">{winnerTitle} Wins</span>
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex flex-col md:flex-row gap-6 md:items-center mb-6">
          <div className="flex items-center gap-4 bg-white/50 dark:bg-black/20 p-3 rounded-xl border border-blue-50 dark:border-blue-900/20">
            <div className="text-center px-2">
              <div className={`text-xl font-bold ${isSol1Winner ? 'text-gray-900 dark:text-gray-100' : 'text-gray-400 dark:text-gray-600'}`}>
                {judge.solution_1_score.toFixed(1)}
              </div>
              <div className="text-[10px] text-gray-400 dark:text-gray-500 font-semibold uppercase tracking-wider mt-0.5">Sol 1</div>
            </div>
            <div className="text-gray-300 dark:text-gray-700 font-light text-xl">vs</div>
            <div className="text-center px-2">
              <div className={`text-xl font-bold ${!isSol1Winner ? 'text-gray-900 dark:text-gray-100' : 'text-gray-400 dark:text-gray-600'}`}>
                {judge.solution_2_score.toFixed(1)}
              </div>
              <div className="text-[10px] text-gray-400 dark:text-gray-500 font-semibold uppercase tracking-wider mt-0.5">Sol 2</div>
            </div>
          </div>
          
          <div className="hidden md:block w-px h-10 bg-blue-100 dark:bg-blue-900/30"></div>
          
          <div className="flex-1">
            <div className="flex items-start gap-2.5">
              <CheckCircle2 size={18} className="text-blue-500 mt-0.5 flex-shrink-0" />
              <p className="text-gray-800 dark:text-gray-200 font-medium text-[15px] leading-relaxed">
                {judge.recommendation}
              </p>
            </div>
          </div>
        </div>
        
        <details className="group outline-none">
          <summary className="flex items-center gap-2 cursor-pointer text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 select-none outline-none">
            <ChevronDown size={16} className="transition-transform group-open:-rotate-180" />
            Show Detailed Analysis
          </summary>
          <div className="mt-4 pt-4 border-t border-blue-100/50 dark:border-blue-900/30">
            <div className="grid md:grid-cols-2 gap-6 bg-white/50 dark:bg-black/20 p-4 rounded-xl border border-blue-50 dark:border-blue-900/20">
              <div>
                <h4 className="text-[11px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Solution 1 Breakdown</h4>
                <p className="text-[13px] text-gray-600 dark:text-gray-400 leading-relaxed">{judge.solution_1_reasoning}</p>
              </div>
              <div>
                <h4 className="text-[11px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Solution 2 Breakdown</h4>
                <p className="text-[13px] text-gray-600 dark:text-gray-400 leading-relaxed">{judge.solution_2_reasoning}</p>
              </div>
            </div>
          </div>
        </details>
      </div>
    </div>
  );
}
