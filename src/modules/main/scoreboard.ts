import {QuizQuestionWithAnswersAndTime} from "./quizzes.js";

export class QuizDetailedScoreboard {

  private questionsStatistics: QuestionStatistics[];
  private quizScore: QuizScore;

  private constructor(questionsStatistics: QuestionStatistics[]) {
    this.questionsStatistics = questionsStatistics;
    this.quizScore = new QuizScore(this.calculateResultWithPenalties());
  }

  public static fromQuizQuestionWithAnswersAndTime(questionsListWithUserAnswers: QuizQuestionWithAnswersAndTime[]): QuizDetailedScoreboard {
    return new QuizDetailedScoreboard(this.mapQuizQuestionWithAnswersAndTime(questionsListWithUserAnswers));
  }

  public toJson(): string {
    return JSON.stringify(this);
  }

  private static mapQuizQuestionWithAnswersAndTime(questionsListWithUserAnswers: QuizQuestionWithAnswersAndTime[]): QuestionStatistics[] {
    return QuizQuestionWithAnswersAndTimeMapper
      .mapToQuestionStatisticsArray(questionsListWithUserAnswers);
  }

  private calculateResultWithPenalties(): number {
    return this.questionsStatistics
      .map(questionStatistics => questionStatistics.getTimeWithPenalty())
      .reduce((sum, score) => sum + score);
  }

}


export class QuizScore {

  private score: number;

  public constructor(score: number) {
    this.score = score;
  }

}


export class QuestionStatistics {

  private readonly isAnswerCorrect: boolean;
  private readonly timePenalty: number;
  private readonly timeSpendInSeconds: number;

  public constructor(isAnswerCorrect: boolean, timePenalty: number, timeSpendInSeconds: number) {
    this.isAnswerCorrect = isAnswerCorrect;
    this.timePenalty = timePenalty;
    this.timeSpendInSeconds = timeSpendInSeconds;
  }

  public getTimeWithPenalty(): number {
    if (this.isAnswerCorrect) {
      return this.timeSpendInSeconds;
    } else {
      return this.timeSpendInSeconds + this.timePenalty;
    }
  }

}


class QuizQuestionWithAnswersAndTimeMapper {

  public static mapToQuestionStatisticsArray(quizQuestionWithAnswersAndTimeArray: QuizQuestionWithAnswersAndTime[]): QuestionStatistics[] {
    return quizQuestionWithAnswersAndTimeArray
        .map(quizQuestionWithAnswersAndTime => this.mapToQuestionStatistics(quizQuestionWithAnswersAndTime));
  }

  private static mapToQuestionStatistics(quizQuestionWithAnswersAndTime: QuizQuestionWithAnswersAndTime): QuestionStatistics {
    const isAnswerCorrect: boolean = quizQuestionWithAnswersAndTime.isUserAnswerCorrect();
    const wrongAnswerPenalty: number = quizQuestionWithAnswersAndTime.getWrongAnswerPenalty();
    const answerTimeInSeconds: number = quizQuestionWithAnswersAndTime.getUserAnswerTime();

    return new QuestionStatistics(isAnswerCorrect, wrongAnswerPenalty, answerTimeInSeconds);
  }


}
