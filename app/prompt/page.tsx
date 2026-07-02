"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "swissChristmasAnswers";

type Answers = {
  tripLength: string;
  travelStyle: string;
  scenicInterest: string;
  scenicOption: string;
  baseArea: string;
  teenPriorities?: string[];
  teenPriority?: string;
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

const plannerRules = [
  "לשאול שאלות לפני בניית מסלול סופי.",
  "להשתמש בתשובות המשפחתיות שנשמרו בעמוד השאלות.",
  "לא להעמיס יותר מדי על כל יום.",
  "לשלב זמן קניות, אוכל, קפה ושיטוט רגוע.",
  "לתת מקום גם למה שמעניין נערה בת 13.",
  "להשאיר את Mont-Blanc Express כאפשרות מומלצת, אבל לא חובה.",
  "לא לשלב ימי הרים או רכבות נופיות אם הטיול קצר מדי.",
  "לבדוק תאריכים, שעות פתיחה, רכבות, מזג אוויר ועלויות לפני הזמנה.",
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
      : answers.teenPriority || "Not selected yet";

  const promptText = useMemo(() => {
    return `Create a realistic Switzerland Christmas family itinerary.

Family profile:
- Two parents
- One 13-year-old daughter
- Trip length: up to 10 days

Saved family answers:
- Trip length: ${answers.tripLength || "Not selected yet"}
- Travel style: ${answers.travelStyle || "Not selected yet"}
- Scenic train interest: ${answers.scenicInterest || "Not selected yet"}
- Scenic train option: ${answers.scenicOption || "Not selected yet"}
- Preferred base area: ${answers.baseArea || "Not selected yet"}
- Teen-friendly priorities: ${teenText}

Main goals:
- Christmas markets
- Shopping
- Family-friendly attractions
- Winter atmosphere
- Beautiful places for photos
- Chocolate, cafés and relaxed city time
- Scenic train trips only when they truly fit the route

Important planning rules:
- Do not overload the days.
- Keep walking reasonable.
- Include enough free time.
- Do not force mountain days into a short trip.
- Mont-Blanc Express is recommended, but optional.
- Mont-Blanc Express is most relevant if the trip includes Lake Geneva, Lausanne, Montreux, Geneva or Martigny.
- GoldenPass Express may fit when connecting Lake Geneva with Interlaken or the Bernese Oberland.
- Jungfraujoch / Grindelwald should depend on weather, visibility, cost and family energy.
- Before final booking, check official current sources for Christmas market dates, train schedules, weather, ticket prices, opening hours and passport or border requirements.

Please first ask any missing clarification questions.
Only after that, suggest a realistic day-by-day itinerary.`;
  }, [answers, teenText]);

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
            Swiss Christmas Family Planner
          </p>

          <h1 className="mt-4 text-4xl font-bold">
            הנחיה למתכנן טיול חג מולד בשווייץ
          </h1>

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
              label="עניין ברכבות נופיות"
              value={answers.scenicInterest}
            />
            <AnswerCard
              label="רכבת נופית שמעניינת אתכם"
              value={answers.scenicOption}
            />
            <AnswerCard label="אזור לינה מועדף" value={answers.baseArea} />
            <AnswerCard label="מה חשוב לנערה בת 13" value={teenText} />
          </div>
        </section>

        <section className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-2xl font-bold">הנחיה שנוצרה למתכנן</h2>

          <p className="mt-3 leading-7 text-slate-300">
            ההנחיה עצמה נשארת באנגלית כדי שיהיה קל להדביק אותה בכל כלי תכנון או
            צ׳אט אחר. מסביב לה — העמוד עצמו נשאר בעברית מסודרת.
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