import React, { useState } from 'react';
import { ExamConfig, Question, ExamResult } from './types';
import Sidebar from './components/Sidebar';
import QuestionCard from './components/QuestionCard';
import ResultsView from './components/ResultsView';
import { generateExamQuestions } from './services/geminiService';
import { Check, ArrowRight, Sparkles } from 'lucide-react';

const App: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [examResult, setExamResult] = useState<ExamResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [currentConfig, setCurrentConfig] = useState<ExamConfig | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async (config: ExamConfig) => {
    setLoading(true);
    setError(null);
    setExamResult(null);
    setAnswers({});
    try {
      const generatedQuestions = await generateExamQuestions(config);
      setQuestions(generatedQuestions);
      setCurrentConfig(config);
    } catch (err: any) {
      setError(err.message || "문제 생성 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerSelect = (questionId: string, answer: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const handleSubmitExam = () => {
    let score = 0;
    questions.forEach(q => {
      if (answers[q.id] === q.correctAnswer) {
        score += 1;
      }
    });
    setExamResult({
      score,
      userAnswers: answers,
      questions
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50 font-sans">
      {/* Sidebar - Hidden when printing */}
      <Sidebar onGenerate={handleGenerate} isGenerating={loading} />

      {/* Main Content */}
      <main className="flex-1 h-screen overflow-y-auto w-full print:h-auto print:overflow-visible">
        <div className="max-w-5xl mx-auto p-4 md:p-8 md:pt-12">
          
          {/* Empty State / Welcome Message */}
          {!questions.length && !loading && !error && (
            <div className="flex flex-col items-center justify-center h-[80vh] text-center text-gray-500 fade-in">
              <div className="bg-white p-10 rounded-3xl shadow-sm border border-gray-100 max-w-lg">
                <div className="bg-blue-50 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 text-blue-600">
                  <Sparkles size={32} />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3">맞춤형 학습지 만들기</h3>
                <p className="leading-relaxed text-gray-600">
                  왼쪽 메뉴에서 <strong>학년, 과목, 단원</strong>을 선택하고<br/>
                  <span className="text-blue-600 font-semibold">'문제 만들기'</span> 버튼을 눌러주세요.<br/>
                  AI 선생님이 10초 만에 문제를 만들어드립니다.
                </p>
              </div>
            </div>
          )}

          {/* Loading State */}
          {loading && (
            <div className="flex flex-col items-center justify-center h-[80vh] text-center">
              <div className="relative w-24 h-24 mb-6">
                 <div className="absolute top-0 left-0 w-full h-full border-4 border-blue-200 rounded-full animate-ping"></div>
                 <div className="absolute top-0 left-0 w-full h-full border-4 border-t-blue-600 rounded-full animate-spin"></div>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">AI 선생님이 문제를 만들고 있어요</h3>
              <p className="text-gray-500">학생들의 실수 패턴을 분석하여 맞춤형 문제를 생성합니다.</p>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="max-w-md mx-auto mt-20 p-6 bg-red-50 border border-red-200 rounded-xl text-center">
              <p className="text-red-600 font-bold mb-2">오류가 발생했습니다</p>
              <p className="text-sm text-red-500 mb-4">{error}</p>
              <button 
                onClick={() => setError(null)}
                className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                다시 시도하기
              </button>
            </div>
          )}

          {/* Exam Mode */}
          {questions.length > 0 && !examResult && (
            <div className="animate-fade-in-up">
              <div className="flex justify-between items-end mb-8 border-b pb-4 print:hidden">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    {currentConfig?.grade}학년 {currentConfig?.semester}학기 {currentConfig?.subject}
                  </h1>
                  <p className="text-gray-500 mt-1">{currentConfig?.unit} 단원평가</p>
                </div>
                <div className="text-right">
                  <p className="font-mono text-blue-600 font-bold">
                    {Object.keys(answers).length} / {questions.length} 풀이 중
                  </p>
                </div>
              </div>

              {/* Print Header (Visible only in print) */}
              <div className="hidden print:block mb-8 border-b-2 border-black pb-4">
                <h1 className="text-3xl font-bold text-center mb-2">단원 평가</h1>
                <div className="flex justify-between text-lg">
                  <span>{currentConfig?.grade}학년 {currentConfig?.subject}</span>
                  <span>이름: ____________</span>
                </div>
              </div>

              {questions.map((q, idx) => (
                <QuestionCard 
                  key={q.id}
                  question={q}
                  index={idx}
                  selectedAnswer={answers[q.id]}
                  onSelectAnswer={(ans) => handleAnswerSelect(q.id, ans)}
                />
              ))}

              <div className="sticky bottom-6 z-10 print:hidden">
                <button
                  onClick={handleSubmitExam}
                  disabled={Object.keys(answers).length < questions.length}
                  className={`w-full max-w-md mx-auto block py-4 rounded-full font-bold text-lg shadow-xl transition-all transform hover:-translate-y-1 ${
                    Object.keys(answers).length < questions.length
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-2xl'
                  }`}
                >
                  <span className="flex items-center justify-center gap-2">
                    {Object.keys(answers).length < questions.length ? (
                      `모든 문제를 풀어주세요 (${Object.keys(answers).length}/${questions.length})`
                    ) : (
                      <>채점하기 <ArrowRight /></>
                    )}
                  </span>
                </button>
              </div>
            </div>
          )}

          {/* Results Mode */}
          {examResult && (
            <div className="animate-fade-in">
              <ResultsView 
                result={examResult} 
                onReset={() => {
                  setQuestions([]);
                  setExamResult(null);
                  setAnswers({});
                  setCurrentConfig(null);
                }} 
              />
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default App;