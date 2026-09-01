"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

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
const tripLengthIdeas = [
  {
    title: "טיול קצר — 5 עד 6 ימים",
    text: "מתאים בעיקר לציריך, באזל, לוצרן ושווקי חג מולד. פחות מתאים לשילוב נסיעות ארוכות מאוד.",
  },
  {
    title: "טיול מאוזן — 7 עד 8 ימים",
    text: "מאפשר לשלב ערים יפות, קניות, שווקי חג מולד, ואולי יום נופי אחד באזור הרים או אגם.",
  },
  {
    title: "טיול מלא — 9 עד 10 ימים",
    text: "מאפשר לבנות מסלול עשיר יותר, עם יותר זמן לאזור אגם ז׳נבה, לוזאן, מונטרה, רכבת נופית ויום הרים.",
  },
];

const baseIdeas = [
  {
    title: "ציריך",
    tag: "נקודת פתיחה חזקה",
    text: "מתאימה לנחיתה, קניות, שווקי חג מולד, רחובות יפים ותחבורה נוחה להמשך הטיול.",
  },
  {
    title: "באזל",
    tag: "אווירת חג מולד חזקה",
    text: "עיר טובה מאוד לשווקי חג מולד, רחובות יפים ואווירה עירונית נעימה.",
  },
  {
    title: "לוצרן",
    tag: "יפה, מרכזית ונוחה",
    text: "מתאימה לשילוב של עיר יפה, אגם, גשרים, נופים וטיולי יום קלים.",
  },
  {
    title: "לוזאן / מונטרה / אזור אגם ז׳נבה",
    tag: "אזור חשוב למסלול מערבי",
    text: "אזור מתאים לטיול יפה סביב האגם, לשילוב לוזאן ומונטרה, ולבדיקה של אפשרות לרכבת Mont-Blanc Express.",
  },
  {
    title: "אינטרלאקן / גרינדלוולד",
    tag: "אפשרות להרים ושלג",
    text: "אזור מתאים ליום טיול משמעותי בהרים, עם נופי שלג ואפשרות לשלב את Jungfraujoch רק אם מזג האוויר, הראות והתקציב מצדיקים זאת.",
  },
];

const scenicIdeas = [
  {
    name: "Mont-Blanc Express",
    text: "אפשרות יפה במיוחד אם המסלול כולל את אזור אגם ז׳נבה, מונטרה, לוזאן או מרטיני. לא חובה לשלב אותה בטיול קצר.",
  },
  {
    name: "GoldenPass Express",
    text: "מתאימה אם רוצים לחבר בין אזור אגם ז׳נבה לאזור אינטרלאקן בצורה נופית וחווייתית.",
  },
  {
    name: "Jungfraujoch / Grindelwald",
    text: "מתאים כיום הרים משמעותי. כדאי להחליט רק קרוב למועד, לפי מזג האוויר, הראות, המחיר והעייפות של המשפחה.",
  },
];

const familyRules = [
  "לא להעמיס יותר מדי בכל יום.",
  "לשלב זמן חופשי לקניות, אוכל, קפה ושיטוט רגוע.",
  "לבדוק תחזית מזג אוויר לפני ימי הרים ורכבות נופיות.",
  "לשמור אפשרות לשינוי מסלול במקרה של שלג, גשם או עייפות.",
  "לתת מקום גם למה שמעניין נער/ה  , ולא רק לאטרקציות של מבוגרים.",
];

export default function ResultsPage() {
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
  answers.teenPriority ||
  (answers.teenPriorities && answers.teenPriorities.length > 0
    ? answers.teenPriorities.join(", ")
    : "עדיין לא נבחר");
  const selectedTripLengthIdeas =
  answers.tripLength.includes("5") && answers.tripLength.includes("6")
    ? [tripLengthIdeas[0]]
    : answers.tripLength.includes("7") && answers.tripLength.includes("8")
      ? [tripLengthIdeas[1]]
      : answers.tripLength.includes("9") && answers.tripLength.includes("10")
        ? [tripLengthIdeas[2]]
        : tripLengthIdeas;
          const hasSavedAnswers = Boolean(
    answers.tripLength ||
      answers.travelStyle ||
      answers.winterComfort ||
      answers.scenicInterest ||
      answers.scenicOption ||
      answers.baseArea ||
      answers.lodgingType ||
      answers.lodgingPriority ||
      answers.teenPriority ||
      (answers.teenPriorities && answers.teenPriorities.length > 0)
  );
      const saveTripLengthChoice = (title: string) => {
    const tripLength = title.includes("5")
      ? "5–6 ימים"
      : title.includes("7")
        ? "7–8 ימים"
        : "9–10 ימים";

    const nextAnswers = {
      ...answers,
      tripLength,
    };

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextAnswers));
  };

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
            חזרה לשאלות
          </Link>
        </div>

        <section className="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl">
          <p dir="ltr" className="text-right text-sm font-semibold text-amber-300">
            Swiss Christmas Family Planner
          </p>

          <h1 className="mt-4 text-4xl font-bold">
            הצעת כיוון ראשונית לטיול משפחתי בשווייץ
          </h1>

          <p className="mt-5 max-w-3xl leading-8 text-slate-300">
            העמוד הזה מציג רעיונות למסלול לפי התשובות שנשמרו. זה עדיין לא
            מסלול סופי, אלא בסיס טוב להמשך תכנון.
          </p>
        </section>

                <section className="mt-8 rounded-3xl border border-white/10 bg-slate-900/80 p-6">
          <h2 className="text-2xl font-bold">התשובות שנשמרו</h2>

          {!hasSavedAnswers ? (
            <div className="mt-5 rounded-2xl border border-amber-300/30 bg-amber-300/10 p-5">
              <h3 className="text-xl font-bold text-amber-200">
                עדיין לא נבחרו פרטי טיול
              </h3>

              <p className="mt-3 leading-8 text-slate-200">
                כדי לקבל כיוון ראשוני מתאים, התחילו בעמוד השאלות ובחרו משך
                טיול, חוויית חג מולד, קור וחורף, אזור בסיס, סוג לינה ומה חשוב
                לנער/ה.
              </p>

              <Link
                href="/search"
                className="mt-5 inline-block rounded-full bg-amber-300 px-6 py-3 text-center font-bold text-slate-950 hover:bg-amber-200"
              >
                מעבר לשאלות התכנון
              </Link>
            </div>
          ) : (
            <>
              <p className="mt-3 text-sm text-slate-400">
                אפשר ללחוץ על כרטיס כדי לחזור לשאלות ולערוך את התשובות.
              </p>

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
            </>
          )}
        </section>
        <section className="mt-8">
          <h2 className="text-3xl font-bold">כיוון לפי משך הטיול</h2>

          <div className="mt-5 grid gap-5 md:grid-cols-3">
          {selectedTripLengthIdeas.map((item) => (
  <Link
    key={item.title}
    href="/itinerary"
    onClick={() => saveTripLengthChoice(item.title)}
    className="block rounded-3xl border border-white/10 bg-white/5 p-6 transition hover:border-amber-300/60 hover:bg-white/10"
  >
    <h3 className="text-xl font-bold text-amber-200">
      {item.title}
    </h3>
    <p className="mt-3 leading-7 text-slate-300">{item.text}</p>
    <p className="mt-4 text-sm font-semibold text-amber-300">
      לחצו לצפייה במסלול מתאים
    </p>
  </Link>
))}
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-3xl font-bold">רעיונות לערים ואזורי לינה</h2>

          <div className="mt-5 grid gap-5 md:grid-cols-2">
            {baseIdeas.map((item) => (
              <div
                key={item.title}
                className="rounded-3xl border border-white/10 bg-slate-900/80 p-6"
              >
                <p className="text-sm font-semibold text-amber-300">
                  {item.tag}
                </p>
                <h3 className="mt-2 text-2xl font-bold">{item.title}</h3>
                <p className="mt-3 leading-7 text-slate-300">{item.text}</p>
                                <details className="mt-4 rounded-2xl border border-white/10 bg-slate-950/40 p-4">
                  <summary className="cursor-pointer font-semibold text-amber-300">
                    פתחו פירוט
                  </summary>

                  <div className="mt-3 space-y-2 text-sm leading-7 text-slate-300">
                    <p>• מתי זה מתאים: כאשר האזור משתלב טבעית עם משך הטיול, מקום הלינה וקצב המשפחה.</p>
                    <p>• מה כדאי לבדוק: זמני רכבות, מרחקים בערב, מזג אוויר, עומס ועלויות.</p>
                    <p>• איך מחליטים: לא לפי שם המקום בלבד, אלא לפי נוחות, חזרה למקום הלינה ומה מתאים לנער/ה.</p>
                  </div>
                </details>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-3xl font-bold">רכבות נופיות שאפשר לשקול</h2>

                         <details className="mt-4 rounded-2xl border border-white/10 bg-slate-950/40 p-4">
                  <summary className="cursor-pointer font-semibold text-amber-300">
                    פתחו פירוט
                  </summary>

                  <div className="mt-3 space-y-2 text-sm leading-7 text-slate-300">
                    <p>• מתי זה מתאים: כאשר הרכבת משתלבת במסלול בלי להפוך את היום לעמוס מדי.</p>
                    <p>• מה כדאי לבדוק: זמני רכבות, החלפות, מחיר, מזג אוויר וראות.</p>
                    <p>• איך מחליטים: רכבת נופית היא תוספת יפה, אבל לא חובה אם היא פוגעת בקצב המשפחה.</p>
                  </div>
                </details>
          <div className="mt-5 grid gap-5 md:grid-cols-3">
            {scenicIdeas.map((item) => (
              <div
                key={item.name}
                className="rounded-3xl border border-white/10 bg-white/5 p-6"
              >
                <h3 dir="ltr" className="text-right text-xl font-bold text-amber-200">
                  {item.name}
                </h3>
                <p className="mt-3 leading-7 text-slate-300">{item.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-10 rounded-3xl border border-white/10 bg-slate-900/80 p-6">
          <h2 className="text-3xl font-bold">כללי תכנון למשפחה</h2>

          <div className="mt-5 space-y-3">
            {familyRules.map((rule) => (
              <p key={rule} className="leading-7 text-slate-300">
                ✓ {rule}
              </p>
            ))}
          </div>
        </section>

        <section className="mt-10 rounded-3xl border border-amber-300/30 bg-amber-300/10 p-6">
          <h2 className="text-2xl font-bold text-amber-200">
            השלב הבא
          </h2>

          <p className="mt-3 leading-8 text-slate-200">
            אחרי שהכיוון נראה נכון, אפשר להמשיך לעמוד ההנחיה למתכנן. שם תיווצר
            הנחיה מסודרת שאפשר להשתמש בה כדי לבנות מסלול מפורט יותר.
          </p>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/prompt"
              className="rounded-full bg-amber-300 px-6 py-3 text-center font-bold text-slate-950 hover:bg-amber-200"
            >
              המשך להנחיית תכנון
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
    <Link
      href="/search"
      className="block rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:border-amber-300/60 hover:bg-white/10"
    >
      <p className="text-sm font-semibold text-amber-300">{label}</p>
      <p className="mt-2 leading-7 text-slate-100">
        {value && value.length > 0 ? value : "עדיין לא נבחר"}
      </p>
      <p className="mt-3 text-xs text-slate-400">לחצו לעריכת התשובה</p>
    </Link>
  );
}