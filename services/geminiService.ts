import { GoogleGenAI, Type } from "@google/genai";
import { ExamConfig, Question } from "../types";

// Generate a random ID for client-side keys
const generateId = () => Math.random().toString(36).substring(2, 9);

export const generateExamQuestions = async (config: ExamConfig): Promise<Question[]> => {
  const apiKey = config.apiKey || process.env.API_KEY;

  if (!apiKey) {
    throw new Error("API Key is missing. Please enter your Google Gemini API Key.");
  }

  const ai = new GoogleGenAI({ apiKey });

  // Schema definition without explicit type annotation to avoid import issues
  const questionSchema = {
    type: Type.OBJECT,
    properties: {
      listeningText: {
        type: Type.STRING,
        description: "English listening script. Required for English subject, otherwise null.",
        nullable: true,
      },
      questionText: {
        type: Type.STRING,
        description: "The main question text in Korean.",
      },
      options: {
        type: Type.ARRAY,
        items: { type: Type.STRING },
        description: "An array of 4 multiple choice options.",
      },
      correctAnswer: {
        type: Type.STRING,
        description: "The exact string of the correct answer from the options.",
      },
      explanation: {
        type: Type.STRING,
        description: "Detailed explanation in Korean, polite tone (해요체).",
      },
      svgImage: {
        type: Type.STRING,
        description: "SVG code string if the question requires a visual (geometry, graphs, clocks). Null otherwise.",
        nullable: true,
      },
    },
    required: ["questionText", "options", "correctAnswer", "explanation"],
  };

  const responseSchema = {
    type: Type.ARRAY,
    items: questionSchema,
  };

  const prompt = `
    You are a professional and friendly Korean elementary school teacher.
    Create a ${config.questionCount}-question exam for:
    - Grade: ${config.grade}
    - Subject: ${config.subject}
    - Unit: ${config.unit}
    - Difficulty: ${config.difficulty}

    Directives:
    1. Language: All explanations and directives must be in Korean (polite '해요' style).
    2. **CURRICULUM INTENT (CRITICAL)**: The 'Unit' name is often just a representative title. You MUST infer the **Core Learning Objectives** (Key Expressions, Vocabulary, Grammar) for that grade level.
       - **Do NOT** generate questions limited only to the specific noun in the title. Expand to the full semantic category of the lesson.
       - **Example 1**: If Unit is "I'm a Pilot", the topic is **Occupations**. You MUST include various jobs like Doctor, Teacher, Cook, Police Officer, Singer, etc., not just 'Pilot'. Key Expression: "What do you want to be?".
       - **Example 2**: If Unit is "Do You Like Apples?", the topic is **Food Preferences**. Include bananas, grapes, chicken, pizza, etc.
       - **Example 3**: If Unit is "Where is the Post Office?", the topic is **Directions & Places**. Include Bank, Museum, Hospital, "Go straight", "Turn left".
    3. English Subject:
       - 'listeningText': Create a simple English script suitable for the grade level using the **Key Expressions** of the unit.
         **CRITICAL**: If it is a dialogue, **YOU MUST distinguish speakers using labels like "A:", "B:", "Mom:", "Dad:", "Boy:", "Girl:" AND put each speaker's turn on a NEW LINE.**
         (Example: 
         Boy: What do you want to be?
         Girl: I want to be a teacher.)
       - 'questionText': Write the question in Korean asking about the content of 'listeningText'.
       - **CRITICAL**: For English listening questions, the Korean 'questionText' MUST NOT be a translation of the 'listeningText'. It must be a comprehension question asking about details inferred from the 'listeningText'.
       - **EXPLANATION FORMAT**: For English questions, you MUST use the following **Interleaved Format** for better readability:
         [대본 및 해석]
         Speaker A: English Sentence
         (Korean Translation)
         Speaker B: English Sentence
         (Korean Translation)
         
         [풀이]
         (Detailed explanation of why the answer is correct)
    4. Math/Science: If the question involves geometry, graphs, or time, you MUST generate valid SVG code in the 'svgImage' field. The SVG should be simple, clear, black and white lines, viewbox 0 0 300 300.
    5. Options: Provide exactly 4 options.
    6. Mistakes: Design distractors (wrong answers) based on common mistakes students make.
    7. **LOGIC VERIFICATION (CRITICAL)**: Before outputting the JSON, verify your logic step-by-step.
       - **Dates/Days**: If today is Saturday, tomorrow is Sunday (not Monday). Check calendar logic carefully.
       - **Math**: Double-check all arithmetic calculations in the explanation.
       - **Consistency**: Ensure the 'correctAnswer' matches the logic in 'explanation'.
    8. Output: Return ONLY the JSON array.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        temperature: 0.6, // Slightly increased for variety in vocabulary
      },
    });

    const jsonText = response.text;
    if (!jsonText) throw new Error("No data returned from AI");

    const parsedQuestions = JSON.parse(jsonText) as Omit<Question, 'id'>[];
    
    // Add IDs for React rendering
    return parsedQuestions.map(q => ({ ...q, id: generateId() }));

  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};