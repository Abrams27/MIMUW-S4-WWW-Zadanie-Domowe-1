import {Quizzes} from "./quizzes.js";
import {DocumentEditor, SelectEditor} from "./documentUtils.js";

const quizzes = new Quizzes();
const quizzesNamesArray = quizzes.getQuizzesNames();

const selectEditor = new SelectEditor(document, "quiz-selection-select");
selectEditor.addOptions(quizzesNamesArray, "quiz-selection-select-option");

const documentEditor = new DocumentEditor(document);

const quizSelectionForm: HTMLFormElement = <HTMLFormElement>documentEditor.getElement("quiz-selection-form");
quizSelectionForm.addEventListener("input", quizSelectionFormInputListener);

function quizSelectionFormInputListener(event) {
  quizzes.updateChosenQuiz(event.target.value);
}

const startQuizButton: HTMLButtonElement = <HTMLButtonElement>documentEditor.getElement("start-quiz-button");
startQuizButton.addEventListener("click", startQuizButtonClickListener);

function startQuizButtonClickListener() {
  console.log(quizzes.getChosenQuiz());
}
