export interface FAQ {
  id: number;
  question: string;
  answer: string;
}

export interface Question {
  id: number;
  question: string;
  answer: string;
}

export interface FAQCategory {
  id: number;
  category: string;
  questions: Question[];
}

export interface FAQResponse {
  success: boolean;
  data: FAQCategory[];
  message?: string;
}