export const STORAGE_KEY = "swissChristmasAnswers";
export const tripLengths = [
  "5-6 ימים — טיול קצר וממוקד",
  "7-8 ימים — טיול מאוזן",
  "9-10 ימים — מספיק זמן גם לשווקים, רכבות ויום הרים",
] as const;

export type Answers = {
  tripLength: string;
  travelStyle: string;
  winterComfort: string;
  scenicInterest: string;
  scenicOption: string;
  baseArea: string;
  lodgingType: string;
  lodgingPriority: string;
  teenPriorities: string[];
  teenPriority: string;
};

export function emptyAnswers(): Answers {
  return {
    tripLength: "", travelStyle: "", winterComfort: "", scenicInterest: "",
    scenicOption: "", baseArea: "", lodgingType: "", lodgingPriority: "",
    teenPriorities: [], teenPriority: "",
  };
}

export function normalizeAnswers(value: unknown): Answers {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new Error("Invalid answers");
  }
  const source = value as Record<string, unknown>;
  const answers = emptyAnswers();
  for (const key of Object.keys(answers) as (keyof Answers)[]) {
    if (key !== "teenPriorities" && typeof source[key] === "string") {
      answers[key] = source[key] as string;
    }
  }
  const duration = answers.tripLength.match(/^(5\s*[-–—]\s*6|7\s*[-–—]\s*8|9\s*[-–—]\s*10)\s*ימים/);
  if (duration) {
    answers.tripLength = tripLengths[duration[1].startsWith("5") ? 0 : duration[1].startsWith("7") ? 1 : 2];
  }
  answers.teenPriorities = Array.isArray(source.teenPriorities)
    ? [...new Set(source.teenPriorities.filter((item): item is string => typeof item === "string" && item.trim().length > 0))]
    : answers.teenPriority ? answers.teenPriority.split(", ").filter(Boolean) : [];
  answers.teenPriority = answers.teenPriorities.join(", ");
  return answers;
}

type AnswerStorage = Pick<Storage, "getItem" | "setItem" | "removeItem">;
export function readAnswers(storage: AnswerStorage) {
  try {
    const raw = storage.getItem(STORAGE_KEY);
    return { answers: raw ? normalizeAnswers(JSON.parse(raw)) : emptyAnswers(), error: false };
  } catch {
    return { answers: emptyAnswers(), error: true };
  }
}
export function writeAnswers(storage: AnswerStorage, answers: Answers): boolean {
  try {
    storage.setItem(STORAGE_KEY, JSON.stringify(normalizeAnswers(answers)));
    return true;
  } catch { return false; }
}
export function removeAnswers(storage: AnswerStorage): boolean {
  try { storage.removeItem(STORAGE_KEY); return true; }
  catch { return false; }
}
