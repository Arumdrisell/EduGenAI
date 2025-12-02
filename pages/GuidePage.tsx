import React from 'react';
import { IMAGES } from '../constants';

const GuidePage: React.FC = () => {
  return (
    <div className="bg-white min-h-screen">
       <div className="relative h-64 md:h-80 bg-cover bg-center" style={{ backgroundImage: `url('${IMAGES.GUIDE}')` }}>
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <h1 className="text-4xl font-bold text-white">이용 가이드</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 border-l-4 border-primary pl-4">어떻게 사용하나요?</h2>
          <div className="space-y-8">
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <div className="bg-blue-50 text-primary font-bold text-xl w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0">1</div>
              <div>
                <h3 className="text-xl font-bold mb-2">조건 설정하기</h3>
                <p className="text-gray-600">
                  '문제 만들기' 페이지에서 자녀의 학년, 과목, 공부하고 싶은 단원을 입력하세요.<br/>
                  난이도를 조절하여 아이의 수준에 맞는 문제를 만들 수 있습니다.
                </p>
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <div className="bg-blue-50 text-primary font-bold text-xl w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0">2</div>
              <div>
                <h3 className="text-xl font-bold mb-2">AI 문제 생성</h3>
                <p className="text-gray-600">
                  Gemini AI가 교과 과정을 분석하여 새로운 문제를 생성합니다.<br/>
                  약 5~10초 정도 소요됩니다.
                </p>
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <div className="bg-blue-50 text-primary font-bold text-xl w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0">3</div>
              <div>
                <h3 className="text-xl font-bold mb-2">학습 및 오답 확인</h3>
                <p className="text-gray-600">
                  화면에서 문제를 풀거나 PDF로 인쇄하여 풀 수 있습니다.<br/>
                  채점 후 상세한 해설을 통해 틀린 이유를 확인하세요.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-slate-50 p-8 rounded-2xl">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">우리의 미션</h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-4">
            "학부모의 시간은 금이고, 아이의 성장은 미래입니다."
          </p>
          <p className="text-gray-600 leading-relaxed">
            맞벌이 부부로서 자녀 교육에 신경 쓰기 어려운 현실을 누구보다 잘 알고 있습니다.
            EduGen AI는 기술을 통해 부모님이 자료 준비라는 노동에서 해방되고, 
            아이와 소통하며 정서적 교감을 나누는 데 집중할 수 있도록 돕고자 합니다.
          </p>
        </div>
      </div>
    </div>
  );
};

export default GuidePage;
