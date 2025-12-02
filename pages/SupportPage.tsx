import React, { useState } from 'react';
import { ChevronDown, ChevronUp, MessageCircle } from 'lucide-react';

const SupportPage: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      q: "무료 체험 기간은 언제까지인가요?",
      a: "가입 후 첫 1개월간 모든 기능을 무료로 이용하실 수 있습니다. 이후에는 월 구독료가 부과되거나 무료 플랜으로 전환됩니다."
    },
    {
      q: "생성된 문제의 저작권은 누구에게 있나요?",
      a: "AI가 생성한 문제의 사용권은 사용자에게 귀속되므로 자유롭게 인쇄하여 학습에 활용하실 수 있습니다. 단, 상업적 재판매는 제한됩니다."
    },
    {
      q: "오답 노트 기능은 어떻게 사용하나요?",
      a: "문제를 푼 후 '채점하기' 버튼을 누르면 틀린 문제만 모아 자동으로 오답 노트 페이지에 저장됩니다."
    },
    {
      q: "결제 취소 및 환불은 가능한가요?",
      a: "결제일로부터 7일 이내 사용 이력이 없는 경우 전액 환불 가능합니다. 고객센터로 문의주시면 신속히 처리해드립니다."
    }
  ];

  return (
    <div className="bg-background min-h-screen py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-12">고객 지원 센터</h1>

        {/* FAQ Section */}
        <section className="mb-16">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <span className="w-1 h-6 bg-primary rounded-full"></span> 자주 묻는 질문
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full flex justify-between items-center p-5 text-left font-medium hover:bg-gray-50 transition"
                >
                  <span className="text-gray-900">Q. {faq.q}</span>
                  {openFaq === idx ? <ChevronUp size={20} className="text-gray-400" /> : <ChevronDown size={20} className="text-gray-400" />}
                </button>
                {openFaq === idx && (
                  <div className="p-5 pt-0 text-gray-600 bg-gray-50 border-t border-gray-100">
                    A. {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Contact Form */}
        <section className="bg-white p-8 rounded-2xl shadow-lg">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
             <MessageCircle className="text-primary" /> 1:1 문의하기
          </h2>
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">이메일 주소</label>
              <input 
                type="email" 
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none"
                placeholder="답변 받을 이메일을 입력하세요"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">문의 제목</label>
              <input 
                type="text" 
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none"
                placeholder="제목을 입력하세요"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">문의 내용</label>
              <textarea 
                rows={5}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none resize-none"
                placeholder="궁금한 점을 자세히 적어주세요."
              ></textarea>
            </div>
            <button className="w-full bg-primary text-white font-bold py-4 rounded-xl hover:bg-blue-700 transition">
              문의 접수하기
            </button>
          </form>
        </section>
      </div>
    </div>
  );
};

export default SupportPage;
