
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getAIResponse = async (prompt: string, context: string = "") => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `${context ? `Context: ${context}\n\n` : ''}User Query: ${prompt}`,
      config: {
        systemInstruction: "You are SMARTX AI, a helpful educational assistant for students, parents, and teachers in the SMARTX ecosystem. Be concise, encouraging, and accurate.",
        temperature: 0.7,
      },
    });
    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm sorry, I'm having trouble connecting right now. Please try again later.";
  }
};

export const getQuickReplies = async (lastMessage: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `The last message received in a student-tutor chat is: "${lastMessage}". Suggest 3 very short, helpful quick replies for the user. Return ONLY a comma-separated list of 3 suggestions, nothing else.`,
      config: {
        systemInstruction: "You are a helpful chat assistant. Provide short, professional, and relevant response suggestions for an educational app.",
        temperature: 0.5,
      },
    });
    const text = response.text || "";
    return text.split(',').map(s => s.trim()).filter(s => s.length > 0).slice(0, 3);
  } catch (error) {
    console.error("Gemini Quick Reply Error:", error);
    return [];
  }
};

export const getChatInsight = async (chatHistory: string, action: 'summarize' | 'explain' | 'draft') => {
  try {
    const prompts = {
      summarize: "Summarize this educational chat conversation briefly, highlighting the key takeaway or next steps.",
      explain: "Explain the main educational concept or topic discussed in this chat in simple terms for a student.",
      draft: "Draft a polite and professional follow-up reply for the user based on this chat context."
    };

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Chat History:\n${chatHistory}\n\nTask: ${prompts[action]}`,
      config: {
        systemInstruction: "You are a specialized Chat Assistant for SMARTX. Provide concise, helpful insights.",
        temperature: 0.6,
      },
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Chat Insight Error:", error);
    return "I couldn't process this insight right now.";
  }
};

export const getTutorRecommendation = async (studentPreferences: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: `Based on these preferences: ${studentPreferences}, suggest 3 ideal tutor profiles and learning strategies. Return in plain text.`,
      config: {
        systemInstruction: "You are an expert education counselor matching students with tutors.",
      }
    });
    return response.text;
  } catch (error) {
    return "Error generating recommendations.";
  }
};
