
import React, { useState, useEffect } from 'react';
import { Settings, Download, RefreshCw, CheckCircle, AlertCircle, Loader2, BookOpen, XCircle, Key, ExternalLink, Save, Volume2 } from 'lucide-react';
import { Subject, Difficulty, GeneratedExam } from '../types';
import { generateQuestionsAI, getStoredApiKey, saveStoredApiKey } from '../services/geminiService';
import { CURRICULUM_DATA } from '../constants';

const GeneratorPage: React.FC = () => {
  const [grade, setGrade] = useState('3학년');
  const [semester, setSemester] = useState('1학기'); // Added semester state
  const [subject, setSubject] = useState<string>(Subject.MATH);
  const [unit, setUnit] = useState('');
  const [difficulty, setDifficulty] = useState<string>(Difficulty.MEDIUM);
  
  // API Key State
  const [apiKey, setApiKey] = useState('');
  const [hasKey, setHasKey] = useState(false);
  const [showKeyInput, setShowKeyInput] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [examData, setExamData] = useState<GeneratedExam | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Available units based on current grade, semester and subject
  const [availableUnits, setAvailableUnits] = useState<string[]>([]);

  // Study Mode States
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  // Check for API Key on mount
  useEffect(() => {
    const storedKey = getStoredApiKey();
    if (storedKey) {
      setApiKey(storedKey);
      setHasKey(true);
    } else {
      setShowKeyInput(true);
    }
  }, []);

  // Update available units when grade, semester or subject changes
  useEffect(() => {
    // Access nested data: Grade -> Semester -> Subject
    const units = CURRICULUM_DATA[grade]?.[semester]?.[subject] || [];
    setAvailableUnits(units);
    
    // Set default unit to the first one if available
    if (units.length > 0) {
      setUnit(units[0]);
    } else {
      setUnit('');
    }
  }, [grade, semester, subject]);

  const handleSaveKey = () => {
    if (apiKey.trim()) {
      saveStoredApiKey(apiKey.trim());
      setHasKey(true);
      setShowKeyInput(false);
      setError(null);
    }
  };

  const handleGenerate = async () => {
    if (!hasKey) {
        setError("API 키를 먼저 저장해주세요.");
        setShowKeyInput(true);
        return;
    }
    if (!unit.trim()) {
      setError("단원 또는 주제를 선택해주세요.");
      return;
    }
    
    setError(null);
    setIsLoading(true);
    setExamData(null);
    setUserAnswers({});
    setIsSubmitted(false);
    setScore(0);

    try {
      const questions = await generateQuestionsAI(grade, semester, subject, unit, difficulty);
      setExamData({
        grade,
        semester,
        subject,
        unit,
        questions
      });
    } catch (err: any) {
      setError(err.message || "문제 생성 중 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAnswerSelect = (questionId: string, answer: string) => {
    if (isSubmitted) return; // Prevent changing answers after submission
    setUserAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const handleSubmit = () => {
    if (!examData) return;
    
    // Calculate score
    let correctCount = 0;
    examData.questions.forEach(q => {
      if (userAnswers[q.id] === q.correctAnswer) {
        correctCount++;
      }
    });
    
    setScore(correctCount);
    setIsSubmitted(true);

    // Scroll to top of results
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePrint = () => {
    window.print();
  };

  const handleSpeak = (text: string, lang: string = 'en-US') => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel(); // Stop any current speech
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang;
      utterance.rate = 0.8; // Slower for English learning
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="bg-background min-h-screen py-12 px-4 sm:px-6 print:py-0 print:px-0 print:bg-white">
      <div className="max-w-4xl mx-auto print:max-w-none print:w-full">
        <div className="mb-8 text-center print:hidden">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">AI 문제 생성기</h1>
          <p className="text-gray-600">원하는 교과 단원을 선택하면 10초 만에 맞춤형 문제가 만들어집니다.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 print:block">
          {/* Controls - Hide on Print */}
          <div className="lg:col-span-1 space-y-6 print:hidden">
            
            {/* API Key Section */}
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-blue-100">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2 text-primary font-bold">
                        <Key size={20} />
                        <span>API Key 설정</span>
                    </div>
                    {hasKey && !showKeyInput && (
                        <button 
                            onClick={() => setShowKeyInput(true)} 
                            className="text-xs text-gray-400 underline hover:text-gray-600"
                        >
                            변경
                        </button>
                    )}
                </div>

                {!hasKey || showKeyInput ? (
                    <div className="animate-fade-in">
                        <input 
                            type="password" 
                            value={apiKey}
                            onChange={(e) => setApiKey(e.target.value)}
                            placeholder="Gemini API Key 입력"
                            className="w-full p-2 border border-gray-300 rounded-lg text-sm mb-2 focus:ring-2 focus:ring-primary outline-none"
                        />
                        <button 
                            onClick={handleSaveKey}
                            className="w-full bg-gray-800 text-white py-2 rounded-lg text-sm font-bold flex items-center justify-center gap-2 hover:bg-gray-700 transition"
                        >
                            <Save size={16} /> 저장하기
                        </button>
                        <p className="text-xs text-gray-500 mt-2">
                            * 키는 브라우저에만 저장됩니다.<br/>
                            <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noreferrer" className="text-blue-500 underline flex items-center gap-1 mt-1">
                                키 발급받기 <ExternalLink size={10} />
                            </a>
                        </p>
                    </div>
                ) : (
                    <div className="flex items-center gap-2 text-green-600 text-sm font-medium bg-green-50 p-3 rounded-lg">
                        <CheckCircle size={16} />
                        <span>API Key가 저장되었습니다.</span>
                    </div>
                )}
            </div>

            {/* Generator Controls */}
            <div className="bg-white p-6 rounded-2xl shadow-lg h-fit">
              <div className="flex items-center gap-2 mb-6 text-primary border-b pb-4">
                <Settings size={20} />
                <h2 className="font-bold text-lg">문제 설정</h2>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-2">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">학년</label>
                        <select 
                            value={grade} 
                            onChange={(e) => setGrade(e.target.value)}
                            className="w-full rounded-lg border-gray-300 border p-3 focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                        >
                            {[1, 2, 3, 4, 5, 6].map(g => (
                            <option key={g} value={`${g}학년`}>{g}학년</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">학기</label>
                        <select 
                            value={semester} 
                            onChange={(e) => setSemester(e.target.value)}
                            className="w-full rounded-lg border-gray-300 border p-3 focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                        >
                            <option value="1학기">1학기</option>
                            <option value="2학기">2학기</option>
                        </select>
                    </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">과목</label>
                  <div className="grid grid-cols-2 gap-2">
                    {Object.values(Subject).map((sub) => (
                      <button
                        key={sub}
                        onClick={() => setSubject(sub)}
                        className={`py-2 px-3 rounded-lg text-sm font-medium transition ${
                          subject === sub 
                            ? 'bg-blue-100 text-primary ring-2 ring-primary' 
                            : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                        }`}
                      >
                        {sub}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">단원 / 주제</label>
                  {availableUnits.length > 0 ? (
                    <select
                      value={unit}
                      onChange={(e) => setUnit(e.target.value)}
                      className="w-full rounded-lg border-gray-300 border p-3 focus:ring-2 focus:ring-primary focus:border-transparent outline-none bg-white"
                    >
                      {availableUnits.map((u, idx) => (
                        <option key={idx} value={u}>{u}</option>
                      ))}
                    </select>
                  ) : (
                    <div className="p-3 bg-gray-100 text-gray-500 rounded-lg text-sm text-center">
                      해당 학기의 단원 정보가 없습니다.
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">난이도</label>
                  <div className="flex gap-2">
                    {Object.values(Difficulty).map((diff) => (
                      <button
                        key={diff}
                        onClick={() => setDifficulty(diff)}
                        className={`flex-1 py-2 rounded-lg text-sm font-medium transition ${
                          difficulty === diff
                            ? 'bg-secondary text-white shadow-md'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        {diff}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={handleGenerate}
                  disabled={isLoading || !unit || !hasKey}
                  className={`w-full py-4 rounded-xl font-bold text-white shadow-lg transition flex items-center justify-center gap-2 ${
                    isLoading || !unit || !hasKey ? 'bg-gray-300 cursor-not-allowed' : 'bg-primary hover:bg-blue-700 transform hover:-translate-y-1'
                  }`}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="animate-spin" size={20} /> 생성 중...
                    </>
                  ) : (
                    <>
                      <RefreshCw size={20} /> 문제 만들기
                    </>
                  )}
                </button>
                
                {error && (
                  <div className="flex items-start gap-2 text-red-500 bg-red-50 p-3 rounded-lg text-sm">
                    <AlertCircle size={16} className="mt-0.5 flex-shrink-0" />
                    <p>{error}</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Output Display */}
          <div className="lg:col-span-2 print:w-full">
            {!examData && !isLoading && (
              <div className="h-full flex flex-col items-center justify-center text-gray-400 p-12 border-2 border-dashed border-gray-200 rounded-2xl bg-white/50 print:hidden">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <Settings size={40} className="text-gray-300" />
                </div>
                <p className="text-lg text-center">
                    {!hasKey ? "먼저 API 키를 입력해주세요." : "왼쪽에서 조건을 설정하고\n'문제 만들기'를 눌러주세요."}
                </p>
              </div>
            )}

            {isLoading && (
              <div className="h-full flex flex-col items-center justify-center p-12 bg-white rounded-2xl shadow-sm print:hidden">
                <div className="relative w-24 h-24 mb-6">
                  <div className="absolute inset-0 border-4 border-gray-200 rounded-full"></div>
                  <div className="absolute inset-0 border-4 border-primary rounded-full border-t-transparent animate-spin"></div>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">AI가 문제를 출제하고 있습니다</h3>
                <p className="text-gray-500">교과서 {grade} {semester} {subject} '{unit}' 분석 중...</p>
              </div>
            )}

            {examData && (
              <div className="space-y-6 animate-fade-in print:space-y-4">
                {/* Exam Header */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex justify-between items-center print:border-none print:shadow-none print:p-0 print:mb-8">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 print:text-2xl">{examData.grade} {examData.semester} {examData.subject} 평가</h2>
                    <p className="text-gray-500 text-sm print:text-gray-600">주제: {examData.unit} | 난이도: {difficulty}</p>
                  </div>
                  <button 
                    onClick={handlePrint}
                    className="flex items-center gap-2 text-primary font-bold hover:bg-blue-50 px-4 py-2 rounded-lg transition print:hidden"
                  >
                    <Download size={20} />
                    PDF 저장 / 인쇄
                  </button>
                </div>

                {/* Score Banner */}
                {isSubmitted && (
                   <div className="bg-blue-50 border border-blue-100 p-6 rounded-2xl flex items-center justify-between animate-fade-in print:border-gray-300">
                     <div>
                       <h3 className="text-lg font-bold text-primary mb-1">채점 완료!</h3>
                       <p className="text-gray-600">
                         총 {examData.questions.length}문제 중 <span className="font-bold text-blue-600">{score}</span>문제를 맞혔어요.
                       </p>
                     </div>
                     <div className="text-4xl font-extrabold text-blue-600">
                       {Math.round((score / examData.questions.length) * 100)}점
                     </div>
                   </div>
                )}

                {/* Question List */}
                {examData.questions.map((q, idx) => {
                  const isCorrect = userAnswers[q.id] === q.correctAnswer;
                  const isWrong = isSubmitted && !isCorrect;
                  const isUserSelected = (opt: string) => userAnswers[q.id] === opt;
                  
                  return (
                    <div key={q.id} className={`bg-white p-6 rounded-2xl shadow-sm border ${isWrong ? 'border-red-200 bg-red-50/10' : 'border-gray-100'} print:shadow-none print:border-gray-300 print:break-inside-avoid`}>
                      <div className="flex items-start gap-3 mb-4">
                        <div className="relative">
                          <span className={`font-bold w-8 h-8 flex items-center justify-center rounded-lg flex-shrink-0 ${isWrong ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-primary'}`}>
                            {idx + 1}
                          </span>
                          {isSubmitted && (
                            <div className="absolute -top-2 -right-2">
                              {isCorrect ? <CheckCircle size={20} className="text-green-500 bg-white rounded-full" /> : <XCircle size={20} className="text-red-500 bg-white rounded-full" />}
                            </div>
                          )}
                        </div>
                        <div className="flex-grow">
                            <div className="flex items-start justify-between gap-2">
                                <h3 className="text-lg font-medium text-gray-900 leading-relaxed pt-0.5">
                                    {q.questionText}
                                </h3>
                                {/* Only show speaker for English subject listening box below, removed from here for Korean */}
                            </div>
                            
                            {/* Listening Text Box for English */}
                            {q.listeningText && (
                              <div className="mt-4 mb-2 p-4 bg-blue-50 border border-blue-100 rounded-xl relative group">
                                <div className="flex justify-between items-start gap-2">
                                    <span className="absolute -top-2 left-4 bg-white text-blue-500 text-xs font-bold px-2 py-0.5 rounded border border-blue-100">Listen</span>
                                    <p className="text-lg text-gray-800 font-medium whitespace-pre-line leading-relaxed">{q.listeningText}</p>
                                    <button 
                                        onClick={() => handleSpeak(q.listeningText || '', 'en-US')}
                                        className="text-blue-500 hover:text-blue-700 p-2 bg-white rounded-full shadow-sm border border-blue-100 transition flex-shrink-0 print:hidden"
                                        title="영어 지문 듣기"
                                    >
                                        <Volume2 size={20} />
                                    </button>
                                </div>
                              </div>
                            )}

                            {/* SVG Render Section */}
                            {q.svgImage && (
                                <div className="my-4 p-4 bg-gray-50 rounded-lg flex justify-center border border-gray-100 print:bg-white print:border-gray-300">
                                    <div dangerouslySetInnerHTML={{ __html: q.svgImage }} className="max-w-full" />
                                </div>
                            )}
                        </div>
                      </div>
                      
                      <div className="ml-11 space-y-2 mb-6">
                        {q.options.map((opt, optIdx) => (
                          <label 
                            key={optIdx} 
                            className={`flex items-center gap-3 p-3 rounded-lg border transition cursor-pointer print:border-none print:p-1
                              ${isSubmitted 
                                ? isUserSelected(opt) 
                                  ? isCorrect 
                                    ? 'bg-green-50 border-green-200' 
                                    : 'bg-red-50 border-red-200'
                                  : 'border-transparent'
                                : userAnswers[q.id] === opt ? 'bg-blue-50 border-blue-200 ring-1 ring-blue-200' : 'border-transparent hover:bg-gray-50'
                              }
                            `}
                          >
                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center print:border-black flex-shrink-0 ${
                               userAnswers[q.id] === opt ? 'border-primary' : 'border-gray-300'
                            }`}>
                              {userAnswers[q.id] === opt && <div className="w-2.5 h-2.5 rounded-full bg-primary print:bg-black"></div>}
                            </div>
                            <input 
                              type="radio" 
                              name={q.id} 
                              value={opt}
                              checked={userAnswers[q.id] === opt}
                              onChange={() => handleAnswerSelect(q.id, opt)}
                              disabled={isSubmitted}
                              className="hidden"
                            />
                            <span className={`text-gray-700 flex-grow ${isSubmitted && q.correctAnswer === opt ? 'font-bold text-green-700 underline decoration-green-500' : ''}`}>
                              {opt}
                            </span>

                            {/* Option Listen Button (Only for English Subject) */}
                            {examData.subject === '영어' && (
                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        handleSpeak(opt, 'en-US');
                                    }}
                                    className="p-1.5 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-full transition print:hidden flex-shrink-0"
                                    title="보기 듣기"
                                >
                                    <Volume2 size={16} />
                                </button>
                            )}
                          </label>
                        ))}
                      </div>

                      {/* Explanation - Show only after submit */}
                      {isSubmitted && (
                        <div className="ml-11 bg-slate-50 p-4 rounded-xl border border-slate-100 print:bg-white print:border-gray-200">
                          <div className="flex items-center gap-2 text-sm font-bold text-green-600 mb-2">
                            <CheckCircle size={16} /> 정답 및 해설
                          </div>
                          <p className="font-bold text-gray-800 mb-1">정답: {q.correctAnswer}</p>
                          <p className="text-gray-600 text-sm leading-relaxed">{q.explanation}</p>
                        </div>
                      )}
                    </div>
                  );
                })}

                {/* Submit Button */}
                {!isSubmitted && (
                  <div className="flex justify-center pt-4 print:hidden">
                    <button 
                      onClick={handleSubmit}
                      disabled={Object.keys(userAnswers).length < examData.questions.length}
                      className={`px-8 py-4 rounded-full text-lg font-bold shadow-lg transition transform hover:-translate-y-1 ${
                         Object.keys(userAnswers).length < examData.questions.length
                         ? 'bg-gray-300 text-white cursor-not-allowed'
                         : 'bg-secondary text-white hover:bg-yellow-600'
                      }`}
                    >
                      채점하기
                    </button>
                  </div>
                )}

                {/* Review Note Section */}
                {isSubmitted && examData.questions.some(q => userAnswers[q.id] !== q.correctAnswer) && (
                  <div className="mt-12 border-t-2 border-dashed border-gray-200 pt-12 print:break-before-page">
                     <div className="flex items-center gap-3 mb-8 justify-center">
                        <BookOpen size={32} className="text-red-500" />
                        <h2 className="text-2xl font-bold text-gray-900">오답 노트 (Review Note)</h2>
                     </div>
                     <p className="text-center text-gray-600 mb-8 print:hidden">틀린 문제를 다시 한 번 복습해보세요.</p>
                     
                     <div className="space-y-6">
                        {examData.questions
                          .filter(q => userAnswers[q.id] !== q.correctAnswer)
                          .map((q, idx) => (
                            <div key={`review-${q.id}`} className="bg-red-50 p-6 rounded-2xl border border-red-100 print:bg-white print:border-gray-300">
                              <span className="inline-block bg-red-200 text-red-800 text-xs font-bold px-2 py-1 rounded mb-3">복습 필요</span>
                              <div className="flex justify-between items-start gap-2">
                                <div className="w-full">
                                    <h3 className="text-lg font-bold text-gray-900 mb-2">{q.questionText}</h3>
                                    {q.listeningText && (
                                        <div className="p-3 bg-white/50 border border-blue-100 rounded-lg mb-4 text-gray-700 italic flex justify-between items-start">
                                            <span>"{q.listeningText}"</span>
                                            <button 
                                                onClick={() => handleSpeak(q.listeningText || '', 'en-US')}
                                                className="text-blue-500 p-1 bg-white rounded-full border border-blue-100 print:hidden"
                                            >
                                                <Volume2 size={16} />
                                            </button>
                                        </div>
                                    )}
                                    {q.svgImage && <div dangerouslySetInnerHTML={{ __html: q.svgImage }} className="w-24 h-24 flex-shrink-0" />}
                                </div>
                              </div>
                              
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <div className="p-3 bg-white rounded-lg border border-red-200">
                                  <span className="text-xs text-red-500 block mb-1">내가 고른 답</span>
                                  <span className="font-medium text-gray-800 line-through decoration-red-500 decoration-2">{userAnswers[q.id]}</span>
                                </div>
                                <div className="p-3 bg-white rounded-lg border border-green-200">
                                  <span className="text-xs text-green-500 block mb-1">정답</span>
                                  <span className="font-bold text-gray-800">{q.correctAnswer}</span>
                                </div>
                              </div>
                              
                              <div className="bg-white p-4 rounded-xl">
                                <p className="text-sm text-gray-700 leading-relaxed font-medium">💡 선생님의 설명</p>
                                <p className="text-sm text-gray-600 mt-1">{q.explanation}</p>
                              </div>
                            </div>
                        ))}
                     </div>
                  </div>
                )}

              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeneratorPage;
