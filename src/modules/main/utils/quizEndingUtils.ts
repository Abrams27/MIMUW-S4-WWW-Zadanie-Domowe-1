import {QuestionStatistics, QuizDetailedScoreboard} from "../scoreboard.js";
import {HTMLElementEditor, QuizScoreboardTableEditor} from "./documentUtils.js";
import {QuizEndingProperties} from "../properties/quizEndingProperties.js";
import {Utils} from "./utils.js";
import doc = Mocha.reporters.doc;

export class QuizEndingPageUpdater {

  private detailedScoreboard: QuizDetailedScoreboard;

  private quizStatsAnswerEditor: HTMLElementEditor;
  private quizStatsResultEditor: HTMLElementEditor;
  private quizDetailsStatsTableEditor: QuizScoreboardTableEditor;

  public constructor(document: Document, detailedScoreboard: QuizDetailedScoreboard) {
    this.detailedScoreboard = detailedScoreboard;

    this.quizStatsAnswerEditor = new HTMLElementEditor(document, QuizEndingProperties.QUIZ_ENDING_STATS_TABLE_ANSWERS_ID);
    this.quizStatsResultEditor = new HTMLElementEditor(document, QuizEndingProperties.QUIZ_ENDING_STATS_TABLE_RESULT_ID);
    this.quizDetailsStatsTableEditor = new QuizScoreboardTableEditor(document, QuizEndingProperties.QUIZ_ENDING_STATS_DETAILS_TABLE_ID);
  }

  public loadPage() {
    this.loadPageQuizStatsAnswer();
    this.loadPageQuizStatsResult();
    this.loadPageDetailsStatsTable();
  }

  private loadPageQuizStatsAnswer() {
    const quizStatsNumberOfCorrectAnswers: number = this.detailedScoreboard.getNumberOfCorrectsAnswers();
    const quizStatsNumberOfAnswers: number = this.detailedScoreboard.getNumberOfAnswers();
    const formattedQuizStatsAnswer: string = `${quizStatsNumberOfCorrectAnswers} / ${quizStatsNumberOfAnswers}`;

    this.quizStatsAnswerEditor.setInnerHTML(formattedQuizStatsAnswer);
  }

  private loadPageQuizStatsResult() {
    const quizStatsResult: number = this.detailedScoreboard.getQuizScore();
    const formattedQuizStatsResult: string = Utils.getStringDescriptingTimeInSeconds(quizStatsResult);

    this.quizStatsResultEditor.setInnerHTML(formattedQuizStatsResult);
  }

  private loadPageDetailsStatsTable() {
    this.detailedScoreboard
        .getQuestionsStatistics()
        .forEach(questionStatistics => this.loadPageDetailsStatsTableRow(questionStatistics));
  }

  private loadPageDetailsStatsTableRow(questionStatistics: QuestionStatistics) {
    const isAnswerCorrect: boolean = questionStatistics.isAnswerCorrect();
    const answerTime: number = questionStatistics.getAnswerTime();
    const timePenalty: number = questionStatistics.getTimePenalty();

    this.quizDetailsStatsTableEditor
      .addRowWithAnswerTimeAndPenaltyForQuestion(isAnswerCorrect, answerTime, timePenalty);
  }

}
