
export interface NavItem {
  label: string;
  path: string;
}

export enum Subject {
  KOREAN = '국어',
  ENGLISH = '영어',
  MATH = '수학',
  SOCIAL = '사회',
  SCIENCE = '과학'
}

export enum Difficulty {
  EASY = '쉬움',
  MEDIUM = '보통',
  HARD = '어려움'
}

export interface Question {
  id: string;
  questionText: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  svgImage?: string; // Optional field for SVG code
  listeningText?: string; // Optional field for English passages/dialogues
}

export interface GeneratedExam {
  grade: string;
  subject: string;
  unit: string;
  questions: Question[];
}

export interface Review {
  id: number;
  name: string;
  role: string;
  content: string;
  rating: number;
}