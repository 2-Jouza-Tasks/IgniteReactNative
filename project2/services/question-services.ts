import { request } from "./api";

export interface User {
  name: string;
  avatar: string;
}

export interface Option {
  id: string;
  answer: string;
}
export interface QuestionAnswer {
  // question id
  id: number;
  correct_options: Option[];
}

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

const ERROR_MESSAGES = {
  baseError: "One or more requests failed,while",
  getTheNextQuestion:
    "One or more requests failed,while GETTING_A_NEW_QUESTION",
  getQuestionAnswer:
    "One or more requests failed,while GETTING_QUESTION_ANSWER",
};

export interface QuestionWithTheCorrectAnswer extends Question {
  correct_option_id: string;
}

export const getTheNextQuestion = async (): Promise<Question> => {
  return request(`/for_you`);
};

export const getQuestionAnswer = async (
  questionId: number
): Promise<QuestionAnswer> => {
  return request(`/reveal?id=${questionId}`);
};

// <QuestionWithTheCorrectAnswer>
export const getAmountOfDataV02 = async (
  numTimes: number
): Promise<QuestionWithTheCorrectAnswer[]> => {
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
          correct_option_id: answersRes[i].correct_options[0].id,
        };
      });

      return finalResult;
    } catch (error) {
      const errorMessage = `${ERROR_MESSAGES.baseError} ${ERROR_MESSAGES.getTheNextQuestion}`;
      // console.log(errorMessage);
      throw new Error(errorMessage);
    }
  } catch (error) {
    const errorMessage = `${ERROR_MESSAGES.baseError} ${ERROR_MESSAGES.getQuestionAnswer}`;
    // console.log(errorMessage);
    throw new Error(errorMessage);
  }
};
