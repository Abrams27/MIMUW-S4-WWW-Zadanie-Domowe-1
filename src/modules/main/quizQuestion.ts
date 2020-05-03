import {ProjectProperties} from "./properties/projectProperties.js";
import {Quiz} from "./quizzes.js";
import {Utils} from "./utils.js";
import {DocumentEditor} from "./documentUtils.js";
import {QuizSession, Stopwatch} from "./quizSession.js";
import {ActualQuizSessionPageUpdater} from "./utils/quizQuestionModules.js";
import {QuizQuestionProperties} from "./properties/quizQuestionProperties.js";


const nullableQuizJson: string | null = sessionStorage.getItem(ProjectProperties.QUIZ_SESSION_STORAGE_KEY);
const quizJson: string = Utils.getStringOrThrowError(nullableQuizJson, "invalid session storage key");
const quiz: Quiz = Quiz.fromJson(quizJson);
const quizSession: QuizSession = QuizSession.startWithQuiz(quiz);

const actualQuizSessionPageUpdater: ActualQuizSessionPageUpdater = new ActualQuizSessionPageUpdater(document, quizSession);
const documentEditor: DocumentEditor = DocumentEditor.fromDocument(document);

const cancelButton: HTMLButtonElement = <HTMLButtonElement>documentEditor.getElement(QuizQuestionProperties.QUIZ_QUESTION_CANCEL_BUTTON_ID);
cancelButton.addEventListener(ProjectProperties.CLICK_EVENT_TYPE, cancelButtonClickListener);

const navigationBackButton: HTMLButtonElement = <HTMLButtonElement>documentEditor.getElement(QuizQuestionProperties.QUIZ_QUESTION_NAVIGATION_BACK_BUTTON_ID);
navigationBackButton.addEventListener(ProjectProperties.CLICK_EVENT_TYPE, navigationBackButtonClickListener);

const navigationStopButton: HTMLButtonElement = <HTMLButtonElement>documentEditor.getElement(QuizQuestionProperties.QUIZ_QUESTION_NAVIGATION_STOP_BUTTON_ID);
navigationStopButton.addEventListener(ProjectProperties.CLICK_EVENT_TYPE, navigationStopButtonClickListener);

const navigationNextButton: HTMLButtonElement = <HTMLButtonElement>documentEditor.getElement(QuizQuestionProperties.QUIZ_QUESTION_NAVIGATION_NEXT_BUTTON_ID);
navigationNextButton.addEventListener(ProjectProperties.CLICK_EVENT_TYPE, navigationNextButtonClickListener);

updateButtonsVisibilityIfNeededAndUpdatePage();


function cancelButtonClickListener() {
  console.log("XDDDDD");
}

function navigationBackButtonClickListener() {
  quizSession.loadPreviousQuestion();
  updateButtonsVisibilityIfNeededAndUpdatePage();
}

function navigationStopButtonClickListener() {
  console.log("stop");
}

function navigationNextButtonClickListener() {
  quizSession.loadNextQuestion();
  updateButtonsVisibilityIfNeededAndUpdatePage();
}


function updateButtonsVisibilityIfNeededAndUpdatePage() {
  updateButtonsVisibilityIfNeeded();
  actualQuizSessionPageUpdater.loadActualQuizSessionPage();
}

function updateButtonsVisibilityIfNeeded() {
  updateNavigationBackButtonVisibilityIfNeeded();
  updateNavigationNextButtonVisibilityIfNeeded();
  updateNavigationStopButtonVisibilityIfNeeded();
}

function updateNavigationBackButtonVisibilityIfNeeded() {
  if (quizSession.hasPreviousQuestion()) {
    navigationBackButton.removeAttribute(ProjectProperties.DISABLED_ATTRIBUTE);
  } else {
    navigationBackButton.setAttribute(ProjectProperties.DISABLED_ATTRIBUTE, ProjectProperties.TRUE);
  }
}

function updateNavigationNextButtonVisibilityIfNeeded() {
  if (quizSession.hasNextQuestion()) {
    navigationNextButton.removeAttribute(ProjectProperties.DISABLED_ATTRIBUTE);
  } else {
    navigationNextButton.setAttribute(ProjectProperties.DISABLED_ATTRIBUTE, ProjectProperties.TRUE);
  }
}

function updateNavigationStopButtonVisibilityIfNeeded() {
  // if (quizSession.()) {
  //   navigationNextButton.removeAttribute(ProjectProperties.DISABLED_ATTRIBUTE);
  // } else {
  //   navigationNextButton.setAttribute(ProjectProperties.DISABLED_ATTRIBUTE, ProjectProperties.TRUE);
  // }
}
