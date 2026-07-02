"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const STORAGE_KEY = "swissChristmasAnswers";

type Answers = {
  tripLength: string;
  travelStyle: string;
  scenicInterest: string;
  scenicOption: string;
  baseArea: string;
  teenPriorities: string[];
  teenPriority: string;
};

const defaultAnswers: Answers = {
  tripLength: "",
  travelStyle: "",
  scenicInterest: "",
  scenicOption: "",
  baseArea: "",
  teenPriorities: [],
  teenPriority: "",
};

const questions = [
  {
    key: "tripLength",
    title: "כמה ימים מתוכנן הטיול?",
    helper: "זה משפיע על השאלה האם כדאי לשלב רכבות נופיות וימי הרים.",
    options: [
      "5-6 ימים — טיול קצר וממוקד",
      "7-8 ימים — טיול מאוזן",
      "9-10 ימים — מספיק זמן גם לרכבות נופיות",
    ],
  },
  {
    key: "travelStyle",
    title: "מה סגנון הטיול הרצוי?",
    helper: "בחרו את הסגנון שהכי מתאים למשפחה.",
    options: [
      "שווקי חג מולד ואווירה חורפית",
      "קניות, רחובות יפים וזמן עירוני",
      "נופים, רכבות והרים",
      "שילוב מאוזן של הכול",
    ],
  },
  {
    key: "scenicInterest",
    title: "האם חשוב לשלב רכבות נופיות?",
    helper: "רכבות נופיות יכולות להיות חוויה נהדרת, אבל הן לא חייבות להיכנס לכל מסלול.",
    options: [
      "כן, מאוד חשוב",
      "כן, אבל רק אם זה משתלב טבעית במסלול",
      "לא חובה — עדיף להתמקד בערים, שווקים וקניות",
    ],
  },
  {
    key: "scenicOption",
    title: "איזו רכבת נופית מעניינת אתכם במיוחד?",
    helper: "הבחירה כאן עוזרת להבין לאיזה אזור כדאי לכוון את המסלול.",
    options: [
      "Mont-Blanc Express — מומלץ, אבל לא חובה",
      "GoldenPass Express — מתאים לחיבור בין אזור אגם ז׳נבה לאזור אינטרלאקן",
      "Jungfraujoch / Grindelwald — יום הרים משמעותי שתלוי במזג האוויר ובתקציב",
      "עדיין לא יודעים",
    ],
  },
  {
    key: "baseArea",
    title: "איזה אזור לינה נשמע מתאים יותר?",
    helper: "זה לא מחליף תכנון סופי, אבל עוזר לבנות כיוון למסלול.",
    options: [
      "ציריך",
      "באזל",
      "לוצרן",
      "לוזאן / מונטרה / אזור אגם ז׳נבה",
      "אינטרלאקן / גרינדלוולד",
      "עדיין פתוחים להצעות",
    ],
  },
] as const;

const teenOptions = [
  "קניות ורחובות יפים",
  "שוקולד, קינוחים ובתי קפה",
  "מקומות יפים לתמונות",
  "אווירת חג מולד, אורות ושווקים",
  "רכבות ונופים",
  "שלג והרים",
  "אטרקציות קלילות ולא מוזיאונים כבדים",
];

export default function SearchPage() {
  const [answers, setAnswers] = useState<Answers>(defaultAnswers);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);

    if (stored) {
      const parsed = JSON.parse(stored);

      setAnswers({
        ...defaultAnswers,
        ...parsed,
        teenPriorities: Array.isArray(parsed.teenPriorities)
          ? parsed.teenPriorities
          : parsed.teenPriority
            ? [parsed.teenPriority]
            : [],
      });
    }
  }, []);

  useEffect(() => {
    const teenPriority = answers.teenPriorities.join(", ");

    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ ...answers, teenPriority })
    );
  }, [answers]);

  function selectAnswer(key: keyof Answers, value: string) {
    setAnswers((current) => ({
      ...current,
      [key]: value,
    }));

    setSaved(true);
  }

  function toggleTeenPriority(value: string) {
    setAnswers((current) => {
      const exists = current.teenPriorities.includes(value);

      const nextTeenPriorities = exists
        ? current.teenPriorities.filter((item) => item !== value)
        : [...current.teenPriorities, value];

      return {
        ...current,
        teenPriorities: nextTeenPriorities,
        teenPriority: nextTeenPriorities.join(", "),
      };
    });

    setSaved(true);
  }

  function clearAnswers() {
    setAnswers(defaultAnswers);
    window.localStorage.removeItem(STORAGE_KEY);
    setSaved(false);
  }

  const hasEnoughAnswers = Boolean(
    answers.tripLength &&
      answers.travelStyle &&
      answers.scenicInterest &&
      answers.baseArea &&
      answers.teenPriorities.length > 0
  );

  return (
    <main dir="rtl" className="min-h-screen bg-slate-950 px-6 py-10 text-white">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8">
          <Link href="/" className="text-sm text-amber-300 hover:text-amber-200">
            חזרה לדף הבית
          </Link>
        </div>

        <section className="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl">
          <p dir="ltr" className="text-right text-sm font-semibold text-amber-300">
            Swiss Christmas Family Planner
          </p>

          <h1 className="mt-4 text-4xl font-bold">
            שאלות לתכנון טיול משפחתי בשווייץ בחג המולד
          </h1>

          <p className="mt-5 max-w-3xl leading-8 text-slate-300">
            ענו על השאלות כדי שהאפליקציה תבין את אופי הטיול. לאחר מכן אפשר
            להמשיך להצעת מסלול ראשונית.
          </p>
        </section>

        <section className="mt-8 space-y-6">
          {questions.map((question) => {
            const selected = answers[question.key as keyof Answers] as string;

            return (
              <div
                key={question.key}
                className="rounded-3xl border border-white/10 bg-slate-900/80 p-6"
              >
                <h2 className="text-2xl font-bold">{question.title}</h2>
                <p className="mt-2 leading-7 text-slate-300">
                  {question.helper}
                </p>

                <div className="mt-5 grid gap-3 md:grid-cols-2">
                  {question.options.map((option) => {
                    const isSelected = selected === option;

                    return (
                      <button
                        key={option}
                        type="button"
                        onClick={() =>
                          selectAnswer(question.key as keyof Answers, option)
                        }
                        className={`rounded-2xl border p-4 text-right leading-7 transition ${
                          isSelected
                            ? "border-amber-300 bg-amber-300 text-slate-950"
                            : "border-white/10 bg-white/5 text-slate-100 hover:border-amber-300/70"
                        }`}
                      >
                        {option}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}

          <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-6">
            <h2 className="text-2xl font-bold">
              מה חשוב במיוחד לנערה בת 13?
            </h2>

            <p className="mt-2 leading-7 text-slate-300">
              כאן אפשר לבחור יותר מאפשרות אחת.
            </p>

            <div className="mt-5 grid gap-3 md:grid-cols-2">
              {teenOptions.map((option) => {
                const isSelected = answers.teenPriorities.includes(option);

                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() => toggleTeenPriority(option)}
                    className={`rounded-2xl border p-4 text-right leading-7 transition ${
                      isSelected
                        ? "border-amber-300 bg-amber-300 text-slate-950"
                        : "border-white/10 bg-white/5 text-slate-100 hover:border-amber-300/70"
                    }`}
                  >
                    {isSelected ? "✓ " : ""}
                    {option}
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        <section className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-2xl font-bold">התשובות נשמרות בדפדפן</h2>

              <p className="mt-2 text-slate-300">
                {saved
                  ? "התשובות נשמרו. אפשר להמשיך להצעת מסלול."
                  : "בחרו תשובות ואז המשיכו להצעת מסלול."}
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={clearAnswers}
                className="rounded-full border border-white/20 px-6 py-3 font-semibold text-slate-100 hover:border-amber-300"
              >
                מחיקת תשובות
              </button>

              <Link
                href="/results"
                className={`rounded-full px-6 py-3 text-center font-bold ${
                  hasEnoughAnswers
                    ? "bg-amber-300 text-slate-950 hover:bg-amber-200"
                    : "bg-slate-700 text-slate-300"
                }`}
              >
                המשך להצעת מסלול
              </Link>
            </div>
          </div>

          {!hasEnoughAnswers && (
            <p className="mt-4 leading-7 text-amber-200">
              מומלץ לענות לפחות על אורך הטיול, סגנון הטיול, רכבות נופיות,
              אזור לינה, ומה חשוב לנערה בת 13.
            </p>
          )}
        </section>
      </div>
    </main>
  );
}
