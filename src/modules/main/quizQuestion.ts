import {ProjectProperties} from "./properties/projectProperties.js";
import {Quiz} from "./quizzes.js";
import {Utils} from "./utils.js";
import {DocumentEditor} from "./documentUtils.js";
import {QuizSession, Stopwatch} from "./quizSession.js";
import {ActualQuizSessionPageUpdater, ButtonsVisibilityResolver} from "./utils/quizQuestionUtils.js";
import {QuizQuestionProperties} from "./properties/quizQuestionProperties.js";


const nullableQuizJson: string | null = sessionStorage.getItem(ProjectProperties.QUIZ_SESSION_STORAGE_KEY);
const quizJson: string = Utils.getStringOrThrowError(nullableQuizJson, "invalid session storage key");
const quiz: Quiz = Quiz.fromJson(quizJson);
const quizSession: QuizSession = QuizSession.startWithQuiz(quiz);

const actualQuizSessionPageUpdater: ActualQuizSessionPageUpdater = new ActualQuizSessionPageUpdater(document, quizSession);
actualQuizSessionPageUpdater.loadActualQuizSessionPage();

const buttonsVisibilityResolver: ButtonsVisibilityResolver = ButtonsVisibilityResolver.forQuizSession(quizSession);
const documentEditor: DocumentEditor = DocumentEditor.fromDocument(document);

const cancelButton: HTMLButtonElement = <HTMLButtonElement>documentEditor.getElement(QuizQuestionProperties.QUIZ_QUESTION_CANCEL_BUTTON_ID);
cancelButton.addEventListener(ProjectProperties.CLICK_EVENT_TYPE, cancelButtonClickListener);

function cancelButtonClickListener() {
  console.log("XDDDDD");
}

const navigationBackButton: HTMLButtonElement = <HTMLButtonElement>documentEditor.getElement(QuizQuestionProperties.QUIZ_QUESTION_NAVIGATION_BACK_BUTTON_ID);
navigationBackButton.addEventListener(ProjectProperties.CLICK_EVENT_TYPE, navigationBackButtonClickListener);

function navigationBackButtonClickListener() {
  console.log("back");
}

const navigationStopButton: HTMLButtonElement = <HTMLButtonElement>documentEditor.getElement(QuizQuestionProperties.QUIZ_QUESTION_NAVIGATION_STOP_BUTTON_ID);
navigationStopButton.addEventListener(ProjectProperties.CLICK_EVENT_TYPE, navigationStopButtonClickListener);

function navigationStopButtonClickListener() {
  console.log("stop");
}

const navigationNextButton: HTMLButtonElement = <HTMLButtonElement>documentEditor.getElement(QuizQuestionProperties.QUIZ_QUESTION_NAVIGATION_NEXT_BUTTON_ID);
navigationNextButton.addEventListener(ProjectProperties.CLICK_EVENT_TYPE, navigationNextButtonClickListener);

function navigationNextButtonClickListener() {
  quizSession.loadNextQuestion();
  buttonsVisibilityResolver.updateButtonsVisibilityIfNeeded();
}

