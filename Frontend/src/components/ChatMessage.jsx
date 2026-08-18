import ProblemCard from './ProblemCard';
import SolutionCard from './SolutionCard';
import JudgeCard from './JudgeCard';

export default function ChatMessage({ message }) {
  const { problem, solution_1, solution_2, judge } = message;
  
  const isSol1Winner = judge && judge.solution_1_score >= judge.solution_2_score;
  const isSol2Winner = judge && judge.solution_2_score >= judge.solution_1_score;

  return (
    <div className="py-8 px-4 md:px-8">
      <ProblemCard problem={problem} />
      
      {(solution_1 || solution_2) && (
        <div className="w-full max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch px-4">
          {solution_1 && (
            <SolutionCard 
              title="Solution 1" 
              solution={solution_1} 
              score={judge?.solution_1_score}
              isWinner={judge && isSol1Winner}
            />
          )}
          
          {solution_2 && (
            <SolutionCard 
              title="Solution 2" 
              solution={solution_2} 
              score={judge?.solution_2_score}
              isWinner={judge && isSol2Winner}
            />
          )}
        </div>
      )}
      
      {judge && (
        <div className="px-4">
          <JudgeCard judge={judge} />
        </div>
      )}
    </div>
  );
}
