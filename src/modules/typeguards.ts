import {QuizQuestionWithAnswer} from './../resources/quizzesConfig.js';

export class TypeGuardsUtils {

  public static doesObjectContainsFields(object: any, fields: string[]): boolean {
    for (let field of fields) {
      if (!(field in object)) {
        return false;
      }
    }

    return true;
  }

  public static checkFieldType(field: any, requiredFieldType: string): boolean {
    return typeof field == requiredFieldType
  }

}

export class QuizQuestionWithAnswerGuard {

  private static STRING_TYPE: string = "string";
  private static NUMBER_TYPE: string = "number";

  private static OBJECT_FIELDS: string[] = ["question", "answer"];

  public static check(object: any): object is QuizQuestionWithAnswer {
    return TypeGuardsUtils.doesObjectContainsFields(object, this.OBJECT_FIELDS)
        && TypeGuardsUtils.checkFieldType(object.question, this.STRING_TYPE)
        && TypeGuardsUtils.checkFieldType(object.answer, this.NUMBER_TYPE);
  }

}
