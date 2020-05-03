import {Quizzes} from "./quizzes.js";
import {DocumentEditor, SelectEditor} from "./documentUtils.js";
import {Properties} from "./properties.js";

const QUIZ_SELECTION_SELECT_ID = "quiz-selection-select";
const QUIZ_SELECTION_SELECT_OPTION_ID = "quiz-selection-select";
const QUIZ_SELECTION_FORM_ID = "quiz-selection-form";
const START_QUIZ_BUTTON_ID = "start-quiz-button";


const quizzes: Quizzes = new Quizzes();
const quizzesNamesArray: string[] = quizzes.getQuizzesNames();

const selectEditor: SelectEditor = new SelectEditor(document, QUIZ_SELECTION_SELECT_ID);
selectEditor.addOptions(quizzesNamesArray, QUIZ_SELECTION_SELECT_OPTION_ID);

const documentEditor: DocumentEditor = new DocumentEditor(document);

const quizSelectionForm: HTMLFormElement = <HTMLFormElement>documentEditor.getElement(QUIZ_SELECTION_FORM_ID);
quizSelectionForm.addEventListener(Properties.INPUT_TAG, quizSelectionFormInputListener);

function quizSelectionFormInputListener(event) {
  const chosenQuizName = event.target.value;

  quizzes.updateChosenQuiz(chosenQuizName);
}

const startQuizButton: HTMLButtonElement = <HTMLButtonElement>documentEditor.getElement(START_QUIZ_BUTTON_ID);
startQuizButton.addEventListener(Properties.CLICK_EVENT_TYPE, startQuizButtonClickListener);

function startQuizButtonClickListener() {
  const chosenQuiz = quizzes.getChosenQuiz();

  sessionStorage.setItem(Properties.QUIZ_SESSION_STORAGE_KEY, chosenQuiz.toJson());
  location.href = Properties.QUIZ_QUESTION_HTML_FILE;
}
