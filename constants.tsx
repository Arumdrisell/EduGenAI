import { Subject, CurriculumUnit } from './types';
import { BookOpen, Star } from 'lucide-react';

// 대한민국 초등학교 정규 교육과정 데이터 (2015/2022 개정 기반)
export const CURRICULUM_DATA: CurriculumUnit[] = [
  // 1학년 1학기
  {
    grade: 1,
    semester: 1,
    subjects: {
      [Subject.KOREAN]: ['1. 바른 자세로 읽고 쓰기', '2. 재미있는 ㄱㄴㄷ', '3. 글자를 만들어요', '4. 기분을 말해요', '5. 다정하게 인사해요', '6. 받침이 있는 글자', '7. 생각을 나타내요', '8. 소리 내어 읽어요', '9. 그림 일기를 써요'],
      [Subject.MATH]: ['1. 9까지의 수', '2. 여러 가지 모양', '3. 덧셈과 뺄셈', '4. 비교하기', '5. 50까지의 수'],
      [Subject.ENGLISH]: [], // 1~2학년 영어 없음
      [Subject.SOCIAL]: [], // 통합교과
      [Subject.SCIENCE]: [], // 통합교과
    }
  },
  // 1학년 2학기
  {
    grade: 1,
    semester: 2,
    subjects: {
      [Subject.KOREAN]: ['1. 소중한 책을 소개해요', '2. 소리 내어 또박또박 읽어요', '3. 문장으로 표현해요', '4. 바른 자세로 말해요', '5. 알맞은 목소리로 읽어요', '6. 고운 말을 해요', '7. 무엇이 중요할까요', '8. 띄어 읽어요', '9. 겪은 일을 글로 써요', '10. 인물의 말과 행동을 상상해요'],
      [Subject.MATH]: ['1. 100까지의 수', '2. 덧셈과 뺄셈(1)', '3. 여러 가지 모양', '4. 덧셈과 뺄셈(2)', '5. 시계 보기와 규칙 찾기', '6. 덧셈과 뺄셈(3)'],
      [Subject.ENGLISH]: [],
      [Subject.SOCIAL]: [],
      [Subject.SCIENCE]: [],
    }
  },
  // 2학년 1학기
  {
    grade: 2,
    semester: 1,
    subjects: {
      [Subject.KOREAN]: ['1. 시를 즐겨요', '2. 자신 있게 말해요', '3. 마음을 나누어요', '4. 말놀이를 해요', '5. 낱말을 바르고 정확하게 써요', '6. 차례대로 말해요', '7. 친구들에게 알려요', '8. 마음을 짐작해요', '9. 생각을 생생하게 나타내요', '10. 다른 사람을 생각해요', '11. 상상의 날개를 펴요'],
      [Subject.MATH]: ['1. 세 자리 수', '2. 여러 가지 도형', '3. 덧셈과 뺄셈', '4. 길이 재기', '5. 분류하기', '6. 곱셈'],
      [Subject.ENGLISH]: [],
      [Subject.SOCIAL]: [],
      [Subject.SCIENCE]: [],
    }
  },
  // 2학년 2학기
  {
    grade: 2,
    semester: 2,
    subjects: {
      [Subject.KOREAN]: ['1. 장면을 떠올리며', '2. 인상 깊었던 일을 써요', '3. 말의 재미를 찾아서', '4. 인물의 마음을 짐작해요', '5. 간직하고 싶은 노래', '6. 자세하게 소개해요', '7. 일이 일어난 차례를 살펴요', '8. 바르게 말해요', '9. 주요 내용을 찾아요', '10. 칭찬하는 말을 주고받아요', '11. 실감 나게 표현해요'],
      [Subject.MATH]: ['1. 네 자리 수', '2. 곱셈구구', '3. 길이 재기', '4. 시각과 시간', '5. 표와 그래프', '6. 규칙 찾기'],
      [Subject.ENGLISH]: [],
      [Subject.SOCIAL]: [],
      [Subject.SCIENCE]: [],
    }
  },
  // 3학년 1학기
  {
    grade: 3,
    semester: 1,
    subjects: {
      [Subject.KOREAN]: ['1. 재미가 톡톡톡', '2. 문단의 짜임', '3. 알맞은 높임 표현', '4. 내 마음을 편지에 담아', '5. 중요한 내용을 적어요', '6. 일이 일어난 까닭', '7. 반갑다, 국어사전', '8. 의견이 있어요', '9. 어떤 내용일까', '10. 문학의 향기'],
      [Subject.MATH]: ['1. 덧셈과 뺄셈', '2. 평면도형', '3. 나눗셈', '4. 곱셈', '5. 길이와 시간', '6. 분수와 소수'],
      [Subject.SOCIAL]: ['1. 우리 고장의 모습', '2. 우리가 알아보는 고장 이야기', '3. 교통과 통신 수단의 변화'],
      [Subject.SCIENCE]: ['1. 과학자는 어떻게 탐구할까요', '2. 물질의 성질', '3. 동물의 한살이', '4. 자석의 이용', '5. 지구의 모습'],
      [Subject.ENGLISH]: ['1. Hello!', '2. What\'s This?', '3. Stand Up, Please', '4. Do You Like Apples?', '5. I Have a Pencil', '6. What Color Is It?'],
    }
  },
  // 3학년 2학기
  {
    grade: 3,
    semester: 2,
    subjects: {
      [Subject.KOREAN]: ['1. 작품을 보고 느낌을 나누어요', '2. 중심 생각을 찾아요', '3. 자신의 경험을 글로 써요', '4. 감동을 나타내요', '5. 바르게 대화해요', '6. 마음을 담아 글을 써요', '7. 글을 읽고 소개해요', '8. 글의 흐름을 생각해요', '9. 작품 속 인물이 되어'],
      [Subject.MATH]: ['1. 곱셈', '2. 나눗셈', '3. 원', '4. 분수', '5. 들이와 무게', '6. 자료의 정리'],
      [Subject.SOCIAL]: ['1. 환경에 따른 다른 삶의 모습', '2. 시대마다 다른 삶의 모습', '3. 가족의 모습과 역할 변화'],
      [Subject.SCIENCE]: ['1. 재미있는 나의 탐구', '2. 동물의 생활', '3. 지표의 변화', '4. 물질의 상태', '5. 소리의 성질'],
      [Subject.ENGLISH]: ['7. Can You Swim?', '8. How Many Apples?', '9. Look at the Whales', '10. Do You Have a Crayon?', '11. It\'s on the Desk'],
    }
  },
  // 4학년 1학기
  {
    grade: 4,
    semester: 1,
    subjects: {
      [Subject.KOREAN]: ['1. 생각과 느낌을 나누어요', '2. 내용을 간추려요', '3. 느낌을 살려 말해요', '4. 일에 대한 의견', '5. 내가 만든 이야기', '6. 회의를 해요', '7. 사전은 내 친구', '8. 이런 제안 어때요', '9. 자랑스러운 한글', '10. 인물의 마음을 알아봐요'],
      [Subject.MATH]: ['1. 큰 수', '2. 각도', '3. 곱셈과 나눗셈', '4. 평면도형의 이동', '5. 막대그래프', '6. 규칙 찾기'],
      [Subject.SOCIAL]: ['1. 지역의 공공 기관과 주민 참여', '2. 우리 지역의 문화유산', '3. 지역의 문제와 해결'],
      [Subject.SCIENCE]: ['1. 과학자는 어떻게 탐구할까요', '2. 지층과 화석', '3. 식물의 한살이', '4. 물체의 무게', '5. 혼합물의 분리'],
      [Subject.ENGLISH]: ['1. My Name Is Eric', '2. Let\'s Play Soccer', '3. I\'m Happy', '4. Don\'t Run', '5. Where Is My Cap?', '6. What Time Is It?'],
    }
  },
  // 4학년 2학기
  {
    grade: 4,
    semester: 2,
    subjects: {
      [Subject.KOREAN]: ['1. 이어질 장면을 생각해요', '2. 마음을 전하는 글을 써요', '3. 바르고 공손하게', '4. 이야기 속 세상', '5. 의견이 드러나게 글을 써요', '6. 본받고 싶은 인물을 찾아봐요', '7. 독서 감상문을 써요', '8. 생각하며 읽어요', '9. 감동을 나누며 읽어요'],
      [Subject.MATH]: ['1. 분수의 덧셈과 뺄셈', '2. 삼각형', '3. 소수의 덧셈과 뺄셈', '4. 사각형', '5. 꺾은선그래프', '6. 다각형'],
      [Subject.SOCIAL]: ['1. 촌락과 도시의 생활 모습', '2. 필요한 것의 생산과 교환', '3. 사회 변화와 문화의 다양성'],
      [Subject.SCIENCE]: ['1. 재미있는 나의 탐구', '2. 식물의 생활', '3. 물의 상태 변화', '4. 그림자와 거울', '5. 화산과 지진'],
      [Subject.ENGLISH]: ['7. Is This Your Watch?', '8. I\'m a Pilot', '9. What Are You Doing?', '10. How Much Is It?', '11. What Day Is It Today?'],
    }
  },
  // 5학년 1학기
  {
    grade: 5,
    semester: 1,
    subjects: {
      [Subject.KOREAN]: ['1. 대화와 공감', '2. 작품을 감상해요', '3. 글을 요약해요', '4. 글쓰기의 과정', '5. 글쓴이의 주장', '6. 토의하여 해결해요', '7. 기행문을 써요', '8. 아는 것과 새롭게 안 것', '9. 여러 가지 방법을 읽어요', '10. 주인공이 되어'],
      [Subject.MATH]: ['1. 자연수의 혼합 계산', '2. 약수와 배수', '3. 규칙과 대응', '4. 약분과 통분', '5. 분수의 덧셈과 뺄셈', '6. 다각형의 둘레와 넓이'],
      [Subject.SOCIAL]: ['1. 국토와 우리 생활', '2. 인권 존중과 정의로운 사회'],
      [Subject.SCIENCE]: ['1. 과학자는 어떻게 탐구할까요', '2. 온도와 열', '3. 태양계와 별', '4. 용해와 용액', '5. 다양한 생물과 우리 생활'],
      [Subject.ENGLISH]: ['1. Where Are You From?', '2. What Do You Do on Weekends?', '3. Can I Take a Picture?', '4. Whose Shoe Is This?', '5. I Like Chicken', '6. May I Drink Some Juice?'],
    }
  },
  // 5학년 2학기
  {
    grade: 5,
    semester: 2,
    subjects: {
      [Subject.KOREAN]: ['1. 마음을 나누며 대화해요', '2. 지식이나 경험을 활용해요', '3. 의견을 조정하며 토의해요', '4. 겪은 일을 써요', '5. 여러 가지 매체 자료', '6. 타당성을 생각하며 듣어요', '7. 중요한 내용을 요약해요', '8. 우리말과 우리글을 지켜요'],
      [Subject.MATH]: ['1. 수의 범위와 어림하기', '2. 분수의 곱셈', '3. 합동과 대칭', '4. 소수의 곱셈', '5. 직육면체', '6. 평균과 가능성'],
      [Subject.SOCIAL]: ['1. 옛 사람들의 삶과 문화', '2. 사회의 새로운 변화와 오늘날의 우리'],
      [Subject.SCIENCE]: ['1. 재미있는 나의 탐구', '2. 생물과 환경', '3. 날씨와 우리 생활', '4. 물체의 운동', '5. 산과 염기'],
      [Subject.ENGLISH]: ['7. She Is Tall', '8. When Is Your Birthday?', '9. Where Is the Museum?', '10. Do You Want Some Milk?', '11. What Did You Do?'],
    }
  },
  // 6학년 1학기
  {
    grade: 6,
    semester: 1,
    subjects: {
      [Subject.KOREAN]: ['1. 비유하는 표현', '2. 이야기를 간추려요', '3. 짜임새 있게 구성해요', '4. 주장을 펼쳐요', '5. 속담을 활용해요', '6. 내용을 추론해요', '7. 우리말을 가꾸어요', '8. 인물의 삶을 찾아서', '9. 마음을 나누는 글을 써요'],
      [Subject.MATH]: ['1. 분수의 나눗셈', '2. 각기둥과 각뿔', '3. 소수의 나눗셈', '4. 비와 비율', '5. 여러 가지 그래프', '6. 직육면체의 부피와 겉넓이'],
      [Subject.SOCIAL]: ['1. 우리나라의 정치 발전', '2. 우리나라의 경제 발전'],
      [Subject.SCIENCE]: ['1. 과학자는 어떻게 탐구할까요', '2. 지구와 달의 운동', '3. 여러 가지 기체', '4. 식물의 구조와 기능', '5. 빛과 렌즈'],
      [Subject.ENGLISH]: ['1. What Grade Are You In?', '2. I Have a Headache', '3. When Is Earth Day?', '4. Where Is the Post Office?', '5. May I Come In?', '6. What Will You Do?'],
    }
  },
  // 6학년 2학기
  {
    grade: 6,
    semester: 2,
    subjects: {
      [Subject.KOREAN]: ['1. 작품 속 인물과 나', '2. 관용 표현을 활용해요', '3. 타당한 근거로 글을 써요', '4. 효과적으로 발표해요', '5. 글에 담긴 생각과 비교해요', '6. 정보와 표현 판단하기', '7. 글 고쳐 쓰기', '8. 작품으로 경험하기'],
      [Subject.MATH]: ['1. 분수의 나눗셈', '2. 소수의 나눗셈', '3. 공간과 입체', '4. 비례식과 비례배분', '5. 원의 넓이', '6. 원기둥, 원뿔, 구'],
      [Subject.SOCIAL]: ['1. 세계의 여러 나라들', '2. 통일 한국의 미래와 지구촌의 평화'],
      [Subject.SCIENCE]: ['1. 재미있는 나의 탐구', '2. 전기의 이용', '3. 계절의 변화', '4. 연소와 소화', '5. 우리 몸의 구조와 기능', '6. 에너지와 생활'],
      [Subject.ENGLISH]: ['7. How Often Do You Exercise?', '8. I\'m Stronger Than You', '9. Why Are You Happy?', '10. Do You Know about Dokdo?', '11. What Do You Want to Be?'],
    }
  }
];

export const MOCK_REVIEWS = [
  {
    id: 1,
    user: "지민맘",
    rating: 5,
    content: "급하게 단원평가 준비해야 했는데 10초 만에 뚝딱! 해설이 선생님처럼 친절해요.",
    avatar: "https://picsum.photos/50/50?random=1"
  },
  {
    id: 2,
    user: "초4 아들맘",
    rating: 5,
    content: "수학 도형 문제도 그림으로 나와서 놀랐어요. 아이가 오답노트 보면서 스스로 공부합니다.",
    avatar: "https://picsum.photos/50/50?random=2"
  },
  {
    id: 3,
    user: "워킹맘",
    rating: 4,
    content: "학원 숙제 외에 부족한 단원만 골라서 풀릴 수 있어서 정말 효율적이에요.",
    avatar: "https://picsum.photos/50/50?random=3"
  }
];

export const LandingHero = () => (
  <div className="text-center py-12 px-4 print:hidden">
    <div className="inline-block p-3 rounded-full bg-blue-100 text-blue-600 mb-4">
      <BookOpen className="w-8 h-8" />
    </div>
    <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
      엄마표 학습, <span className="text-blue-600">AI 선생님</span>과 함께하세요
    </h1>
    <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
      단원평가, 수행평가 대비 걱정 끝! <br/>
      자녀의 진도에 딱 맞는 맞춤형 문제지를 10초 만에 생성합니다.
    </p>
    
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-12 text-left">
      {MOCK_REVIEWS.map(review => (
        <div key={review.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center mb-4">
            <img src={review.avatar} alt="User" className="w-10 h-10 rounded-full mr-3" />
            <div>
              <p className="font-semibold text-sm">{review.user}</p>
              <div className="flex text-yellow-400">
                {[...Array(review.rating)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
              </div>
            </div>
          </div>
          <p className="text-gray-600 text-sm">"{review.content}"</p>
        </div>
      ))}
    </div>
  </div>
);