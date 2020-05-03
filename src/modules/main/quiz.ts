import {Quizzes} from "./quizzes.js";
import {DocumentEditor, SelectEditor} from "./documentUtils.js";
import {ProjectProperties} from "./properties/projectProperties.js";
import {QuizProperties} from "./properties/quizProperties.js";

const quizzes: Quizzes = new Quizzes();
const quizzesNamesArray: string[] = quizzes.getQuizzesNames();

const selectEditor: SelectEditor = new SelectEditor(document, QuizProperties.QUIZ_SELECTION_SELECT_ID);
selectEditor.addOptions(quizzesNamesArray, QuizProperties.QUIZ_SELECTION_SELECT_OPTION_ID);

const documentEditor: DocumentEditor = DocumentEditor.fromDocument(document);

const quizSelectionForm: HTMLFormElement = <HTMLFormElement>documentEditor.getElement(QuizProperties.QUIZ_SELECTION_FORM_ID);
quizSelectionForm.addEventListener(ProjectProperties.INPUT_TAG, quizSelectionFormInputListener);

function quizSelectionFormInputListener(event) {
  const chosenQuizName = event.target.value;

  quizzes.updateChosenQuiz(chosenQuizName);
}

const startQuizButton: HTMLButtonElement = <HTMLButtonElement>documentEditor.getElement(QuizProperties.START_QUIZ_BUTTON_ID);
startQuizButton.addEventListener(ProjectProperties.CLICK_EVENT_TYPE, startQuizButtonClickListener);

function startQuizButtonClickListener() {
  const chosenQuiz = quizzes.getChosenQuiz();

  sessionStorage.setItem(ProjectProperties.QUIZ_SESSION_STORAGE_KEY, chosenQuiz.toJson());
  location.href = ProjectProperties.QUIZ_QUESTION_HTML_FILE;
}
