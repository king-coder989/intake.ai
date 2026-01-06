import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY || "");

export interface ComplaintAnalysis {
  category: string;
  urgency: "low" | "medium" | "high" | "critical";
  summary: string;
}

export async function analyzeComplaint(text: string): Promise<ComplaintAnalysis> {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = `Analyze this citizen complaint and respond with ONLY valid JSON (no markdown):
{
  "category": "<one of: Infrastructure, Sanitation, Public Safety, Utilities, Healthcare, Education, Administrative, Other>",
  "urgency": "<one of: low, medium, high, critical>",
  "summary": "<brief 1-2 sentence summary>"
}

Complaint: "${text}"`;

  const result = await model.generateContent(prompt);
  const response = result.response.text().trim();
  
  // Parse JSON from response
  const jsonMatch = response.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    throw new Error("Failed to parse AI response");
  }
  
  return JSON.parse(jsonMatch[0]) as ComplaintAnalysis;
}
