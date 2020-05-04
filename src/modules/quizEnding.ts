import {Properties} from "./main/properties/properties.js";
import {Utils} from "./main/utils/utils.js";
import {QuizDetailedScoreboard} from "./main/scoreboard.js";
import {QuizEndingPageUpdater} from "./main/utils/quizEndingUtils.js";


const nullableDetailedScoreboardJson: string | null = sessionStorage.getItem(Properties.QUIZ_DETAILED_SCOREBOARD_SESSION_STORAGE_KEY);
const detailedScoreboardJson: string = Utils.getStringOrThrowError(nullableDetailedScoreboardJson, "invalid session storage key");

const detailedScoreboard: QuizDetailedScoreboard = QuizDetailedScoreboard.fromJson(detailedScoreboardJson);

// const documentEditor: DocumentEditor = DocumentEditor.fromDocument(document);

const quizEndingPageUpdater: QuizEndingPageUpdater = new QuizEndingPageUpdater(document, detailedScoreboard);
quizEndingPageUpdater.loadPage();
