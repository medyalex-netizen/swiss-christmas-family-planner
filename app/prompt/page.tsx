"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "swissChristmasAnswers";
type Answers = {
  tripLength: string;
  travelStyle: string;
  winterComfort?: string;
  scenicInterest: string;
  scenicOption: string;
  baseArea: string;
  lodgingType?: string;
  lodgingPriority?: string;
  teenPriorities?: string[];
  teenPriority?: string;
};
const defaultAnswers: Answers = {
  tripLength: "",
  travelStyle: "",
  winterComfort: "",
  scenicInterest: "",
  scenicOption: "",
  baseArea: "",
  lodgingType: "",
  lodgingPriority: "",
  teenPriorities: [],
  teenPriority: "",
};
const plannerRules = [
  "לשאול שאלות לפני בניית מסלול סופי.",
  "להשתמש בתשובות המשפחתיות שנשמרו בעמוד השאלות.",
  "לא להעמיס יותר מדי על כל יום.",
  "לשלב זמן קניות, אוכל, קפה ושיטוט רגוע.",
  "לתת מקום גם למה שמעניין נער/ה .",
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
      : answers.teenPriority || "עדיין לא נבחר";
const promptText = useMemo(() => {
  return `Create a Haute Couture Swiss Christmas family itinerary.

This is not a generic Switzerland winter trip.
This is a personalized Christmas Markets family trip, inspired by the same family-planning logic as the Tuscany Autumn Family Planner.

Family profile:
- Two parents
- One teenager / teen daughter
- Include נער/ה in the family planning, without fixing a specific age.
- Trip length: up to 10 days

Saved family answers:
- Trip length: ${answers.tripLength || "עדיין לא נבחר"}
- Christmas experience style: ${answers.travelStyle || "עדיין לא נבחר"}
- Winter and cold comfort: ${answers.winterComfort || "עדיין לא נבחר"}
- Scenic train interest: ${answers.scenicInterest || "עדיין לא נבחר"}
- Scenic train option: ${answers.scenicOption || "עדיין לא נבחר"}
- Preferred base area: ${answers.baseArea || "עדיין לא נבחר"}
- Possible lodging type: ${answers.lodgingType || "עדיין לא נבחר"}
- Lodging priority: ${answers.lodgingPriority || "עדיין לא נבחר"}
- Teen-friendly priorities: ${teenText}

Main goals:
- Christmas markets as a central experience
- Evening lights and Christmas atmosphere
- Shopping, gifts and beautiful streets
- Chocolate, cafés, desserts and warm indoor breaks
- Family-friendly attractions
- Beautiful places for photos
- Winter feeling, including snow if realistic
- Scenic trains and Alps only when they truly fit the route
- A trip that feels special, personal and well balanced, not overloaded

Lodging and base logic:
- If lodging is with friends or family in Lausanne, treat Lausanne as a possible central base.
- From Lausanne, consider realistic day trips to Montreux, Vevey, Geneva, Christmas markets around Lake Geneva, and suitable train experiences.
- If lodging is a hotel or apartment, prefer a central location near a train station, Christmas markets, restaurants and easy evening return.
- Do not overload the hosts if staying with friends.
- Keep enough independent family time even if staying with friends.

Teen layer:
- The teenager should influence the quality of the itinerary, but should not become the main subject of the website.
- Include things that can make the trip enjoyable for a teenager: shopping, Christmas lights, chocolate, cafés, photos, snow experience, scenic views and free time.
- Avoid an itinerary that is only museums, long walking days or adult-focused sightseeing.

Winter comfort rules:
- Plan for cold weather, snow or rain.
- Include warm breaks during the day.
- Avoid too much outdoor exposure without cafés, shops or indoor alternatives.
- Keep walking reasonable.
- Include backup options for bad weather.
- Mountain days should depend on weather, visibility, cost and family energy.

Scenic train and Alps rules:
- Do not force scenic trains into a short trip.
- Mont-Blanc Express is recommended, but optional.
- Mont-Blanc Express is most relevant if the trip includes Lake Geneva, Lausanne, Montreux, Geneva or Martigny.
- GoldenPass Express may fit when connecting Lake Geneva with Interlaken or the Bernese Oberland.
- Jungfraujoch / Grindelwald should depend on weather, visibility, cost and family energy.
- Mention the Swiss Alps when relevant, but keep the route realistic.

Important planning rules:
- Do not overload the days.
- Keep the pace family-friendly.
- Include enough free time.
- Balance parents' comfort with the teenager's interests.
- Prioritize Christmas markets, winter atmosphere, comfort, and realistic logistics.
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

          <p className="mt-3 leading-8 text-slate-200">
            אחרי שהכיוון נראה נכון, אפשר להמשיך לעמוד ההנחיה למתכנן. שם תיווצר
            הנחיה מסודרת שאפשר להשתמש בה כדי לבנות מסלול מפורט יותר.
          </p>
          <p className="mt-5 max-w-3xl leading-8 text-slate-300">
            העמוד הזה מכין הנחיה מסודרת לפי התשובות שנשמרו. אפשר להשתמש בה כדי
            לקבל מסלול מפורט יותר, ולאחר מכן להמשיך למסלול לדוגמה בתוך ההאתר.
          </p>
        </section>

        <section className="mt-8 rounded-3xl border border-white/10 bg-slate-900/80 p-6">
          <h2 className="text-2xl font-bold">התשובות המשפחתיות שנשמרו</h2>

          <div className="mt-5 grid gap-4 md:grid-cols-2">
          <AnswerCard label="משך הטיול" value={answers.tripLength} />
<AnswerCard label="חוויית חג המולד" value={answers.travelStyle} />
<AnswerCard
  label="קור וחורף"
  value={answers.winterComfort || "עדיין לא נבחר"}
/>
<AnswerCard
  label="עניין ברכבות נופיות"
  value={answers.scenicInterest}
/>
<AnswerCard
  label="רכבת נופית שמעניינת אתכם"
  value={answers.scenicOption}
/>
<AnswerCard label="אזור בסיס מועדף" value={answers.baseArea} />
<AnswerCard
  label="סוג לינה אפשרי"
  value={answers.lodgingType || "עדיין לא נבחר"}
/>
<AnswerCard
  label="מה חשוב במקום הלינה"
  value={answers.lodgingPriority || "עדיין לא נבחר"}
/>
<AnswerCard label="מה חשוב לנער/ה" value={teenText} />
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