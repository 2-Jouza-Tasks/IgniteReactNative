import { request } from "./api";

export interface QuestionWithTheCorrectAnswer {
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

export interface QuestionWithTheCorrectAnswer {
  type: string;
  id: number;
  playlist: string;
  description: string;
  image: string;
  question: string;
  options: Option[];
  user: User;
  correct_options: string;
}

export const getTheNextQuestion = async () => {
  return request<QuestionWithTheCorrectAnswer>(`/for_you`);
};

export const getQuestionAnswer = async (questionId: number) => {
  return request<QuestionAnswer>(`/reveal?id=${questionId}`);
};


// <QuestionWithTheCorrectAnswer>
export const getAmountOfDataV02 = async (numTimes: number) =>{
  const getQuestionsPromises = [];
  for (let i = 0; i < numTimes; i++) {
    getQuestionsPromises.push(getTheNextQuestion());
  }

  try {
    const questionsRes = await Promise.all(getQuestionsPromises);
    const getAnswersPromises = questionsRes.map(({ id }) =>
      getQuestionAnswer(id)
    );

    // getting the answer for each question
    try {
      const answersRes = await Promise.all(getAnswersPromises);

      const finalResult = questionsRes.map((question, i) => {
        return {
          ...question,
          correct_options_id: answersRes[i].correct_options[0].id,
        };
      });

      return finalResult;
    } catch (error) {
      console.error(
        "One or more requests GETTING THE ANSWER has failed:",
        error
      );
    }
  } catch (error) {
    console.error(
      "One or more requests GETTING NEW QUESTION has failed:",
      error
    );
  }
};
