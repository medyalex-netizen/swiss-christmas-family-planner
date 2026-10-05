import type { Answers } from "./answers";

export const weatherLocations = [
  { name: "Lausanne", label: "לוזאן", latitude: 46.5197, longitude: 6.6323 },
  { name: "Montreux", label: "מונטרה", latitude: 46.4312, longitude: 6.9107 },
  { name: "Zurich", label: "ציריך", latitude: 47.3769, longitude: 8.5417 },
  { name: "Basel", label: "באזל", latitude: 47.5596, longitude: 7.5886 },
  { name: "Lucerne", label: "לוצרן", latitude: 47.0502, longitude: 8.3093 },
  { name: "Interlaken", label: "אינטרלאקן", latitude: 46.6863, longitude: 7.8632 },
];

export function chooseWeatherLocation(answers: Pick<Answers, "baseArea" | "lodgingType">) {
  const base = answers.baseArea;
  if (base.includes("לוזאן")) return weatherLocations[0];
  if (base.includes("מונטרה")) return weatherLocations[1];
  if (base.includes("ציריך")) return weatherLocations[2];
  if (base.includes("באזל")) return weatherLocations[3];
  if (base.includes("לוצרן")) return weatherLocations[4];
  if (base.includes("אינטרלאקן") || base.includes("גרינדלוולד")) return weatherLocations[5];
  if (answers.lodgingType.includes("לוזאן")) return weatherLocations[0];
  return weatherLocations[0];
}
