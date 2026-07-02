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

const itineraryDays = [
  {
    day: "יום 1",
    title: "הגעה לציריך והתאקלמות",
    text: "נחיתה, נסיעה למלון, הליכה רגועה במרכז העיר, שווקי חג מולד ראשונים, ארוחת ערב קלה ושינה מוקדמת.",
  },
  {
    day: "יום 2",
    title: "ציריך — קניות, אורות ושוקי חג מולד",
    text: "יום עירוני נוח עם Bahnhofstrasse, העיר העתיקה, שווקי חג מולד, שוקולד, בתי קפה וזמן חופשי לקניות.",
  },
  {
    day: "יום 3",
    title: "באזל או לוצרן",
    text: "בחירה בין באזל, שמתאימה מאוד לאווירת חג מולד, לבין לוצרן, שמתאימה לנופים, אגם, גשרים ושיטוט רגוע.",
  },
  {
    day: "יום 4",
    title: "נסיעה לאזור אגם ז׳נבה",
    text: "מעבר לכיוון לוזאן, מונטרה או ז׳נבה. יום מעבר רגוע עם עצירות יפות, טיילת על האגם ואווירה חורפית.",
  },
  {
    day: "יום 5",
    title: "לוזאן ומונטרה",
    text: "יום סביב אגם ז׳נבה, כולל לוזאן, מונטרה, טיילת, נקודות צילום, בתי קפה ושוק חג מולד אם הוא פתוח בתאריכים המתאימים.",
  },
  {
    day: "יום 6",
    title: "אפשרות ל־Mont-Blanc Express",
    text: "יום רכבת נופי מאזור מונטרה, לוזאן, ז׳נבה או מרטיני. מתאים רק אם לוח הזמנים, מזג האוויר, התקציב ומסמכי המעבר מאפשרים זאת.",
  },
  {
    day: "יום 7",
    title: "GoldenPass Express לכיוון אינטרלאקן",
    text: "אפשרות לנסיעה נופית מאזור אגם ז׳נבה לכיוון אינטרלאקן. זה יום שמתאים במיוחד אם רוצים לחבר בין אגם, הרים ורכבת חווייתית.",
  },
  {
    day: "יום 8",
    title: "אינטרלאקן / גרינדלוולד",
    text: "יום הרים ושלג. אפשר לבחור מסלול קל יותר באזור גרינדלוולד, או לשקול את Jungfraujoch רק אם הראות, מזג האוויר והמחיר מצדיקים זאת.",
  },
  {
    day: "יום 9",
    title: "יום גמיש למשפחה",
    text: "יום שמיועד למה שחסר: קניות, מנוחה, שוק חג מולד נוסף, שוקולד, תמונות, או שינוי מסלול במקרה של מזג אוויר לא טוב.",
  },
  {
    day: "יום 10",
    title: "חזרה הביתה",
    text: "נסיעה לשדה התעופה, זמן ביטחון, החזרת מזוודות וסיום רגוע של הטיול.",
  },
];

const checks = [
  "לבדוק תאריכי שווקי חג מולד לפי השנה המדויקת.",
  "לבדוק לוחות רכבת מעודכנים לפני הזמנה.",
  "לבדוק מזג אוויר וראות לפני ימי הרים.",
  "לבדוק מחירים לפני החלטה על Jungfraujoch או רכבות נופיות.",
  "לבדוק דרכונים, מסמכי מעבר וכניסה לצרפת אם משלבים את Mont-Blanc Express.",
];

export default function ItineraryPage() {
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

          <Link
            href="/prompt"
            className="text-sm text-amber-300 hover:text-amber-200"
          >
            חזרה להנחיית התכנון
          </Link>
        </div>

        <section className="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl">
          <p dir="ltr" className="text-right text-sm font-semibold text-amber-300">
            Swiss Christmas Family Planner
          </p>

          <h1 className="mt-4 text-4xl font-bold">
            מסלול לדוגמה לטיול חג מולד משפחתי בשווייץ
          </h1>

          <p className="mt-5 max-w-3xl leading-8 text-slate-300">
            זהו מסלול ראשוני לדוגמה. הוא לא מחליף בדיקה אמיתית של תאריכים,
            רכבות, מזג אוויר, מחירים ושעות פתיחה, אבל הוא נותן מבנה הגיוני
            להמשך תכנון.
          </p>
        </section>

        <section className="mt-8 rounded-3xl border border-white/10 bg-slate-900/80 p-6">
          <h2 className="text-2xl font-bold">התשובות שעליהן המסלול מבוסס</h2>

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

        <section className="mt-10">
          <h2 className="text-3xl font-bold">מסלול מוצע לפי ימים</h2>

          <div className="mt-5 space-y-5">
            {itineraryDays.map((item) => (
              <div
                key={item.day}
                className="rounded-3xl border border-white/10 bg-white/5 p-6"
              >
                <p className="text-sm font-semibold text-amber-300">
                  {item.day}
                </p>

                <h3 className="mt-2 text-2xl font-bold">{item.title}</h3>

                <p className="mt-3 leading-8 text-slate-300">{item.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-10 rounded-3xl border border-white/10 bg-slate-900/80 p-6">
          <h2 className="text-3xl font-bold">בדיקות חובה לפני הזמנה</h2>

          <div className="mt-5 space-y-3">
            {checks.map((check) => (
              <p key={check} className="leading-7 text-slate-300">
                ✓ {check}
              </p>
            ))}
          </div>
        </section>

        <section className="mt-10 rounded-3xl border border-amber-300/30 bg-amber-300/10 p-6">
          <h2 className="text-2xl font-bold text-amber-200">
            מה עושים עכשיו?
          </h2>

          <p className="mt-3 leading-8 text-slate-200">
            אם המסלול נראה בכיוון נכון, השלב הבא הוא להפוך אותו למסלול אמיתי
            לפי תאריכים מדויקים, מלונות זמינים, זמני רכבות, תחזית מזג אוויר
            ושעות פתיחה.
          </p>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/prompt"
              className="rounded-full bg-amber-300 px-6 py-3 text-center font-bold text-slate-950 hover:bg-amber-200"
            >
              חזרה להנחיית התכנון
            </Link>

            <Link
              href="/search"
              className="rounded-full border border-white/20 px-6 py-3 text-center font-semibold text-slate-100 hover:border-amber-300"
            >
              שינוי תשובות
            </Link>

            <Link
              href="/"
              className="rounded-full border border-white/20 px-6 py-3 text-center font-semibold text-slate-100 hover:border-amber-300"
            >
              חזרה לדף הבית
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