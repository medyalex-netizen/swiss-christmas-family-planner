"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const STORAGE_KEY = "tuscanyAutumnAnswers";

type Answers = {
  tripLength: string;
  tripStartDate: string;
tripEndDate: string;
arrivalPoint: string;
departurePoint: string;
  travelStyle: string;
  transportation: string;
  scenicInterest: string;
  scenicOption: string;
  baseArea: string;
  lodgingType: string;
  lodgingBudget: string;
  roomSetup: string;
  lodgingPriorities?: string[];

 
  teenPriorities?: string[];
  teenPriority?: string;
};

const defaultAnswers: Answers = {
  tripLength: "",
  tripStartDate: "",
tripEndDate: "",
arrivalPoint: "",
departurePoint: "",
  travelStyle: "",
  transportation:"",
  scenicInterest: "",
  scenicOption: "",
  baseArea: "",
  lodgingType: "",
  lodgingBudget: "",
 roomSetup: "", 
lodgingPriorities: [],
  teenPriorities: [],
  teenPriority: "",
};

const tripLengthIdeas = [
  {
    title: "טיול קצר — 4 עד 5 ימים",
    text: "מתאים בעיקר לשילוב של פירנצה עם סיינה או אזור קיאנטי. פחות מתאים להרבה החלפות מלון או לנסיעות ארוכות מאוד.",
  },
  {
    title: "טיול מאוזן — 6 עד 7 ימים",
    text: "מאפשר לשלב עיר מרכזית, אזור כפרי אחד, עיירות יפות, נופים, אוכל, קניות וזמן חופשי.",
  },
  {
    title: "טיול מלא — 8 עד 10 ימים",
    text: "מאפשר לבנות מסלול עשיר יותר, עם פירנצה, מרכז טוסקנה, ואל ד'אורצ'ה, עיירות, נופים, אוכל וזמן חופשי.",
  },
];

const baseIdeas = [
  {
    title: "פירנצה",
    tag: "נקודת פתיחה חזקה",
    text: "מתאימה להתחלת הטיול, לשיטוט בעיר יפה, קניות, אוכל, רחובות היסטוריים וטיולי יום נוחים.",
  },
  {
    title: "סיינה",
    tag: "בסיס עירוני נוח ונעים",
    text: "עיר יפה עם אווירה היסטורית חזקה, מרכז נעים מאוד, ומיקום טוב להמשך טיולים בדרום ובמרכז טוסקנה.",
  },
  {
    title: "קיאנטי / סן ג'ימיניאנו",
    tag: "אזור יפה, מרכזי ונוח",
    text: "מתאים לשילוב של עיירות יפות, כרמים, נופים, אוכל טוב ונסיעות נופיות קצרות יחסית.",
  },
  {
    title: "ואל ד'אורצ'ה / פיינצה / מונטפולצ'יאנו",
    tag: "אזור חשוב למסלול נופי",
    text: "אזור מתאים לטיול בין עיירות ציוריות, כבישים יפים, תצפיות, אוכל מקומי ואווירה טוסקנית קלאסית.",
  },
  {
    title: "לוקה / פיזה",
    tag: "אפשרות לצפון־מערב טוסקנה",
    text: "אזור מתאים ליום או יומיים של שילוב עיר יפה, אתרים מוכרים, רחובות נעימים וקצב טיול קל יחסית.",
  },
];

const scenicIdeas = [
  {
    name: "דרך קיאנטי",
    text: "אפשרות יפה במיוחד אם רוצים לשלב עיירות, כרמים, נופים וארוחות טובות בלי להתרחק יותר מדי.",
  },
  {
    name: "יום טיול בוואל ד'אורצ'ה",
    text: "מתאים אם רוצים לשלב עיירות ציוריות, כבישים נופיים, עצירות קצרות ותמונות יפות לאורך הדרך.",
  },
  
   {
  name: "פיינצה, מונטפולצ'יאנו ובאניו ויניוני",
  text: "מתאים ליום של עיירות ציוריות, תצפיות, אוכל מקומי, רחובות יפים ועצירות קצרות בקצב רגוע.",
},
];



const familyRules = [
  "לא להעמיס יותר מדי בכל יום.",
  "לשלב זמן חופשי לקניות, אוכל, קפה ושיטוט רגוע.",
    "לבדוק תחזית מזג אוויר לפני ימי נסיעה נופיים וטיולי כפרים.",
  "להתאים את ימי הכפרים והעיירות לאופן ההתניידות שנבחר, ולבדוק מראש חניה, ZTL או זמינות תחבורה ציבורית.",
    "לשמור אפשרות לשינוי מסלול במקרה של גשם, עומס, עייפות או שינוי בתוכניות.",
  "לתת מקום גם למה שמעניין נערה בת 13, ולא רק לאטרקציות של מבוגרים.",
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
    answers.teenPriorities && answers.teenPriorities.length > 0
      ? answers.teenPriorities.join(", ")
      : answers.teenPriority || "עדיין לא נבחר";
      const lodgingPrioritiesText =
  answers.lodgingPriorities && answers.lodgingPriorities.length > 0
    ? answers.lodgingPriorities.join(", ")
    : "עדיין לא נבחר";
const baseAreaText =
  answers.baseArea === "פירנצה"
    ? "פירנצה מתאימה כבסיס מרכזי לטיול עם פחות החלפות לינה, הרבה אפשרויות אוכל, קניות וטיולי יום."
    : answers.baseArea === "סיינה"
      ? "סיינה מתאימה כבסיס רגוע יותר לטיולים בדרום טוסקנה, קיאנטי ועמקים כפריים."
      : answers.baseArea === "שילוב של שני אזורים"
        ? "שילוב של שני אזורי לינה מאפשר ליהנות גם מעיר מרכזית וגם מאזור כפרי עם פחות נסיעות יומיות ארוכות."
                : "בחירת אזור הלינה תשפיע על חלוקת הימים, כמות הנסיעות והאיזון בין ערים לאזור הכפרי.";
 const travelStyleText =
  answers.travelStyle === "רגוע — מעט מקומות והרבה זמן חופשי"
    ? "בחרתם קצב רגוע. מומלץ לצמצם נסיעות והחלפות, להשאיר זמן חופשי ולהתמקד בפחות מקומות עם יותר עומק."
    : answers.travelStyle === "פעיל — להספיק יותר בכל יום"
      ? "בחרתם קצב פעיל. אפשר לשלב יותר עיירות, עצירות ואתרים, אבל עדיין חשוב לא להעמיס יותר מדי."
      : "קצב מאוזן מאפשר לשלב ערים, עיירות, נופים וזמן מנוחה בצורה נוחה למשפחה.";
    const lodgingTypeText =
  answers.lodgingType === "מלון במרכז עיר"
    ? "מלון במרכז עיר מתאים אם חשוב לכם להיות קרובים למסעדות, קניות ואתרים ולצמצם שימוש ברכב בתוך העיר."
    : answers.lodgingType === "דירה משפחתית"
      ? "דירה משפחתית יכולה להתאים אם חשובים לכם יותר מרחב, מטבחון וגמישות בארוחות, במיוחד בטיול של כמה ימים."
      : answers.lodgingType === "אגריטוריסמו או לינה כפרית"
        ? "אגריטוריסמו או לינה כפרית מתאימים במיוחד לחלק הכפרי של הטיול, עם אווירה רגועה ונופים. חשוב לבדוק חניה, דרך גישה ומרחק ממסעדות."
        : answers.lodgingType === "שילוב של עיר וכפר"
          ? "שילוב של לינה עירונית ולינה כפרית יכול לתת למשפחה גם נוחות בעיר וגם חוויה רגועה יותר באזורי הנוף."
          : "אם עדיין לא החלטתם על סוג הלינה, כדאי לבחור לפי אופן ההתניידות, מספר הלילות בכל אזור והעדיפות בין נוחות עירונית לאווירה כפרית.";
      const lodgingBudgetText =
  answers.lodgingBudget === "עד 150 אירו ללילה"
    ? "בתקציב של עד 150 אירו ללילה כדאי להתמקד בדירות משפחתיות, מלונות פשוטים יותר או לינה מחוץ למרכזים היקרים, ולבדוק היטב מה כלול במחיר."
    : answers.lodgingBudget === "150–250 אירו ללילה"
      ? "תקציב של 150–250 אירו ללילה נותן גמישות טובה בין דירה משפחתית, מלון נוח או אגריטוריסמו, בהתאם לאזור ולתאריכים."
      : answers.lodgingBudget === "250–350 אירו ללילה"
        ? "בתקציב של 250–350 אירו ללילה אפשר לשקול מקומות לינה ברמה גבוהה יותר, מיקום מרכזי יותר או אגריטוריסמו איכותי עם יותר שירותים."
        : answers.lodgingBudget === "מעל 350 אירו ללילה"
          ? "בתקציב של מעל 350 אירו ללילה אפשר לתת עדיפות למיקום, נוחות, חדר משפחתי מרווח ושירותים נוספים, בלי להתפשר רק בגלל המחיר."
          : answers.lodgingBudget === "גמישים לפי המקום"
            ? "אם התקציב גמיש, כדאי להשוות את המחיר מול המיקום, החניה, גודל החדר והשירותים שמקבלים בפועל."
                        : "אם עדיין לא החלטתם על תקציב לינה, כדאי לקבוע טווח מחיר ללילה לפני שמתחילים להשוות בין מלונות, דירות ואגריטוריסמו.";
                        const roomSetupText =
  answers.roomSetup === "חדר אחד עם מיטה זוגית ומיטה נפרדת לנערה"
    ? "מומלץ לוודא מראש שהמיטה הנפרדת לנערה היא מיטה אמיתית ונוחה, ולא רק ספה קטנה או מיטה מתקפלת."
    : answers.roomSetup === "חדר משפחתי לשלושה"
      ? "מומלץ לבחור חדר משפחתי שמיועד באמת לשלושה אורחים, עם מספיק מרחב ואחסון למשפחה."
      : answers.roomSetup === "שני חדרים נפרדים"
        ? "אם מעדיפים שני חדרים נפרדים, כדאי לבדוק מראש אם ניתן להזמין חדרים סמוכים או מחוברים."
        : answers.roomSetup === "דירה עם חדר שינה וספה נפתחת"
          ? "בדירה עם חדר שינה וספה נפתחת, כדאי לבדוק שהספה מתאימה לשינה נוחה לנערה בת 13 ושיש מספיק פרטיות ומרחב."
          : answers.roomSetup === "גמישים לפי המקום"
            ? "אם אתם גמישים בסידור החדר, כדאי להשוות בין הנוחות, גודל החדר, סוג המיטה הנוספת והמחיר."
            : "אם עדיין לא החלטתם על סידור החדר, כדאי להגדיר מראש מה נחשב סידור שינה נוח לשלושת בני המשפחה.";
          const lodgingPrioritiesAdvice = (() => {
  const priorities = answers.lodgingPriorities || [];
  const parts: string[] = [];

  if (priorities.includes("חניה נוחה")) {
    parts.push("להעדיף מקום לינה עם חניה ברורה ונוחה, במיוחד אם משתמשים ברכב שכור");
  }

  if (priorities.includes("ארוחת בוקר")) {
    parts.push("לבדוק שארוחת הבוקר כלולה או זמינה במקום הלינה");
  }

  if (priorities.includes("חדר משפחתי")) {
    parts.push("לוודא מראש שהחדר מתאים בנוחות לשני הורים ולנערה בת 13");
  }

  if (priorities.includes("מטבחון")) {
    parts.push("להעדיף דירה או מקום עם מטבחון כדי לאפשר גמישות בארוחות");
  }

  if (priorities.includes("מעלית")) {
    parts.push("לבדוק שיש מעלית, במיוחד במבנים היסטוריים שבהם היא לא תמיד קיימת");
  }

  if (priorities.includes("קרבה למרכז ולמסעדות")) {
    parts.push("להעדיף מיקום שמאפשר להגיע ברגל למסעדות, בתי קפה והמרכז");
  }

  return parts.length > 0
    ? parts.join(". ") + "."
    : "כדאי לבחור את מקום הלינה לפי הנוחות החשובה ביותר למשפחה.";
})();
          const teenInterestText = (() => {
      
  const priorities =
  answers.teenPriorities && answers.teenPriorities.length > 0
    ? answers.teenPriorities
    : answers.teenPriority
      ? [answers.teenPriority]
      : [];
      
  const parts: string[] = [];

  if (priorities.some((item) => item.includes("קניות"))) {
    parts.push(
      "קניות ושיטוט עירוני, ולכן כדאי לתת מקום לפירנצה, לוקה וזמן חופשי ברחובות יפים"
    );
  }

  if (
  priorities.some(
    (item) =>
      item.includes("אוכל") ||
      item.includes("גלידה") ||
      item.includes("קינוחים") ||
      item.includes("בישול") ||
      item.includes("טעימות") ||
      item.includes("מקומי")
  )
) {
    parts.push(
  "חוויות אוכל מקומיות כמו גלידה, בתי קפה, טעימות או סדנת בישול"
);
  }

  if (
    priorities.some(
      (item) =>
        item.includes("תמונות") ||
        item.includes("נופים") ||
        item.includes("עיירות") ||
        item.includes("כפרים")
    )
  ) {
    parts.push(
  "עיירות ציוריות ומקומות יפים לצילום כמו סן ג'ימיניאנו, פיינצה ווואל ד'אורצ'ה"
);
  }

  if (parts.length === 0) {
    return "כדאי לשלב במסלול גם זמן שמתאים לנערה בת 13 ולא רק אתרי חובה למבוגרים.";
  }

  return "העדפות הנערה מצביעות על עניין ב" + parts.join(". בנוסף, ") + ".";
})();
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
          <p dir="rtl" className="text-right text-sm font-semibold text-amber-300">
            Tuscany Autumn Family Planner
          </p>

          <h1 className="mt-4 text-4xl font-bold">
            הצעת כיוון ראשונית לטיול משפחתי בטוסקנה
          </h1>

          <p className="mt-5 max-w-3xl leading-8 text-slate-300">
            העמוד הזה מציג רעיונות למסלול לפי התשובות שנשמרו. זה עדיין לא
            מסלול סופי, אלא בסיס טוב להמשך תכנון.
          </p>
        </section>

        <section className="mt-8 rounded-3xl border border-white/10 bg-slate-900/80 p-6">
          <h2 className="text-2xl font-bold">התשובות שנשמרו</h2>

          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <AnswerCard label="אורך הטיול" value={answers.tripLength} />

<AnswerCard
  label="תאריך התחלה"
  value={answers.tripStartDate}
/>

<AnswerCard
  label="תאריך סיום"
  value={answers.tripEndDate}
  
/>
<AnswerCard
  label="נקודת הגעה"
  value={answers.arrivalPoint}
/>

<AnswerCard
  label="נקודת יציאה או חזרה"
  value={answers.departurePoint}
/>
            <AnswerCard label="קצב הטיול" value={answers.travelStyle} />
            <AnswerCard label="אופן ההתניידות"
                        value={answers.transportation}
                        />
            <AnswerCard
              label="עניין בנופים ובטבע"
              value={answers.scenicInterest}
            />
            <AnswerCard
              label="סוג היום הנופי שמעניין אתכם"
              value={answers.scenicOption}
            />
            <AnswerCard label="אזור לינה מועדף" value={answers.baseArea} />
      <AnswerCard label="סוג מקום הלינה" value={answers.lodgingType} />
      <AnswerCard label="תקציב לינה ללילה" value={answers.lodgingBudget} />
      <AnswerCard
  label="מה חשוב במקום הלינה"
  value={lodgingPrioritiesText}
/>
         <AnswerCard
  label="סידור חדר ומיטות"
  value={answers.roomSetup}
/> 
            <AnswerCard label="מה חשוב לנערה בת 13" value={teenText} />
          </div>
        </section>

        <section className="mt-8">
          <h2 className="text-3xl font-bold">כיוון לפי אורך הטיול</h2>

          <div className="mt-5 grid gap-5 md:grid-cols-3">
            {(
  answers.tripLength === "4–5 ימים"
    ? [tripLengthIdeas[0]]
    : answers.tripLength === "6–7 ימים"
      ? [tripLengthIdeas[1]]
      : answers.tripLength === "8–10 ימים"
        ? [tripLengthIdeas[2]]
        : tripLengthIdeas
).map((item) => (
              <div
                key={item.title}
                className="rounded-3xl border border-white/10 bg-white/5 p-6"
              >
                <h3 className="text-xl font-bold text-amber-200">
                  {item.title}
                </h3>
                <p className="mt-3 leading-7 text-slate-300">{item.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-3xl font-bold">רעיונות לבסיסי לינה ואזורים לשילוב</h2>
<div className="mt-6 rounded-2xl border border-amber-300/30 bg-amber-300/10 p-5">
  <h3 className="font-bold text-amber-200">
    השפעת אזור הלינה על המסלול
  </h3>

  <p className="mt-2 leading-7 text-slate-200">
    {baseAreaText}
  </p>
</div>
 <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-5">
  <h3 className="font-bold text-amber-200">
    התאמת סוג מקום הלינה
  </h3>

  <p className="mt-2 leading-7 text-slate-300">
    {lodgingTypeText}
  </p>
</div>

<div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-5">
  <h3 className="font-bold text-amber-200">
    מה חשוב לבדוק במקום הלינה
  </h3>

  <p className="mt-2 leading-7 text-slate-300">
    {lodgingPrioritiesAdvice}
  </p>
</div> 
<div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-5">
  <h3 className="font-bold text-amber-200">
    התאמת תקציב הלינה
  </h3>

  <p className="mt-2 leading-7 text-slate-300">
    {lodgingBudgetText}
  </p>
</div>      
         <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-5">
  <h3 className="font-bold">
    <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-5">
  <h3 className="font-bold text-amber-200">
    התאמת סידור החדר והמיטות
  </h3>

  <p className="mt-2 leading-7 text-slate-300">
    {roomSetupText}
  </p>
</div>
    השפעת קצב הטיול על המסלול
  </h3>

  <p className="mt-2 leading-7 text-slate-300">
    {travelStyleText}
  </p>
</div>
    <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-5">
  <h3 className="font-bold">
    התאמת המסלול לנערה בת 13
  </h3>

  <p className="mt-2 leading-7 text-slate-300">
    {teenInterestText}
  </p>
</div>     
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
              </div>
            ))}
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-3xl font-bold">רעיונות לימי נוף שאפשר לשקול</h2>

          <div className="mt-5 grid gap-5 md:grid-cols-3">
            {scenicIdeas.map((item) => (
              <div
                key={item.name}
                className="rounded-3xl border border-white/10 bg-white/5 p-6"
              >
                <h3 dir="rtl" className="text-right text-xl font-bold text-amber-200">
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
  href="/weather"
  className="rounded-full border border-white/20 px-6 py-3 text-center font-semibold text-slate-100 hover:border-amber-300"
>
  מזג אוויר
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