import React from 'react';
import { Book, Calculator, Globe, FlaskConical, Landmark } from 'lucide-react';
import { IMAGES } from '../constants';

const CurriculumPage: React.FC = () => {
  const subjects = [
    { name: '국어', icon: <Book className="text-rose-500" />, desc: '독해력, 어휘력, 문법, 쓰기' },
    { name: '수학', icon: <Calculator className="text-blue-500" />, desc: '연산, 도형, 측정, 규칙성' },
    { name: '영어', icon: <Globe className="text-purple-500" />, desc: '파닉스, 기초 회화, 문법, 독해' },
    { name: '과학', icon: <FlaskConical className="text-green-500" />, desc: '물질, 생명, 운동, 지구' },
    { name: '사회', icon: <Landmark className="text-yellow-600" />, desc: '지리, 역사, 경제, 문화' },
  ];

  return (
    <div className="bg-background min-h-screen pb-20">
      <div className="bg-white border-b border-gray-200 py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">교과 과정 안내</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            EduGen AI는 교육부의 최신 초등 교육과정(2022 개정 교육과정 포함)을 기반으로 문제를 생성합니다.
            전국 모든 초등학교의 진도와 연계하여 학습할 수 있습니다.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
             <img src={IMAGES.PROCESS} alt="Curriculum Books" className="rounded-2xl shadow-lg w-full object-cover h-80" />
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-4 text-primary">학년별 맞춤 데이터베이스</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              AI는 1학년부터 6학년까지 각 학년의 인지 발달 수준과 학습 목표를 정확히 이해하고 있습니다.
              저학년에게는 흥미 유발을 위한 그림 위주의 문제를, 고학년에게는 사고력을 요하는 심화 문제를 제공합니다.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-xl border border-gray-200">
                <span className="block text-2xl font-bold text-primary mb-1">1-2학년</span>
                <span className="text-sm text-gray-500">기초 습관 형성, 흥미 위주</span>
              </div>
              <div className="bg-white p-4 rounded-xl border border-gray-200">
                <span className="block text-2xl font-bold text-primary mb-1">3-4학년</span>
                <span className="text-sm text-gray-500">본격 교과 학습, 개념 이해</span>
              </div>
              <div className="bg-white p-4 rounded-xl border border-gray-200">
                <span className="block text-2xl font-bold text-primary mb-1">5-6학년</span>
                <span className="text-sm text-gray-500">중등 대비, 심화 사고력</span>
              </div>
            </div>
          </div>
        </div>

        <h2 className="text-2xl font-bold mb-8 text-center">지원 과목 및 영역</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {subjects.map((sub, idx) => (
            <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition border border-gray-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-gray-50 rounded-lg">{sub.icon}</div>
                <h3 className="text-xl font-bold">{sub.name}</h3>
              </div>
              <p className="text-gray-600">{sub.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CurriculumPage;
