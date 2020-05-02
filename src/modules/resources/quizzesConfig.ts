import {test1} from './quizzes/test1.js'
import {test2} from "./quizzes/test2.js";

// add your tests here
export const quizzesArray: string[] = [test1, test2];

// tests have to implement interfaces:
export interface QuizQuestionWithAnswer {
  question: string,
  answer: number
}

export interface Quiz {
  name: string,
  introduction: string,
  questionsWithAnswers: QuizQuestionWithAnswer[]
}
