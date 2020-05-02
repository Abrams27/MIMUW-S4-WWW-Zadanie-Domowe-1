import {Quiz, quizzesArray} from "../resources/quizzesConfig.js";
import {QuizGuard} from "./typeguards.js";

export class Quizzes {

  private readonly quizzes: Quiz[];
  private chosenQuiz: Quiz;

  public constructor() {
    this.quizzes = this.parseQuizzesJsonsArray(quizzesArray);
    this.validateQuizzesArrayLength();
    this.chosenQuiz = this.quizzes[0];
  }

  private validateQuizzesArrayLength() {
    if (this.quizzes.length == 0) {
      throw new Error("no quizzes added");
    }
  }

  public getQuizzesNames(): string[] {
    return this.quizzes
      .map(quiz => quiz.name);
  }

  public getChosenQuiz(): Quiz {
    return this.chosenQuiz;
  }

  public updateChosenQuiz(quizName: string) {
    this.chosenQuiz = this.findQuiz(quizName);
  }

  private findQuiz(quizName: string) {
    const quiz = this.quizzes
      .find(quiz => this.doesQuizNameEqualsToGivenName(quiz, quizName));

    if (quiz == undefined) {
      throw new Error("invalid quiz name");
    }

    return quiz;
  }

  private doesQuizNameEqualsToGivenName(quiz: Quiz, givenName: string): boolean {
    return quiz.name == givenName;
  }

  private parseQuizzesJsonsArray(quizzesJsonsArray: string[]): Quiz[] {
    return quizzesJsonsArray
      .map(json => this.mapQuizJsonToObjectorThrowError(json));
  }

  private mapQuizJsonToObjectorThrowError(quizJson: string): Quiz {
    const parsedJson = JSON.parse(quizJson);

    if (QuizGuard.check(parsedJson)) {
      return parsedJson;
    } else {
      throw new Error("invalid quiz json format");
    }
  }

}
