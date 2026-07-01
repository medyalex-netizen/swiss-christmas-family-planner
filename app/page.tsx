import Link from "next/link";

const features = [
  {
    title: "Christmas markets / שווקי חג מולד",
    text: "Find the best Swiss Christmas markets for a family trip: Zurich, Basel, Lucerne, Montreux, Bern and more. / מציאת שווקי חג המולד המתאימים ביותר לטיול משפחתי: ציריך, בזל, לוצרן, מונטרה, ברן ועוד.",
  },
  {
    title: "Shopping / קניות",
    text: "Plan shopping time without turning the whole trip into a shopping trip: city centers, malls, chocolate, souvenirs and gifts. / תכנון זמן קניות בלי להפוך את כל הטיול לטיול קניות: מרכזי ערים, קניונים, שוקולד, מזכרות ומתנות.",
  },
  {
    title: "Family attractions / אטרקציות למשפחה",
    text: "Attractions suitable for two parents and a 13-year-old daughter: winter views, old towns, museums, viewpoints and easy day trips. / אטרקציות שמתאימות לזוג הורים ולילדה בת 13: נופי חורף, ערים עתיקות, מוזיאונים, נקודות תצפית וטיולי יום קלים.",
  },
  {
    title: "Scenic train trips / טיולי רכבת נופיים",
    text: "Add scenic trains such as Mont-Blanc Express, GoldenPass Express and Jungfraujoch / Grindelwald when they fit the trip length. / הוספת רכבות נופיות כמו Mont-Blanc Express, GoldenPass Express ו־Jungfraujoch / Grindelwald כאשר הן מתאימות לאורך הטיול.",
  },
];

const highlights = [
  "Built for a family: two parents + 13-year-old daughter / מיועד למשפחה: זוג הורים וילדה בת 13",
  "Best for up to 10 days in Switzerland / מתאים לטיול של עד 10 ימים בשוויץ",
  "Combines Christmas markets, shopping, attractions and scenic trains / משלב שווקי חג מולד, קניות, אטרקציות ורכבות נופיות",
  "Mont-Blanc Express is recommended, but optional / Mont-Blanc Express מומלץ, אבל לא חובה",
  "The app will ask questions before suggesting an itinerary / האפליקציה תשאל שאלות לפני שהיא מציעה מסלול",
];

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto flex max-w-6xl flex-col gap-10 px-6 py-12">
        <div className="rounded-3xl border border-white/10 bg-white/10 p-8 shadow-2xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-cyan-200">
            Switzerland • Christmas • Family Planner / שוויץ • חג מולד • תכנון משפחתי
          </p>

          <h1 className="max-w-4xl text-4xl font-bold leading-tight md:text-6xl">
            Swiss Christmas Family Planner / מתכנן טיול משפחתי לשוויץ בחג המולד
          </h1>

          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-200">
            אפליקציה לתכנון טיול משפחתי לשוויץ בתקופת חג המולד — לזוג הורים
            וילדה בת 13, עם שווקי חג מולד, קניות, אטרקציות, רכבות נופיות
            וימים מאוזנים שמתאימים למשפחה.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/search"
              className="rounded-full bg-cyan-300 px-6 py-3 font-semibold text-slate-950 transition hover:bg-cyan-200"
            >
              Start planning / התחלת תכנון
            </Link>

            <Link
              href="/results"
              className="rounded-full border border-white/20 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
            >
              View ideas / צפייה ברעיונות
            </Link>
          </div>
        </div>

        <section className="grid gap-5 md:grid-cols-2">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-2xl border border-white/10 bg-white/[0.07] p-6"
            >
              <h2 className="text-xl font-bold text-cyan-100">
                {feature.title}
              </h2>
              <p className="mt-3 leading-7 text-slate-300">{feature.text}</p>
            </div>
          ))}
        </section>

        <section className="rounded-3xl border border-cyan-300/30 bg-cyan-300/10 p-7">
          <h2 className="text-2xl font-bold text-cyan-100">
            Mont-Blanc Express day trip / טיול יום ברכבת Mont-Blanc Express
          </h2>

          <p className="mt-4 leading-8 text-slate-200">
            Recommended, but optional. Best if the trip is 8–10 days and the
            family is staying around Lake Geneva, Montreux, Lausanne, Geneva or
            Martigny. This should be treated as a full scenic train day trip,
            not as a small stop on the way. / מומלץ, אבל לא חובה. מתאים במיוחד אם הטיול הוא 8-10 ימים והמשפחה ישנה באזור אגם ז׳נבה, מונטרה, לוזאן, ז׳נבה או מרטיני. יש להתייחס לזה כטיול יום מלא ברכבת נופית, ולא כעצירה קטנה בדרך.
          </p>

          <div className="mt-5 grid gap-3 text-sm text-slate-200 md:grid-cols-2">
            <p>
              <strong>Type / סוג:</strong> scenic train + alpine town / רכבת נופית + עיירה אלפינית
            </p>
            <p>
              <strong>Good for / מתאים ל:</strong> mountain views, Chamonix, family photos / נופי הרים, שאמוני ותמונות משפחתיות
            </p>
            <p>
              <strong>Difficulty / רמת קושי:</strong> medium — long travel day / בינונית — יום נסיעה ארוך
            </p>
            <p>
              <strong>Important / חשוב:</strong> crosses into France. For European passports and non-EU passports, check passport validity and current entry rules before booking. / עובר לצרפת. עבור דרכונים אירופיים וגם עבור דרכונים מחוץ לאיחוד האירופי, כדאי לבדוק את תוקף הדרכונים ואת כללי הכניסה העדכניים לפני הזמנה.
              
            </p>
          </div>
        </section>

        <section className="rounded-3xl border border-white/10 bg-white/[0.06] p-7">
          <h2 className="text-2xl font-bold">What the app will remember / מה האפליקציה תזכור</h2>

          <ul className="mt-5 space-y-3 text-slate-200">
            {highlights.map((item) => (
              <li key={item} className="flex gap-3">
                <span className="text-cyan-300">✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>
      </section>
    </main>
  );
}
