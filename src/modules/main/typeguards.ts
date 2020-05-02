import {Quiz, QuizQuestionWithAnswer} from '../resources/quizzesConfig.js';

export class TypeGuardsUtils {

  public static STRING_TYPE: string = "string";
  public static NUMBER_TYPE: string = "number";

  public static doesObjectContainsFields(object: any, fields: string[]): boolean {
    for (let field of fields) {
      if (!(field in object)) {
        return false;
      }
    }

    return true;
  }

  public static isFieldAnArray(field: any): boolean {
    return field instanceof Array
  }

  public static isFieldOfType(field: any, requiredFieldType: string): boolean {
    return typeof field == requiredFieldType
  }

}

export class QuizQuestionWithAnswerGuard {
  private static OBJECT_FIELDS: string[] = ["question", "answer"];

  public static check(object: any): object is QuizQuestionWithAnswer {
    return TypeGuardsUtils.doesObjectContainsFields(object, this.OBJECT_FIELDS)
        && TypeGuardsUtils.isFieldOfType(object.question, TypeGuardsUtils.STRING_TYPE)
        && TypeGuardsUtils.isFieldOfType(object.answer, TypeGuardsUtils.NUMBER_TYPE);
  }

}

export class QuizGuard {
  private static OBJECT_FIELDS: string[] = ["name", "introduction", "questionsWithAnswers"];

  public static check(object: any): object is Quiz {
    return TypeGuardsUtils.doesObjectContainsFields(object, this.OBJECT_FIELDS)
        && TypeGuardsUtils.isFieldOfType(object.name, TypeGuardsUtils.STRING_TYPE)
        && TypeGuardsUtils.isFieldOfType(object.introduction, TypeGuardsUtils.STRING_TYPE)
        && this.isFieldAnArrayOfQuestionsWithAnswers(object.questionsWithAnswers);
  }

  private static isFieldAnArrayOfQuestionsWithAnswers(field: any): boolean {
    return TypeGuardsUtils.isFieldAnArray(field)
      && this.areFieldsInArrayInstancesOfQuestionsWithAnswers(field);
  }

  private static areFieldsInArrayInstancesOfQuestionsWithAnswers(fields: any[]): boolean {
    return fields
      .every(field => this.isFieldInstanceOfQuestionsWithAnswers(field));
  }

  private static isFieldInstanceOfQuestionsWithAnswers(field: any): boolean {
    return QuizQuestionWithAnswerGuard.check(field);
  }

}
