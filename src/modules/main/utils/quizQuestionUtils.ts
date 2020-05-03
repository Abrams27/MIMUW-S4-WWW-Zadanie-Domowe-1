import {HTMLElementEditor} from "../documentUtils.js";
import {QuizSession} from "../quizSession.js";
import {QuizQuestionProperties} from "../properties/quizQuestionProperties.js";
import {Utils} from "./utils.js";

export class ActualQuizSessionPageUpdater {

  private quizSession: QuizSession;
  private currentPageLoadTime: number;
  private currentQuestionAnswerTimeOnLoad: number;

  private paragraphEditor: HTMLElementEditor;
  private labelEditor: HTMLElementEditor;
  private questionInfoTableQuestionNumberEditor: HTMLElementEditor;
  private questionInfoTableAllQuestionsNumberEditor: HTMLElementEditor;
  private questionInfoTableQuizPageTimeEditor: HTMLElementEditor;
  private questionInfoTableQuizTimeEditor: HTMLElementEditor;
  private questionInfoTableTimePenaltyEditor: HTMLElementEditor;

  public constructor(document: Document, quizSession: QuizSession) {
    this.quizSession = quizSession;
    this.currentPageLoadTime = 0;
    this.currentQuestionAnswerTimeOnLoad = 0;

    this.paragraphEditor = new HTMLElementEditor(document, QuizQuestionProperties.QUIZ_QUESTION_INTRODUCTION_PARAGRAPH_ID);
    this.labelEditor = new HTMLElementEditor(document, QuizQuestionProperties.QUIZ_QUESTION_ANSWER_LABEL_ID);
    this.questionInfoTableQuestionNumberEditor = new HTMLElementEditor(document, QuizQuestionProperties.QUIZ_QUESTION_INFO_TABLE_QUESTION_NUMBER_ID);
    this.questionInfoTableAllQuestionsNumberEditor = new HTMLElementEditor(document, QuizQuestionProperties.QUIZ_QUESTION_INFO_TABLE_ALL_QUESTIONS_NUMBER_ID);
    this.questionInfoTableQuizPageTimeEditor = new HTMLElementEditor(document, QuizQuestionProperties.QUIZ_QUESTION_INFO_TABLE_QUIZ_PAGE_TIME_ID);
    this.questionInfoTableQuizTimeEditor = new HTMLElementEditor(document, QuizQuestionProperties.QUIZ_QUESTION_INFO_TABLE_QUIZ_TIME_ID);
    this.questionInfoTableTimePenaltyEditor = new HTMLElementEditor(document, QuizQuestionProperties.QUIZ_QUESTION_INFO_TABLE_TIME_PENALTY_ID);
  }

  public loadActualQuizSessionPage() {
    this.updateCurrentPageTimesOnLoad();
    this.updateCurrentQuestionStopwatch(this.currentPageLoadTime);

    this.loadActualQuizSessionPageQuizIntroduction();
    this.loadActualQuizSessionPageLabelText();

    this.loadActualQuizSessionPageQuestionNumber();
    this.loadActualQuizSessionPageNumberOfAllQuestions();

    this.loadActualQuizSessionPageWrongAnswerPenalty();
  }

  private updateCurrentPageTimesOnLoad() {
    this.currentPageLoadTime = this.quizSession.getSessionAnswersTime();
    this.currentQuestionAnswerTimeOnLoad = this.quizSession.getUserAnswerTimeForCurrentQuestion();
  }

  public updateQuizSessionTime(newStopwatchValue: number) {
    const formattedNewStopwatchValue = Utils.getStringDescriptingTimeInSeconds(newStopwatchValue);

    this.quizSession.updateSessionAnswersTime(newStopwatchValue);

    this.questionInfoTableQuizTimeEditor.setInnerHTML(formattedNewStopwatchValue);
  }

  public updateCurrentQuestionStopwatch(newStopwatchValue: number) {
    const realQuestionAnswerTime: number = this.currentQuestionAnswerTimeOnLoad + newStopwatchValue - this.currentPageLoadTime;
    const formattedNewStopwatchValue: string = Utils.getStringDescriptingTimeInSeconds(realQuestionAnswerTime);

    this.quizSession.updateUserAnswerTimeForCurrentQuestion(realQuestionAnswerTime);

    this.questionInfoTableQuizPageTimeEditor.setInnerHTML(formattedNewStopwatchValue);
  }

  private loadActualQuizSessionPageQuizIntroduction() {
    const quizIntroduction: string = this.quizSession.getQuizIntroduction();

    this.paragraphEditor.setInnerHTML(quizIntroduction);
  }

  private loadActualQuizSessionPageLabelText() {
    const actualQuizQuestionText: string = this.quizSession.getCurrentQuestionText();
    const formattedActualQuizQuestionText: string = `${actualQuizQuestionText}:</br>`;

    this.labelEditor.setInnerHTML(formattedActualQuizQuestionText);
  }

  private loadActualQuizSessionPageQuestionNumber() {
    const actualQuizQuestionNumber: number = this.quizSession.getCurrentQuestionIndex();
    const formattedActualQuizQuestionNumber: string = `${actualQuizQuestionNumber}`;

    this.questionInfoTableQuestionNumberEditor.setInnerHTML(formattedActualQuizQuestionNumber);
  }

  private loadActualQuizSessionPageNumberOfAllQuestions() {
    const actualQuizNumberOfAllQuestions: number = this.quizSession.getNumberOfAllQuestions();
    const formattedActualQuizNumberOfAllQuestions: string = `${actualQuizNumberOfAllQuestions}`;

    this.questionInfoTableAllQuestionsNumberEditor.setInnerHTML(formattedActualQuizNumberOfAllQuestions);
  }

  private loadActualQuizSessionPageWrongAnswerPenalty() {
    const actualQuizQuestionWrongAnswerPenalty: number = this.quizSession.getCurrentQuestionPenalty();
    const formattedActualQuizQuestionWrongAnswerPenalty: string = `${actualQuizQuestionWrongAnswerPenalty}`;

    this.questionInfoTableTimePenaltyEditor.setInnerHTML(formattedActualQuizQuestionWrongAnswerPenalty);
  }

}

export class ActualQuizSessionPageUpdaterStopwatch {

  private actualQuizSessionPageUpdater: ActualQuizSessionPageUpdater;
  private counter: number;

  private constructor(actualQuizSessionPageUpdater: ActualQuizSessionPageUpdater) {
    this.actualQuizSessionPageUpdater = actualQuizSessionPageUpdater;
    this.counter = 0;
  }

  public static forUpdaterAndStart(actualQuizSessionPageUpdater: ActualQuizSessionPageUpdater): ActualQuizSessionPageUpdaterStopwatch {
    const stopwatch: ActualQuizSessionPageUpdaterStopwatch = new ActualQuizSessionPageUpdaterStopwatch(actualQuizSessionPageUpdater);
    stopwatch.start();

    return stopwatch;
  }

  public start() {
    this.timer();
  }

  private count() {
    this.counter++;

    this.actualQuizSessionPageUpdater.updateQuizSessionTime(this.counter);
    this.actualQuizSessionPageUpdater.updateCurrentQuestionStopwatch(this.counter);

    this.timer();
  }

  private timer() {
    setTimeout(() => this.count(), 1000);
  }

}
