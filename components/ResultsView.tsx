import React from 'react';
import { ExamResult } from '../types';
import QuestionCard from './QuestionCard';
import { RotateCcw, Printer, Award } from 'lucide-react';

interface ResultsViewProps {
  result: ExamResult;
  onReset: () => void;
}

const ResultsView: React.FC<ResultsViewProps> = ({ result, onReset }) => {
  const percentage = Math.round((result.score / result.questions.length) * 100);
  
  // Confetti effect could go here
  
  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      {/* Score Header */}
      <div className="bg-white rounded-3xl p-8 text-center shadow-lg border border-blue-100 mb-12 print:hidden">
        <div className="inline-block p-4 rounded-full bg-yellow-100 mb-4">
          <Award className="w-12 h-12 text-yellow-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">채점 결과</h2>
        <div className="text-6xl font-black text-blue-600 mb-2">
          {percentage}<span className="text-3xl text-gray-400">점</span>
        </div>
        <p className="text-gray-500">
          {result.questions.length}문제 중 {result.score}문제를 맞혔어요!
        </p>
        
        <div className="flex justify-center gap-4 mt-8">
          <button 
            onClick={onReset}
            className="flex items-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 font-bold transition-colors"
          >
            <RotateCcw size={18} />
            다시 만들기
          </button>
          <button 
            onClick={() => window.print()}
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 font-bold shadow-md transition-colors"
          >
            <Printer size={18} />
            결과 인쇄
          </button>
        </div>
      </div>

      {/* Review Notes Section */}
      <div className="print:w-full">
        <div className="flex items-center gap-3 mb-8 pb-4 border-b border-gray-200">
          <h3 className="text-2xl font-bold text-gray-800">풀이 확인</h3>
          <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-bold">
            전체 문제 해설
          </span>
        </div>

        {result.questions.map((q, idx) => {
          const userAnswer = result.userAnswers[q.id];
          
          return (
            <QuestionCard 
              key={q.id}
              question={q}
              index={idx}
              selectedAnswer={userAnswer}
              onSelectAnswer={() => {}}
              readOnly={true}
              showCorrectness={true}
            />
          );
        })}

        {result.score === result.questions.length && (
          <div className="text-center py-12 bg-blue-50 rounded-2xl border border-blue-100 mb-8">
            <p className="text-xl font-bold text-blue-800 mb-2">완벽해요! 🎉</p>
            <p className="text-blue-600">모든 문제를 맞혔습니다. 참 잘했어요!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResultsView;