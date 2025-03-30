import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.EXPO_PUBLIC_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

// ✅ Wrap inside an async function and export it properly
export const initializeChatSession = async () => {
  return await model.startChat({ generationConfig, history: [] });
};
