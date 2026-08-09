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
  transportation: string;
  travelStyle: string;
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
  transportation: "",
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

const partialCarItinerary = [
  {
    day: "יום 1",
    title: "הגעה לפירנצה והתאקלמות",
    text: "נחיתה או הגעה ברכבת, נסיעה למלון, הליכה רגועה במרכז ההיסטורי, ארוחת ערב קלה ושינה מוקדמת.",
  },
  {
    day: "יום 2",
    title: "פירנצה — מרכז היסטורי, קניות ואוכל",
    text: "יום עירוני נוח עם הרחובות המרכזיים, כיכרות יפות, גלידה, בתי קפה, זמן חופשי וקניות שמתאימות גם לנערה בת 13.",
  },
  {
    day: "יום 3",
    title: "פירנצה בקצב רגוע או טיול יום קצר",
    text: "אפשר להמשיך בפירנצה בקצב נוח, לבחור מוזיאון אחד או תצפית, או לצאת לטיול יום קצר בהתאם למזג האוויר ולעייפות המשפחה.",
  },
  {
    day: "יום 4",
    title: "מעבר לסיינה דרך קיאנטי",
    text: "נסיעה לכיוון סיינה עם עצירות קצרות בעיירות או בנקודות נוף באזור קיאנטי. כדאי להימנע מהעמסת יותר מדי עצירות ביום אחד.",
  },
  {
    day: "יום 5",
    title: "סיינה וסן ג'ימיניאנו",
    text: "שיטוט במרכז ההיסטורי של סיינה, זמן לארוחה ולמנוחה, ובהמשך ביקור בסן ג'ימיניאנו אם הקצב ומזג האוויר מתאימים.",
  },
  {
    day: "יום 6",
    title: "מעבר לוואל ד'אורצ'ה",
    text: "נסיעה נופית לכיוון פיינצה או מונטפולצ'יאנו, עם עצירות קצרות לתצפיות, אוכל מקומי וצילום לאורך הדרך.",
  },
  {
    day: "יום 7",
    title: "פיינצה, מונטפולצ'יאנו ובאניו ויניוני",
    text: "יום של עיירות ציוריות, רחובות יפים, אוכל, גלידה ותצפיות. כדאי לבחור שתיים או שלוש עצירות בלבד ולא להעמיס.",
  },
  {
    day: "יום 8",
    title: "יום גמיש בטבע או בעיירה",
    text: "יום שמאפשר מנוחה, נסיעה קצרה, שוק מקומי, חווה, פעילות אוכל או שינוי תוכנית במקרה של גשם או עייפות.",
  },
  {
    day: "יום 9",
    title: "לוקה ופיזה או חזרה לפירנצה",
    text: "אפשר לבחור יום קל יחסית בלוקה ופיזה, או לחזור לפירנצה לזמן חופשי, קניות, אוכל ושיטוט אחרון.",
  },
  {
    day: "יום 10",
    title: "חזרה הביתה",
    text: "נסיעה לשדה התעופה או לתחנת הרכבת, זמן ביטחון, החזרת רכב אם צריך וסיום רגוע של הטיול.",
  },
];
const fullCarItinerary = [
  {
    day: "יום 1",
    title: "הגעה לפירנצה ואיסוף רכב",
    text: "נחיתה או הגעה לפירנצה, איסוף רכב רק אם הוא נדרש מיד, נסיעה למקום הלינה והתאקלמות רגועה. חשוב להימנע מנהיגה בתוך אזורי ZTL במרכז ההיסטורי.",
  },
  {
    day: "יום 2",
    title: "פירנצה והסביבה",
    text: "יום עירוני בפירנצה עם חניה מחוץ למרכז, הליכה רגועה, קניות, אוכל וזמן חופשי. אפשר להשאיר את הרכב בחניה מסודרת במשך היום.",
  },
  {
    day: "יום 3",
    title: "קיאנטי וסן ג'ימיניאנו",
    text: "נסיעה נופית דרך קיאנטי, עם עצירות קצרות בכפרים או בנקודות תצפית, ובהמשך ביקור בסן ג'ימיניאנו. חשוב לא להעמיס יותר מדי עצירות.",
  },
  {
    day: "יום 4",
    title: "סיינה",
    text: "יום בסיינה, עם חניה מחוץ למרכז ההיסטורי, שיטוט רגוע, ארוחה וזמן חופשי. אפשר ללון באזור סיינה או להמשיך דרומה.",
  },
  {
    day: "יום 5",
    title: "מעבר לוואל ד'אורצ'ה",
    text: "נסיעה דרומה דרך נופים כפריים, עם עצירות קצרות בלבד. אפשר לבחור לינה באזור פיינצה, מונטפולצ'יאנו או עיירה סמוכה.",
  },
  {
    day: "יום 6",
    title: "פיינצה ומונטפולצ'יאנו",
    text: "יום של עיירות, תצפיות, אוכל מקומי וצילום. כדאי לבחור שתי עצירות עיקריות ולא לנסות להספיק את כל האזור ביום אחד.",
  },
  {
    day: "יום 7",
    title: "באניו ויניוני או יום כפרי רגוע",
    text: "יום קל יותר עם כפר קטן, פעילות אוכל, חווה, שוק מקומי או מנוחה. מתאים גם לשינוי תוכנית במקרה של גשם או עייפות.",
  },
  {
    day: "יום 8",
    title: "נסיעה לכיוון לוקה ופיזה",
    text: "יום מעבר ארוך יותר לכיוון צפון־מערב טוסקנה. כדאי לתכנן מראש עצירת מנוחה ולהימנע מהגעה מאוחרת.",
  },
  {
    day: "יום 9",
    title: "לוקה ופיזה",
    text: "יום שמשלב את לוקה ופיזה בקצב סביר, עם זמן לשיטוט, ארוחה, תמונות ומנוחה.",
  },
  {
    day: "יום 10",
    title: "החזרת הרכב וחזרה הביתה",
    text: "נסיעה לשדה התעופה או לתחנת הרכבת, תדלוק, החזרת הרכב בזמן והשארת מרווח ביטחון.",
  },
];
const publicTransportItinerary = [
  {
    day: "יום 1",
    title: "הגעה לפירנצה והתאקלמות",
    text: "הגעה ברכבת או בטיסה, נסיעה למלון, שיטוט רגוע במרכז ההיסטורי, ארוחת ערב קלה ושינה מוקדמת.",
  },
  {
    day: "יום 2",
    title: "פירנצה — מרכז היסטורי, קניות ואוכל",
    text: "יום עירוני מלא בפירנצה עם הליכה, תחבורה ציבורית לפי הצורך, גלידה, בתי קפה, קניות וזמן חופשי.",
  },
  {
    day: "יום 3",
    title: "פירנצה בקצב רגוע",
    text: "אפשר לבחור מוזיאון אחד, תצפית, שוק מקומי או זמן חופשי נוסף. עדיף לא להעמיס יותר מדי אטרקציות באותו יום.",
  },
  {
    day: "יום 4",
    title: "סיינה בתחבורה ציבורית",
    text: "נסיעה לסיינה באוטובוס או ברכבת בשילוב אוטובוס, שיטוט במרכז ההיסטורי, ארוחה וחזרה לפירנצה או לינה בסיינה.",
  },
  {
    day: "יום 5",
    title: "פיזה ולוקה",
    text: "יום טיול ברכבת לפיזה ולוקה. אפשר לשלב את שתי הערים בקצב סביר, עם זמן לארוחה, תמונות ומנוחה.",
  },
  {
    day: "יום 6",
    title: "יום מאורגן לקיאנטי או לסן ג'ימיניאנו",
    text: "מאחר שקשה להגיע לחלק מהאזורים הכפריים בתחבורה ציבורית, אפשר לבחור טיול יום מאורגן לקיאנטי, סן ג'ימיניאנו או אזור כפרי אחר.",
  },
  {
    day: "יום 7",
    title: "יום גמיש בפירנצה",
    text: "יום שמיועד לקניות, אוכל, מנוחה, שוק מקומי, פעילות שמתאימה לנערה בת 13 או שינוי תוכנית במקרה של גשם.",
  },
  {
    day: "יום 8",
    title: "מעבר לעיר נוספת לפי הצורך",
    text: "אפשר לעבור ברכבת ללוקה, פיזה או עיר אחרת עם חיבור נוח. עדיף להימנע מאזורים שדורשים כמה החלפות מורכבות.",
  },
  {
    day: "יום 9",
    title: "יום עירוני נוסף או טיול קצר",
    text: "אפשר לבחור יום נוסף בפירנצה, סיינה, לוקה או פיזה, בהתאם למקום הלינה, מזג האוויר וקצב המשפחה.",
  },
  {
    day: "יום 10",
    title: "חזרה הביתה",
    text: "נסיעה ברכבת או בתחבורה ציבורית לשדה התעופה או לתחנה המרכזית, עם מרווח ביטחון מספיק.",
  },
];

 const carChecks = [
  "לבדוק מגבלות נהיגה וחניה במרכזים ההיסטוריים.",
  "לבדוק מראש אזורי ZTL ולוודא היכן מותר להיכנס ולחנות.",
  "לבדוק זמני נסיעה אמיתיים ולא להעמיס יותר מדי עיירות ביום אחד.",
  "לבדוק מזג אוויר לפני ימי כפרים, תצפיות ונסיעות נופיות.",
  "לבדוק שעות פתיחה, הזמנות, מחירי כניסה וימי סגירה.",
  "לבדוק מראש את תנאי השכרת הרכב, הביטוח, התדלוק ומקום ההחזרה.",
];
const publicTransportChecks = [
  "לבדוק לוחות זמנים עדכניים של רכבות ואוטובוסים.",
  "לבדוק אם נדרשת הזמנה מראש בקווים בין־עירוניים.",
  "לבדוק זמני החלפה ולא לבנות חיבורים צפופים מדי.",
  "לבדוק מראש איך מגיעים מהתחנה למלון ולמרכז ההיסטורי.",
  "לבדוק תחבורה חלופית במקרה של שביתה, איחור או שינוי בלוחות הזמנים.",
  "לבדוק שעות פתיחה, הזמנות, מחירי כניסה וימי סגירה.",
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
      const transportationNote =
  answers.transportation === "רכב שכור לכל הטיול"
    ? "המסלול יכול לכלול יותר אזורים כפריים, עיירות קטנות ונסיעות נופיות. חשוב לבדוק חניה, אזורי ZTL והחזרת הרכב."
    : answers.transportation === "רכב שכור רק לחלק הכפרי"
      ? "מומלץ לשהות בפירנצה ללא רכב, ולשכור רכב רק ביציאה לקיאנטי, סיינה ווואל ד'אורצ'ה."
      : answers.transportation === "רכבות ותחבורה ציבורית בלבד"
  ? "לטיול ללא רכב מומלץ לבחור בעיקר מקומות שקל להגיע אליהם ברכבת או באוטובוס, כמו פירנצה, סיינה, לוקה ופיזה."
             : "עדיין לא נבחר אופן התניידות. הבחירה תשפיע מאוד על אזורי הלינה והמסלול.";

const transportationPlan =
  answers.transportation === "רכב שכור לכל הטיול"
    ? "אפשר לשלב את פירנצה, סיינה, קיאנטי, ואל ד'אורצ'ה, לוקה ופיזה ברצף אחד, אך כדאי להימנע מנהיגה בתוך המרכז ההיסטורי של פירנצה ולבדוק אזורי ZTL וחניה מראש."
    : answers.transportation === "רכב שכור רק לחלק הכפרי"
      ? "מומלץ להתחיל בפירנצה ללא רכב, לאסוף רכב רק ביום היציאה לקיאנטי ולסיינה, ולהחזיר אותו לפני החזרה לעיר גדולה או לשדה התעופה."
      : answers.transportation === "רכבות ותחבורה ציבורית בלבד"
        ? "מומלץ לבנות מסלול עירוני יותר: פירנצה, סיינה, לוקה ופיזה. כדאי לצמצם את ואל ד'אורצ'ה והכפרים המרוחקים, או להגיע אליהם בטיול יום מאורגן."
        : "לאחר בחירת אופן ההתניידות, האתר יוכל להמליץ על סדר נכון יותר של הימים והאזורים.";

const normalizedTransportation = answers.transportation.trim();

const undecidedTransportationItinerary = [
  {
    day: "יום 1",
    title: "הגעה והתארגנות",
    text: "הגעה לאזור הלינה הראשון, התמקמות וטיול רגוע בסביבה הקרובה ללא נסיעות ארוכות.",
  },
  {
    day: "יום 2",
    title: "יום עירוני",
    text: "ביקור בעיר מרכזית, שילוב של אתרים, אוכל מקומי, קניות וזמן חופשי.",
  },
  {
    day: "יום 3",
    title: "עיירות וכפרים",
    text: "יום המוקדש לעיירות וכפרים בטוסקנה. את המקומות המדויקים ואת אופן ההגעה נבחר לאחר קבלת החלטה לגבי התחבורה.",
  },
  {
    day: "יום 4",
    title: "נופים ואוכל מקומי",
    text: "יום גמיש המשלב נופים, תצפיות, שווקים, טעימות או פעילות משפחתית בהתאם למזג האוויר.",
  },
  {
    day: "יום 5",
    title: "יום משפחתי רגוע",
    text: "שילוב של פעילות שמתאימה לכל המשפחה, עם זמן לקניות, גלידה, בית קפה או מנוחה.",
  },
  {
    day: "יום 6",
    title: "אזור נוסף בטוסקנה",
    text: "ביקור באזור נוסף בהתאם למקום הלינה ולאופן ההתניידות שייבחר.",
  },
  {
    day: "יום 7",
    title: "יום גמיש",
    text: "יום פתוח להשלמת מקומות שלא הספקתם, שינוי לפי מזג האוויר או מנוחה.",
  },
  {
    day: "יום 8",
    title: "המשך הטיול",
    text: "יום נוסף שייקבע לפי אזורי הלינה, קצב הטיול ואופן התחבורה.",
  },
  {
    day: "יום 9",
    title: "יום בחירה משפחתי",
    text: "בחירת פעילות מועדפת על המשפחה בהתאם למה שכבר עשיתם במהלך הטיול.",
  },
  {
    day: "יום 10",
    title: "סיום הטיול וחזרה",
    text: "בוקר רגוע, ארוחה אחרונה או שיטוט קצר, ולאחר מכן יציאה לשדה התעופה או לתחנת הרכבת.",
  },
];
     const selectedItinerary =
  normalizedTransportation === "רכב שכור לכל הטיול"
    ? fullCarItinerary
    : normalizedTransportation === "רכבות ותחבורה ציבורית בלבד"
      ? publicTransportItinerary
      : normalizedTransportation === "רכב שכור רק לחלק הכפרי"
        ? partialCarItinerary
        : undecidedTransportationItinerary;
const tripDaysFromDates =
  answers.tripStartDate && answers.tripEndDate
    ? Math.floor(
        (new Date(answers.tripEndDate).getTime() -
          new Date(answers.tripStartDate).getTime()) /
          (1000 * 60 * 60 * 24)
      ) + 1
    : selectedItinerary.length;

const visibleItinerary = [
  ...selectedItinerary.slice(0, Math.max(tripDaysFromDates - 1, 1)),
  {
    day: `יום ${tripDaysFromDates}`,
    title: "סיום הטיול וחזרה הביתה",
    text:
      "בוקר רגוע, ארוחה אחרונה או שיטוט קצר, ולאחר מכן נסיעה לשדה התעופה או לתחנת הרכבת עם מרווח ביטחון מספיק.",
  },
];
  const undecidedTransportationChecks = [
  "לבחור את אופן ההתניידות לפני שסוגרים את אזורי הלינה.",
  "לבדוק זמני נסיעה בין האזורים ולא להעמיס יותר מדי מקומות ביום אחד.",
  "לבדוק מזג אוויר לפני ימי כפרים, תצפיות ופעילויות בחוץ.",
  "לבדוק שעות פתיחה, הזמנות, מחירי כניסה וימי סגירה.",
  "להשאיר אפשרות לשנות את סדר הימים לפי מזג האוויר ועייפות המשפחה.",
];
const selectedChecks =
  normalizedTransportation === "רכבות ותחבורה ציבורית בלבד"
    ? publicTransportChecks
    : normalizedTransportation === "רכב שכור לכל הטיול" ||
        normalizedTransportation === "רכב שכור רק לחלק הכפרי"
      ? carChecks
      : undecidedTransportationChecks;

const teenDayTwoNote = (() => {
  const priorities =
    answers.teenPriorities && answers.teenPriorities.length > 0
      ? answers.teenPriorities
      : answers.teenPriority
        ? [answers.teenPriority]
        : [];

  const additions: string[] = [];

  if (priorities.some((item) => item.includes("קניות"))) {
    additions.push("להשאיר זמן חופשי לקניות ולשיטוט ברחובות היפים");
  }

  if (
    priorities.some(
      (item) =>
        item.includes("אוכל") ||
        item.includes("גלידה") ||
        item.includes("קינוחים") ||
        item.includes("בישול") ||
        item.includes("טעימות")
    )
  ) {
    additions.push("לשלב עצירה לגלידה, בית קפה או טעימה מקומית");
  }

  return additions.length > 0 ? additions.join(". ") + "." : "";
})();
const teenVillageDayNote = (() => {
  const priorities =
    answers.teenPriorities && answers.teenPriorities.length > 0
      ? answers.teenPriorities
      : answers.teenPriority
        ? [answers.teenPriority]
        : [];

  const likesVillages = priorities.some(
    (item) =>
      item.includes("עיירות") ||
      item.includes("כפרים") ||
      item.includes("נופים") ||
      item.includes("תמונות")
  );

  return likesVillages
    ? "להשאיר זמן לשיטוט רגוע, נקודות צילום ועצירות קצרות בעיירות ציוריות."
    : "";
})();
const teenFoodDayNote = (() => {
  const priorities =
    answers.teenPriorities && answers.teenPriorities.length > 0
      ? answers.teenPriorities
      : answers.teenPriority
        ? [answers.teenPriority]
        : [];

  const likesFood = priorities.some(
    (item) =>
      item.includes("אוכל") ||
      item.includes("בישול") ||
      item.includes("טעימות") ||
      item.includes("גלידה") ||
      item.includes("קינוחים")
  );

  return likesFood
    ? "אפשר לשלב סדנת בישול, טעימות או חוויה קולינרית מקומית."
    : "";
})();
const teenComfortNote = (() => {
  const priorities =
    answers.teenPriorities && answers.teenPriorities.length > 0
      ? answers.teenPriorities
      : answers.teenPriority
        ? [answers.teenPriority]
        : [];

  const additions: string[] = [];

  if (
    priorities.some((item) =>
      item.includes("אטרקציות קלילות ולא מוזיאונים כבדים")
    )
  ) {
    additions.push(
      "להעדיף אטרקציות קלילות, חווייתיות וקצרות, ולהימנע מימים עמוסים במוזיאונים כבדים"
    );
  }

  if (
    priorities.some((item) =>
      item.includes("זמן חופשי לשיטוט, קניות ומנוחה")
    )
  ) {
    additions.push(
      "להשאיר בכל יום זמן חופשי לשיטוט, קניות, בית קפה או מנוחה"
    );
  }

  return additions.length > 0 ? additions.join(". ") + "." : "";
})();
const paceDayNote =
  answers.travelStyle === "רגוע — מעט מקומות והרבה זמן חופשי"
    ? "להשאיר זמן חופשי, לצמצם עצירות ולא לנסות להספיק יותר מדי באותו יום."
    : answers.travelStyle === "מאוזן — שילוב של טיול ומנוחה"
      ? "לשלב פעילות מרכזית אחת או שתיים עם הפסקות, ארוחה רגועה וזמן חופשי."
      : answers.travelStyle === "פעיל — להספיק יותר בכל יום"
        ? "אפשר להוסיף עצירה קצרה או פעילות נוספת, כל עוד זמני הנסיעה והעייפות מאפשרים זאת."
        : answers.travelStyle === "קצב שונה בימים שונים"
          ? "כדאי לשלב ימים פעילים יותר לצד ימים רגועים, במיוחד אחרי נסיעות ארוכות או החלפת מקום לינה."
          : "";
      const scenicInterestNote =
  answers.scenicInterest === "מאוד חשוב — רוצים הרבה נופים וכפרים"
    ? "המשפחה מעדיפה יותר נופים, כפרים ונסיעות ציוריות. כדאי לתת עדיפות לוואל ד'אורצ'ה, קיאנטי ולעיירות קטנות."
    : answers.scenicInterest === "פחות חשוב — מעדיפים ערים, קניות ואוכל"
      ? "המשפחה מעדיפה יותר זמן עירוני, קניות, אוכל ושיטוט. כדאי לא להעמיס יותר מדי ימי כפר ונסיעות ארוכות."
      : "כדאי לשמור על איזון בין ערים, עיירות, נופים וזמן חופשי.";
     const scenicOptionNote =
  answers.scenicOption === "יום של עיירות וכפרים ציוריים"
    ? "כדאי לשלב יום שממוקד בעיירות וכפרים ציוריים, עם זמן להליכה רגועה, צילום ובתי קפה."
    : answers.scenicOption === "נסיעה נופית עם עצירות קצרות"
      ? "כדאי לתכנן מסלול נסיעה נופי עם כמה עצירות קצרות ומרווחות, בלי להעמיס יותר מדי יעדים באותו יום."
      : answers.scenicOption === "אזורי כרמים ואוכל מקומי"
        ? "כדאי לשלב אזור כרמים, טעימות או ארוחה מקומית שמתאימה למשפחה, ולבדוק מראש שעות פתיחה והזמנות."
        : answers.scenicOption === "טבע פתוח ותצפיות"
          ? "כדאי לשלב טבע פתוח, תצפיות ומסלולים קצרים שמתאימים גם לבת ה־13."
          : "כדאי להשאיר את היום הנופי גמיש ולבחור לפי מזג האוויר והמסלול.";
  const baseAreaItineraryNote =
  answers.baseArea === "פירנצה"
    ? "מומלץ לשמור את פירנצה כבסיס מרכזי לכמה לילות ולצאת ממנה לטיולי יום, כדי לצמצם החלפות מלון."
    : answers.baseArea === "סיינה"
      ? "מומלץ להתמקם בסיינה או בסביבתה כדי לקצר נסיעות לקיאנטי, סן ג'ימיניאנו ווואל ד'אורצ'ה."
      : answers.baseArea === "קיאנטי / סן ג'ימיניאנו"
        ? "מומלץ לבחור לינה כפרית באזור קיאנטי או ליד סן ג'ימיניאנו, במיוחד אם יש רכב. חשוב לבדוק חניה, דרך גישה ומרחק ממסעדות."
        : answers.baseArea === "ואל ד'אורצ'ה / פיינצה / מונטפולצ'יאנו"
          ? "מומלץ לבחור בסיס באזור ואל ד'אורצ'ה כדי ליהנות מהנופים, מפיינצה וממונטפולצ'יאנו בלי נסיעות ארוכות מדי בכל יום."
          : answers.baseArea === "לוקה / פיזה"
            ? "מומלץ לבחור לינה בלוקה או בפיזה אם רוצים להתמקד בצפון־מערב טוסקנה, עם גישה נוחה ברכבת ובטיולי יום קצרים."
            : answers.baseArea === "שילוב של שני אזורים"
              ? "מומלץ לחלק את הלינה בין פירנצה לבין אזור סיינה או ואל ד'אורצ'ה, כדי לצמצם נסיעות ארוכות."
              : "מומלץ לבחור את אזורי הלינה לפי מספר הימים ואופן ההתניידות, ולהימנע מהחלפות מלון מיותרות.";
const lodgingTypeItineraryNote =
  answers.lodgingType === "מלון במרכז עיר"
    ? "מומלץ לבחור מלון במיקום מרכזי שמאפשר להגיע ברגל למסעדות, קניות ואתרים, ולצמצם שימוש ברכב בתוך העיר."
    : answers.lodgingType === "דירה משפחתית"
      ? "מומלץ לבחור דירה משפחתית עם מספיק מרחב לשלושה, מטבחון וגישה נוחה למרכז או לתחבורה ציבורית."
      : answers.lodgingType === "אגריטוריסמו או לינה כפרית"
        ? "מומלץ לשלב אגריטוריסמו או לינה כפרית בחלק הכפרי של הטיול, ולבדוק מראש חניה, דרך גישה ומרחק ממסעדות."
        : answers.lodgingType === "שילוב של עיר וכפר"
          ? "מומלץ לשלב לינה מרכזית בעיר עם כמה לילות באזור כפרי, כדי לקבל גם נוחות עירונית וגם חוויית טוסקנה רגועה."
          : "אם עדיין לא החלטתם על סוג הלינה, כדאי לבחור אותו לפי אופן ההתניידות, מספר הלילות בכל אזור ורמת הנוחות הרצויה.";
       const lodgingBudgetItineraryNote =
  answers.lodgingBudget === "עד 150 אירו ללילה"
    ? "כדי לשמור על תקציב של עד 150 אירו ללילה, כדאי להעדיף דירות, מלונות פשוטים יותר או לינה מעט מחוץ למרכז, ולבדוק היטב חניה ומה כלול במחיר."
    : answers.lodgingBudget === "150–250 אירו ללילה"
      ? "תקציב של 150–250 אירו ללילה מתאים לרוב למסלול גמיש בין דירה משפחתית, מלון נוח או אגריטוריסמו, בהתאם לאזור ולעונה."
      : answers.lodgingBudget === "250–350 אירו ללילה"
        ? "בתקציב של 250–350 אירו ללילה אפשר להעדיף מיקום טוב יותר, חדר משפחתי מרווח יותר או אגריטוריסמו איכותי עם יותר שירותים."
        : answers.lodgingBudget === "מעל 350 אירו ללילה"
          ? "בתקציב של מעל 350 אירו ללילה אפשר לתת עדיפות גבוהה למיקום, נוחות, חדר משפחתי מרווח ושירותים נוספים."
          : answers.lodgingBudget === "גמישים לפי המקום"
            ? "אם התקציב גמיש, כדאי להשוות בכל אזור בין המחיר לבין המיקום, החניה, גודל החדר והשירותים שמקבלים בפועל."
            : "אם תקציב הלינה עדיין לא הוחלט, כדאי לקבוע טווח מחיר ללילה לפני שמתחילים להזמין מקומות לינה.";
          const roomSetupItineraryNote =
  answers.roomSetup === "חדר אחד עם מיטה זוגית ומיטה נפרדת לנערה"
    ? "מומלץ לוודא שבכל מקום לינה החדר כולל מיטה זוגית ומיטה נפרדת אמיתית ונוחה לנערה, ולא רק מיטה מתקפלת קטנה."
    : answers.roomSetup === "חדר משפחתי לשלושה"
      ? "מומלץ לבחור חדר משפחתי שמיועד בפועל לשלושה אורחים, עם מספיק מקום למזוודות ואחסון."
      : answers.roomSetup === "שני חדרים נפרדים"
        ? "אם בוחרים שני חדרים נפרדים, כדאי לבקש מראש חדרים סמוכים או מחוברים ולוודא שהסידור מתאים למשפחה."
        : answers.roomSetup === "דירה עם חדר שינה וספה נפתחת"
          ? "בדירה עם חדר שינה וספה נפתחת, כדאי לבדוק שהספה מתאימה לשינה נוחה לנערה בת 13 ושיש מספיק מרחב ופרטיות."
          : answers.roomSetup === "גמישים לפי המקום"
            ? "אם אתם גמישים בסידור החדר, כדאי להשוות בכל מקום בין סוג המיטה הנוספת, גודל החדר, הפרטיות והמחיר."
            : "אם סידור החדר עדיין לא הוחלט, כדאי להגדיר מראש מה נחשב סידור שינה נוח לשלושת בני המשפחה.";
            const lodgingPrioritiesItineraryNote = (() => {
  const priorities = answers.lodgingPriorities || [];
  const parts: string[] = [];

  if (priorities.includes("חניה נוחה")) {
    parts.push("לוודא שבמקום הלינה יש חניה נוחה וברורה, במיוחד בימים שבהם משתמשים ברכב");
  }

  if (priorities.includes("ארוחת בוקר")) {
    parts.push("להעדיף מקום שבו ארוחת הבוקר כלולה או זמינה בנוחות");
  }

  if (priorities.includes("חדר משפחתי")) {
    parts.push("לוודא שהחדר מתאים בנוחות לשני הורים ולנערה בת 13");
  }

  if (priorities.includes("מטבחון")) {
    parts.push("להעדיף מקום עם מטבחון כדי לאפשר גמישות בארוחות ובנשנושים");
  }

  if (priorities.includes("מעלית")) {
    parts.push("לבדוק מראש שיש מעלית, במיוחד במבנים היסטוריים");
  }

  if (priorities.includes("קרבה למרכז ולמסעדות")) {
    parts.push("להעדיף מיקום שמאפשר להגיע ברגל למרכז, למסעדות ולבתי קפה");
  }

  return parts.length > 0
    ? parts.join(". ") + "."
    : "כדאי לבחור את מקום הלינה לפי הדברים שהכי חשובים לנוחות המשפחה.";
})();
          return (
    
   
   <main dir="rtl" className="min-h-screen bg-slate-950 px-6 py-10 text-white">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex flex-wrap gap-4">
          <Link href="/" className="text-sm text-amber-300 hover:text-amber-200">
            חזרה לדף הבית
          </Link>
<Link
  href="/weather"
  className="text-sm text-amber-300 hover:text-amber-200"
>
  מזג אוויר
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
            Tuscany Autumn Family Planner
          </p>

          <h1 className="mt-4 text-4xl font-bold">
          זהו מסלול ראשוני לדוגמה למשפחה עם שני הורים ונערה בת 13. הוא מתאים בעיקר לטיול של 8–10 ימים. בטיול קצר יותר צריך לבחור רק חלק מהאזורים ולא לנסות להספיק הכול. המסלול אינו מחליף בדיקה אמיתית של תאריכים, זמני נסיעה, חניה, מזג אוויר, מחירים ושעות פתיחה, אבל הוא נותן מבנה הגיוני להמשך התכנון.
          </h1>

                  </section>

 <section className="mt-8 rounded-3xl border border-white/10 bg-slate-900/80 p-6">
  <h2 className="text-2xl font-bold">
    התשובות שעליהן המסלול מבוסס
  </h2>

  <div className="mt-6 rounded-2xl border border-amber-300/30 bg-amber-300/10 p-5">
    <h3 className="font-bold text-amber-200">
      המלצת תחבורה
    </h3>

    <p className="mt-2 leading-7 text-slate-200">
      {transportationNote}
    </p>
  </div>

  <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-5">
    <h3 className="font-bold">
      השפעת התחבורה על המסלול
    </h3>

    <p className="mt-2 leading-7 text-slate-300">
      {transportationPlan}
    </p>
  </div>
  <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-5">
  <h3 className="font-bold text-amber-200">
    התאמת בסיסי הלינה למסלול
  </h3>

  <p className="mt-2 leading-7 text-slate-300">
    {baseAreaItineraryNote}
  </p>
</div>
<div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-5">
  <h3 className="font-bold text-amber-200">
    התאמת תקציב הלינה למסלול
  </h3>

  <p className="mt-2 leading-7 text-slate-300">
    {lodgingBudgetItineraryNote}
  </p>
</div>

<div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-5">
  <h3 className="font-bold text-amber-200">
    התאמת סידור החדר והמיטות למסלול
  </h3>

  <p className="mt-2 leading-7 text-slate-300">
    {roomSetupItineraryNote}
  </p>
</div>
<div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-5">
  <h3 className="font-bold text-amber-200">
    מה חשוב לבדוק במקום הלינה במסלול
  </h3>

  <p className="mt-2 leading-7 text-slate-300">
    {lodgingPrioritiesItineraryNote}
  </p>
</div>
  
<div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-5">
  <h3 className="font-bold text-amber-200">
    התאמת הנופים למסלול
  </h3>

  <p className="mt-2 leading-7 text-slate-300">
    {scenicInterestNote}
  </p>
</div>
<div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-5">
  <h3 className="font-bold text-amber-200">
    סוג היום הנופי המועדף
  </h3>

  <p className="mt-2 leading-7 text-slate-300">
    {scenicOptionNote}
  </p>
</div>
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

    <AnswerCard
      label="אופן ההתניידות"
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

    <AnswerCard
      label="אזור לינה מועדף"
      value={answers.baseArea}
    />
<AnswerCard
  label="סוג מקום הלינה"
  value={answers.lodgingType}
/>
<AnswerCard
  label="תקציב לינה ללילה"
  value={answers.lodgingBudget}
/>
<AnswerCard
  label="סידור חדר ומיטות"
  value={answers.roomSetup}
/>
<AnswerCard
  label="מה חשוב במקום הלינה"
  value={
    answers.lodgingPriorities && answers.lodgingPriorities.length > 0
      ? answers.lodgingPriorities.join(", ")
      : "עדיין לא נבחר"
  }
/>
    <AnswerCard
      label="מה חשוב לנערה בת 13"
      value={teenText}
    />
  </div>

  
</section>
        <section className="mt-10">
          <h2 className="text-3xl font-bold">מסלול מוצע לפי ימים</h2>

          <div className="mt-5 space-y-5">
     {visibleItinerary.map((item, index) => (
  <div
    key={item.day}
    className="rounded-3xl border border-white/10 bg-white/5 p-6"
  >
    <p className="text-sm font-semibold text-amber-300">
      {item.day}
    </p>

    <h3 className="mt-2 text-2xl font-bold">
      {item.title}
    </h3>

    <p className="mt-3 leading-7 text-slate-300">
  {item.text}

  {item.day === "יום 2" && teenDayTwoNote && (
    <span className="mt-2 block text-amber-100">
      {teenDayTwoNote}
    </span>
  )}

  {(item.day === "יום 6" || item.day === "יום 7") &&
    teenVillageDayNote && (
      <span className="mt-2 block text-amber-100">
        {teenVillageDayNote}
      </span>
    )}
    {item.day === "יום 7" && teenFoodDayNote && (
  <span className="mt-2 block text-amber-100">
    {teenFoodDayNote}
  </span>
)}

{item.day === "יום 1" && teenComfortNote && (
  <span className="mt-2 block text-emerald-100">
    {teenComfortNote}
  </span>
)}
{index === visibleItinerary.length - 1 && paceDayNote && (
  <span className="mt-2 block text-sky-100">
    {paceDayNote}
  </span>
)}
</p>
  </div>
))}
          </div>
        </section>

        <section className="mt-10 rounded-3xl border border-white/10 bg-slate-900/80 p-6">
          <h2 className="text-3xl font-bold">בדיקות חובה לפני הזמנה</h2>

          <div className="mt-5 space-y-3">
            {selectedChecks.map((check) => (
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