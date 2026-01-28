
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { Role } from "../types";

// Fix: Initializing GoogleGenAI client with named parameter 'apiKey' using process.env.API_KEY directly.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getGeminiResponse = async (
  history: { role: Role; content: string }[],
  onChunk: (text: string) => void
) => {
  // Fix: Using gemini-3-flash-preview for general assistant tasks.
  const model = 'gemini-3-flash-preview';
  
  // Fix: Mapping history to the contents structure expected by the SDK.
  const contents = history.map(h => ({
    role: h.role,
    parts: [{ text: h.content }]
  }));

  try {
    // Fix: Using ai.models.generateContentStream to support history and provide streaming responses.
    const result = await ai.models.generateContentStream({
      model,
      contents,
      config: {
        systemInstruction: "你是一个专业的智能中台助手，具备财务、法务、招投标等领域的深度知识。请使用礼貌、清晰且富有洞察力的语言回复用户。你的色调设计理念是莫兰迪橙色系，追求优雅、稳重和高效。请根据用户的需求，提供精准的帮助。",
      }
    });

    let fullText = "";
    for await (const chunk of result) {
      // Fix: Accessing the .text property directly from the chunk as per @google/genai guidelines.
      const c = chunk as GenerateContentResponse;
      const text = c.text;
      if (text) {
        fullText += text;
        onChunk(text);
      }
    }
    return fullText;
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};
