import { GoogleGenerativeAI } from "@google/generative-ai";

// Get API key from environment variables
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || process.env.GEMINI_API_KEY;
if (!API_KEY) {
  throw new Error("Please set GEMINI_API_KEY in your .env file");
}

const genAI = new GoogleGenerativeAI(API_KEY);

// System instruction focused on direct web scraping assistance
const SYSTEM_PROMPT = 
  "You are WebScraper AI, an intelligent assistant specialized in web scraping and data extraction. Your role is to help users extract, analyze, and understand data from websites efficiently. " +
  "Key Guidelines: Keep responses SHORT and CONCISE - aim for brevity while maintaining usefulness. Be direct and action-oriented - deliver results or answers with minimal text. " +
  "Respond in words only (plain language). Do NOT output JSON, XML, YAML, HTML, or code blocks unless explicitly requested. Do not use backticks or fenced code by default. " +
  "Avoid heavy formatting. Do not use tables or Markdown headings unless the user asks for them. Bullet points are okay when they improve clarity. " +
  "Avoid verbose explanations - get straight to the point. Provide actionable insights and ready-to-use guidance in the most compact form possible.";

export async function askGemini(prompt: string): Promise<string> {
  try {
    // Create a model with scraping-focused configuration
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash-lite",
      systemInstruction: SYSTEM_PROMPT,
      generationConfig: {
        temperature: 0.3,
        maxOutputTokens: 512,
      },
    });

    // Start chat and send message
    const chat = model.startChat();
    const result = await chat.sendMessage(prompt);
    
    return result.response.text();
  } catch (error) {
    console.error('Gemini API Error:', error);
    throw new Error('Failed to get response from Gemini AI');
  }
}

// Example usage function for testing
export async function testScrapingQuery(): Promise<void> {
  try {
    const response = await askGemini(
      "In 4 bullets, explain the best practices for web scraping without getting blocked."
    );
    console.log('Gemini Response:', response);
  } catch (error) {
    console.error('Test failed:', error);
  }
}

// For direct Node.js execution
if (typeof require !== 'undefined' && require.main === module) {
  testScrapingQuery();
}