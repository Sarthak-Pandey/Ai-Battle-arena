import { ArrowRight } from 'lucide-react';

export default function EmptyState({ onExampleClick }) {
  const examples = [
    "Design a rate limiter for a distributed API.",
    "Explain how React's concurrent mode works.",
    "Write a SQL query to find the second highest salary.",
    "How do I optimize a Dockerfile for a Node.js app?"
  ];

  return (
    <div className="flex flex-col items-center justify-center h-full px-4 text-center max-w-2xl mx-auto py-12 md:py-32">
      <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 dark:text-gray-100 mb-4 tracking-tight">
        Compare AI solutions
      </h2>
      
      <p className="text-gray-500 dark:text-gray-400 text-[15px] mb-12 max-w-lg leading-relaxed">
        Send a problem and get two independent solutions. The AI Judge will determine which approach is stronger.
      </p>
      
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-3 px-4">
        {examples.map((example, i) => (
          <button
            key={i}
            onClick={() => onExampleClick(example)}
            className="flex items-center justify-between p-4 bg-gray-50 dark:bg-[#27272A] border border-gray-100 dark:border-[#3F3F46] rounded-2xl hover:bg-gray-100 dark:hover:bg-[#3F3F46] transition-all text-left group"
          >
            <span className="text-[13px] text-gray-700 dark:text-gray-300 font-medium">{example}</span>
            <ArrowRight size={14} className="text-gray-400 dark:text-gray-500 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors" />
          </button>
        ))}
      </div>
    </div>
  );
}
