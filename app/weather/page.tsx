"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type Answers = {
  tripLength?: string;
  travelStyle?: string;
  winterComfort?: string;
  scenicInterest?: string;
  scenicOption?: string;
  baseArea?: string;
  lodgingType?: string;
  lodgingPriority?: string;
  teenPriority?: string;
};

type ForecastDay = {
  date: string;
  max: number;
  min: number;
  rain: number;
  snowfall?: number;
};

const locations = [
  {
    name: "Lausanne",
    label: "לוזאן",
    latitude: 46.5197,
    longitude: 6.6323,
  },
  {
    name: "Montreux",
    label: "מונטרה",
    latitude: 46.4312,
    longitude: 6.9107,
  },
  {
    name: "Zurich",
    label: "ציריך",
    latitude: 47.3769,
    longitude: 8.5417,
  },
  {
    name: "Basel",
    label: "באזל",
    latitude: 47.5596,
    longitude: 7.5886,
  },
  {
    name: "Lucerne",
    label: "לוצרן",
    latitude: 47.0502,
    longitude: 8.3093,
  },
  {
    name: "Interlaken",
    label: "אינטרלאקן",
    latitude: 46.6863,
    longitude: 7.8632,
  },
];

const defaultAnswers: Answers = {
  tripLength: "7-8 ימים",
  travelStyle: "שווקי חג מולד, אורות ואווירת ערב",
  winterComfort: "חורף בקצב נוח עם הפסקות חימום",
  baseArea: "לוזאן / מונטרה / אזור אגם ז׳נבה",
  lodgingType: "אירוח אצל חברים או משפחה בלוזאן",
  lodgingPriority: "קרוב לתחנת רכבת",
  teenPriority: "שוקולד, קינוחים ובתי קפה",
};

function chooseLocation(answers: Answers) {
  const text = [
    answers.baseArea,
    answers.lodgingType,
    answers.lodgingPriority,
    answers.scenicOption,
  ]
    .filter(Boolean)
    .join(" ");

  if (text.includes("ציריך")) return locations[2];
  if (text.includes("באזל")) return locations[3];
  if (text.includes("לוצרן")) return locations[4];
  if (text.includes("אינטרלאקן") || text.includes("גרינדלוולד")) {
    return locations[5];
  }
  if (text.includes("מונטרה")) return locations[1];
  return locations[0];
}

export default function WeatherPage() {
  const [answers, setAnswers] = useState<Answers>(defaultAnswers);
  const [forecast, setForecast] = useState<ForecastDay[]>([]);
  const [status, setStatus] = useState("טוען תחזית...");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem("swissChristmasAnswers");

    if (saved) {
      try {
        setAnswers({ ...defaultAnswers, ...JSON.parse(saved) });
      } catch {
        setAnswers(defaultAnswers);
      }
    }
  }, []);

  const location = useMemo(() => chooseLocation(answers), [answers]);

  useEffect(() => {
    async function loadForecast() {
      setIsLoading(true);
      setStatus("טוען תחזית חיה...");

      try {
        const url =
          `https://api.open-meteo.com/v1/forecast` +
          `?latitude=${location.latitude}` +
          `&longitude=${location.longitude}` +
          `&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max,snowfall_sum` +
          `&timezone=auto`;

        const response = await fetch(url);

        if (!response.ok) {
          throw new Error("Forecast failed");
        }

        const data = await response.json();

        const days: ForecastDay[] = data.daily.time.map(
          (date: string, index: number) => ({
            date,
            max: Math.round(data.daily.temperature_2m_max[index]),
            min: Math.round(data.daily.temperature_2m_min[index]),
            rain: Math.round(data.daily.precipitation_probability_max[index]),
            snowfall: data.daily.snowfall_sum?.[index] ?? 0,
          }),
        );

        setForecast(days);
        setStatus("התחזית נטענה בהצלחה.");
      } catch {
        setStatus("לא ניתן לטעון תחזית כרגע. יש לבדוק שוב קרוב למועד הנסיעה.");
        setForecast([]);
      } finally {
        setIsLoading(false);
      }
    }

    loadForecast();
  }, [location.latitude, location.longitude]);

  const coldNotes = [
    "לתכנן לבוש בשכבות, כפפות, צעיף ונעליים נוחות נגד קור ורטיבות.",
    "לא להשאיר רצף ארוך מדי של פעילות חוץ בלי בית קפה, חנות או מקום סגור להתחמם.",
    "לבדוק רוח, גשם, שלג וקרח לפני יציאה לשווקי ערב.",
    "להשאיר ימי הרים ורכבות נוף גמישים לפי ראות ומזג אוויר.",
  ];

  const planningChecks = [
    "לבדוק תחזית עדכנית לפני כל יום טיול.",
    "לפני שווקי חג מולד — לבדוק תאריכים, שעות פתיחה ועומס צפוי.",
    "לפני רכבות נופיות או יום הרים — לבדוק ראות, שלג, רוח ומחיר כרטיסים.",
    "אם ישנים אצל חברים בלוזאן — לוודא חזרה נוחה בערב ולא להעמיס נסיעות.",
    "לשמור תמיד אפשרות לפעילות פנימית: שוקולד, קפה, מוזיאון, קניות או שיטוט קצר.",
  ];

  return (
    <main dir="rtl" className="min-h-screen bg-slate-950 px-6 py-10 text-white">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex flex-wrap gap-4">
          <Link href="/" className="text-sm text-amber-300 hover:text-amber-200">
            דף הבית
          </Link>
          <Link
            href="/search"
            className="text-sm text-amber-300 hover:text-amber-200"
          >
            שינוי תשובות
          </Link>
          <Link
            href="/itinerary"
            className="text-sm text-amber-300 hover:text-amber-200"
          >
            חזרה למסלול
          </Link>
        </div>

        <section className="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl shadow-black/30">
          <p className="text-sm font-bold text-amber-300">
            Swiss Christmas Family Planner
          </p>

        <h1 className="mt-3 text-3xl font-bold leading-tight md:text-4xl">
            מזג אוויר ונוחות חורף לטיול חג מולד בשווייץ
          </h1>

          <p className="mt-4 max-w-3xl leading-8 text-slate-300">
            התחזית כאן היא תחזית חיה וקצרה לימים הקרובים בלבד. לטיול חג מולד
            עתידי צריך לבדוק שוב קרוב למועד הנסיעה — במיוחד לפני שווקי ערב,
            רכבות נופיות, ימי הרים ונסיעות סביב לוזאן / מונטרה / אגם ז׳נבה.
          </p>
        </section>

        <section className="mt-8 rounded-3xl border border-amber-300/20 bg-amber-300/10 p-6">
          <h2 className="text-3xl font-bold text-amber-100">
            תחזית עבור {location.label}
          </h2>

          <p className="mt-3 leading-8 text-slate-200">
            בסיס מזג האוויר נבחר לפי התשובות שנשמרו. אם לא נשמרו תשובות, ברירת
            המחדל היא לוזאן — בסיס מתאים ללינה אצל חברים, מונטרה, שווקי חג
            מולד באזור האגם ורכבות נופיות.
          </p>

          <div className="mt-5 grid gap-4 md:grid-cols-3">
            <InfoCard label="סטטוס" value={isLoading ? "טוען..." : status} />
            <InfoCard label="אזור תחזית" value={`${location.label}, Switzerland`} />
            <InfoCard
              label="משך הטיול"
              value={answers.tripLength || "עדיין לא נבחר"}
            />
            <InfoCard
              label="חוויית חג המולד"
              value={answers.travelStyle || "עדיין לא נבחר"}
            />
            <InfoCard
              label="קור וחורף"
              value={answers.winterComfort || "עדיין לא נבחר"}
            />
            <InfoCard
              label="סוג לינה"
              value={answers.lodgingType || "עדיין לא נבחר"}
            />
          </div>
        </section>

        <section className="mt-8">
          <h2 className="text-3xl font-bold">תחזית ל־7 ימים</h2>

          {forecast.length === 0 ? (
            <div className="mt-5 rounded-3xl border border-white/10 bg-white/5 p-6 text-slate-300">
              אין תחזית זמינה כרגע. כדאי לבדוק שוב מאוחר יותר או קרוב למועד
              הנסיעה.
            </div>
          ) : (
            <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {forecast.map((day) => (
                <div
                  key={day.date}
                  className="rounded-3xl border border-white/10 bg-white/5 p-5"
                >
                  <p className="font-bold text-amber-300">{day.date}</p>
                  <p className="mt-3 text-slate-200">
                    מקסימום: {day.max}°C
                  </p>
                  <p className="text-slate-200">מינימום: {day.min}°C</p>
                  <p className="text-slate-200">סיכוי לגשם: {day.rain}%</p>
                  <p className="text-slate-200">
                    שלג צפוי: {day.snowfall ?? 0} מ״מ
                  </p>
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="mt-8 grid gap-5 lg:grid-cols-2">
          <AdviceCard title="אם קר מאוד" items={coldNotes} />

          <AdviceCard
            title="אם יש גשם, שלג או רוח"
            items={[
              "להעדיף שווקים מקורים, בתי קפה, חנויות שוקולד, קניות או מוזיאון קצר.",
              "לקצר מסלולי הליכה ארוכים.",
              "להוסיף זמן מעבר בין רכבות ותחבורה מקומית.",
              "לא לכפות יום הרים או תוכנית חוץ ארוכה במזג אוויר קשה.",
            ]}
          />
        </section>

        <section className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-3xl font-bold">בדיקות לפני סגירת כל יום טיול</h2>

          <div className="mt-5 space-y-3">
            {planningChecks.map((check) => (
              <p key={check} className="leading-8 text-slate-300">
                ✓ {check}
              </p>
            ))}
          </div>
        </section>

        <section className="mt-8 rounded-3xl border border-amber-300/30 bg-amber-300/10 p-6">
          <h2 className="text-2xl font-bold text-amber-100">מה עושים עכשיו?</h2>

          <p className="mt-3 leading-8 text-slate-200">
            אם מזג האוויר מתאים, אפשר לחזור למסלול ולבדוק האם ימי השווקים,
            הרכבות וההרים עדיין הגיוניים. אם התחזית קרה, גשומה או מושלגת —
            כדאי להוסיף הפסקות חימום ותוכנית פנימית חלופית.
          </p>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/itinerary"
              className="rounded-full bg-amber-300 px-6 py-3 text-center font-bold text-slate-950 hover:bg-amber-200"
            >
              חזרה למסלול
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

function InfoCard({ label, value }: { label: string; value?: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">
      <p className="text-sm font-bold text-amber-300">{label}</p>
      <p className="mt-2 text-slate-100">{value || "עדיין לא נבחר"}</p>
    </div>
  );
}

function AdviceCard({ title, items }: { title: string; items: string[] }) {
  return (
    <section className="rounded-3xl border border-white/10 bg-white/5 p-6">
      <h2 className="text-2xl font-bold text-amber-100">{title}</h2>

      <div className="mt-4 space-y-3">
        {items.map((item) => (
          <p key={item} className="leading-8 text-slate-300">
            ✓ {item}
          </p>
        ))}
      </div>
    </section>
  );
}