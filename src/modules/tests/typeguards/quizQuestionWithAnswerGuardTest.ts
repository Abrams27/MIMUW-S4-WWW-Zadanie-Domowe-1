import { expect } from "chai";
import "mocha";

import {QuizQuestionWithAnswerGuard} from "./../../typeguards";

const testValidJson: string = `{
  "question": "test",
  "answer": 1
}`;
runTestForQuizQuestionWithAnswerGuard(testValidJson, true, "should return `true` for valid json");

const testInvalidQuestionTypeJson: string = `{
  "question": 1,
  "answer": 1
}`;
runTestForQuizQuestionWithAnswerGuard(testInvalidQuestionTypeJson, false, "should return `false` for invalid question type json");

const testInvalidAnswerTypeJson: string = `{
  "question": "test",
  "answer": [1]
}`;
runTestForQuizQuestionWithAnswerGuard(testInvalidAnswerTypeJson, false, "should return `false` for invalid answer type json");

const testInvalidQuestionNameJson: string = `{
  "uestion": "test",
  "answer": 1
}`;
runTestForQuizQuestionWithAnswerGuard(testInvalidQuestionNameJson, false, "should return `false` for invalid question field name json");

const testInvalidAnswerNameJson: string = `{
  "question": "test",
  "anwer": 1
}`;
runTestForQuizQuestionWithAnswerGuard(testInvalidAnswerNameJson, false, "should return `false` for invalid answer field name json");

function runTestForQuizQuestionWithAnswerGuard(inputJson: string, expectedValue: boolean, message: string) {
  const parsedTestJson = JSON.parse(inputJson);

  describe("QuizQuestionWithAnswerGuard", () => {
    it(message, () => {
      expect(QuizQuestionWithAnswerGuard.check(parsedTestJson)).to.equal(expectedValue);
    });
  });
}
