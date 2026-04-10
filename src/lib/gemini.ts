import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export interface Question {
  id: string;
  subject: string;
  topic: string;
  difficulty: "Easy" | "Medium" | "Hard";
  testType: "SAT" | "ACT";
  standard: string;
  questionText: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  validationScore: number;
}

export async function generateQuestion(params: {
  subject: string;
  difficulty: string;
  testType: string;
}): Promise<Question> {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Generate a high-quality ${params.testType} ${params.subject} question. 
    Difficulty level: ${params.difficulty}. 
    Include the official standard it aligns with (e.g., "SAT Heart of Algebra" or "ACT Plane Geometry").
    Provide 4 options, the correct answer, and a detailed explanation.
    Ensure the question is rigorous and follows official test patterns.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          id: { type: Type.STRING },
          subject: { type: Type.STRING },
          topic: { type: Type.STRING },
          difficulty: { type: Type.STRING, enum: ["Easy", "Medium", "Hard"] },
          testType: { type: Type.STRING, enum: ["SAT", "ACT"] },
          standard: { type: Type.STRING },
          questionText: { type: Type.STRING },
          options: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            minItems: 4,
            maxItems: 4,
          },
          correctAnswer: { type: Type.STRING },
          explanation: { type: Type.STRING },
          validationScore: { type: Type.NUMBER, description: "A score from 0 to 100 representing content accuracy and alignment." },
        },
        required: ["id", "subject", "topic", "difficulty", "testType", "standard", "questionText", "options", "correctAnswer", "explanation", "validationScore"],
      },
    },
  });

  try {
    return JSON.parse(response.text);
  } catch (e) {
    console.error("Failed to parse Gemini response", e);
    throw new Error("Failed to generate a valid question.");
  }
}
