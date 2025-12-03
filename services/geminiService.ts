
import { GoogleGenAI, Type, Schema } from "@google/genai";
import { Question } from "../types";
import CryptoJS from "crypto-js";

const LOCAL_STORAGE_KEY = 'edu_gen_api_key';
const ENCRYPTION_SECRET = 'EduGen_Client_Secret_2024_Secure'; // Client-side obfuscation key

// Helper to manage API Key with Encryption
export const getStoredApiKey = (): string | null => {
  const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
  
  if (stored) {
    try {
      // Attempt to decrypt the stored key
      const bytes = CryptoJS.AES.decrypt(stored, ENCRYPTION_SECRET);
      const decrypted = bytes.toString(CryptoJS.enc.Utf8);
      
      // If decryption yields a string, return it.
      if (decrypted) return decrypted;
    } catch (e) {
      console.warn("API Key decryption failed (possibly old format). Clearing storage.");
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    }
  }
  
  // Fallback to environment variable if available
  return process.env.API_KEY || null;
};

export const saveStoredApiKey = (key: string) => {
  if (!key) return;
  // Encrypt the key before saving to localStorage
  const encrypted = CryptoJS.AES.encrypt(key, ENCRYPTION_SECRET).toString();
  localStorage.setItem(LOCAL_STORAGE_KEY, encrypted);
};

export const removeStoredApiKey = () => {
  localStorage.removeItem(LOCAL_STORAGE_KEY);
};

const questionSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    questions: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          listeningText: { 
            type: Type.STRING, 
            description: "For English subjects: The English content (dialogue, sentence, or word) that should be read aloud or shown as the main text. For non-English subjects, leave empty." 
          },
          questionText: { 
            type: Type.STRING, 
            description: "The question instruction. For English subjects, this should be in Korean (e.g., '다음을 듣고 알맞은 대답을 고르시오'). For other subjects, this is the main question." 
          },
          options: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "4 multiple choice options."
          },
          correctAnswer: { type: Type.STRING, description: "The correct answer text (must match one of the options)." },
          explanation: { type: Type.STRING, description: "Detailed explanation of why the answer is correct." },
          svgImage: { 
            type: Type.STRING, 
            description: "Optional: A valid, self-contained SVG XML string (starting with <svg> and ending with </svg>) to visualize the problem (e.g., a triangle, a clock, a bar graph). Do NOT use markdown code blocks, just the raw SVG string." 
          }
        },
        required: ["questionText", "options", "correctAnswer", "explanation"]
      }
    }
  }
};

export const generateQuestionsAI = async (
  grade: string,
  semester: string, // Added semester
  subject: string,
  unit: string,
  difficulty: string
): Promise<Question[]> => {
  const apiKey = getStoredApiKey();

  if (!apiKey) {
    throw new Error("API 키가 설정되지 않았습니다. 설정 메뉴에서 API 키를 입력해주세요.");
  }

  // Instantiate AI client dynamically with the user's key
  const ai = new GoogleGenAI({ apiKey: apiKey });

  try {
    const prompt = `
      Create 5 multiple-choice questions for South Korean Elementary School level.
      Grade: ${grade}
      Semester: ${semester}
      Subject: ${subject}
      Topic/Unit: ${unit}
      Difficulty: ${difficulty}
      Language: Korean (Korean context).
      
      IMPORTANT INSTRUCTIONS FOR ENGLISH SUBJECT:
      1. If the Subject is '영어' (English):
         - You MUST provide the English dialogue, sentence, or word in the 'listeningText' field.
         - The 'questionText' MUST be the instruction in Korean (e.g., "다음을 듣고 이어질 말로 알맞은 것을 고르세요", "다음 그림에 알맞은 단어를 고르세요").
         - Options should be in English.
      2. If the Subject is NOT English:
         - Leave 'listeningText' empty.
         - Put the entire question in 'questionText'.

      IMPORTANT INSTRUCTIONS FOR VISUALS:
      1. If the question text includes phrases like "next picture", "figure below", "look at the image", "graph", "map", or "clock", or if the question requires a visual reference (Geometry, Time, Data), you **MUST** generate a valid SVG code string in the 'svgImage' field.
      2. Do NOT simply describe the image in text; you MUST provide the <svg> code.
      3. The SVG should be simple, clear, black and white lines (stroke-width: 2), and fit within a 'viewBox="0 0 300 300"'.
      4. If no visual is needed (text-only question), leave the 'svgImage' field empty or null.
      
      Ensure the questions are educational, age-appropriate, and factually correct.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: questionSchema,
        systemInstruction: "You are an expert elementary school teacher in South Korea. Create high-quality exam questions. For English questions, separate the listening content from the Korean instruction. Always generate SVG images when the question refers to visual elements."
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");

    const parsed = JSON.parse(text);
    
    // Add IDs to questions
    return parsed.questions.map((q: any, idx: number) => ({
      ...q,
      id: `q-${Date.now()}-${idx}`
    }));

  } catch (error: any) {
    console.error("Gemini API Error:", error);
    if (error.message?.includes('401') || error.message?.includes('API key')) {
        throw new Error("API 키가 유효하지 않습니다. 키를 확인해주세요.");
    }
    throw new Error("문제 생성에 실패했습니다. 다시 시도해주세요.");
  }
};
