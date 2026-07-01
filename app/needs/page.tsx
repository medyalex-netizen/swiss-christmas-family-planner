"use client";

import { useEffect, useState } from "react";

type AppLanguage = "he" | "en" | "ro";

const content = {
  he: {
    appName: "מתכנן טיולים לגיל השלישי",
    title: "לפני שמתחילים: הצרכים והרצונות שלכם",
    intro:
      "ענו על 10 שאלות קצרות כדי שנוכל להבין טוב יותר איזה טיול יתאים לכם.",
    language: "שפה",
    back: "חזרה",
    continue: "המשך לבחירת יעד",
    questions: [
      "1. מי נוסע?",
      "2. מה מטרת הטיול או האווירה הרצויה?",
      "3. כמה הליכה ביום מרגישה נוחה?",
      "4. האם יש קושי עם מדרגות, עליות, ירידות, אבנים לא ישרות או עמידה ממושכת?",
      "5. איזה קצב טיול מתאים לכם?",
      "6. מתי במהלך היום הכי נוח לכם לטייל?",
      "7. איזו תחבורה הכי נוחה לכם?",
      "8. מה הכי חשוב לכם לראות או לחוות?",
      "9. ממה חשוב להימנע?",
      "10. האם יש צרכי אוכל, מלון, מזג אוויר, בטיחות או נוחות שחשוב לדעת?"
    ],
  },
  en: {
    appName: "Senior Trip Planner",
    title: "Before we start: your needs and wishes",
    intro:
      "Answer 10 short questions so we can better understand what kind of trip will fit you.",
    language: "Language",
    back: "Back",
    continue: "Continue to destination",
    questions: [
      "1. Who is traveling?",
      "2. What is the goal or desired feeling of the trip?",
      "3. How much walking per day feels comfortable?",
      "4. Are stairs, slopes, uneven streets, cobblestones, or long standing difficult?",
      "5. What trip pace feels right?",
      "6. What time of day is most comfortable for activities?",
      "7. What transportation feels most comfortable?",
      "8. What is most important to see or experience?",
      "9. What should the itinerary avoid?",
      "10. Are there food, hotel, weather, safety, or comfort needs we should know?"
    ],
  },
  ro: {
    appName: "Planificator de calatorii pentru seniori",
    title: "Inainte de inceput: nevoile si dorintele dvs.",
    intro:
      "Raspundeti la 10 intrebari scurte ca sa intelegem mai bine ce fel de excursie vi se potriveste.",
    language: "Limba",
    back: "Inapoi",
    continue: "Continua la destinatie",
    questions: [
      "1. Cine calatoreste?",
      "2. Care este scopul sau atmosfera dorita a calatoriei?",
      "3. Cat mers pe zi este confortabil?",
      "4. Sunt dificile scarile, pantele, strazile denivelate, piatra cubica sau statul mult in picioare?",
      "5. Ce ritm de calatorie vi se potriveste?",
      "6. In ce parte a zilei este cel mai comod sa vizitati?",
      "7. Ce transport este cel mai comod pentru dvs.?",
      "8. Ce este cel mai important sa vedeti sau sa traiti?",
      "9. Ce ar trebui evitat in itinerar?",
      "10. Exista nevoi legate de mancare, hotel, vreme, siguranta sau confort?"
    ],
  },
};

const emptyAnswers = Array(10).fill("");

export default function NeedsPage() {
  const [appLanguage, setAppLanguage] = useState<AppLanguage | null>(null);
  const [answers, setAnswers] = useState<string[]>(emptyAnswers);

  useEffect(() => {
    const savedLanguage = localStorage.getItem("seniorTripAppLanguage");

    if (savedLanguage === "he" || savedLanguage === "en" || savedLanguage === "ro") {
      setAppLanguage(savedLanguage);
    } else {
      setAppLanguage("he");
    }

    const savedNeeds = localStorage.getItem("seniorTripNeeds");

    if (savedNeeds) {
      try {
        const parsed = JSON.parse(savedNeeds);

        if (Array.isArray(parsed.answers)) {
          setAnswers(parsed.answers);
        }
      } catch {
        setAnswers(emptyAnswers);
      }
    }
  }, []);

  function updateLanguage(language: AppLanguage) {
    setAppLanguage(language);
    localStorage.setItem("seniorTripAppLanguage", language);
  }

  function updateAnswer(index: number, value: string) {
    const nextAnswers = [...answers];
    nextAnswers[index] = value;
    setAnswers(nextAnswers);
  }

  function clearAnswers() {
    const clearedAnswers = Array(10).fill("");
    setAnswers(clearedAnswers);
    localStorage.removeItem("seniorTripNeeds");
    window.location.reload();
  }

  function saveAnswers() {
    localStorage.setItem(
      "seniorTripNeeds",
      JSON.stringify({
        answers,
        updatedAt: new Date().toISOString(),
      })
    );
  }

  if (appLanguage === null) {
    return (
      <main className="min-h-screen bg-slate-50 px-6 py-10 text-slate-900">
        <div className="mx-auto max-w-5xl rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
          <p className="text-xl font-semibold">Loading...</p>
        </div>
      </main>
    );
  }

  const t = content[appLanguage];
  const isHebrew = appLanguage === "he";

  return (
    <main
      dir={isHebrew ? "rtl" : "ltr"}
      lang={appLanguage}
      className={`min-h-screen bg-slate-50 px-6 py-10 text-slate-900 ${
        isHebrew ? "text-right" : "text-left"
      }`}
    >
      <div className="mx-auto max-w-5xl">
        <header className="mb-8 rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
          <p className="text-lg font-bold text-blue-700">{t.appName}</p>
          <h1 className="mt-3 text-4xl font-bold">{t.title}</h1>
          <p className="mt-4 text-xl leading-8 text-slate-600">{t.intro}</p>

          <label className="mt-6 grid max-w-xs gap-2 text-lg font-semibold">
            {t.language}
            <select
              value={appLanguage}
              onChange={(event) => updateLanguage(event.target.value as AppLanguage)}
              className="rounded-2xl border border-slate-300 px-4 py-3 text-lg"
            >
              <option value="he">עברית</option>
              <option value="en">English</option>
              <option value="ro">Română</option>
            </select>
          </label>
        </header>

        <section className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
          <div className="grid gap-6">
            {t.questions.map((question, index) => (
              <label key={question} className="grid gap-2 text-lg font-semibold">
                {question}
                <textarea
                  value={answers[index] || ""}
                  onChange={(event) => updateAnswer(index, event.target.value)}
                  className="min-h-24 rounded-2xl border border-slate-300 px-4 py-4 text-lg"
                />
              </label>
            ))}
          </div>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <a
              href="/search"
              onClick={saveAnswers}
              className="rounded-2xl bg-blue-700 px-8 py-4 text-center text-xl font-semibold text-white hover:bg-blue-800"
            >
              {t.continue}
            </a>

            <button
              type="button"
              onClick={clearAnswers}
              className="rounded-2xl border border-red-300 bg-white px-8 py-4 text-center text-xl font-semibold text-red-700 hover:bg-red-50"
            >
              {isHebrew ? "איפוס תשובות" : appLanguage === "ro" ? "Sterge raspunsurile" : "Clear answers"}
            </button>

            <a
              href="/"
              className="rounded-2xl border border-slate-300 bg-white px-8 py-4 text-center text-xl font-semibold text-slate-800 hover:bg-slate-50"
            >
              {t.back}
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}






