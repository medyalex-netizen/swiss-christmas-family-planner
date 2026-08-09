"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "tuscanyAutumnAnswers";

type Answers = {
  tripLength: string;
  tripStartDate: string;
tripEndDate: string;
arrivalPoint: string;
departurePoint: string;
  transportation: string;
  travelStyle: string;
  scenicInterest: string;
  scenicOption: string;
  baseArea: string;
  lodgingType: string;
  lodgingBudget: string;
  roomSetup: string;
  lodgingPriorities?: string[];
  teenPriorities?: string[];
  teenPriority?: string;
};

const defaultAnswers: Answers = {
  tripLength: "",
  tripStartDate: "",
tripEndDate: "",
arrivalPoint: "",
departurePoint: "",
  transportation: "",
  travelStyle: "",
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

const plannerRules = [
  "לשאול שאלות לפני בניית מסלול סופי.",
  "להשתמש בתשובות המשפחתיות שנשמרו בעמוד השאלות.",
  "לא להעמיס יותר מדי על כל יום.",
  "לשלב זמן קניות, אוכל, קפה ושיטוט רגוע.",
  "לתת מקום גם למה שמעניין נערה בת 13.",
  "להשאיר יום נסיעה נופי כאפשרות מומלצת, אבל לא חובה.",
  "לא לשלב יותר מדי כפרים, עיירות או נסיעות ארוכות אם הטיול קצר מדי.",
  "לבדוק שעות פתיחה, זמני נסיעה, חניה, מזג אוויר ועלויות לפני הזמנה.",
];
export default function PromptPage() {
  const [answers, setAnswers] = useState<Answers>(defaultAnswers);

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);

    if (!stored) {
      return;
    }

    try {
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
    } catch {
      setAnswers(defaultAnswers);
    }
  }, []);

  const teenText =
    answers.teenPriorities && answers.teenPriorities.length > 0
      ? answers.teenPriorities.join(", ")
      : answers.teenPriority || "עדיין לא נבחר";
const lodgingPrioritiesText =
  answers.lodgingPriorities && answers.lodgingPriorities.length > 0
    ? answers.lodgingPriorities.join(", ")
    : "עדיין לא נבחר";
  const promptText = useMemo(() => {
    return `Create a realistic Tuscany autumn family itinerary.

Family profile:
- Two parents
- One 13-year-old daughter
- Trip length: up to 10 days

Saved family answers:
- Trip length: ${answers.tripLength || "עדיין לא נבחר"}
- Trip start date: ${answers.tripStartDate || "עדיין לא נבחר"}
- Trip end date: ${answers.tripEndDate || "עדיין לא נבחר"}
- Arrival point: ${answers.arrivalPoint || "עדיין לא נבחר"}
- Departure point: ${answers.departurePoint || "עדיין לא נבחר"}
- Travel pace: ${answers.travelStyle || "עדיין לא נבחר"}
- Transportation: ${answers.transportation || "עדיין לא נבחר"}
- Scenery and nature interest: ${answers.scenicInterest || "עדיין לא נבחר"}
- Preferred scenic day: ${answers.scenicOption || "עדיין לא נבחר"}
- Preferred base area: ${answers.baseArea || "עדיין לא נבחר"}
- Preferred lodging type: ${answers.lodgingType || "עדיין לא נבחר"}
- Lodging budget per night: ${answers.lodgingBudget || "עדיין לא נבחר"}
- Preferred room/bed setup: ${answers.roomSetup || "עדיין לא נבחר"}
- Lodging priorities: ${lodgingPrioritiesText}

- Teen-friendly priorities: ${teenText}

Main goals:
- Historic cities, picturesque towns, local food, shopping, scenery, and relaxed family time
- Florence, Siena, Lucca, Pisa, Chianti, San Gimignano, and Val d'Orcia when they fit the trip length
- Beautiful places for photos
- Gelato, cafés, local food, and relaxed city time
- A balanced combination of cities, towns, countryside, and free time
- Activities that are enjoyable for a 13-year-old girl

Important planning rules:
- Do not overload the days.
- Keep walking and driving reasonable.
- Include enough free time.
- Do not force too many towns, villages, or long drives into a short trip.
- Adapt the route to the selected transportation option.
- Avoid driving inside restricted historic-center zones unless access is clearly permitted.
- Check parking and ZTL restrictions before driving into Florence, Siena, Lucca, Pisa, or other historic towns.
- Scenic driving days are most relevant when the trip includes Chianti, Val d'Orcia, Pienza, Montepulciano, or San Gimignano.
- Florence, Siena, Lucca, and Pisa can be combined with countryside stays depending on trip length and transportation.
- Outdoor and countryside plans should depend on weather, driving time, road conditions, cost, and family energy.
- Before final booking, check official current sources for opening hours, driving restrictions, parking, weather, ticket prices, local events, and accommodation policies.

Please first ask any missing clarification questions.
Only after that, suggest a realistic day-by-day itinerary.`;
  }, [answers, teenText, lodgingPrioritiesText]);

  return (
    <main dir="rtl" className="min-h-screen bg-slate-950 px-6 py-10 text-white">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex flex-wrap gap-4">
          <Link href="/" className="text-sm text-amber-300 hover:text-amber-200">
            חזרה לדף הבית
          </Link>

          <Link
            href="/search"
            className="text-sm text-amber-300 hover:text-amber-200"
          >
            שינוי תשובות
          </Link>

          <Link
            href="/results"
            className="text-sm text-amber-300 hover:text-amber-200"
          >
            חזרה להצעת הכיוון
          </Link>
        </div>

        <section className="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl">
          <p dir="ltr" className="text-right text-sm font-semibold text-amber-300">
            Tuscany Autumn Family Planner
          </p>

          <p className="mt-3 leading-8 text-slate-200">
            אחרי שהכיוון נראה נכון, אפשר להמשיך לעמוד ההנחיה למתכנן. שם תיווצר
            הנחיה מסודרת שאפשר להשתמש בה כדי לבנות מסלול מפורט יותר.
          </p>
          <p className="mt-5 max-w-3xl leading-8 text-slate-300">
            העמוד הזה מכין הנחיה מסודרת לפי התשובות שנשמרו. אפשר להשתמש בה כדי
            לקבל מסלול מפורט יותר, ולאחר מכן להמשיך למסלול לדוגמה בתוך האפליקציה.
          </p>
        </section>

        <section className="mt-8 rounded-3xl border border-white/10 bg-slate-900/80 p-6">
          <h2 className="text-2xl font-bold">התשובות המשפחתיות שנשמרו</h2>

          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <AnswerCard label="אורך הטיול" value={answers.tripLength} />

<AnswerCard label="סגנון הטיול" value={answers.travelStyle} />

<AnswerCard
  label="אופן ההתניידות"
  value={answers.transportation}
/>

<AnswerCard
  label="עניין בנופים ובטבע"
  value={answers.scenicInterest}
/>

<AnswerCard
  label="סוג היום הנופי שמעניין אתכם"
  value={answers.scenicOption}
/>

            <AnswerCard label="אזור לינה מועדף" value={answers.baseArea} />
            <AnswerCard label="מה חשוב לנערה בת 13" value={teenText} />
          </div>
        </section>

        <section className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-2xl font-bold">הנחיה שנוצרה למתכנן</h2>

          <p className="mt-3 leading-7 text-slate-300">
           ההנחיה כתובה בעיקר באנגלית כדי שיהיה קל להדביק אותה בכל כלי תכנון או צ׳אט אחר. התשובות המשפחתיות נשארות כפי שנבחרו בעברית, כדי לא לאבד את המשמעות המקורית.
          </p>

          <pre
            dir="ltr"
            className="mt-5 whitespace-pre-wrap rounded-3xl border border-white/10 bg-slate-950 p-5 text-left text-sm leading-7 text-slate-100"
          >
            {promptText}
          </pre>
        </section>

        <section className="mt-8 rounded-3xl border border-white/10 bg-slate-900/80 p-6">
          <h2 className="text-2xl font-bold">כללי התנהגות למתכנן</h2>

          <div className="mt-5 space-y-3">
            {plannerRules.map((rule) => (
              <p key={rule} className="leading-7 text-slate-300">
                ✓ {rule}
              </p>
            ))}
          </div>
        </section>

        <section className="mt-8 rounded-3xl border border-amber-300/30 bg-amber-300/10 p-6">
          <h2 className="text-2xl font-bold text-amber-200">המשך</h2>

          <p className="mt-3 leading-8 text-slate-200">
            מכאן אפשר להמשיך למסלול לדוגמה, או לחזור אחורה ולשנות את התשובות.
          </p>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/itinerary"
              className="rounded-full bg-amber-300 px-6 py-3 text-center font-bold text-slate-950 hover:bg-amber-200"
            >
              המשך למסלול לדוגמה
            </Link>

            <Link
              href="/results"
              className="rounded-full border border-white/20 px-6 py-3 text-center font-semibold text-slate-100 hover:border-amber-300"
            >
              חזרה להצעת הכיוון
            </Link>

            <Link
              href="/search"
              className="rounded-full border border-white/20 px-6 py-3 text-center font-semibold text-slate-100 hover:border-amber-300"
            >
              שינוי תשובות
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}

function AnswerCard({ label, value }: { label: string; value?: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
      <p className="text-sm font-semibold text-amber-300">{label}</p>
      <p className="mt-2 leading-7 text-slate-100">
        {value && value.length > 0 ? value : "עדיין לא נבחר"}
      </p>
    </div>
  );
}