import {HTMLElementEditor} from "../documentUtils.js";
import {QuizSession} from "../quizSession.js";
import {QuizQuestionProperties} from "../properties/quizQuestionProperties.js";

export class ActualQuizSessionPageUpdater {

  private quizSession: QuizSession;

  private paragraphEditor: HTMLElementEditor;
  private labelEditor: HTMLElementEditor;
  private questionInfoTableQuestionNumberEditor: HTMLElementEditor;
  private questionInfoTableAllQuestionsNumberEditor: HTMLElementEditor;
  private questionInfoTableQuizPageTimeEditor: HTMLElementEditor;
  private questionInfoTableQuizTimeEditor: HTMLElementEditor;
  private questionInfoTableTimePenaltyEditor: HTMLElementEditor;

  public constructor(document: Document, quizSession: QuizSession) {
    this.quizSession = quizSession;

    this.paragraphEditor = new HTMLElementEditor(document, QuizQuestionProperties.QUIZ_QUESTION_INTRODUCTION_PARAGRAPH_ID);
    this.labelEditor = new HTMLElementEditor(document, QuizQuestionProperties.QUIZ_QUESTION_ANSWER_LABEL_ID);
    this.questionInfoTableQuestionNumberEditor = new HTMLElementEditor(document, QuizQuestionProperties.QUIZ_QUESTION_INFO_TABLE_QUESTION_NUMBER_ID);
    this.questionInfoTableAllQuestionsNumberEditor = new HTMLElementEditor(document, QuizQuestionProperties.QUIZ_QUESTION_INFO_TABLE_ALL_QUESTIONS_NUMBER_ID);
    this.questionInfoTableQuizPageTimeEditor = new HTMLElementEditor(document, QuizQuestionProperties.QUIZ_QUESTION_INFO_TABLE_QUIZ_PAGE_TIME_ID);
    this.questionInfoTableQuizTimeEditor = new HTMLElementEditor(document, QuizQuestionProperties.QUIZ_QUESTION_INFO_TABLE_QUIZ_TIME_ID);
    this.questionInfoTableTimePenaltyEditor = new HTMLElementEditor(document, QuizQuestionProperties.QUIZ_QUESTION_INFO_TABLE_TIME_PENALTY_ID);
  }

  public loadActualQuizSessionPage() {
    this.loadActualQuizSessionPageQuizIntroduction();
    this.loadActualQuizSessionPageLabelText();

    this.loadActualQuizSessionPageQuestionNumber();
    this.loadActualQuizSessionPageNumberOfAllQuestions();

    this.questionInfoTableQuizPageTimeEditor.setInnerHTML("stoperek");
    this.questionInfoTableQuizTimeEditor.setInnerHTML("stoperek caly");
    this.loadActualQuizSessionPageWrongAnswerPenalty();
  }

  private loadActualQuizSessionPageQuizIntroduction() {
    const quizIntroduction: string = this.quizSession.getQuizIntroduction();

    this.paragraphEditor.setInnerHTML(quizIntroduction);
  }

  private loadActualQuizSessionPageLabelText() {
    const actualQuizQuestionText: string = this.quizSession.getActualQuestionText();
    const formattedActualQuizQuestionText: string = `${actualQuizQuestionText}:</br>`;

    this.labelEditor.setInnerHTML(formattedActualQuizQuestionText);
  }

  private loadActualQuizSessionPageQuestionNumber() {
    const actualQuizQuestionNumber: number = this.quizSession.getActualQuestionIndex();
    const formattedActualQuizQuestionNumber: string = `${actualQuizQuestionNumber}`;

    this.questionInfoTableQuestionNumberEditor.setInnerHTML(formattedActualQuizQuestionNumber);
  }

  private loadActualQuizSessionPageNumberOfAllQuestions() {
    const actualQuizNumberOfAllQuestions: number = this.quizSession.getNumberOfAllQuestions();
    const formattedActualQuizNumberOfAllQuestions: string = `${actualQuizNumberOfAllQuestions}`;

    this.questionInfoTableAllQuestionsNumberEditor.setInnerHTML(formattedActualQuizNumberOfAllQuestions);
  }

  private loadActualQuizSessionPageWrongAnswerPenalty() {
    const actualQuizQuestionWrongAnswerPenalty: number = this.quizSession.getActualQuestionPenalty();
    const formattedActualQuizQuestionWrongAnswerPenalty: string = `${actualQuizQuestionWrongAnswerPenalty}`;

    this.questionInfoTableTimePenaltyEditor.setInnerHTML(formattedActualQuizQuestionWrongAnswerPenalty);
  }

}
