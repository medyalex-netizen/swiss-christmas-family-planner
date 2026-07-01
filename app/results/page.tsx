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

const itineraryTypes = [
  {
    title: "5–6 days / טיול קצר",
    description:
      "Best for Zurich, Basel, Lucerne and Christmas markets. Less suitable for Mont-Blanc Express because the trip is short. / מתאים לציריך, בזל, לוצרן ושווקי חג מולד. פחות מתאים ל-Mont-Blanc Express כי הטיול קצר.",
  },
  {
    title: "7–8 days / טיול מאוזן",
    description:
      "Good balance between cities, Christmas markets, shopping and one scenic experience if it fits the route. / איזון טוב בין ערים, שווקי חג מולד, קניות וחוויה נופית אחת אם היא מתאימה למסלול.",
  },
  {
    title: "9–10 days / טיול מלא",
    description:
      "Enough time to include Lake Geneva, Interlaken / Grindelwald and possibly Mont-Blanc Express as an optional full day. / מספיק זמן לכלול את אגם ז׳נבה, אינטרלאקן / גרינדלוולד, ואולי גם את Mont-Blanc Express כיום מלא אופציונלי.",
  },
];

const cityIdeas = [
  {
    title: "Zurich / ציריך",
    tag: "Strong starting point / נקודת התחלה חזקה",
    text: "Good for arrival, shopping streets, Christmas lights, food and easy train connections. / מתאים לנחיתה, רחובות קניות, אורות חג מולד, אוכל וחיבורי רכבת נוחים.",
  },
  {
    title: "Basel / בזל",
    tag: "Christmas-market candidate / מועמדת חזקה לשווקי חג מולד",
    text: "A strong city option for Christmas atmosphere, old town walking and market-focused days. / עיר חזקה לאווירת חג מולד, טיול בעיר העתיקה וימים שמתמקדים בשווקים.",
  },
  {
    title: "Lucerne / לוצרן",
    tag: "Classic Swiss scenery / נוף שווייצרי קלאסי",
    text: "Good for lake views, bridges, mountain atmosphere and a comfortable family day trip. / מתאים לנוף אגם, גשרים, אווירת הרים ויום משפחתי נוח.",
  },
  {
    title: "Montreux / Lake Geneva / מונטרה / אגם ז׳נבה",
    tag: "Best for Mont-Blanc Express option / הכי מתאים לאפשרות Mont-Blanc Express",
    text: "Useful if the family wants the Mont-Blanc Express or a route toward Lausanne, Geneva or Martigny. / שימושי אם המשפחה רוצה את Mont-Blanc Express או מסלול לכיוון לוזאן, ז׳נבה או מרטיני.",
  },
  {
    title: "Interlaken / Grindelwald / אינטרלאקן / גרינדלוולד",
    tag: "Mountain and snow option / אפשרות הרים ושלג",
    text: "Good for a major mountain day, snow views and possibly Jungfraujoch if weather and budget make sense. / מתאים ליום הרים משמעותי, נופי שלג ואולי גם Jungfraujoch אם מזג האוויר והתקציב מתאימים.",
  },
];

const trainIdeas = [
  {
    title: "Mont-Blanc Express",
    status: "Recommended, but optional / מומלץ, אבל לא חובה",
    text: "Best for longer trips, usually 8–10 days, and mainly from the Lake Geneva / Martigny area. It is a full day trip and crosses into France, so passports and entry documents must be checked. / מתאים יותר לטיולים ארוכים, בדרך כלל 8–10 ימים, ובעיקר מאזור אגם ז׳נבה / מרטיני. זהו טיול יום מלא שחוצה לצרפת, לכן חייבים לבדוק דרכונים ומסמכי כניסה.",
  },
  {
    title: "GoldenPass Express",
    status: "Strong scenic train candidate / מועמדת חזקה לרכבת נופית",
    text: "May fit well when connecting Lake Geneva, Gstaad, Interlaken or the Bernese Oberland. Later we must check real schedules and seat options. / יכולה להתאים היטב כשמחברים בין אגם ז׳נבה, גשטאד, אינטרלאקן או אזור Bernese Oberland. בהמשך חייבים לבדוק לוחות זמנים אמיתיים ואפשרויות מקומות ישיבה.",
  },
  {
    title: "Jungfraujoch / Grindelwald",
    status: "Weather-dependent mountain day / יום הרים שתלוי במזג האוויר",
    text: "A major Swiss mountain experience. It should not be forced into a short trip, and weather, cost and visibility matter. / חוויית הרים שווייצרית משמעותית. לא כדאי להכניס אותה בכוח לטיול קצר, כי מזג האוויר, העלות והראות חשובים מאוד.",
  },
];

const familyRules = [
  "Do not overload every day. / לא להעמיס על כל יום.",
  "Keep time for shopping, food and relaxed walking. / להשאיר זמן לקניות, אוכל והליכה רגועה.",
  "Include photo spots, chocolate, Christmas lights and city time for the 13-year-old. / לכלול מקומות יפים לתמונות, שוקולד, אורות חג מולד וזמן עירוני לילדה בת 13.",
  "Use scenic trains only when they improve the trip. / להשתמש ברכבות נופיות רק כשהן משפרות את הטיול.",
  "Before booking, verify Christmas market dates, train schedules, weather, hotel areas and ticket prices. / לפני הזמנה, לבדוק תאריכי שווקי חג מולד, לוחות רכבת, מזג אוויר, אזורי מלונות ומחירי כרטיסים.",
];

export default function ResultsPage() {
  const [answers, setAnswers] = useState<Answers | null>(null);

  useEffect(() => {
    const savedAnswers = localStorage.getItem("swissChristmasAnswers");

    if (savedAnswers) {
      setAnswers(JSON.parse(savedAnswers));
    }
  }, []);

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-10">
        <div className="rounded-3xl border border-white/10 bg-white/10 p-7 shadow-2xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-cyan-200">
            Trip ideas / רעיונות לטיול
          </p>

          <h1 className="text-4xl font-bold leading-tight md:text-5xl">
            Swiss Christmas Family Trip Ideas / רעיונות לטיול משפחתי בשווייץ בחג המולד
          </h1>

          <p className="mt-5 max-w-3xl leading-8 text-slate-200">
            This page now reads the answers saved on the question page and shows
            them before the general itinerary ideas.
          </p>

          <p className="mt-4 max-w-3xl leading-8 text-slate-300" dir="rtl">
            העמוד הזה כבר קורא את התשובות שנשמרו בעמוד השאלות ומציג אותן לפני
            רעיונות המסלול הכלליים.
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
                {answers?.[answer.id] || "Not answered yet"}
              </p>
            ))}
          </div>

          <p className="mt-5 leading-7 text-slate-300" dir="rtl">
            אם התשובות כאן מופיעות נכון, זה אומר שעמוד התוצאות מחובר בהצלחה
            לתשובות שנשמרו בדפדפן.
          </p>
        </section>

        <section className="grid gap-5 md:grid-cols-3">
          {itineraryTypes.map((idea) => (
            <article
              key={idea.title}
              className="rounded-2xl border border-white/10 bg-white/[0.07] p-6"
            >
              <h2 className="text-2xl font-bold text-cyan-100">
                {idea.title}
              </h2>
              <p className="mt-4 leading-7 text-slate-200">
                {idea.description}
              </p>
            </article>
          ))}
        </section>

        <section className="rounded-3xl border border-white/10 bg-white/[0.07] p-7">
          <h2 className="text-3xl font-bold text-cyan-100">
            City and base ideas / רעיונות לערים ואזורי לינה
          </h2>

          <div className="mt-6 grid gap-5 md:grid-cols-2">
            {cityIdeas.map((city) => (
              <article
                key={city.title}
                className="rounded-2xl border border-white/10 bg-slate-900/70 p-5"
              >
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">
                  {city.tag}
                </p>
                <h3 className="mt-2 text-2xl font-bold">{city.title}</h3>
                <p className="mt-3 leading-7 text-slate-300">{city.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="rounded-3xl border border-amber-300/30 bg-amber-300/10 p-7">
          <h2 className="text-3xl font-bold text-amber-100">
            Scenic train trips / טיולי רכבת נופיים
          </h2>

          <div className="mt-6 grid gap-5">
            {trainIdeas.map((train) => (
              <article
                key={train.title}
                className="rounded-2xl border border-white/10 bg-slate-950/60 p-5"
              >
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-200">
                  {train.status}
                </p>
                <h3 className="mt-2 text-2xl font-bold">{train.title}</h3>
                <p className="mt-3 leading-7 text-slate-200">{train.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="rounded-3xl border border-cyan-300/30 bg-cyan-300/10 p-7">
          <h2 className="text-3xl font-bold text-cyan-100">
            Family planning rules / כללי תכנון למשפחה
          </h2>

          <ul className="mt-5 space-y-3 text-slate-200">
            {familyRules.map((rule) => (
              <li key={rule} className="flex gap-3">
                <span className="text-cyan-300">✓</span>
                <span>{rule}</span>
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
            href="/prompt"
            className="rounded-full border border-white/20 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
          >
            View AI prompt / צפייה בהנחיית AI
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
