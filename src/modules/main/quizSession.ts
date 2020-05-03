import {Quiz, QuizQuestionWithAnswers} from "./quizzes.js";

export class QuizSession {

  private quiz: Quiz;
  private questionsListWithUserAnswers: QuizQuestionWithAnswers[];
  private quizIndex: number;

  private constructor(quiz: Quiz) {
    this.quiz = quiz;
    this.questionsListWithUserAnswers = quiz.getQuestionsListForUserAnswers();
    this.quizIndex = 0;
  }

  public static startWithQuiz(quiz: Quiz): QuizSession {
    return new QuizSession(quiz);
  }

  public getQuizIntroduction(): string {
    return this.quiz.getIntroduction();
  }

  public loadNextQuestion() {
    if (this.hasNextQuestion()) {
      this.quizIndex++;
    }
  }

  public hasNextQuestion() {
    return this.quizIndex + 1 < this.questionsListWithUserAnswers.length;
  }

  public loadPreviousQuestion() {
    if (this.hasPreviousQuestion()) {
      this.quizIndex--;
    }
  }

  public hasPreviousQuestion() {
    return this.quizIndex - 1 >= 0;
  }

  public getActualQuestionIndex(): number {
    return this.quizIndex + 1;
  }

  public getNumberOfAllQuestions(): number {
    return this.questionsListWithUserAnswers.length;
  }

  public getActualQuestionPenalty(): number {
    return this.getActualQuestion()
      .getWrongAnswerPenalty();
  }

  public getActualQuestionText(): string {
    return this.getActualQuestion()
      .getQuestionText();
  }

  private getActualQuestion(): QuizQuestionWithAnswers {
    return this.questionsListWithUserAnswers[this.quizIndex];
  }

  public updateUserAnswerForCurrentQuestion(userAnswer: number) {
    this.getActualQuestion()
      .updateUserAnswer(userAnswer);
  }

  public doesUserAnsweredForCurrentQuestion(): boolean {
    return this.getActualQuestion()
      .doesUserAnswered();
  }

  public getUserAnswerForCurrentQuestion(): number {
    return this.getActualQuestion()
      .getUserAnswer();
  }

  public removeUserAnswerForCurrentQuestion() {
    this.getActualQuestion()
      .removeUserAnswer();
  }

  public areAllQuestionsAnswered(): boolean {
    return this.questionsListWithUserAnswers
      .every(question => question.doesUserAnswered());
  }

}

export class Stopwatch {

  private counter: number;

  public constructor() {
    this.counter = 0;
  }

  public start(everySecondFunction: () => void) {
    this.timer(everySecondFunction);
  }

  private count(everySecondFunction: () => void) {
    this.counter++;

    everySecondFunction();

    this.timer(everySecondFunction);
  }

  private timer(everySecondFunction: () => void) {
    setTimeout(() => this.count(everySecondFunction), 1000);
  }

  public stop() {

  }

  private wait(delay: number): Promise<{}> {
    return new Promise(lambda => setTimeout(lambda, delay));
  }
}
