
import { GoogleGenAI } from "@google/genai";

export const enhanceDescription = async (details: {
  title: string;
  type: string;
  city: string;
  bedrooms: number;
  area: number;
  bullets: string;
}): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  
  const prompt = `
    As a professional real estate copywriter, write a compelling property description for a direct sale by owner.
    THE DESCRIPTION MUST BE IN HEBREW.
    
    Property Details:
    - Title: ${details.title}
    - Type: ${details.type}
    - Location: ${details.city}
    - Bedrooms: ${details.bedrooms}
    - Size: ${details.area} sqm
    - Key Features: ${details.bullets}

    The description should be professional, welcoming, and highlight the benefit of buying directly from the owner (no agent commission - ללא עמלת תיווך). 
    The style should be modern and attractive for Hebrew-speaking buyers.
    Keep it around 150-200 words in Hebrew.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });
    return response.text || "לא ניתן היה ליצור תיאור.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "שגיאה ביצירת תיאור AI. אנא כתבו ידנית.";
  }
};
