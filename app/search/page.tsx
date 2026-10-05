"use client";

import Link from "next/link";
import { tripLengths, type Answers } from "@/lib/answers";
import { useAnswers } from "@/lib/use-answers";

const questions = [
  {
    key: "tripLength",
    title: "מה משך הטיול המתוכנן?",
    helper: "משך הטיול יעזור לבחור כמה שווקים, רכבות ואטרקציות אפשר לשלב בלי עומס.",
    options: tripLengths,
  },
  {
    key: "travelStyle",
    title: "מה חשוב לכם במיוחד בחוויית חג המולד?",
    helper: "בחרו את הדגש המרכזי של הטיול.",
    options: [
      "שווקי חג מולד, אורות ואווירת ערב",
      "קניות, שוקולד, בתי קפה ורחובות יפים",
      "רכבות נוף, הרים ואלפים",
      "שילוב מאוזן של הכול",
    ],
  },
  {
    key: "winterComfort",
    title: "איך תרצו להתייחס לקור ולחורף?",
    helper: "בחורף חשוב לתכנן גם מקומות להתחמם ותוכנית גיבוי.",
    options: [
      "רוצים חוויית חורף מלאה — שלג, אורות ושווקים",
      "רוצים חורף, אבל בקצב נוח עם הפסקות חימום",
      "מעדיפים לא להיחשף לקור יותר מדי זמן ברצף",
      "עדיין לא יודעים",
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
    title: "איזה אזור בסיס נשמע מתאים יותר?",
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
  {
    key: "lodgingType",
    title: "מה סוג הלינה האפשרי?",
    helper: "הלינה משפיעה על טיולי כוכב, חזרה בערב משווקים ונוחות בחורף.",
    options: [
      "אירוח אצל חברים או משפחה בלוזאן",
      "מלון במיקום מרכזי",
      "דירה משפחתית",
      "עדיין לא החלטנו",
    ],
  },
  {
    key: "lodgingPriority",
    title: "מה חשוב במיוחד במקום הלינה?",
    helper: "בשוויץ בחורף עדיף בסיס שמקל על רכבות, שווקים וחזרה בערב.",
    options: [
      "קרוב לתחנת רכבת",
      "קרוב לשוקי חג מולד ולמרכז העיר",
      "נוח למשפחה וחם, עם הליכה קצרה",
      "מאפשר טיולי כוכב מלוזאן / מונטרה / אזור האגם",
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
  const { answers, ready, status, save, clear } = useAnswers();

  function selectAnswer(key: keyof Answers, value: string) {
    save((current) => ({ ...current, [key]: value }));
  }

  function toggleTeenPriority(value: string) {
    save((current) => ({
      ...current,
      teenPriorities: current.teenPriorities.includes(value)
        ? current.teenPriorities.filter((item) => item !== value)
        : [...current.teenPriorities, value],
    }));
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
            ענו על השאלות כדי שהאתר יבנה כיוון ראשוני שמתאים למשפחה, לחוויית חג המולד, לחורף, ללינה ולמה שחשוב לנער/ה.
           אפשר להמשיך לכיוון ראשוני גם עם תשובות חלקיות.
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
                        onClick={() => selectAnswer(question.key as keyof Answers, option)}
                        disabled={!ready}
                        aria-pressed={isSelected}
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
             מה חשוב במיוחד לנער/ה?
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
                    disabled={!ready}
                    aria-pressed={isSelected}
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
                {!ready ? "טוענים תשובות שמורות…" : status === "error"
                  ? "לא ניתן לטעון או לשמור את התשובות בדפדפן. אפשר להמשיך, אך הבחירות האחרונות עלולות לא להישמר."
                  : status === "saved" ? "התשובות נשמרו. אפשר להמשיך לכיוון ראשוני."
                  : "אפשר לבחור תשובות או להמשיך עם החלטות פתוחות."}
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={clear}
                disabled={!ready}
                className="rounded-full border border-white/20 px-6 py-3 font-semibold text-slate-100 hover:border-amber-300"
              >
                מחיקת תשובות
              </button>

              <Link
                href="/results"
                className="rounded-full bg-amber-300 px-6 py-3 text-center font-bold text-slate-950 hover:bg-amber-200"
              >
               המשך לכיוון ראשוני
              </Link>
            </div>
          </div>

          {!hasEnoughAnswers && (
            <p className="mt-4 leading-7 text-amber-200">
              מומלץ לענות לפחות על משך הטיול, סגנון הטיול, רכבות נופיות,
              אזור לינה, ומה חשוב לנער/ה.
            </p>
          )}
        </section>
      </div>
    </main>
  );
}
