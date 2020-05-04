import {Quiz, Quizzes} from "./main/quizzes.js";
import {DocumentEditor, SelectEditor} from "./main/utils/documentUtils.js";
import {Properties} from "./main/properties/properties.js";
import {QuizProperties} from "./main/properties/quizProperties.js";
import {ScoreboardTableEditor} from "./main/utils/quizEditors.js";
import {QuizScore} from "./main/scoreboard.js";

const quizzes: Quizzes = new Quizzes();
const quizzesNamesArray: string[] = quizzes.getQuizzesNames();

const selectEditor: SelectEditor = new SelectEditor(document, QuizProperties.QUIZ_SELECTION_SELECT_ID);
selectEditor.addOptions(quizzesNamesArray, QuizProperties.QUIZ_SELECTION_SELECT_OPTION_ID);

const documentEditor: DocumentEditor = DocumentEditor.fromDocument(document);
const scoreboardTableEditor: ScoreboardTableEditor = new ScoreboardTableEditor(document, QuizProperties.QUIZ_SCOREBOARD_TABLE_ID,
    QuizProperties.QUIZ_SCOREBOARD_NUMBER_OF_SCOREBOARD_ROWS);
let xd: QuizScore[] = [new QuizScore(21), new QuizScore(37), new QuizScore(1), new QuizScore(3), new QuizScore(432), new QuizScore(2137)];
scoreboardTableEditor.addRowsWithScoresInGivenOrder(xd.sort((a, b) => a.compare(b)));

const quizSelectionForm: HTMLFormElement = <HTMLFormElement>documentEditor.getElement(QuizProperties.QUIZ_SELECTION_FORM_ID);
quizSelectionForm.addEventListener(Properties.INPUT_TAG, quizSelectionFormInputListener);

function quizSelectionFormInputListener(event: any) {
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
