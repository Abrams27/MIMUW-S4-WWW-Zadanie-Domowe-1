import {Properties} from "./properties.js";
import {Quiz} from "./quizzes.js";
import {Utils} from "./utils.js";
import {DocumentEditor, HTMLElementEditor} from "./documentUtils.js";
import {QuizSession, Stopwatch} from "./quizSession.js";

const QUIZ_QUESTION_INTRODUCTION_PARAGRAPH_ID: string = "quiz-question-introduction-paragraph";
const QUIZ_QUESTION_ANSWER_LABEL_ID: string = "quiz-question-answer-label";
const QUIZ_QUESTION_CANCEL_BUTTON_ID: string = "quiz-question-cancel-button";

const QUIZ_QUESTION_INFO_TABLE_QUESTION_NUMBER_ID: string = "quiz-question-info-table-question-number";
const QUIZ_QUESTION_INFO_TABLE_ALL_QUESTIONS_NUMBER_ID: string = "quiz-question-info-table-all-questions-number";
const QUIZ_QUESTION_INFO_TABLE_QUIZ_PAGE_TIME_ID: string = "quiz-question-info-table-quiz-page-time";
const QUIZ_QUESTION_INFO_TABLE_QUIZ_TIME_ID: string = "quiz-question-info-table-quiz-time";
const QUIZ_QUESTION_INFO_TABLE_TIME_PENALTY_ID: string = "quiz-question-info-table-time-penalty";

const QUIZ_QUESTION_NAVIGATION_BACK_BUTTON_ID: string = "quiz-question-navigation-back-button";
const QUIZ_QUESTION_NAVIGATION_STOP_BUTTON_ID: string = "quiz-question-navigation-stop-button";
const QUIZ_QUESTION_NAVIGATION_NEXT_BUTTON_ID: string = "quiz-question-navigation-next-button";


const nullableQuizJson: string | null = sessionStorage.getItem(Properties.QUIZ_SESSION_STORAGE_KEY);
const quizJson: string = Utils.getStringOrThrowError(nullableQuizJson, "invalid session storage key");
const quiz: Quiz = Quiz.fromJson(quizJson);
const quizSession: QuizSession = QuizSession.startWithQuiz(quiz);

const paragraphEditor: HTMLElementEditor = new HTMLElementEditor(document, QUIZ_QUESTION_INTRODUCTION_PARAGRAPH_ID);
const quizIntroduction: string = quiz.getIntroduction();
paragraphEditor.setInnerHTML(quizIntroduction);

const labelEditor: HTMLElementEditor = new HTMLElementEditor(document, QUIZ_QUESTION_ANSWER_LABEL_ID);
const questionInfoTableQuestionNumberEditor: HTMLElementEditor = new HTMLElementEditor(document, QUIZ_QUESTION_INFO_TABLE_QUESTION_NUMBER_ID);
const questionInfoTableAllQuestionsNumberEditor: HTMLElementEditor = new HTMLElementEditor(document, QUIZ_QUESTION_INFO_TABLE_ALL_QUESTIONS_NUMBER_ID);
const questionInfoTableQuizPageTimeEditor: HTMLElementEditor = new HTMLElementEditor(document, QUIZ_QUESTION_INFO_TABLE_QUIZ_PAGE_TIME_ID);
const questionInfoTableQuizTimeEditor: HTMLElementEditor = new HTMLElementEditor(document, QUIZ_QUESTION_INFO_TABLE_QUIZ_TIME_ID);
const questionInfoTableTimePenaltyEditor: HTMLElementEditor = new HTMLElementEditor(document, QUIZ_QUESTION_INFO_TABLE_TIME_PENALTY_ID);

loadActualQuizSessionPage();

const documentEditor: DocumentEditor = DocumentEditor.fromDocument(document);

const cancelButton: HTMLButtonElement = <HTMLButtonElement>documentEditor.getElement(QUIZ_QUESTION_CANCEL_BUTTON_ID);
cancelButton.addEventListener(Properties.CLICK_EVENT_TYPE, cancelButtonClickListener);

function cancelButtonClickListener() {
  console.log("XDDDDD");
}

const navigationBackButton: HTMLButtonElement = <HTMLButtonElement>documentEditor.getElement(QUIZ_QUESTION_NAVIGATION_BACK_BUTTON_ID);
navigationBackButton.addEventListener(Properties.CLICK_EVENT_TYPE, navigationBackButtonClickListener);

function navigationBackButtonClickListener() {
  console.log("back");
}

const navigationStopButton: HTMLButtonElement = <HTMLButtonElement>documentEditor.getElement(QUIZ_QUESTION_NAVIGATION_STOP_BUTTON_ID);
navigationStopButton.addEventListener(Properties.CLICK_EVENT_TYPE, navigationStopButtonClickListener);

function navigationStopButtonClickListener() {
  console.log("stop");
}

const navigationNextButton: HTMLButtonElement = <HTMLButtonElement>documentEditor.getElement(QUIZ_QUESTION_NAVIGATION_NEXT_BUTTON_ID);
navigationNextButton.addEventListener(Properties.CLICK_EVENT_TYPE, navigationNextButtonClickListener);

function navigationNextButtonClickListener() {
  console.log("next");
}


function loadActualQuizSessionPage() {
  loadActualQuizSessionPageLabelText();
  loadActualQuizSessionPageQuestionNumber();
  loadActualQuizSessionPageNumberOfAllQuestions();

  questionInfoTableQuizPageTimeEditor.setInnerHTML("stoperek");
  questionInfoTableQuizTimeEditor.setInnerHTML("stoperek caly");
  loadActualQuizSessionPageWrongAnswerPenalty();
}

function loadActualQuizSessionPageLabelText() {
  const actualQuizQuestionText: string = quizSession.getActualQuestionText();
  const formattedActualQuizQuestionText: string = `${actualQuizQuestionText}:</br>`;

  labelEditor.setInnerHTML(formattedActualQuizQuestionText);
}

function loadActualQuizSessionPageQuestionNumber() {
  const actualQuizQuestionNumber: number = quizSession.getActualQuestionIndex();
  const formattedActualQuizQuestionNumber: string = `${actualQuizQuestionNumber}`;

  questionInfoTableQuestionNumberEditor.setInnerHTML(formattedActualQuizQuestionNumber);
}

function loadActualQuizSessionPageNumberOfAllQuestions() {
  const actualQuizNumberOfAllQuestions: number = quizSession.getNumberOfAllQuestions();
  const formattedActualQuizNumberOfAllQuestions: string = `${actualQuizNumberOfAllQuestions}`;

  questionInfoTableAllQuestionsNumberEditor.setInnerHTML(formattedActualQuizNumberOfAllQuestions);
}

function loadActualQuizSessionPageWrongAnswerPenalty() {
  const actualQuizQuestionWrongAnswerPenalty: number = quizSession.getActualQuestionPenalty();
  const formattedActualQuizQuestionWrongAnswerPenalty: string = `${actualQuizQuestionWrongAnswerPenalty}`;

  questionInfoTableTimePenaltyEditor.setInnerHTML(formattedActualQuizQuestionWrongAnswerPenalty);
}
