
import { Message } from "../utils/types";

const API_KEY = "AIzaSyBDRTKdgBkadnzm4WzwbXmZh7nHbUUmB90";
const API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent";

// System prompt to define the chatbot's behavior
const SYSTEM_PROMPT = `You are NutriLokal, a nutritional expert chatbot specialized in Indonesian local foods. 
Your mission is to help Indonesians improve their nutrition with affordable local ingredients.
Provide culturally relevant, practical advice about:
- Nutritional recommendations for local Indonesian foods
- Affordable recipes using available ingredients
- Guidance for specific nutritional needs (pregnant women, children, elderly)
- Educational content about balanced diets with local ingredients
- Addressing malnutrition issues like stunting and anemia

Keep responses helpful, accurate, and focused on promoting healthy eating with local ingredients.
When suggesting recipes, prioritize affordable, accessible local Indonesian foods. Don't use symbols or emojis in your responses.`;

export async function sendMessageToGemini(messages: Message[]): Promise<string> {
  try {
    // Format messages for Gemini API
    const formattedMessages = messages.map(msg => ({
      role: msg.role === "assistant" ? "model" : "user",
      parts: [{ text: msg.content }]
    }));

    // Add system prompt as the first message
    const requestMessages = [
      {
        role: "user",
        parts: [{ text: SYSTEM_PROMPT }]
      },
      ...formattedMessages
    ];

    const response = await fetch(`${API_URL}?key=${API_KEY}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        contents: requestMessages,
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 1024,
        }
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Gemini API error:", errorData);
      throw new Error(`Error communicating with Gemini: ${response.statusText}`);
    }

    const data = await response.json();
    
    // Extract the response text from Gemini
    const responseText = data.candidates[0]?.content?.parts[0]?.text || 
      "I apologize, but I'm having trouble generating a response right now.";
    
    return responseText;
  } catch (error) {
    console.error("Error sending message to Gemini:", error);
    return "I encountered an error while processing your request. Please try again later.";
  }
}
