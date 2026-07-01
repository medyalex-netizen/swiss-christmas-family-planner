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

const initialAnswers: Answers = {
  tripLength: "",
  travelStyle: "",
  scenicInterest: "",
  scenicOptions: "",
  baseArea: "",
  teenPriority: "",
};

const questions: Array<{
  id: keyof Answers;
  title: string;
  hebrewTitle: string;
  options: string[];
}> = [
  {
    id: "tripLength",
    title: "Trip length",
    hebrewTitle: "אורך הטיול",
    options: [
      "5–6 days — focused and efficient / 5–6 ימים — טיול ממוקד ויעיל",
      "7–8 days — balanced family trip / 7–8 ימים — טיול משפחתי מאוזן",
      "9–10 days — enough time for scenic trains / 9–10 ימים — מספיק זמן לרכבות נופיות",
      "Not sure yet / עדיין לא בטוחים",
    ],
  },
  {
    id: "travelStyle",
    title: "Main travel style",
    hebrewTitle: "סגנון הטיול",
    options: [
      "Christmas markets first / קודם כל שווקי חג מולד",
      "Shopping and city atmosphere / קניות ואווירה עירונית",
      "Attractions and family experiences / אטרקציות וחוויות משפחתיות",
      "A balanced mix of everything / שילוב מאוזן של הכול",
    ],
  },
  {
    id: "scenicInterest",
    title: "Scenic train trips",
    hebrewTitle: "טיולי רכבת נופיים",
    options: [
      "Yes, very interested / כן, מאוד מעוניינים",
      "Maybe, only if it fits the itinerary / אולי, רק אם זה מתאים למסלול",
      "No, we prefer cities, markets and shopping / לא, אנחנו מעדיפים ערים, שווקים וקניות",
    ],
  },
  {
    id: "scenicOptions",
    title: "Possible scenic train options",
    hebrewTitle: "אפשרויות רכבת",
    options: [
      "Mont-Blanc Express - recommended, but optional / Mont-Blanc Express — מומלץ, אבל לא חובה",
      "GoldenPass Express / רכבת GoldenPass Express",
      "Jungfraujoch / Grindelwald / יונגפראויוך / גרינדלוולד",
      "Only if weather and schedule make sense / רק אם מזג האוויר ולוח הזמנים מתאימים",
    ],
  },
  {
    id: "baseArea",
    title: "Best area to sleep",
    hebrewTitle: "אזור לינה מועדף",
    options: [
      "Zurich / Lucerne area / אזור ציריך / לוצרן",
      "Basel / Bern area / אזור בזל / ברן",
      "Lausanne / Montreux / Lake Geneva area — לוזאן / מונטרה / אגם ז׳נבה",
      "Interlaken / Grindelwald area / אזור אינטרלאקן / גרינדלוולד",
      "Let the app recommend / לתת לאפליקציה להמליץ",
    ],
  },
  {
    id: "teenPriority",
    title: "Teen-friendly priorities",
    hebrewTitle: "התאמה לנערה בת 13",
    options: [
      "Shopping streets and cool city time / רחובות קניות וזמן עירוני כיפי",
      "Snow and mountain views / שלג ונופי הרים",
      "Chocolate, food and Christmas lights / שוקולד, אוכל ואורות חג מולד",
      "Easy attractions, not too many museums / אטרקציות קלות, לא יותר מדי מוזיאונים",
      "Good photo spots / מקומות יפים לתמונות",
    ],
  },
];

export default function SearchPage() {
  const [answers, setAnswers] = useState<Answers>(initialAnswers);
  const [savedMessage, setSavedMessage] = useState("");

  useEffect(() => {
    const savedAnswers = localStorage.getItem("swissChristmasAnswers");

    if (savedAnswers) {
      setAnswers(JSON.parse(savedAnswers));
    }
  }, []);

  function updateAnswer(questionId: keyof Answers, value: string) {
    const nextAnswers = {
      ...answers,
      [questionId]: value,
    };

    setAnswers(nextAnswers);
    localStorage.setItem("swissChristmasAnswers", JSON.stringify(nextAnswers));
    setSavedMessage("Saved / נשמר");
  }

  function clearAnswers() {
    setAnswers(initialAnswers);
    localStorage.removeItem("swissChristmasAnswers");
    setSavedMessage("Answers cleared / התשובות נמחקו");
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-10">
        <div className="rounded-3xl border border-white/10 bg-white/10 p-7 shadow-2xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-cyan-200">
            Family trip questions
          </p>

          <h1 className="text-4xl font-bold leading-tight md:text-5xl">
            Swiss Christmas Family Planner Questions / שאלות לתכנון טיול משפחתי בשווייץ בחג המולד
          </h1>

          <p className="mt-5 max-w-3xl leading-8 text-slate-200">
            Choose the answers that best describe the family trip. The app now
            saves your choices in the browser, so later we can use them to build
            a personal itinerary.
          </p>

          <p className="mt-4 max-w-3xl leading-8 text-slate-300" dir="rtl">
            בחרו את התשובות שמתאימות לטיול המשפחתי. עכשיו האפליקציה כבר שומרת
            את הבחירות בדפדפן, ובהמשך נשתמש בהן כדי לבנות מסלול אישי.
          </p>

          {savedMessage && (
            <p className="mt-5 inline-flex rounded-full bg-emerald-300 px-4 py-2 text-sm font-semibold text-slate-950">
              {savedMessage}
            </p>
          )}
        </div>

        <section className="grid gap-6">
          {questions.map((question) => (
            <article
              key={question.id}
              className="rounded-3xl border border-white/10 bg-white/[0.07] p-6"
            >
              <h2 className="text-2xl font-bold text-cyan-100">
                {question.title}
              </h2>

              <p className="mt-2 text-slate-300" dir="rtl">
                {question.hebrewTitle}
              </p>

              <div className="mt-5 grid gap-3">
                {question.options.map((option, optionIndex) => {
                  const optionId = `${question.id}-${optionIndex}`;

                  return (
                    <label
                      key={option}
                      htmlFor={optionId}
                      className="flex cursor-pointer items-start gap-3 rounded-2xl border border-white/10 bg-slate-900/70 p-4 transition hover:bg-slate-800"
                    >
                      <input
                        id={optionId}
                        type="radio"
                        name={question.id}
                        value={option}
                        checked={answers[question.id] === option}
                        onChange={() => updateAnswer(question.id, option)}
                        className="mt-1"
                      />

                      <span className="leading-7 text-slate-200">{option}</span>
                    </label>
                  );
                })}
              </div>
            </article>
          ))}
        </section>

        <section className="rounded-3xl border border-amber-300/30 bg-amber-300/10 p-7">
          <h2 className="text-2xl font-bold text-amber-100">
            Saved family answers / תשובות משפחתיות שנשמרו
          </h2>

          <div className="mt-5 grid gap-3 text-slate-200">
            {questions.map((question) => (
              <p key={question.id}>
                <span className="font-semibold text-amber-100">
                  {question.title} / {question.hebrewTitle}:
                </span>{" "}
                {answers[question.id] || "Not answered yet"}
              </p>
            ))}
          </div>

          <button
            type="button"
            onClick={clearAnswers}
            className="mt-6 rounded-full border border-white/20 px-5 py-3 font-semibold text-white transition hover:bg-white/10"
          >
            Clear answers / מחיקת תשובות
          </button>
        </section>

        <section className="rounded-3xl border border-cyan-300/30 bg-cyan-300/10 p-7">
          <h2 className="text-2xl font-bold text-cyan-100">
            Important planning notes / הערות תכנון חשובות
          </h2>

          <ul className="mt-5 space-y-3 leading-7 text-slate-200">
            <li>Mont-Blanc Express is recommended, but optional. / Mont-Blanc Express מומלץ, אבל לא חובה.</li>
            <li>It is usually best for 8–10 day itineraries. / בדרך כלל מתאים יותר למסלול של 8–10 ימים.</li>
            <li>
              If the trip is short, cities, markets and shopping may be more important. / אם הטיול קצר, ערים, שווקים וקניות יכולים להיות חשובים יותר.
            </li>
            <li>
              Mont-Blanc Express crosses into France, so passports and entry documents must be checked. / Mont-Blanc Express עובר לצרפת, לכן חייבים לבדוק דרכונים ומסמכי כניסה.
            </li>
            <li>
              Final planning must be checked later against real dates, train schedules, market openings and weather. / את התכנון הסופי חייבים לבדוק בהמשך מול תאריכים אמיתיים, לוחות רכבת, פתיחת שווקים ומזג אוויר.
            </li>
          </ul>
        </section>

        <div className="flex flex-wrap gap-4">
          <Link
            href="/results"
            className="rounded-full bg-cyan-300 px-6 py-3 font-semibold text-slate-950 transition hover:bg-cyan-200"
          >
            Continue to ideas / המשך לרעיונות
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



