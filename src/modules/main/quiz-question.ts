import {Properties} from "./properties.js";
import {Quiz} from "./quizzes.js";
import {Utils} from "./utils.js";
import {ParagraphEditor} from "./documentUtils.js";

const QUIZ_QUESTION_INTRODUCTION_PARAGRAPH_ID: string = "quiz-question-introduction-paragraph";


const nullableQuizJson: string | null = sessionStorage.getItem(Properties.QUIZ_SESSION_STORAGE_KEY);
const quizJson: string = Utils.getStringOrThrowError(nullableQuizJson, "invalid session storage key");
const quiz: Quiz = Quiz.fromJson(quizJson);

const paragraphEditor: ParagraphEditor = new ParagraphEditor(document, QUIZ_QUESTION_INTRODUCTION_PARAGRAPH_ID);
const quizIntroduction: string = quiz.getIntroduction();
paragraphEditor.setParagraphText(quizIntroduction);
