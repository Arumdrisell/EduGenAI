import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, Clock, Zap, Star, ArrowRight } from 'lucide-react';
import { MOCK_REVIEWS, IMAGES } from '../constants';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-blue-600 text-white pt-20 pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-40 z-0"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center z-[-1]" 
          style={{ backgroundImage: `url('${IMAGES.HERO}')` }}
        ></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
            우리 아이 맞춤 문제집,<br />
            <span className="text-yellow-400">AI가 10초 만에</span> 완성합니다.
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 mb-10 max-w-3xl mx-auto">
            자료 찾느라 낭비한 1시간, 이제 아이와 대화하는 시간으로 바꾸세요.
            <br className="hidden md:block"/> 전국 초등 교과서 100% 연계 학습지.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button 
              onClick={() => navigate('/generator')}
              className="bg-secondary text-white text-lg font-bold px-8 py-4 rounded-full shadow-lg hover:bg-yellow-600 transition transform hover:-translate-y-1 flex items-center justify-center gap-2"
            >
              지금 바로 무료로 문제 만들기 <ArrowRight size={20} />
            </button>
            <button 
              onClick={() => navigate('/curriculum')}
              className="bg-white/10 backdrop-blur-md border border-white/30 text-white text-lg font-semibold px-8 py-4 rounded-full hover:bg-white/20 transition"
            >
              커리큘럼 확인하기
            </button>
          </div>
        </div>
      </section>

      {/* Problem & Solution */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">왜 EduGen AI 일까요?</h2>
            <p className="text-lg text-gray-600">학부모님의 고민을 AI 기술로 해결했습니다.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="bg-slate-50 p-8 rounded-2xl text-center hover:shadow-xl transition duration-300">
              <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Clock size={32} />
              </div>
              <h3 className="text-xl font-bold mb-3">시간 절약</h3>
              <p className="text-gray-600">
                인터넷을 뒤지며 학습 자료를 찾는 시간,<br/>이제 0분입니다.
              </p>
            </div>
            <div className="bg-slate-50 p-8 rounded-2xl text-center hover:shadow-xl transition duration-300">
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Zap size={32} />
              </div>
              <h3 className="text-xl font-bold mb-3">맞춤 난이도</h3>
              <p className="text-gray-600">
                우리 아이 수준에 딱 맞게,<br/>기초부터 심화까지 자유롭게 조절하세요.
              </p>
            </div>
            <div className="bg-slate-50 p-8 rounded-2xl text-center hover:shadow-xl transition duration-300">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle size={32} />
              </div>
              <h3 className="text-xl font-bold mb-3">자동 오답 노트</h3>
              <p className="text-gray-600">
                틀린 문제는 AI가 친절하게 설명해주고<br/>유사 문제를 다시 만들어줍니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Showcase */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2">
            <img 
              src={IMAGES.FEATURE_AI} 
              alt="AI Analysis" 
              className="rounded-2xl shadow-2xl"
            />
          </div>
          <div className="md:w-1/2">
            <span className="text-primary font-bold tracking-wider uppercase text-sm">Advanced Technology</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-6">
              최신 Gemini AI 모델이<br/>교육 전문가처럼 생각합니다.
            </h2>
            <ul className="space-y-4">
              {[
                "교육부 지정 초등학교 교육과정 완벽 분석",
                "학년별 필수 어휘 및 개념 데이터베이스 탑재",
                "단순 암기가 아닌 사고력을 키우는 문제 출제",
                "서술형 문제 채점 및 피드백 기능 (Premium)"
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <CheckCircle className="text-primary mt-1 flex-shrink-0" size={20} />
                  <span className="text-gray-700 text-lg">{item}</span>
                </li>
              ))}
            </ul>
            <button 
              onClick={() => navigate('/guide')}
              className="mt-8 text-primary font-bold hover:underline flex items-center gap-1"
            >
              자세히 알아보기 <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-16">이미 3만 명의 부모님이 선택했습니다.</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {MOCK_REVIEWS.map((review) => (
              <div key={review.id} className="bg-white border border-gray-100 p-6 rounded-2xl shadow-sm hover:shadow-md transition">
                <div className="flex gap-1 text-yellow-400 mb-4">
                  {[...Array(review.rating)].map((_, i) => <Star key={i} fill="currentColor" size={16} />)}
                </div>
                <p className="text-gray-700 mb-6 leading-relaxed">"{review.content}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 font-bold">
                    {review.name[0]}
                  </div>
                  <div>
                    <p className="font-bold text-sm text-gray-900">{review.name}</p>
                    <p className="text-xs text-gray-500">{review.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-primary text-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">아이의 성적, 지금이 골든타임입니다.</h2>
          <p className="text-blue-100 text-xl mb-10">첫 달 무료 체험으로 변화를 직접 경험해보세요.</p>
          <button 
            onClick={() => navigate('/generator')}
            className="bg-white text-primary text-xl font-bold px-10 py-4 rounded-full shadow-2xl hover:bg-gray-100 transition transform hover:scale-105"
          >
            무료로 시작하기
          </button>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
