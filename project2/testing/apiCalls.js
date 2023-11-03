const axios = require("axios");

const api = axios.create({
  baseURL: "https://cross-platform.rp.devfactory.com",
});

const request = async (url, method = "get") => {
  try {
    const response = await api.request({
      url,
      method,
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

const getTheNextQuestion = async () => {
  return request(`/for_you`);
};

const getQuestionAnswer = async (questionId) => {
  return request(`/reveal?id=${questionId}`);
};

// New function
const getANewQuestionWithTheCorrectAnswer = async () => {
  try {
    const questionRes = await getTheNextQuestion();
    // console.log(questionRes);
    const answerRes = await getQuestionAnswer(questionRes.id);
    // console.log(answerRes);

    const newQuestionWithAnswer = {
      ...questionRes,
      ...answerRes,
    };
    return newQuestionWithAnswer;
  } catch (error) {
    console.log("ERR: ");
    console.log("ERROR: ", error);
  }
};

const getAmountOfDataV02 = async (numTimes) => {
  const getQuestionsPromises = [];

  for (let i = 0; i < numTimes; i++) {
    getQuestionsPromises.push(getTheNextQuestion());
  }
  // console.log(getQuestions)
  // console.log(getQuestions[0])

  try {
    const questionsRes = await Promise.all(getQuestionsPromises);
    // console.log("ALL REQUESTS COMPLETED SUCCESSFULLY");
    // getting the answer for each question
    const getAnswersPromises = questionsRes.map(({ id }) =>
      getQuestionAnswer(id)
    );

    try {
      const answersRes = await Promise.all(getAnswersPromises);

      const finalResult = questionsRes.map((question, i) => {
        return {
          ...question,
          correct_options_id: answersRes[i].correct_options[0].id,
        };
      });

      console.log("V02 FINISHED:", finalResult.length);

      console.log("Duration:", checkPerformance(moment_1), " SEC");

      // console.log("Results:", finalResult.length);
      // console.log("Results:", finalResult);

      // console.log("Results:", questionsRes.length);
      // console.log("Results:", questionsRes);
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

const getAmountOfDataV01 = async (amount = 100) => {
  const entireData = [];
  for (let i = 0; i < amount; i++) {
    const newQuestionWithAnswer = await getANewQuestionWithTheCorrectAnswer();
    entireData.push(newQuestionWithAnswer);
  }
  console.log("V01 FINISHED");
  // console.log("entireNewData", entireData);
  console.log("entireNewData", entireData.length);
  console.log("Duration:", checkPerformance(moment_1), " SEC");

  return entireData;
};
// getAmountOfData(1);

/* 
=========================
*/
// ! performance functions
const checkPerformance = (beforeTheCall) => {
  // const currentMomentTime = performance.now();
  const moment_2 = new Date();
  // console.log("MOMENT_2=>", moment_2);
  console.log("MOMENT_2=>", getCurrentTime(moment_2));

  // getCurrentTime();
  const durationInSecond = (moment_2 - beforeTheCall) / 1000;
  return durationInSecond;
  // return result.toFixed(2);
};

const getCurrentTime = (currentMoment) => {
  // const newDate = new Date();
  const result = `${currentMoment.getHours()}:${currentMoment.getMinutes()}:${currentMoment.getSeconds()}`;
  return result;
};
// const startTime = performance.now();
// const startTime = Date.now();
const moment_1 = new Date();
// console.log("MOMENT_1=>", moment_1);
console.log("MOMENT_1=>", getCurrentTime(moment_1));

/* 
=========================
*/

let times = 1
 times = 10; // 1.14
// times = 20; // 1.2
// times = 40; // 1.3
times = 50; // 1.3
// times = 60; // 1.5
// times = 80; // 1.44
// times = 100; // 1.6
// getAmountOfDataV01(times); // 10 sec
getAmountOfDataV02(times); // 100 => 100 sec
