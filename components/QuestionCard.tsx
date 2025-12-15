import React, { useState, useRef, useEffect } from 'react';
import { Question } from '../types';
import { Volume2, Square } from 'lucide-react';

interface QuestionCardProps {
  question: Question;
  index: number;
  selectedAnswer: string | undefined;
  onSelectAnswer: (answer: string) => void;
  readOnly?: boolean;
  showCorrectness?: boolean; // For review mode
}

const QuestionCard: React.FC<QuestionCardProps> = ({ 
  question, 
  index, 
  selectedAnswer, 
  onSelectAnswer,
  readOnly = false,
  showCorrectness = false
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const stopRef = useRef(false);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      window.speechSynthesis.cancel();
      stopRef.current = true;
    };
  }, []);
  
  const handleTTS = (text: string) => {
    // If already playing, stop it
    if (isPlaying) {
      stopRef.current = true;
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      return;
    }

    window.speechSynthesis.cancel();
    stopRef.current = false;
    setIsPlaying(true);

    // Pre-processing to ensure dialogues are split by newlines
    // Sometimes AI generates "A: Hello. B: Hi." on one line.
    // We inject newlines before speaker labels (A:, B:, Mom:, etc.) that appear after punctuation.
    const formattedText = text
      .replace(/([.!?])\s*([A-Za-z\s]+:)/g, "$1\n$2") 
      // Fallback for cases like "A: Hello B: Hi" (no punctuation)
      .replace(/([a-z])\s+([A-Z][a-z]+:|A:|B:)/g, "$1\n$2");

    const lines = formattedText.split('\n').filter(line => line.trim().length > 0);
    
    let currentIndex = 0;

    const speakNextLine = () => {
      if (stopRef.current || currentIndex >= lines.length) {
        setIsPlaying(false);
        return;
      }

      const line = lines[currentIndex];
      
      // Robust speaker detection regex: "Name: Content"
      // Captures "Mom: Hello" -> speaker="Mom", content="Hello"
      const match = line.match(/^([A-Za-z\s]+):\s*(.+)/);
      let content = line;
      let speaker = '';

      if (match) {
        speaker = match[1].trim().toLowerCase();
        content = match[2].trim(); // Only read the content, NOT the speaker label
      }

      const utterance = new SpeechSynthesisUtterance(content);
      utterance.lang = 'en-US';
      
      // Default Rate
      utterance.rate = 0.85; 

      // --- Advanced Voice/Pitch Logic ---
      // 1. Adult Female (Mom, Teacher, Woman, Aunt, Grandma)
      //    Default voice often leans female/neutral, so pitch 1.0-1.1 is standard, 1.2 is noticeably higher/feminine.
      if (['mom', 'mother', 'woman', 'lady', 'aunt', 'grandma', 'mrs', 'teacher', 'jane', 'alice'].some(s => speaker.includes(s))) {
        utterance.pitch = 1.15; 
      } 
      // 2. Adult Male (Dad, Father, Man, Uncle, Grandpa)
      else if (['dad', 'father', 'man', 'uncle', 'grandpa', 'mr', 'sir', 'tom', 'eric'].some(s => speaker.includes(s))) {
        utterance.pitch = 0.75; // Deeper voice
      } 
      // 3. Young Boy (Son, Brother, Boy)
      else if (['son', 'boy', 'brother'].some(s => speaker.includes(s))) {
        utterance.pitch = 1.25; // Higher pitch but slightly different from female adult
        utterance.rate = 0.9;  
      } 
      // 4. Young Girl (Daughter, Sister, Girl)
      else if (['daughter', 'girl', 'sister'].some(s => speaker.includes(s))) {
        utterance.pitch = 1.4; // Highest pitch
        utterance.rate = 0.9;
      }
      // 5. Explicit A/B Differentiation
      //    Make A female-sounding and B male-sounding by default to ensure contrast
      else if (speaker === 'a') {
        utterance.pitch = 1.2; // A = Higher pitch
      } 
      else if (speaker === 'b') {
        utterance.pitch = 0.8; // B = Lower pitch
      } 
      else {
        utterance.pitch = 1.0; // Narrator or unknown
      }

      utterance.onend = () => {
        currentIndex++;
        speakNextLine();
      };

      utterance.onerror = () => {
        setIsPlaying(false);
      };

      window.speechSynthesis.speak(utterance);
    };

    speakNextLine();
  };

  const renderExplanation = (text: string) => {
    if (!text) return null;
    
    // Split by standard section headers used in our prompt (e.g. [대본], [해석], [풀이])
    const parts = text.split(/(\[(?:대본|해석|풀이|대본 및 해석|정답|오답 풀이)\])/g);
    
    return parts.map((part, idx) => {
      // Check if this part is a header
      const isHeader = /^\[(?:대본|해석|풀이|대본 및 해석|정답|오답 풀이)\]$/.test(part.trim());
      
      if (isHeader) {
        return (
          <h5 key={idx} className="font-bold text-yellow-800 mt-4 mb-2 text-base flex items-center gap-1.5 border-l-4 border-yellow-400 pl-2 bg-yellow-100/30 py-1 rounded-r">
             {part.replace(/[\[\]]/g, '')}
          </h5>
        );
      }
      
      if (!part.trim()) return null;

      return (
        <div key={idx} className="text-yellow-900 leading-relaxed whitespace-pre-wrap pl-1 mb-2">
          {part.trim()}
        </div>
      );
    });
  };

  const isCorrect = selectedAnswer === question.correctAnswer;
  const cardBorderClass = showCorrectness 
    ? (isCorrect ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50')
    : 'border-gray-200 bg-white';

  return (
    <div className={`rounded-2xl p-6 md:p-8 mb-6 border-2 shadow-sm break-inside-avoid ${cardBorderClass}`}>
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-bold text-blue-600 flex items-center gap-2">
          <span className="bg-blue-100 text-blue-700 w-8 h-8 rounded-full flex items-center justify-center text-sm">
            {index + 1}
          </span>
          문제
        </h3>
        {showCorrectness && (
          <span className={`px-3 py-1 rounded-full text-sm font-bold ${isCorrect ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            {isCorrect ? '정답' : '오답'}
          </span>
        )}
      </div>

      {/* Listening Section */}
      {question.listeningText && (
        <div className="mb-4 p-4 bg-gray-100 rounded-lg flex items-center justify-between group hover:bg-gray-200 transition-colors">
          <div className="flex flex-col">
            <p className="text-sm text-gray-600 italic font-medium">Click to Listen →</p>
            {isPlaying && <p className="text-xs text-blue-500 animate-pulse">재생 중...</p>}
          </div>
          <button 
            onClick={() => handleTTS(question.listeningText!)}
            className={`p-3 rounded-full shadow-sm transition-all ${
              isPlaying 
                ? 'bg-red-100 text-red-600 hover:bg-red-200' 
                : 'bg-white text-blue-600 hover:text-blue-800'
            }`}
            title={isPlaying ? "멈추기" : "듣기"}
            type="button"
          >
            {isPlaying ? <Square size={20} fill="currentColor" /> : <Volume2 size={20} />}
          </button>
        </div>
      )}

      {/* Question Text */}
      <div className="text-lg md:text-xl font-medium text-gray-900 mb-6 leading-relaxed whitespace-pre-line">
        {question.questionText}
      </div>

      {/* SVG Visualization */}
      {question.svgImage && (
        <div className="mb-6 flex justify-center p-4 bg-white border border-gray-100 rounded-xl">
          <div 
            dangerouslySetInnerHTML={{ __html: question.svgImage }} 
            className="w-full max-w-[300px] h-auto [&>svg]:w-full [&>svg]:h-auto"
          />
        </div>
      )}

      {/* Options */}
      <div className="space-y-3">
        {question.options.map((option, idx) => {
          const isSelected = selectedAnswer === option;
          const isCorrectAnswer = option === question.correctAnswer;
          
          let optionStyle = "border-gray-200 hover:bg-gray-50";
          if (showCorrectness) {
            if (isCorrectAnswer) optionStyle = "border-green-500 bg-green-100 font-bold";
            else if (isSelected && !isCorrect) optionStyle = "border-red-500 bg-red-100";
            else optionStyle = "border-gray-200 opacity-60";
          } else if (isSelected) {
            optionStyle = "border-blue-500 bg-blue-50 text-blue-900 font-semibold ring-1 ring-blue-500";
          }

          return (
            <label 
              key={idx} 
              className={`flex items-center p-4 border rounded-xl cursor-pointer transition-all ${optionStyle} ${readOnly ? 'pointer-events-none' : ''}`}
            >
              <input 
                type="radio" 
                name={`q-${question.id}`} 
                value={option}
                checked={isSelected}
                onChange={() => !readOnly && onSelectAnswer(option)}
                className="hidden"
              />
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center mr-4 flex-shrink-0 ${isSelected || (showCorrectness && isCorrectAnswer) ? 'border-current' : 'border-gray-300'}`}>
                {(isSelected || (showCorrectness && isCorrectAnswer)) && <div className="w-3 h-3 rounded-full bg-current" />}
              </div>
              <span className="text-base">{option}</span>
            </label>
          );
        })}
      </div>

      {/* Explanation for Review Mode - Always show if showCorrectness is true */}
      {showCorrectness && (
        <div className="mt-6 p-5 bg-yellow-50 rounded-xl border border-yellow-200 animate-fade-in">
          <h4 className="font-bold text-yellow-800 mb-4 flex items-center gap-2 text-lg border-b border-yellow-200 pb-2">
            <span className="text-2xl">💡</span> 선생님의 해설
          </h4>
          <div className="text-base">
            {renderExplanation(question.explanation)}
          </div>
        </div>
      )}
    </div>
  );
};

export default QuestionCard;