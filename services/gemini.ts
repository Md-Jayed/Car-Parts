
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const geminiService = {
  /**
   * Smart Search: Parses natural language queries into structured search parameters
   */
  async parseSearchQuery(query: string) {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Parse the following car parts search query into JSON: "${query}". 
      Expected JSON keys: "make", "model", "year", "partType", "urgency". 
      If any part is missing, use null.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            make: { type: Type.STRING },
            model: { type: Type.STRING },
            year: { type: Type.NUMBER },
            partType: { type: Type.STRING },
            urgency: { type: Type.STRING }
          }
        }
      }
    });
    
    try {
      return JSON.parse(response.text || '{}');
    } catch (e) {
      return null;
    }
  },

  /**
   * Visual Search: Identifies a part from a base64 image
   */
  async identifyPartFromImage(base64Image: string) {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          { inlineData: { data: base64Image, mimeType: 'image/jpeg' } },
          { text: "Identify this car part and suggest what it might be used for. Be concise." }
        ]
      }
    });
    return response.text;
  },

  /**
   * Virtual Assistant: Chat functionality for installation or order support
   */
  async getChatResponse(history: {role: 'user'|'model', text: string}[], message: string) {
    const chat = ai.chats.create({
      model: 'gemini-3-flash-preview',
      config: {
        systemInstruction: "You are an expert automotive virtual assistant. Provide helpful, accurate, and safety-conscious advice for car part installation and identification. Keep answers concise."
      }
    });
    
    // We would normally feed history here if the API supported it in this specific way
    // For now, simple prompt
    const response = await chat.sendMessage({ message });
    return response.text;
  }
};
