import Link from "next/link";

const highlights = [
  {
    title: "שווקי חג מולד",
    text: "רעיונות לערים עם אווירת חג מולד, אורות, דוכנים, אוכל חורפי ושיטוט נעים בערב.",
  },
  {
    title: "קניות וזמן עירוני",
text: "שילוב של רחובות יפים, חנויות, בתי קפה, שוקולד וזמן חופשי שמתאים גם למשפחה וגם לנער/ה.",  },
  {
    title: "אטרקציות למשפחה",
    text: "בחירה באטרקציות קלילות, יפות ולא עמוסות מדי, עם מספיק זמן מנוחה בין יום ליום.",
  },
  {
    title: "רכבות נופיות",
    text: "בדיקה זהירה של רכבות כמו Mont-Blanc Express או GoldenPass Express רק אם הן באמת מתאימות למסלול.",
  },
];

const routeIdeas = [
  {
    title: "אזור אגם ז׳נבה",
    text: "לוזאן, מונטרה וז׳נבה יכולות להתאים לחלק מערבי יפה של הטיול, עם אגם, שווקים ואפשרות לרכבת נופית.",
  },
  {
    title: "אזור אינטרלאקן / גרינדלוולד",
    text: "מתאים ליום הרים ושלג, אבל רק אם מזג האוויר, הראות, התקציב והעייפות המשפחתית מאפשרים זאת.",
  },
  {
    title: "ציריך, באזל ולוצרן",
    text: "שלוש ערים חזקות לפתיחה או סיום של הטיול, עם שווקי חג מולד, קניות, עיר עתיקה ונגישות טובה ברכבת.",
  },
];

const principles = [
  "לא להעמיס יותר מדי על כל יום.",
  "לשלב זמן חופשי לקניות, קפה, אוכל ושיטוט רגוע.",
  "לתת מקום למה שמעניין נער/ה .",
  "לבדוק תאריכים, רכבות, מזג אוויר ומחירים לפני הזמנה.",
  "להשאיר גמישות לשינוי מסלול במקרה של גשם, שלג או עייפות.",
];

export default function Home() {
  return (
    <main dir="rtl" className="min-h-screen bg-slate-950 px-6 py-10 text-white">
      <div className="mx-auto max-w-6xl">
        <section className="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl">
          <p dir="ltr" className="text-right text-sm font-semibold text-amber-300">
            Swiss Christmas Family Planner
          </p>

          <h1 className="mt-4 max-w-4xl text-4xl font-bold leading-tight md:text-6xl">
            מתכנן טיול משפחתי לשווייץ בחג המולד
          </h1>

          <p className="mt-6 max-w-3xl leading-8 text-slate-300">
            כלי תכנון ראשוני למשפחה עם שני הורים ונער/ה, לטיול של עד
            עשרה ימים בשווייץ. המטרה היא לבנות כיוון הגיוני שמשלב שווקי חג
            מולד, קניות, אטרקציות, נופים ורכבות נופיות — בלי להעמיס יותר מדי.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/search"
              className="rounded-full bg-amber-300 px-7 py-3 text-center font-bold text-slate-950 hover:bg-amber-200"
            >
              התחלת תכנון
            </Link>

            <Link
              href="/results"
              className="rounded-full border border-white/20 px-7 py-3 text-center font-semibold text-slate-100 hover:border-amber-300"
            >
              צפייה בהצעת כיוון
            </Link>

            <Link
              href="/itinerary"
              className="rounded-full border border-white/20 px-7 py-3 text-center font-semibold text-slate-100 hover:border-amber-300"
            >
              מסלול לדוגמה
            </Link>
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-3xl font-bold">איך האתר עוזר לבנות טיול שמתאים למשפחה?</h2>

          <div className="mt-5 grid gap-5 md:grid-cols-2">
            {highlights.map((item) => (
              <div
                key={item.title}
                className="rounded-3xl border border-white/10 bg-slate-900/80 p-6"
              >
                <h3 className="text-2xl font-bold text-amber-200">
                  {item.title}
                </h3>

                <p className="mt-3 leading-8 text-slate-300">{item.text}</p>
                             <details className="mt-4 rounded-2xl border border-white/10 bg-slate-950/40 p-4">
                  <summary className="cursor-pointer font-semibold text-amber-300">
                    פתחו פירוט
                  </summary>

                  <div className="mt-3 space-y-2 text-sm leading-7 text-slate-300">
                    <p>• למה זה חשוב: זה עוזר להבין אם הנושא מתאים למשפחה, לעונה ולקצב הטיול.</p>
                    <p>• מה כדאי לבדוק: תאריכים, שעות פתיחה, מרחקים, עומס, מזג אוויר ועלויות.</p>
                    <p>• איך משתמשים בזה: לא חייבים לבחור הכול — בוחרים רק מה שמתאים למסלול ולמשפחה.</p>
                  </div>
                </details>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-3xl font-bold">כיוון אפשרי למסלול</h2>

          <p className="mt-3 max-w-3xl leading-8 text-slate-300">
            המסלול לא חייב לכלול הכול. הרעיון הוא לבחור את האזורים שמתאימים
            למשפחה, לקצב הטיול ולמזג האוויר בפועל.
          </p>

          <div className="mt-6 grid gap-5 md:grid-cols-3">
            {routeIdeas.map((item) => (
              <div
                key={item.title}
                className="rounded-3xl border border-white/10 bg-slate-950/60 p-6"
              >
                <h3 className="text-xl font-bold text-amber-200">
                  {item.title}
                </h3>

                <p className="mt-3 leading-8 text-slate-300">{item.text}</p>
                             <details className="mt-4 rounded-2xl border border-white/10 bg-slate-900/70 p-4">
                  <summary className="cursor-pointer font-semibold text-amber-300">
                    פתחו פירוט
                  </summary>

                  <div className="mt-3 space-y-2 text-sm leading-7 text-slate-300">
                    <p>• מתי זה מתאים: כאשר האזור מסתדר עם מקום הלינה, משך הטיול וקצב המשפחה.</p>
                    <p>• מה כדאי לבדוק: זמני נסיעה, רכבות, חזרה בערב, מזג אוויר ונוחות בחורף.</p>
                    <p>• איך מחליטים: בוחרים אזור לא רק לפי יופי, אלא לפי נוחות, עומס ומה באמת מתאים למשפחה.</p>
                  </div>
                </details>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-10 rounded-3xl border border-white/10 bg-slate-900/80 p-6">
          <h2 className="text-3xl font-bold">רכבות נופיות — לא חובה</h2>

          <p className="mt-4 max-w-4xl leading-8 text-slate-300">
            רכבות כמו Mont-Blanc Express או GoldenPass Express יכולות להיות
            חוויה יפה מאוד, אבל הן צריכות להשתלב נכון. בטיול קצר עדיף לפעמים
            לוותר עליהן ולהתמקד בערים, שווקים וקניות. בטיול ארוך יותר אפשר
            לבדוק אם הן מתאימות למסלול סביב לוזאן, מונטרה, אגם ז׳נבה או
            אינטרלאקן.
          </p>
        </section>

        <section className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-3xl font-bold">עקרונות תכנון</h2>

          <div className="mt-5 space-y-3">
            {principles.map((principle) => (
              <p key={principle} className="leading-7 text-slate-300">
                ✓ {principle}
              </p>
            ))}
          </div>
        </section>

        <section className="mt-10 rounded-3xl border border-amber-300/30 bg-amber-300/10 p-6">
          <h2 className="text-2xl font-bold text-amber-200">
            מתחילים מהשאלות
          </h2>

          <p className="mt-3 leading-8 text-slate-200">
            כדי לקבל כיוון אישי יותר, כדאי להתחיל בעמוד השאלות ולבחור את משך
            הטיול, חוויית חג המולד, קור וחורף, אזור בסיס, סוגהלינה ומה חשוב במיוחד לנער/ה.
          </p>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/search"
              className="rounded-full bg-amber-300 px-7 py-3 text-center font-bold text-slate-950 hover:bg-amber-200"
            >
              התחלת תכנון
            </Link>

            <Link
              href="/results"
              className="rounded-full border border-white/20 px-7 py-3 text-center font-semibold text-slate-100 hover:border-amber-300"
            >
              צפייה בהצעת כיוון
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}