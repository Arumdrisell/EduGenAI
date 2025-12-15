import React, { useState, useEffect } from 'react';
import { Subject, Difficulty, ExamConfig, CurriculumUnit } from '../types';
import { CURRICULUM_DATA } from '../constants';
import { Settings, BookOpen, AlertCircle, CheckCircle2 } from 'lucide-react';

interface SidebarProps {
  onGenerate: (config: ExamConfig) => void;
  isGenerating: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ onGenerate, isGenerating }) => {
  const [grade, setGrade] = useState<number>(3);
  const [semester, setSemester] = useState<number>(1);
  const [subject, setSubject] = useState<Subject>(Subject.MATH);
  const [unit, setUnit] = useState<string>('');
  const [difficulty, setDifficulty] = useState<Difficulty>(Difficulty.NORMAL);
  const [apiKey, setApiKey] = useState<string>('');
  const [showKeyInput, setShowKeyInput] = useState(false);

  // Initialize API Key from local storage if available
  useEffect(() => {
    const storedKey = localStorage.getItem('gemini_api_key');
    if (storedKey) setApiKey(storedKey);
  }, []);

  const handleSaveKey = () => {
    localStorage.setItem('gemini_api_key', apiKey);
    setShowKeyInput(false);
  };

  // Dynamic Unit Loading
  const availableUnits = React.useMemo(() => {
    const curr = CURRICULUM_DATA.find(c => c.grade === grade && c.semester === semester);
    // If curriculum exists and subject exists in it, return the list
    if (curr && curr.subjects[subject]) {
      return curr.subjects[subject]!;
    }
    return [];
  }, [grade, semester, subject]);

  useEffect(() => {
    if (availableUnits.length > 0) {
      setUnit(availableUnits[0]);
    } else {
      setUnit('');
    }
  }, [availableUnits]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!apiKey && !process.env.API_KEY) {
      alert("API Key가 필요합니다. 설정에서 입력해주세요.");
      setShowKeyInput(true);
      return;
    }
    onGenerate({
      grade,
      semester,
      subject,
      unit,
      difficulty,
      questionCount: 5, // Fixed for demo, could be adjustable
      apiKey
    });
  };

  return (
    <aside className="w-full md:w-80 bg-white border-r border-gray-200 h-screen overflow-y-auto flex-shrink-0 print:hidden shadow-lg z-20">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 p-2 rounded-lg text-white">
              <BookOpen size={20} />
            </div>
            <h2 className="text-xl font-bold text-gray-800">문제 생성기</h2>
          </div>
          <button 
            onClick={() => setShowKeyInput(!showKeyInput)}
            className="text-gray-400 hover:text-blue-600 transition-colors"
          >
            <Settings size={20} />
          </button>
        </div>

        {showKeyInput && (
          <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <label className="block text-xs font-semibold text-gray-500 mb-2">GEMINI API KEY</label>
            <input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mb-2 text-sm"
              placeholder="AI Studio Key 입력"
            />
            <button 
              onClick={handleSaveKey}
              className="w-full bg-gray-800 text-white py-1 rounded text-sm hover:bg-gray-700"
            >
              저장하기
            </button>
            <p className="text-[10px] text-gray-400 mt-2">
              키는 브라우저 로컬 스토리지에만 저장됩니다.
            </p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Grade & Semester */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">학년</label>
              <select 
                value={grade}
                onChange={(e) => setGrade(Number(e.target.value))}
                className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                {[1, 2, 3, 4, 5, 6].map(g => <option key={g} value={g}>{g}학년</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">학기</label>
              <select 
                value={semester}
                onChange={(e) => setSemester(Number(e.target.value))}
                className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value={1}>1학기</option>
                <option value={2}>2학기</option>
              </select>
            </div>
          </div>

          {/* Subject */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">과목</label>
            <div className="grid grid-cols-3 gap-2">
              {Object.values(Subject).map((sub) => (
                <button
                  key={sub}
                  type="button"
                  onClick={() => setSubject(sub)}
                  className={`p-2 text-sm rounded-lg border transition-all ${
                    subject === sub 
                    ? 'bg-blue-100 border-blue-500 text-blue-700 font-medium' 
                    : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {sub}
                </button>
              ))}
            </div>
          </div>

          {/* Unit */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">단원</label>
            <select 
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              className="w-full p-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:text-gray-400"
              disabled={availableUnits.length === 0}
            >
              {availableUnits.length === 0 ? (
                <option>해당 학년/학기에 과정 없음</option>
              ) : (
                availableUnits.map((u, idx) => <option key={idx} value={u}>{u}</option>)
              )}
            </select>
          </div>

          {/* Difficulty */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">난이도</label>
            <div className="flex gap-2">
              {Object.values(Difficulty).map((diff) => (
                <label key={diff} className="flex-1 cursor-pointer">
                  <input
                    type="radio"
                    className="peer sr-only"
                    name="difficulty"
                    value={diff}
                    checked={difficulty === diff}
                    onChange={() => setDifficulty(diff)}
                  />
                  <div className="text-center py-2 rounded-lg border border-gray-200 text-gray-600 text-sm peer-checked:bg-yellow-50 peer-checked:border-yellow-400 peer-checked:text-yellow-700 peer-checked:font-medium transition-all">
                    {diff}
                  </div>
                </label>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={isGenerating || !unit || availableUnits.length === 0}
            className={`w-full py-4 rounded-xl text-white font-bold text-lg shadow-md transition-transform active:scale-95 flex items-center justify-center gap-2 ${
              isGenerating || !unit || availableUnits.length === 0
               ? 'bg-blue-300 cursor-not-allowed' 
               : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {isGenerating ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                생성 중...
              </>
            ) : (
              <>
                <CheckCircle2 size={20} />
                문제 만들기
              </>
            )}
          </button>
        </form>

        <div className="mt-8 p-4 bg-yellow-50 rounded-lg text-xs text-yellow-800 flex gap-2 items-start">
          <AlertCircle size={14} className="mt-0.5 flex-shrink-0" />
          <p>
            단원 데이터는 2015/2022 개정 교육과정을 기반으로 하며, 학교마다 진도가 다를 수 있습니다.
          </p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;