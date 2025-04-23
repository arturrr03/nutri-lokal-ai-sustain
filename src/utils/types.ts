
export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface ChatHistory {
  messages: Message[];
}

export interface NutritionRecommendation {
  title: string;
  description: string;
  nutritionalValue: string;
  imageUrl?: string;
}

export interface Recipe {
  name: string;
  ingredients: string[];
  instructions: string[];
  nutritionFacts: string;
  imageUrl?: string;
}
