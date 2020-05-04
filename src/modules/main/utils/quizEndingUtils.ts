import {QuizDetailedScoreboard} from "../scoreboard.js";
import {HTMLElementEditor} from "./documentUtils.js";
import {QuizEndingProperties} from "../properties/quizEndingProperties.js";

export class QuizEndingPageUpdater {

  private detailedScoreboard: QuizDetailedScoreboard;

  private quizStatsAnswerEditor: HTMLElementEditor;
  private quizStatsResultEditor: HTMLElementEditor;

  public constructor(document: Document, detailedScoreboard: QuizDetailedScoreboard) {
    this.detailedScoreboard = detailedScoreboard;

    this.quizStatsAnswerEditor = new HTMLElementEditor(document, QuizEndingProperties.QUIZ_ENDING_STATS_TABLE_ANSWERS_ID);
    this.quizStatsResultEditor = new HTMLElementEditor(document, QuizEndingProperties.QUIZ_ENDING_STATS_TABLE_RESULT_ID);

  }

  public loadPage() {
    this.loadPageQuizStatsAnswer();
  }

  private loadPageQuizStatsAnswer() {
    const quizStatsNumberOfCorrectAnswers: number = this.detailedScoreboard.getNumberOfCorrectsAnswers();
    const quizStatsNumberOfAnswers: number = this.detailedScoreboard.getNumberOfAnswers();
    const formattedQuizStatsAnswer: string = `${quizStatsNumberOfCorrectAnswers} / ${quizStatsNumberOfAnswers}`;

    this.quizStatsAnswerEditor.setInnerHTML(formattedQuizStatsAnswer);
  }

}
