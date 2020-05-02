import {test1} from './quizzes/test1.js'

// add your tests here
export const quizzesSet: [string] = [test1];

// tests have to implement interfaces:
export interface QuizQuestionWithAnswer {
  question: string,
  answer: number
}

export interface Quiz {
  name: string,
  introduction: string,
  questionsWithAnswers: [QuizQuestionWithAnswer]
}
