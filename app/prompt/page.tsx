"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Answers = {
  tripLength: string;
  travelStyle: string;
  scenicInterest: string;
  scenicOptions: string;
  baseArea: string;
  teenPriority: string;
};

const answerLabels: Array<{
  id: keyof Answers;
  title: string;
}> = [
  { id: "tripLength", title: "Trip length / אורך הטיול" },
  { id: "travelStyle", title: "Travel style / סגנון הטיול" },
  { id: "scenicInterest", title: "Scenic train interest / עניין ברכבות נופיות" },
  { id: "scenicOptions", title: "Scenic train option / אפשרות רכבת נופית" },
  { id: "baseArea", title: "Preferred base area / אזור לינה מועדף" },
  { id: "teenPriority", title: "Teen-friendly priority / עדיפות לנערה בת 13" },
];

const checklist = [
  "Ask questions before suggesting a full itinerary. / לשאול שאלות לפני שמציעים מסלול מלא.",
  "Use the saved family answers when building the route. / להשתמש בתשובות המשפחתיות שנשמרו בעת בניית המסלול.",
  "Keep Mont-Blanc Express recommended, but optional. / להשאיר את Mont-Blanc Express כהמלצה, אבל לא כחובה.",
  "Do not force mountain trips into short itineraries. / לא להכניס טיולי הרים בכוח למסלולים קצרים.",
  "Check real dates, train schedules, weather and tickets before final booking. / לבדוק תאריכים אמיתיים, לוחות רכבת, מזג אוויר וכרטיסים לפני הזמנה סופית.",
];

export default function PromptPage() {
  const [answers, setAnswers] = useState<Answers | null>(null);

  useEffect(() => {
    const savedAnswers = localStorage.getItem("swissChristmasAnswers");

    if (savedAnswers) {
      try {
        setAnswers(JSON.parse(savedAnswers));
      } catch {
        setAnswers(null);
      }
    }
  }, []);

  function answerText(id: keyof Answers) {
    return answers?.[id] || "Not answered yet";
  }

  const generatedPrompt = `Create a realistic Switzerland Christmas family itinerary.

Family profile:
- Two parents
- One 13-year-old daughter
- Up to 10 days in Switzerland

Saved family answers:
- Trip length: ${answerText("tripLength")}
- Travel style: ${answerText("travelStyle")}
- Scenic train interest: ${answerText("scenicInterest")}
- Scenic train option: ${answerText("scenicOptions")}
- Preferred base area: ${answerText("baseArea")}
- Teen-friendly priority: ${answerText("teenPriority")}

Main goals:
- Christmas markets
- Shopping
- Family-friendly attractions
- Winter atmosphere
- Scenic train trips only when they truly fit the itinerary

Rules:
- Do not overload the days.
- Keep walking reasonable.
- Include shopping time and relaxed city time.
- Include good photo spots.
- Include chocolate, Christmas lights, winter views and teen-friendly experiences.
- Mont-Blanc Express is recommended, but optional.
- Add Mont-Blanc Express only if the trip is long enough, usually 8-10 days.
- Mont-Blanc Express is best from Montreux, Lausanne, Geneva or Martigny area.
- Mont-Blanc Express should be treated as a full day trip, not a quick stop.
- Mont-Blanc Express crosses into France, so passports and entry documents must be checked.
- GoldenPass Express may fit when connecting Lake Geneva, Gstaad, Interlaken or the Bernese Oberland.
- Jungfraujoch / Grindelwald should depend on weather, cost, visibility and trip length.

Before final booking:
Check current Christmas market dates, train schedules, opening hours, weather, ticket prices and passport / border requirements using reliable official sources.`;

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto flex max-w-5xl flex-col gap-8 px-6 py-10">
        <div className="rounded-3xl border border-white/10 bg-white/10 p-7 shadow-2xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-cyan-200">
            AI planning prompt / הנחיית תכנון ל־AI
          </p>

          <h1 className="text-4xl font-bold leading-tight md:text-5xl">
            Swiss Christmas Planner Prompt / הנחיה למתכנן טיול חג מולד בשווייץ
          </h1>

          <p className="mt-5 max-w-3xl leading-8 text-slate-200">
            This page now reads the saved family answers and creates a more
            personal AI planning prompt.
          </p>

          <p className="mt-4 max-w-3xl leading-8 text-slate-300" dir="rtl">
            העמוד הזה כבר קורא את התשובות שנשמרו ומכין הנחיה אישית יותר ל-AI.
          </p>
        </div>

        <section className="rounded-3xl border border-emerald-300/30 bg-emerald-300/10 p-7">
          <h2 className="text-2xl font-bold text-emerald-100">
            Your saved family answers / התשובות המשפחתיות שנשמרו
          </h2>

          <div className="mt-5 grid gap-3 text-slate-200">
            {answerLabels.map((answer) => (
              <p key={answer.id}>
                <span className="font-semibold text-emerald-100">
                  {answer.title}:
                </span>{" "}
                {answerText(answer.id)}
              </p>
            ))}
          </div>

          <p className="mt-5 leading-7 text-slate-300" dir="rtl">
            אם התשובות מופיעות כאן נכון, גם עמוד ההנחיה מחובר לתשובות שנשמרו.
          </p>
        </section>

        <section className="rounded-3xl border border-cyan-300/30 bg-cyan-300/10 p-7">
          <h2 className="text-2xl font-bold text-cyan-100">
            Generated AI prompt / הנחיית AI שנוצרה
          </h2>

          <pre className="mt-5 whitespace-pre-wrap rounded-2xl border border-white/10 bg-slate-950/80 p-5 text-sm leading-7 text-slate-200">
            {generatedPrompt}
          </pre>
        </section>

        <section className="rounded-3xl border border-amber-300/30 bg-amber-300/10 p-7">
          <h2 className="text-2xl font-bold text-amber-100">
            Planner behavior checklist / כללי התנהגות למתכנן
          </h2>

          <ul className="mt-5 space-y-3 text-slate-200">
            {checklist.map((item) => (
              <li key={item} className="flex gap-3">
                <span className="text-amber-300">&#10003;</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <div className="flex flex-wrap gap-4">
          <Link
            href="/search"
            className="rounded-full bg-cyan-300 px-6 py-3 font-semibold text-slate-950 transition hover:bg-cyan-200"
          >
                        Back to questions / חזרה לשאלות
          </Link>

          <Link
            href="/results"
            className="rounded-full border border-white/20 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
          >
                        View ideas / צפייה ברעיונות
          </Link>

          <Link
            href="/"
            className="rounded-full border border-white/20 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
          >
                        Back home / חזרה לדף הבית
          </Link>
        </div>
      </section>
    </main>
  );
}



