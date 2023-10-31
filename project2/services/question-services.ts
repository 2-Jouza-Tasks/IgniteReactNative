import { request } from "./api";

export interface Question {
  type: string;
  id: number;
  playlist: string;
  description: string;
  image: string;
  question: string;
  options: Option[];
  user: User;
}

export interface Option {
  id: string;
  answer: string;
}

export interface User {
  name: string;
  avatar: string;
}

export interface QuestionAnswer {
  // question id
  id: number;
  correct_options: Option[];
}

export const getTheNextQuestion = async () => {
  return request<Question>(`/for_you`);
};

export const getQuestionAnswer = async (questionId: number) => {
  return request<QuestionAnswer>(`/reveal?id=${questionId}`);
};
