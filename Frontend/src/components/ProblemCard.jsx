export default function ProblemCard({ problem }) {
  return (
    <div className="w-full max-w-4xl mx-auto mb-8 px-4">
      <div className="flex justify-end w-full">
        <div className="bg-gray-100 dark:bg-[#27272A] text-gray-800 dark:text-gray-100 px-5 py-3 rounded-3xl rounded-tr-sm max-w-[85%] text-base leading-relaxed whitespace-pre-wrap font-normal">
          {problem}
        </div>
      </div>
    </div>
  );
}
