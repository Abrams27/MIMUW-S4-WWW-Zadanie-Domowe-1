import {Quizzes} from "./quizzes.js";
import {DocumentEditor, OptionElementBuilder, SelectEditor} from "./documentUtils.js";

const quizzes = new Quizzes();

const documentEditor = new DocumentEditor(document);

const selectEditor = new SelectEditor(document, "quiz-selection-select");
selectEditor.addOptions(quizzes.getQuizzesNames(), "quiz-selection-select-option");

const form = documentEditor.getElement('quiz-selection-form');
form.addEventListener("input", xd);

function xd(event) {
  let nazwaCelu = event.target.name;
  let wartoscCelu = event.target.value;
  console.log("XDDD: " + event.target.value);
}
