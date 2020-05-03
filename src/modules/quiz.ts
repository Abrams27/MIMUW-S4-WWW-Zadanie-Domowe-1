import {Quiz, Quizzes} from "./main/quizzes.js";
import {DocumentEditor, SelectEditor} from "./main/utils/documentUtils.js";
import {Properties} from "./main/properties/properties.js";
import {QuizProperties} from "./main/properties/quizProperties.js";

const quizzes: Quizzes = new Quizzes();
const quizzesNamesArray: string[] = quizzes.getQuizzesNames();

const selectEditor: SelectEditor = new SelectEditor(document, QuizProperties.QUIZ_SELECTION_SELECT_ID);
selectEditor.addOptions(quizzesNamesArray, QuizProperties.QUIZ_SELECTION_SELECT_OPTION_ID);

const documentEditor: DocumentEditor = DocumentEditor.fromDocument(document);

const quizSelectionForm: HTMLFormElement = <HTMLFormElement>documentEditor.getElement(QuizProperties.QUIZ_SELECTION_FORM_ID);
quizSelectionForm.addEventListener(Properties.INPUT_TAG, quizSelectionFormInputListener);

function quizSelectionFormInputListener(event) {
  const chosenQuizName = event.target.value;

  quizzes.updateChosenQuiz(chosenQuizName);
}

const startQuizButton: HTMLButtonElement = <HTMLButtonElement>documentEditor.getElement(QuizProperties.START_QUIZ_BUTTON_ID);
startQuizButton.addEventListener(Properties.CLICK_EVENT_TYPE, startQuizButtonClickListener);

function startQuizButtonClickListener() {
  const chosenQuiz: Quiz = quizzes.getChosenQuiz();
  const chosenQuizJson: string = chosenQuiz.toJson();

  sessionStorage.setItem(Properties.QUIZ_SESSION_STORAGE_KEY, chosenQuizJson);
  location.href = Properties.QUIZ_QUESTION_HTML_FILE;
}
