"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const STORAGE_KEY = "tuscanyAutumnAnswers";

type Answers = {
  tripLength: string;
  tripStartDate: string;
tripEndDate: string;
arrivalPoint: string;
departurePoint: string;
  travelStyle: string;
  transportation: string;
  scenicInterest: string;
  scenicOption: string;
  baseArea: string;
  lodgingType: string;
  lodgingBudget: string;
  roomSetup: string;
  lodgingPriorities: string[];
  teenPriorities: string[];
  teenPriority: string;  
};

const defaultAnswers: Answers = {
  tripLength: "",
  tripStartDate: "",
tripEndDate: "",
arrivalPoint: "",
departurePoint: "",
  travelStyle: "",
  transportation: "",
  scenicInterest: "",
  scenicOption: "",
  baseArea: "",
  lodgingType: "",
  lodgingBudget: "",
  roomSetup: "",
  lodgingPriorities: [],
  teenPriorities: [],
  teenPriority: "",
};

const questions = [
  {
  key: "tripLength",
  title: "כמה ימים מתוכנן הטיול?",
  helper: "אורך הטיול יעזור לנו לבחור כמה אזורים וכמה מקומות לינה לשלב.",
  options: [
    "4–5 ימים",
    "6–7 ימים",
    "8–10 ימים",
    
    "עדיין לא החלטנו",
  ],
},
  {
  key: "travelStyle",
  title: "איזה קצב טיול מתאים למשפחה?",
  helper: "הקצב ישפיע על מספר המקומות בכל יום, זמן המנוחה וכמות הנסיעות.",
  options: [
    "רגוע — מעט מקומות והרבה זמן חופשי",
    "מאוזן — שילוב של טיול ומנוחה",
    "פעיל — להספיק יותר בכל יום",
    "קצב שונה בימים שונים",
  ],
},
{
  key: "transportation",
  title: "איך אתם מתכננים להתנייד בטוסקנה?",
  helper: "הבחירה תשפיע על אזורי הלינה, מספר הבסיסים והאפשרות להגיע לכפרים ולעיירות קטנות.",
  options: [
    "רכב שכור לכל הטיול",
    "רכב שכור רק לחלק הכפרי",
    "רכבות ותחבורה ציבורית בלבד",
    "עדיין לא החלטנו",
  ],
 },
  {
    
  key: "scenicInterest",
  title: "עד כמה חשוב לשלב נופים וטבע בטיול?",
  helper: "התשובה תעזור לקבוע את האיזון בין ערים, עיירות, כפרים ונסיעות נופיות.",
  options: [
    "מאוד חשוב — רוצים הרבה נופים וכפרים",
    "חשוב, אבל בשילוב עם ערים ואטרקציות",
    "פחות חשוב — מעדיפים ערים, קניות ואוכל",
  ],
},
{
  key: "scenicOption",
  title: "איזה סוג של יום נופי הכי מושך אתכם?",
  helper: "התשובה תעזור לבחור בין כפרים, דרכים נופיות, אזורי כרמים וטבע פתוח.",
  options: [
    "יום של עיירות וכפרים ציוריים",
    "נסיעה נופית עם עצירות קצרות",
    "אזורי כרמים ואוכל מקומי",
    "טבע פתוח ותצפיות",
    "עדיין לא יודעים",
  ],
},
{
  key: "baseArea",
  title: "איזה אזור לינה נשמע מתאים יותר?",
  helper: "הבחירה תעזור לבנות מסלול הגיוני עם פחות נסיעות והחלפות מלון.",
  options: [
    "פירנצה",
    "סיינה",
    "קיאנטי / סן ג'ימיניאנו",
    "ואל ד'אורצ'ה / פיינצה / מונטפולצ'יאנו",
    "לוקה / פיזה",
    "שילוב של שני אזורים",
    "עדיין פתוחים להצעות",
  ],
},
{
  key: "lodgingType",
  title: "איזה סוג מקום לינה אתם מעדיפים?",
  helper: "הבחירה תעזור להתאים את אזורי הלינה, החניה והאווירה המשפחתית.",
  options: [
    "מלון במרכז עיר",
    "דירה משפחתית",
    "אגריטוריסמו או לינה כפרית",
    "שילוב של עיר וכפר",
    "עדיין לא החלטנו",
  ],
},
{
  key: "lodgingPriorities",
  title: "מה חשוב לכם במקום הלינה?",
  helper: "אפשר לבחור את הדברים שהכי חשובים למשפחה כדי להתאים את מקום הלינה בצורה טובה יותר.",
  options: [
    "חניה נוחה",
    "ארוחת בוקר",
    "חדר משפחתי",
    "מטבחון",
    "מעלית",
    "קרבה למרכז ולמסעדות",
  ],
},
{
  key: "lodgingBudget",
  title: "מה תקציב הלינה המועדף ללילה?",
  helper: "התקציב יעזור להתאים בין מלון, דירה ואגריטוריסמו ולבחור אזורים שמתאימים למשפחה.",
  options: [
    "עד 150 אירו ללילה",
    "150–250 אירו ללילה",
    "250–350 אירו ללילה",
    "מעל 350 אירו ללילה",
    "גמישים לפי המקום",
    "עדיין לא החלטנו",
  ],
},
{
  key: "roomSetup",
  title: "איזה סידור חדר ומיטות אתם מעדיפים?",
  helper: "הבחירה תעזור לוודא שמקום הלינה מתאים בנוחות לשני הורים ולנערה בת 13.",
  options: [
    "חדר אחד עם מיטה זוגית ומיטה נפרדת לנערה",
    "חדר משפחתי לשלושה",
    "שני חדרים נפרדים",
    "דירה עם חדר שינה וספה נפתחת",
    "גמישים לפי המקום",
    "עדיין לא החלטנו",
  ],
},
] as const;
const teenOptions = [
  "קניות ורחובות יפים",
  "גלידה, קינוחים ובתי קפה",
  "מקומות יפים לתמונות",
  "עיירות וכפרים ציוריים",
  "טבע, תצפיות ונסיעות נופיות",
  "סדנת בישול או פעילות אוכל",
  "אטרקציות קלילות ולא מוזיאונים כבדים",
  "זמן חופשי לשיטוט, קניות ומנוחה",

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
        lodgingPriorities: Array.isArray(parsed.lodgingPriorities)
  ? parsed.lodgingPriorities
  : [],
       
  teenPriorities: Array.isArray(parsed.teenPriorities)
          ? parsed.teenPriorities
          : parsed.teenPriority
            ? [parsed.teenPriority]
            : [],
      });
    }
  }, []);

useEffect(() => {
  if (!answers.tripStartDate || !answers.tripEndDate) {
    return;
  }

  const start = new Date(answers.tripStartDate);
  const end = new Date(answers.tripEndDate);

  const differenceInDays =
    Math.floor((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;

  let calculatedTripLength = "";

  if (differenceInDays >= 4 && differenceInDays <= 5) {
    calculatedTripLength = "4–5 ימים";
  } else if (differenceInDays >= 6 && differenceInDays <= 7) {
    calculatedTripLength = "6–7 ימים";
  } else if (differenceInDays >= 8 && differenceInDays <= 10) {
    calculatedTripLength = "8–10 ימים";
  }

  if (calculatedTripLength) {
    setAnswers((current) => ({
      ...current,
      tripLength: calculatedTripLength,
    }));
  }
}, [answers.tripStartDate, answers.tripEndDate]);
 

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

    return {
      ...current,
      teenPriorities: exists
        ? current.teenPriorities.filter((item) => item !== value)
        : [...current.teenPriorities, value],
    };
  });

  setSaved(true);
}
function toggleLodgingPriority(value: string) {
  setAnswers((current) => {
    const exists = current.lodgingPriorities.includes(value);

    return {
      ...current,
      lodgingPriorities: exists
        ? current.lodgingPriorities.filter((item) => item !== value)
        : [...current.lodgingPriorities, value],
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
            Tuscany Autumn Family Planner
          </p>

          <h1 className="mt-4 text-4xl font-bold">
            שאלות לתכנון טיול משפחתי בטוסקנה בסתיו
          </h1>

          <p className="mt-5 max-w-3xl leading-8 text-slate-300">
            ענו על השאלות כדי שהאפליקציה תבין את אופי הטיול. לאחר מכן אפשר
            להמשיך להצעת מסלול ראשונית.
          </p>
        </section>

        <section className="mt-8 space-y-6">
          <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-6">
  <h2 className="text-2xl font-bold">מתי מתחיל הטיול?</h2>

  <p className="mt-2 leading-7 text-slate-300">
    תאריך ההתחלה יעזור להתאים את המסלול לעונה ולימים המדויקים של הטיול.
  </p>

  <input
    type="date"
    value={answers.tripStartDate}
    onChange={(event) =>
      setAnswers((current) => ({
        ...current,
        tripStartDate: event.target.value,
      }))
    }
    className="mt-5 rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-white"
  />
</div>
<div className="rounded-3xl border border-white/10 bg-slate-900/80 p-6">
  <h2 className="text-2xl font-bold">מתי מסתיים הטיול?</h2>

  <p className="mt-2 leading-7 text-slate-300">
    תאריך הסיום יעזור לחשב את משך הטיול ולבנות מסלול שמתאים למספר הימים בפועל.
  </p>

  <input
    type="date"
    value={answers.tripEndDate}
    onChange={(event) =>
      setAnswers((current) => ({
        ...current,
        tripEndDate: event.target.value,
      }))
    }
    className="mt-5 rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-white"
  />
</div>
<div className="rounded-3xl border border-white/10 bg-slate-900/80 p-6">
  <h2 className="text-2xl font-bold">מהי נקודת ההגעה לטיול?</h2>

  <p className="mt-2 leading-7 text-slate-300">
    אפשר לציין שדה תעופה, תחנת רכבת או עיר שבה מתחיל הטיול.
  </p>

  <input
    type="text"
    value={answers.arrivalPoint}
    onChange={(event) =>
      setAnswers((current) => ({
        ...current,
        arrivalPoint: event.target.value,
      }))
    }
    placeholder="לדוגמה: Florence Airport"
    className="mt-5 w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-white"
  />
</div>

<div className="rounded-3xl border border-white/10 bg-slate-900/80 p-6">
  <h2 className="text-2xl font-bold">מהי נקודת היציאה או החזרה?</h2>

  <p className="mt-2 leading-7 text-slate-300">
    אפשר לציין שדה תעופה, תחנת רכבת או עיר שבה מסתיים הטיול.
  </p>

  <input
    type="text"
    value={answers.departurePoint}
    onChange={(event) =>
      setAnswers((current) => ({
        ...current,
        departurePoint: event.target.value,
      }))
    }
    placeholder="לדוגמה: Pisa Airport"
    className="mt-5 w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-white"
  />
</div>
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
                    const isLodgingPriorities = question.key === "lodgingPriorities";
const isSelected = isLodgingPriorities
  ? answers.lodgingPriorities.includes(option)
  : selected === option;

                    return (
                      <button
                        key={option}
                        type="button"
                        onClick={() =>
  isLodgingPriorities
    ? toggleLodgingPriority(option)
    : selectAnswer(question.key as keyof Answers, option)
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
  אפשר לבחור כמה תחומי עניין, כדי שהמסלול יתאים גם לה ולא רק למבוגרים.
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
                onClick={() => {
  const teenPriority = answers.teenPriorities.join(", ");

  window.localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({ ...answers, teenPriority })
  );
}}
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
             מומלץ לענות לפחות על אורך הטיול, קצב הטיול, חשיבות הנופים והטבע,
אזור לינה, ומה חשוב לנערה בת 13.
            </p>
          )}
        </section>
      </div>
    </main>
  );
}
