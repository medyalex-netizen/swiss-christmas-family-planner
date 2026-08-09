import Link from "next/link";

const highlights = [
  {
    title: "עיירות, אוכל ואווירת סתיו",
    text: "שילוב של עיירות היסטוריות, רחובות יפים, אוכל מקומי, גלידה, בתי קפה ואווירה נעימה של סתיו.",
  },
  {
    title: "קניות וזמן עירוני",
    text: "שילוב של חנויות, שווקים, רחובות יפים וזמן חופשי שמתאים גם להורים וגם לנערה בת 13.",
  },
  {
    title: "אטרקציות למשפחה",
    text: "בחירה באטרקציות מעניינות ולא עמוסות מדי, עם זמן למנוחה, אוכל ושיטוט רגוע.",
  },
  {
    title: "נופים ודרכים כפריות",
    text: "שילוב של כפרים, כרמים, תצפיות ונסיעות נופיות רק במידה שמתאימה לקצב הטיול.",
  },
];

const routeIdeas = [
  {
    title: "פירנצה וסביבתה",
    text: "מתאימה לפתיחה או לסיום של הטיול, עם אמנות, קניות, אוכל, רחובות היסטוריים וטיולי יום נוחים.",
  },
  {
    title: "סיינה, קיאנטי וסן ג'ימיניאנו",
    text: "שילוב טוב של עיר היסטורית, עיירות, כרמים, אוכל מקומי ונסיעות נופיות קצרות יחסית.",
  },
  {
    title: "ואל ד'אורצ'ה",
    text: "אזור שמתאים לעיירות ציוריות, תצפיות, כבישים יפים, פיינצה, מונטפולצ'יאנו ואווירה טוסקנית קלאסית.",
  },
];

const principles = [
  "לא להעמיס יותר מדי על כל יום.",
  "לשלב זמן חופשי לקניות, גלידה, אוכל, קפה ושיטוט רגוע.",
  "לתת מקום למה שמעניין נערה בת 13.",
  "לבדוק מזג אוויר, זמני נסיעה, חניה ומחירים לפני הזמנה.",
  "להשאיר גמישות לשינוי מסלול במקרה של גשם, עומס או עייפות.",
];

export default function Home() {
  return (
    <main dir="rtl" className="min-h-screen bg-slate-950 px-6 py-10 text-white">
      <div className="mx-auto max-w-6xl">
        <section className="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl">
          <p dir="ltr" className="text-right text-sm font-semibold text-amber-300">
           Tuscany Autumn Family Planner
          </p>

          <h1 className="mt-4 max-w-4xl text-4xl font-bold leading-tight md:text-6xl">
         מתכנן טיול משפחתי לטוסקנה בסתיו
          </h1>

          <p className="mt-6 max-w-3xl leading-8 text-slate-300">
  כלי תכנון ראשוני למשפחה עם שני הורים ונערה בת 13, לטיול סתווי
  בטוסקנה. המטרה היא לבנות כיוון הגיוני שמשלב ערים היסטוריות,
  עיירות וכפרים, נופים, אוכל, קניות וזמן חופשי — בלי להעמיס יותר מדי.
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
          <h2 className="text-3xl font-bold">מה האפליקציה עוזרת לתכנן?</h2>

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
              </div>
            ))}
          </div>
        </section>

        <section className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-3xl font-bold">כיוון אפשרי למסלול</h2>

          <p className="mt-3 max-w-3xl leading-8 text-slate-300">
            המסלול לא חייב לכלול הכול. הרעיון הוא לבחור את האזורים שמתאימים
            למשפחה, לאורך הטיול ולמזג האוויר בפועל.
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
              </div>
            ))}
          </div>
        </section>

        <section className="mt-10 rounded-3xl border border-white/10 bg-slate-900/80 p-6">
          <h2 className="text-3xl font-bold">נסיעות נופיות — במידה הנכונה</h2>

<p className="mt-4 max-w-4xl leading-8 text-slate-300">
  דרכים דרך קיאנטי, ואל ד'אורצ'ה וכפרים טוסקניים יכולות להיות
  חלק יפה מאוד מהטיול, אבל הן צריכות להשתלב בקצב המשפחתי. בטיול
  קצר עדיף לבחור אזור נופי אחד ולא לבלות שעות רבות ברכב. בטיול
  ארוך יותר אפשר לשלב כמה עיירות, תצפיות, כרמים ועצירות אוכל
  לאורך הדרך.
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
            כדי לקבל כיוון אישי יותר, כדאי להתחיל בעמוד השאלות ולבחור את אורך
            הטיול, סגנון הטיול, אזור הלינה ומה חשוב במיוחד לנערה בת 13.
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