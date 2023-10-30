import { request } from './api';


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

export interface AnswerOption {
  id: string;
  answer: string;
}

export interface QuestionAnswer {
  id: number;
  correct_options: AnswerOption[];
}

export const getNextQuestion = async () => {
  return request<Question>(`/for_you`);
};


export const getQuestionAnswer = async (questionId: number) => {
  return request<QuestionAnswer>(`/reveal?id${questionId}`);
};

