import {ProjectProperties} from "./properties/projectProperties.js";
import {Quiz} from "./quizzes.js";
import {Utils} from "./utils/utils.js";
import {DocumentEditor} from "./documentUtils.js";
import {QuizSession} from "./quizSession.js";
import {ActualQuizSessionPageUpdater, ActualQuizSessionPageUpdaterStopwatch} from "./utils/quizQuestionUtils.js";
import {QuizQuestionProperties} from "./properties/quizQuestionProperties.js";

const nullableQuizJson: string | null = sessionStorage.getItem(ProjectProperties.QUIZ_SESSION_STORAGE_KEY);
const quizJson: string = Utils.getStringOrThrowError(nullableQuizJson, "invalid session storage key");
const quiz: Quiz = Quiz.fromJson(quizJson);
const quizSession: QuizSession = QuizSession.startWithQuiz(quiz);

const actualQuizSessionPageUpdater: ActualQuizSessionPageUpdater = new ActualQuizSessionPageUpdater(document, quizSession);
const documentEditor: DocumentEditor = DocumentEditor.fromDocument(document);

ActualQuizSessionPageUpdaterStopwatch.forUpdaterAndStart(actualQuizSessionPageUpdater);

const answerInput: HTMLInputElement = <HTMLInputElement>documentEditor.getElement(QuizQuestionProperties.QUIZ_QUESTION_ANSWER_INPUT_ID);
answerInput.addEventListener(ProjectProperties.INPUT_EVENT_TYPE, answerInputListener);
answerInput.placeholder = QuizQuestionProperties.QUIZ_QUESTION_ANSWER_INPUT_PLACEHOLDER;

const cancelButton: HTMLButtonElement = <HTMLButtonElement>documentEditor.getElement(QuizQuestionProperties.QUIZ_QUESTION_CANCEL_BUTTON_ID);
cancelButton.addEventListener(ProjectProperties.CLICK_EVENT_TYPE, cancelButtonClickListener);

const navigationBackButton: HTMLButtonElement = <HTMLButtonElement>documentEditor.getElement(QuizQuestionProperties.QUIZ_QUESTION_NAVIGATION_BACK_BUTTON_ID);
navigationBackButton.addEventListener(ProjectProperties.CLICK_EVENT_TYPE, navigationBackButtonClickListener);

const navigationStopButton: HTMLButtonElement = <HTMLButtonElement>documentEditor.getElement(QuizQuestionProperties.QUIZ_QUESTION_NAVIGATION_STOP_BUTTON_ID);
navigationStopButton.addEventListener(ProjectProperties.CLICK_EVENT_TYPE, navigationStopButtonClickListener);

const navigationNextButton: HTMLButtonElement = <HTMLButtonElement>documentEditor.getElement(QuizQuestionProperties.QUIZ_QUESTION_NAVIGATION_NEXT_BUTTON_ID);
navigationNextButton.addEventListener(ProjectProperties.CLICK_EVENT_TYPE, navigationNextButtonClickListener);

updateButtonsVisibilityIfNeededAndUpdatePage();


function answerInputListener(event) {
  const insertedValue = event.target.value;

  if (insertedValue.length > 0) {
    updateUserAnswer(insertedValue);
  } else {
    removeUserAnswer();
  }

  updateButtonsVisibilityIfNeededAndUpdatePage();
}

function updateUserAnswer(userAnswer: string) {
  const parsedUserAnswer = Number(userAnswer);

  quizSession.updateUserAnswerForCurrentQuestion(parsedUserAnswer);
}

function removeUserAnswer() {
  quizSession.removeUserAnswerForCurrentQuestion();
}

function cancelButtonClickListener() {
  location.href = ProjectProperties.QUIZ_HTML_FILE;
}

function navigationBackButtonClickListener() {
  quizSession.loadPreviousQuestion();
  updateAnswerInputValue();
  updateButtonsVisibilityIfNeededAndUpdatePage();
}

function navigationStopButtonClickListener() {
  location.href = ProjectProperties.QUIZ_ENDING_HTML_FILE;
}

function navigationNextButtonClickListener() {
  quizSession.loadNextQuestion();
  updateAnswerInputValue();
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
  if (quizSession.areAllQuestionsAnswered()) {
    navigationStopButton.removeAttribute(ProjectProperties.DISABLED_ATTRIBUTE);
  } else {
    navigationStopButton.setAttribute(ProjectProperties.DISABLED_ATTRIBUTE, ProjectProperties.TRUE);
  }
}

function updateAnswerInputValue() {
  answerInput.value = getUserAnswerForCurrentQuestionOrEmpty();
}

function getUserAnswerForCurrentQuestionOrEmpty(): string {
  if (quizSession.doesUserAnsweredForCurrentQuestion()) {
    return String(quizSession.getUserAnswerForCurrentQuestion());
  } else {
    return "";
  }
}
