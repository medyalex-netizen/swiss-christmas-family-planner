"use client";

import { useEffect, useState } from "react";

type AppLanguage = "he" | "en" | "ro";

type SearchAnswers = {
  destination: string;
  tripLength: string;
  travelers: string;
};

type FilterAnswers = {
  walkingDistance: string;
  accommodationPreference?: string;
  accommodationSearchSource?: string;
  hotelLevel: string;
  hotelArea: string;
  foodStyle: string;
  guidedTours: string;
  freeWalkingTourSource?: string;
  mapPreference: string;
};

type DayPlan = {
  title: Record<AppLanguage, string>;
  area: string;
  walking: string;
  transport: Record<AppLanguage, string>;
  plan: Record<AppLanguage, string[]>;
};

const ui = {
  he: {
    appName: "מתכנן טיולים לגיל השלישי",
    title: "שלב 4 מתוך 4: מסלול הטיול",
    back: "חזרה לתוצאות",
    badge: "מסלול מותאם לגיל השלישי",
    tripTitle: "טיול רגוע של אוכל ותרבות ב-",
    noticeRome: "זהו מסלול Rome עם מקומות ידועים, זמני מנוחה והליכה ריאלית לגיל השלישי.",
    noticeBrasov: "זהו מסלול Brasov עם מקומות ידועים, זמני מנוחה, תמיכה במוניות, והימנעות מעליות קשות.",
    noticeGeneric: "זהו מסלול כללי ליעד שבחרת. אין עדיין פרופיל עיר מפורט ליעד הזה.",
    destination: "יעד",
    tripLength: "משך הטיול",
    travelers: "מטיילים",
    walking: "הליכה",
    accommodation: "לינה",
    hotelSource: "מקור חיפוש לינה",
    food: "אוכל",
    tours: "סיורים",
    maps: "מפות",
    tourOption: "העדפת סיורים",
    yourChoice: "הבחירה שלך",
    verifyTour: "לפני סגירה צריך לוודא זמן, נקודת מפגש, משך, קושי מסלול, ואפשרות לעזוב מוקדם אם מתעייפים.",
    dailyPlan: "תוכנית יומית",
    day: "יום",
    area: "אזור",
    estimatedWalking: "הליכה משוערת",
    transport: "תחבורה",
    seniorPace: "קצב ידידותי לגיל השלישי",
    comfortNotes: "הערות נוחות",
    hotelLevel: "רמת מלון",
    hotelArea: "אזור לינה",
    tourSource: "מקור סיור חינמי",
    taxiAdvice: "מומלץ להשתמש במוניות כאשר יש עייפות, חום, גשם, מדרגות או הליכה ארוכה.",
    mapChecklist: "רשימת מפות לשמירה",
    mapNote: "שמות המקומות נשארים באנגלית או בשם המקורי כדי שיהיה קל למצוא אותם במפות.",
    weather: "בדיקת מזג אוויר אמיתי",
    edit: "עריכת העדפות",
  },
  en: {
    appName: "Senior Trip Planner",
    title: "Step 4 of 4: Itinerary",
    back: "Back to results",
    badge: "Senior-friendly itinerary",
    tripTitle: "Relaxed food and culture trip in ",
    noticeRome: "This is a Rome itinerary with named places, rest time, and realistic senior-friendly walking.",
    noticeBrasov: "This is a Brasov itinerary with named places, rest time, taxi support, and avoidance of difficult climbs.",
    noticeGeneric: "This is a general itinerary for the selected destination. There is no detailed city profile yet.",
    destination: "Destination",
    tripLength: "Trip length",
    travelers: "Travelers",
    walking: "Walking",
    accommodation: "Accommodation",
    hotelSource: "Hotel search source",
    food: "Food",
    tours: "Tours",
    maps: "Maps",
    tourOption: "Guided tour preference",
    yourChoice: "Your choice",
    verifyTour: "Before finalizing, verify time, meeting point, duration, route difficulty, and whether travelers can leave early if tired.",
    dailyPlan: "Daily plan",
    day: "Day",
    area: "Area",
    estimatedWalking: "Estimated walking",
    transport: "Transport",
    seniorPace: "Senior-friendly pace",
    comfortNotes: "Comfort notes",
    hotelLevel: "Hotel level",
    hotelArea: "Hotel area",
    tourSource: "Free walking tour source",
    taxiAdvice: "Use taxis when there is tiredness, heat, rain, stairs, hills, or long walking.",
    mapChecklist: "Map checklist to save",
    mapNote: "Place names stay in English or original spelling so they are easy to find in maps.",
    weather: "Check real weather",
    edit: "Edit preferences",
  },
  ro: {
    appName: "Planificator de calatorii pentru seniori",
    title: "Pasul 4 din 4: Itinerar",
    back: "Inapoi la rezultate",
    badge: "Itinerar prietenos pentru seniori",
    tripTitle: "Calatorie relaxata cu mancare si cultura in ",
    noticeRome: "Acesta este un itinerar pentru Rome cu locuri cunoscute, pauze si mers realist pentru seniori.",
    noticeBrasov: "Acesta este un itinerar pentru Brasov cu locuri cunoscute, pauze, taxiuri si evitarea urcarilor dificile.",
    noticeGeneric: "Acesta este un itinerar general pentru destinatia aleasa. Nu exista inca un profil detaliat al orasului.",
    destination: "Destinatie",
    tripLength: "Durata calatoriei",
    travelers: "Calatori",
    walking: "Mers",
    accommodation: "Cazare",
    hotelSource: "Sursa cautare cazare",
    food: "Mancare",
    tours: "Tururi",
    maps: "Harti",
    tourOption: "Preferinta pentru tururi",
    yourChoice: "Alegerea ta",
    verifyTour: "Inainte de finalizare, verificati ora, punctul de intalnire, durata, dificultatea traseului si daca puteti pleca mai devreme daca obositi.",
    dailyPlan: "Plan zilnic",
    day: "Ziua",
    area: "Zona",
    estimatedWalking: "Mers estimat",
    transport: "Transport",
    seniorPace: "Ritm prietenos pentru seniori",
    comfortNotes: "Note de confort",
    hotelLevel: "Nivel hotel",
    hotelArea: "Zona hotelului",
    tourSource: "Sursa tur gratuit",
    taxiAdvice: "Folositi taxiuri cand exista oboseala, caldura, ploaie, scari, pante sau mers lung.",
    mapChecklist: "Lista pentru harti",
    mapNote: "Numele locurilor raman in engleza sau in forma originala pentru a fi usor de gasit in harti.",
    weather: "Verifica vremea reala",
    edit: "Editeaza preferintele",
  },
};

const defaultSearch: SearchAnswers = {
  destination: "Rome",
  tripLength: "7 days",
  travelers: "Senior couple",
};

const defaultFilters: FilterAnswers = {
  walkingDistance: "2-4 km per day",
  accommodationPreference: "Either hotel or apartment",
  accommodationSearchSource: "Booking.com",
  hotelLevel: "Comfortable 3-star hotel",
  hotelArea: "Quiet central neighborhood",
  foodStyle: "Local cuisine",
  guidedTours: "Free walking tours only",
  freeWalkingTourSource: "GuruWalk Rome",
  mapPreference: "Google Maps day-by-day routes",
};

const valueText: Record<string, Record<AppLanguage, string>> = {
  "Senior couple": { he: "זוג בגיל השלישי", en: "Senior couple", ro: "Cuplu de seniori" },
  "7 days": { he: "7 ימים", en: "7 days", ro: "7 zile" },
  "1-2 km per day": { he: "1-2 ק״מ ביום", en: "1-2 km per day", ro: "1-2 km pe zi" },
  "2-4 km per day": { he: "2-4 ק״מ ביום", en: "2-4 km per day", ro: "2-4 km pe zi" },
  "Hotel": { he: "מלון", en: "Hotel", ro: "Hotel" },
  "Either hotel or apartment": { he: "מלון או דירה", en: "Either hotel or apartment", ro: "Hotel sau apartament" },
  "Comfortable 3-star hotel": { he: "מלון 3 כוכבים נוח", en: "Comfortable 3-star hotel", ro: "Hotel confortabil de 3 stele" },
  "4-star hotel": { he: "מלון 4 כוכבים", en: "4-star hotel", ro: "Hotel de 4 stele" },
  "Quiet central neighborhood": { he: "שכונה מרכזית ושקטה", en: "Quiet central neighborhood", ro: "Cartier central si linistit" },
  "Local cuisine": { he: "אוכל מקומי", en: "Local cuisine", ro: "Bucatarie locala" },
  "Free walking tours only": { he: "רק סיורי הליכה חינמיים", en: "Free walking tours only", ro: "Doar tururi gratuite pe jos" },
  "Only if short and easy": { he: "רק אם קצר וקל", en: "Only if short and easy", ro: "Doar daca este scurt si usor" },
  "Google Maps day-by-day routes": { he: "Google Maps - מסלולים לפי יום", en: "Google Maps day-by-day routes", ro: "Google Maps - rute pe zile" },
  "Google Maps offline area": { he: "Google Maps - אזור להורדה אופליין", en: "Google Maps offline area", ro: "Google Maps - zona offline" },
};

function v(value: string | undefined, lang: AppLanguage) {
  return valueText[value || ""]?.[lang] || value || "";
}

const romeDays: DayPlan[] = [
  {
    title: { he: "הגעה והתמצאות רגועה במרכז ההיסטורי", en: "Arrival and relaxed historic center orientation", ro: "Sosire si orientare relaxata in centrul istoric" },
    area: "Piazza Navona + Pantheon",
    walking: "1-2 km",
    transport: { he: "מונית משדה התעופה או מתחנת הרכבת מומלצת", en: "Taxi from airport or train station is recommended", ro: "Taxiul de la aeroport sau gara este recomandat" },
    plan: {
      he: [
        "10:00 - הגעה, צ'ק-אין והתארגנות במלון",
        "12:30 - ארוחת צהריים קלה ליד המלון",
        "15:00 - הליכה רגועה באזור Piazza Navona",
        "16:00 - ביקור קצר באזור Pantheon אם אין תור ארוך",
        "17:00 - מנוחת קפה",
        "19:00 - ארוחת ערב נוחה ליד המלון"
      ],
      en: [
        "10:00 - Arrival, check-in, and settle into the hotel",
        "12:30 - Light lunch near the hotel",
        "15:00 - Easy walk around Piazza Navona",
        "16:00 - Short Pantheon area visit if lines are not long",
        "17:00 - Coffee rest",
        "19:00 - Comfortable dinner near the hotel"
      ],
      ro: [
        "10:00 - Sosire, check-in si instalare la hotel",
        "12:30 - Pranz usor langa hotel",
        "15:00 - Plimbare usoara in zona Piazza Navona",
        "16:00 - Vizita scurta in zona Pantheon daca nu sunt cozi mari",
        "17:00 - Pauza de cafea",
        "19:00 - Cina confortabila langa hotel"
      ],
    },
  },
  {
    title: { he: "Trevi Fountain ו-Spanish Steps בקצב רגוע", en: "Trevi Fountain and Spanish Steps at an easy pace", ro: "Trevi Fountain si Spanish Steps intr-un ritm usor" },
    area: "Trevi Fountain + Spanish Steps + Piazza di Spagna",
    walking: "2-3 km",
    transport: { he: "מונית חזרה למלון אם עייפים", en: "Taxi back to hotel if tired", ro: "Taxi inapoi la hotel daca obositi" },
    plan: {
      he: [
        "10:00 - התחלה מוקדמת ב-Trevi Fountain לפני העומס",
        "11:00 - הפסקת קפה",
        "12:00 - הליכה איטית לכיוון Spanish Steps בלי חובה לעלות במדרגות",
        "13:00 - ארוחת צהריים ליד Piazza di Spagna",
        "15:00 - מנוחה במלון",
        "17:30 - סיבוב קצר באזור נוח בלבד",
        "19:00 - ארוחת ערב קרובה למלון"
      ],
      en: [
        "10:00 - Start early at Trevi Fountain before crowds",
        "11:00 - Coffee break",
        "12:00 - Slow walk toward Spanish Steps without needing to climb",
        "13:00 - Lunch near Piazza di Spagna",
        "15:00 - Rest at hotel",
        "17:30 - Short easy stroll only if comfortable",
        "19:00 - Dinner close to the hotel"
      ],
      ro: [
        "10:00 - Incepeti devreme la Trevi Fountain inainte de aglomeratie",
        "11:00 - Pauza de cafea",
        "12:00 - Mers lent spre Spanish Steps fara obligatia de a urca",
        "13:00 - Pranz langa Piazza di Spagna",
        "15:00 - Odihna la hotel",
        "17:30 - Plimbare scurta doar daca este confortabil",
        "19:00 - Cina aproape de hotel"
      ],
    },
  },
  {
    title: { he: "כנסיות ומרכז היסטורי בלי סיור מודרך", en: "Churches and historic center without a guided tour", ro: "Biserici si centru istoric fara tur ghidat" },
    area: "Pantheon + Sant'Ignazio + Santa Maria sopra Minerva",
    walking: "2-3 km",
    transport: { he: "מונית לפי הצורך, במיוחד בחום או עייפות", en: "Taxi as needed, especially in heat or tiredness", ro: "Taxi la nevoie, mai ales pe caldura sau oboseala" },
    plan: {
      he: [
        "10:00 - ביקור רגוע ב-Pantheon אם התור סביר",
        "11:00 - הליכה קצרה ל-Sant'Ignazio Church",
        "12:00 - מנוחת קפה",
        "13:00 - ארוחת צהריים באזור המרכז ההיסטורי",
        "15:00 - מנוחה במלון",
        "17:00 - עצירה קצרה ליד Santa Maria sopra Minerva אם מתאים",
        "19:00 - ארוחת ערב נוחה"
      ],
      en: [
        "10:00 - Calm visit to Pantheon if the line is reasonable",
        "11:00 - Short walk to Sant'Ignazio Church",
        "12:00 - Coffee rest",
        "13:00 - Lunch in the historic center",
        "15:00 - Rest at hotel",
        "17:00 - Short stop near Santa Maria sopra Minerva if comfortable",
        "19:00 - Comfortable dinner"
      ],
      ro: [
        "10:00 - Vizita calma la Pantheon daca randul este rezonabil",
        "11:00 - Plimbare scurta la Sant'Ignazio Church",
        "12:00 - Pauza de cafea",
        "13:00 - Pranz in centrul istoric",
        "15:00 - Odihna la hotel",
        "17:00 - Oprire scurta langa Santa Maria sopra Minerva daca este confortabil",
        "19:00 - Cina confortabila"
      ],
    },
  },
  {
    title: { he: "Vatican ו-St Peter's בקצב רגוע", en: "Vatican and St Peter's at a relaxed pace", ro: "Vatican si St Peter's intr-un ritm relaxat" },
    area: "St Peter's Square + St Peter's Basilica + Prati",
    walking: "2-3 km",
    transport: { he: "מונית ל-St Peter's Square מומלצת מאוד", en: "Taxi to St Peter's Square is strongly recommended", ro: "Taxiul pana la St Peter's Square este foarte recomandat" },
    plan: {
      he: [
        "10:00 - מונית ל-St Peter's Square",
        "10:30 - ביקור ב-St Peter's Square",
        "11:30 - אפשרות ל-St Peter's Basilica רק אם התור סביר",
        "12:30 - הפסקת קפה",
        "13:30 - ארוחת צהריים באזור Prati",
        "15:00 - מנוחה במלון",
        "19:00 - ארוחת ערב שקטה"
      ],
      en: [
        "10:00 - Taxi to St Peter's Square",
        "10:30 - Visit St Peter's Square",
        "11:30 - Optional St Peter's Basilica only if the line is reasonable",
        "12:30 - Coffee break",
        "13:30 - Lunch in Prati",
        "15:00 - Rest at hotel",
        "19:00 - Quiet dinner"
      ],
      ro: [
        "10:00 - Taxi pana la St Peter's Square",
        "10:30 - Vizita la St Peter's Square",
        "11:30 - Optional St Peter's Basilica doar daca randul este rezonabil",
        "12:30 - Pauza de cafea",
        "13:30 - Pranz in Prati",
        "15:00 - Odihna la hotel",
        "19:00 - Cina linistita"
      ],
    },
  },
  {
    title: { he: "Colosseum מבחוץ ו-Monti", en: "Colosseum from outside and Monti", ro: "Colosseum din exterior si Monti" },
    area: "Colosseum + Roman Forum area + Monti",
    walking: "2-4 km",
    transport: { he: "מונית לאזור Colosseum מומלצת", en: "Taxi to Colosseum area is recommended", ro: "Taxiul spre zona Colosseum este recomandat" },
    plan: {
      he: [
        "10:00 - מונית לאזור Colosseum",
        "10:30 - צפייה ב-Colosseum מבחוץ או ביקור קצר אם מתאים",
        "11:30 - תצפית על Roman Forum area בלי לנסות לכסות הכל",
        "12:30 - הפסקת קפה",
        "13:30 - ארוחת צהריים באזור Monti",
        "15:00 - מנוחה במלון",
        "19:00 - ארוחת ערב נוחה"
      ],
      en: [
        "10:00 - Taxi to Colosseum area",
        "10:30 - See Colosseum from outside or short visit if comfortable",
        "11:30 - View Roman Forum area without trying to cover everything",
        "12:30 - Coffee break",
        "13:30 - Lunch in Monti",
        "15:00 - Rest at hotel",
        "19:00 - Comfortable dinner"
      ],
      ro: [
        "10:00 - Taxi spre zona Colosseum",
        "10:30 - Vedeti Colosseum din exterior sau vizita scurta daca este confortabil",
        "11:30 - Privire spre zona Roman Forum fara sa incercati sa acoperiti tot",
        "12:30 - Pauza de cafea",
        "13:30 - Pranz in Monti",
        "15:00 - Odihna la hotel",
        "19:00 - Cina confortabila"
      ],
    },
  },
  {
    title: { he: "Jewish Ghetto, Campo de' Fiori ו-Trastevere קל", en: "Jewish Ghetto, Campo de' Fiori, and easy Trastevere", ro: "Jewish Ghetto, Campo de' Fiori si Trastevere usor" },
    area: "Campo de' Fiori + Jewish Ghetto + optional Trastevere",
    walking: "2-3 km",
    transport: { he: "מונית חזרה למלון אם עייפים", en: "Taxi back to hotel if tired", ro: "Taxi inapoi la hotel daca obositi" },
    plan: {
      he: [
        "10:00 - ביקור רגוע באזור Campo de' Fiori",
        "11:30 - הפסקת קפה",
        "12:30 - הליכה קצרה ל-Jewish Ghetto",
        "13:00 - ארוחת צהריים באזור Jewish Ghetto",
        "15:00 - מנוחה במלון",
        "17:30 - Trastevere רק אם יש כוח, אחרת קפה ליד המלון",
        "19:00 - ארוחת ערב קרובה ונוחה"
      ],
      en: [
        "10:00 - Easy visit around Campo de' Fiori",
        "11:30 - Coffee break",
        "12:30 - Short walk to Jewish Ghetto",
        "13:00 - Lunch in Jewish Ghetto area",
        "15:00 - Rest at hotel",
        "17:30 - Trastevere only if there is energy, otherwise coffee near hotel",
        "19:00 - Close and comfortable dinner"
      ],
      ro: [
        "10:00 - Vizita usoara in zona Campo de' Fiori",
        "11:30 - Pauza de cafea",
        "12:30 - Plimbare scurta spre Jewish Ghetto",
        "13:00 - Pranz in zona Jewish Ghetto",
        "15:00 - Odihna la hotel",
        "17:30 - Trastevere doar daca exista energie, altfel cafea langa hotel",
        "19:00 - Cina apropiata si confortabila"
      ],
    },
  },
  {
    title: { he: "Villa Borghese ויום סיום רגוע", en: "Villa Borghese and relaxed final day", ro: "Villa Borghese si zi finala relaxata" },
    area: "Villa Borghese + Piazza del Popolo",
    walking: "1-3 km",
    transport: { he: "מונית ל-Villa Borghese מומלצת", en: "Taxi to Villa Borghese is recommended", ro: "Taxiul pana la Villa Borghese este recomandat" },
    plan: {
      he: [
        "10:00 - מונית ל-Villa Borghese",
        "10:30 - הליכה רגועה בפארק עם ספסלים וצל",
        "12:00 - קפה או ארוחת צהריים קלה",
        "14:00 - מנוחה במלון",
        "16:30 - אפשרות קצרה ל-Piazza del Popolo",
        "19:00 - ארוחת פרידה"
      ],
      en: [
        "10:00 - Taxi to Villa Borghese",
        "10:30 - Easy park walk with benches and shade",
        "12:00 - Coffee or light lunch",
        "14:00 - Rest at hotel",
        "16:30 - Short optional stop at Piazza del Popolo",
        "19:00 - Farewell dinner"
      ],
      ro: [
        "10:00 - Taxi pana la Villa Borghese",
        "10:30 - Plimbare usoara in parc cu banci si umbra",
        "12:00 - Cafea sau pranz usor",
        "14:00 - Odihna la hotel",
        "16:30 - Oprire scurta optionala la Piazza del Popolo",
        "19:00 - Cina de ramas bun"
      ],
    },
  },
];

const brasovDays: DayPlan[] = [
  {
    title: { he: "הגעה והתמצאות רגועה ב-Old Town", en: "Arrival and relaxed Old Town orientation", ro: "Sosire si orientare relaxata in Old Town" },
    area: "Council Square / Piața Sfatului",
    walking: "1-2 km",
    transport: { he: "מונית מנקודת ההגעה למלון מומלצת", en: "Taxi from arrival point to hotel is recommended", ro: "Taxiul de la punctul de sosire la hotel este recomandat" },
    plan: {
      he: ["10:00 - הגעה, צ'ק-אין והתארגנות במלון", "12:30 - ארוחת צהריים קלה ליד המלון", "15:00 - הליכה רגועה ל-Council Square / Piața Sfatului", "16:00 - מנוחת קפה באזור הכיכר", "19:00 - ארוחת ערב קרובה למלון"],
      en: ["10:00 - Arrival, check-in, and settle into the hotel", "12:30 - Light lunch near the hotel", "15:00 - Easy walk to Council Square / Piața Sfatului", "16:00 - Coffee rest around the square", "19:00 - Dinner close to the hotel"],
      ro: ["10:00 - Sosire, check-in si instalare la hotel", "12:30 - Pranz usor langa hotel", "15:00 - Plimbare usoara spre Council Square / Piața Sfatului", "16:00 - Pauza de cafea in zona pietei", "19:00 - Cina aproape de hotel"],
    },
  },
  {
    title: { he: "Black Church ו-Rope Street בקצב קל", en: "Black Church and Rope Street at an easy pace", ro: "Black Church si Rope Street intr-un ritm usor" },
    area: "Council Square + Black Church + Rope Street",
    walking: "2-3 km",
    transport: { he: "מונית חזרה למלון אם עייפים", en: "Taxi back to hotel if tired", ro: "Taxi inapoi la hotel daca obositi" },
    plan: {
      he: ["10:00 - התחלה רגועה ב-Council Square / Piața Sfatului", "10:45 - ביקור קצר ב-Black Church / Biserica Neagră אם פתוח", "12:00 - הפסקת קפה", "13:00 - ארוחת צהריים בעיר העתיקה", "15:00 - מנוחה במלון", "17:00 - עצירה קצרה ב-Rope Street / Strada Sforii אם לא צפוף"],
      en: ["10:00 - Easy start at Council Square / Piața Sfatului", "10:45 - Short visit to Black Church / Biserica Neagră if open", "12:00 - Coffee break", "13:00 - Lunch in Old Town", "15:00 - Rest at hotel", "17:00 - Short stop at Rope Street / Strada Sforii if not crowded"],
      ro: ["10:00 - Inceput relaxat la Council Square / Piața Sfatului", "10:45 - Vizita scurta la Black Church / Biserica Neagră daca este deschisa", "12:00 - Pauza de cafea", "13:00 - Pranz in Old Town", "15:00 - Odihna la hotel", "17:00 - Oprire scurta la Rope Street / Strada Sforii daca nu este aglomerat"],
    },
  },
];

const parisDays: DayPlan[] = [
  {
    title: { he: "הגעה והתמצאות רגועה ליד ה-Seine", en: "Arrival and relaxed Seine orientation", ro: "Sosire si orientare relaxata langa Seine" },
    area: "Hotel area + Seine",
    walking: "1-2 km",
    transport: { he: "מונית משדה התעופה או מתחנת הרכבת מומלצת", en: "Taxi from airport or train station is recommended", ro: "Taxiul de la aeroport sau gara este recomandat" },
    plan: {
      he: ["10:00 - הגעה, צ'ק-אין והתארגנות במלון", "12:30 - ארוחת צהריים קלה ליד המלון", "15:00 - הליכה קצרה ליד ה-Seine או באזור המלון", "16:00 - מנוחת קפה", "19:00 - ארוחת ערב קרובה למלון"],
      en: ["10:00 - Arrival, check-in, and settle into the hotel", "12:30 - Light lunch near the hotel", "15:00 - Short Seine or hotel-area orientation walk", "16:00 - Coffee rest", "19:00 - Dinner close to the hotel"],
      ro: ["10:00 - Sosire, check-in si instalare la hotel", "12:30 - Pranz usor langa hotel", "15:00 - Plimbare scurta langa Seine sau in zona hotelului", "16:00 - Pauza de cafea", "19:00 - Cina aproape de hotel"]
    }
  },
  {
    title: { he: "Eiffel Tower ו-Trocadéro בקצב רגוע", en: "Eiffel Tower and Trocadéro at an easy pace", ro: "Eiffel Tower si Trocadéro intr-un ritm usor" },
    area: "Trocadéro + Eiffel Tower + Champ de Mars",
    walking: "2-3 km",
    transport: { he: "מונית ל-Trocadéro מומלצת", en: "Taxi to Trocadéro is recommended", ro: "Taxiul pana la Trocadéro este recomandat" },
    plan: {
      he: ["10:00 - מונית ל-Trocadéro לתצפית על Eiffel Tower", "11:00 - קפה או מנוחה קצרה", "12:00 - אפשרות לביקור ב-Eiffel Tower רק אם יש כרטיסים ותורים סבירים", "13:30 - ארוחת צהריים באזור", "15:00 - מנוחה במלון", "19:00 - ארוחת ערב קרובה למלון"],
      en: ["10:00 - Taxi to Trocadéro for Eiffel Tower views", "11:00 - Coffee or short rest", "12:00 - Optional Eiffel Tower visit only if tickets and lines are manageable", "13:30 - Lunch in the area", "15:00 - Rest at hotel", "19:00 - Dinner close to the hotel"],
      ro: ["10:00 - Taxi la Trocadéro pentru vedere spre Eiffel Tower", "11:00 - Cafea sau pauza scurta", "12:00 - Vizita optionala la Eiffel Tower doar daca biletele si cozile sunt acceptabile", "13:30 - Pranz in zona", "15:00 - Odihna la hotel", "19:00 - Cina aproape de hotel"]
    }
  },
  {
    title: { he: "Louvre ו-Tuileries בלי עומס", en: "Louvre and Tuileries without overload", ro: "Louvre si Tuileries fara supraincarcare" },
    area: "Louvre + Tuileries Garden",
    walking: "2-4 km",
    transport: { he: "מונית ל-Louvre מומלצת אם ההגעה במטרו קשה", en: "Taxi to Louvre is recommended if metro access is difficult", ro: "Taxiul la Louvre este recomandat daca metroul este dificil" },
    plan: {
      he: ["10:00 - ביקור ממוקד ב-Louvre עם מסלול קצר בלבד", "12:00 - הפסקת קפה או מנוחה", "13:00 - ארוחת צהריים באזור", "14:30 - מנוחה ב-Tuileries Garden", "15:30 - חזרה למלון למנוחה", "19:00 - ארוחת ערב נוחה"],
      en: ["10:00 - Focused Louvre visit with one short route only", "12:00 - Coffee or rest break", "13:00 - Lunch in the area", "14:30 - Rest in Tuileries Garden", "15:30 - Return to hotel for rest", "19:00 - Comfortable dinner"],
      ro: ["10:00 - Vizita concentrata la Louvre cu un traseu scurt", "12:00 - Pauza de cafea sau odihna", "13:00 - Pranz in zona", "14:30 - Odihna in Tuileries Garden", "15:30 - Intoarcere la hotel pentru odihna", "19:00 - Cina confortabila"]
    }
  },
  {
    title: { he: "Notre-Dame, Île de la Cité ו-Luxembourg Gardens", en: "Notre-Dame, Île de la Cité, and Luxembourg Gardens", ro: "Notre-Dame, Île de la Cité si Luxembourg Gardens" },
    area: "Notre-Dame + Latin Quarter + Luxembourg Gardens",
    walking: "2-3 km",
    transport: { he: "מונית ל-Notre-Dame area מומלצת", en: "Taxi to Notre-Dame area is recommended", ro: "Taxiul pana la zona Notre-Dame este recomandat" },
    plan: {
      he: ["10:00 - מונית לאזור Notre-Dame", "10:30 - ביקור ב-Notre-Dame אם הכניסה והתור מתאימים", "11:30 - Sainte-Chapelle אופציונלי רק אם יש כוח", "13:00 - ארוחת צהריים ב-Latin Quarter", "15:00 - מנוחה ב-Luxembourg Gardens", "16:00 - חזרה למלון"],
      en: ["10:00 - Taxi to Notre-Dame area", "10:30 - Visit Notre-Dame if entry and lines are manageable", "11:30 - Sainte-Chapelle optional only if energy is good", "13:00 - Lunch in Latin Quarter", "15:00 - Rest in Luxembourg Gardens", "16:00 - Return to hotel"],
      ro: ["10:00 - Taxi spre zona Notre-Dame", "10:30 - Vizita la Notre-Dame daca intrarea si cozile sunt acceptabile", "11:30 - Sainte-Chapelle optional doar daca exista energie", "13:00 - Pranz in Latin Quarter", "15:00 - Odihna in Luxembourg Gardens", "16:00 - Intoarcere la hotel"]
    }
  },
  {
    title: { he: "Musée d'Orsay ו-Saint-Germain", en: "Musée d'Orsay and Saint-Germain", ro: "Musée d'Orsay si Saint-Germain" },
    area: "Musée d'Orsay + Saint-Germain",
    walking: "2-3 km",
    transport: { he: "מונית לפי הצורך", en: "Taxi as needed", ro: "Taxi la nevoie" },
    plan: {
      he: ["10:00 - ביקור ממוקד ב-Musée d'Orsay", "12:00 - הפסקת קפה", "13:00 - ארוחת צהריים ב-Saint-Germain", "15:00 - מנוחה במלון", "17:30 - הליכה קצרה ליד המלון אם יש כוח", "19:00 - ארוחת ערב"],
      en: ["10:00 - Focused Musée d'Orsay visit", "12:00 - Coffee break", "13:00 - Lunch in Saint-Germain", "15:00 - Rest at hotel", "17:30 - Short walk near hotel if comfortable", "19:00 - Dinner"],
      ro: ["10:00 - Vizita concentrata la Musée d'Orsay", "12:00 - Pauza de cafea", "13:00 - Pranz in Saint-Germain", "15:00 - Odihna la hotel", "17:30 - Plimbare scurta langa hotel daca este confortabil", "19:00 - Cina"]
    }
  },
  {
    title: { he: "Le Marais ו-Place des Vosges", en: "Le Marais and Place des Vosges", ro: "Le Marais si Place des Vosges" },
    area: "Le Marais + Place des Vosges",
    walking: "2-3 km",
    transport: { he: "מונית ל-Le Marais מומלצת", en: "Taxi to Le Marais is recommended", ro: "Taxiul pana la Le Marais este recomandat" },
    plan: {
      he: ["10:00 - מונית ל-Le Marais", "10:30 - הליכה קצרה ברחובות ההיסטוריים", "11:30 - מנוחה ב-Place des Vosges", "13:00 - ארוחת צהריים באזור", "15:00 - מנוחה במלון", "19:00 - ארוחת ערב קרובה למלון"],
      en: ["10:00 - Taxi to Le Marais", "10:30 - Short walk through historic streets", "11:30 - Rest at Place des Vosges", "13:00 - Lunch in the area", "15:00 - Rest at hotel", "19:00 - Dinner close to hotel"],
      ro: ["10:00 - Taxi spre Le Marais", "10:30 - Plimbare scurta pe strazi istorice", "11:30 - Odihna la Place des Vosges", "13:00 - Pranz in zona", "15:00 - Odihna la hotel", "19:00 - Cina aproape de hotel"]
    }
  },
  {
    title: { he: "Montmartre קל או יום סיום רגוע", en: "Light Montmartre or relaxed final day", ro: "Montmartre usor sau zi finala relaxata" },
    area: "Montmartre + Sacré-Cœur",
    walking: "1-3 km",
    transport: { he: "מונית ל-Montmartre מומלצת בגלל עליות ומדרגות", en: "Taxi to Montmartre is recommended because of hills and stairs", ro: "Taxiul pana la Montmartre este recomandat din cauza pantelor si scarilor" },
    plan: {
      he: ["10:00 - מונית ל-Montmartre", "10:30 - ביקור קצר באזור Sacré-Cœur בלי עליות ארוכות", "12:00 - קפה או ארוחת צהריים קלה", "14:00 - חזרה למלון למנוחה", "17:00 - קניות קלות או קפה ליד המלון", "19:00 - ארוחת פרידה"],
      en: ["10:00 - Taxi to Montmartre", "10:30 - Short Sacré-Cœur area visit without long climbs", "12:00 - Coffee or light lunch", "14:00 - Return to hotel for rest", "17:00 - Light shopping or coffee near hotel", "19:00 - Farewell dinner"],
      ro: ["10:00 - Taxi pana la Montmartre", "10:30 - Vizita scurta in zona Sacré-Cœur fara urcari lungi", "12:00 - Cafea sau pranz usor", "14:00 - Intoarcere la hotel pentru odihna", "17:00 - Cumparaturi usoare sau cafea langa hotel", "19:00 - Cina de ramas bun"]
    }
  }
];

const parisMapItems = ["Hotel", "Eiffel Tower", "Trocadéro", "Louvre", "Tuileries Garden", "Notre-Dame", "Sainte-Chapelle", "Luxembourg Gardens", "Musée d'Orsay", "Saint-Germain", "Le Marais", "Place des Vosges", "Montmartre", "Sacré-Cœur", "Restaurants", "Cafes", "Pharmacies", "Taxi stands"];

const genericDays: DayPlan[] = [
  {
    title: { he: "הגעה והתמצאות רגועה באזור המלון", en: "Arrival and relaxed hotel-area orientation", ro: "Sosire si orientare relaxata in zona hotelului" },
    area: "Hotel area / city center",
    walking: "1-2 km",
    transport: { he: "מונית מנקודת ההגעה למלון מומלצת", en: "Taxi from arrival point to hotel is recommended", ro: "Taxiul de la punctul de sosire la hotel este recomandat" },
    plan: {
      he: ["10:00 - הגעה וצ'ק-אין", "12:30 - ארוחת צהריים קלה ליד המלון", "15:00 - סיבוב קצר באזור המלון", "17:00 - מנוחת קפה", "19:00 - ארוחת ערב נוחה"],
      en: ["10:00 - Arrival and check-in", "12:30 - Light lunch near hotel", "15:00 - Short orientation walk near hotel", "17:00 - Coffee rest", "19:00 - Comfortable dinner"],
      ro: ["10:00 - Sosire si check-in", "12:30 - Pranz usor langa hotel", "15:00 - Plimbare scurta langa hotel", "17:00 - Pauza de cafea", "19:00 - Cina confortabila"],
    },
  },
];

const romeMapItems = ["Hotel", "Piazza Navona", "Pantheon", "Trevi Fountain", "Spanish Steps", "Colosseum", "Restaurants", "Cafes", "Pharmacies", "Taxi stands"];
const brasovMapItems = ["Hotel", "Council Square / Piața Sfatului", "Black Church / Biserica Neagră", "Rope Street / Strada Sforii", "Catherine's Gate", "Tampa cable car lower station", "Restaurants", "Cafes", "Pharmacies", "Taxi stands"];
const genericMapItems = ["Hotel", "Main square", "Historic center", "Restaurants", "Cafes", "Pharmacies", "Taxi stands"];

export default function ItineraryPage() {
  const [appLanguage, setAppLanguage] = useState<AppLanguage | null>(null);
  const [search, setSearch] = useState<SearchAnswers>(defaultSearch);
  const [filters, setFilters] = useState<FilterAnswers>(defaultFilters);
  const [needsAnswers, setNeedsAnswers] = useState<string[]>([]);

  useEffect(() => {
    function syncFromStorage() {
      const savedLanguage = localStorage.getItem("seniorTripAppLanguage");
      if (savedLanguage === "he" || savedLanguage === "en" || savedLanguage === "ro") {
        setAppLanguage(savedLanguage);
      } else {
        setAppLanguage("he");
      }

      const savedSearch = localStorage.getItem("seniorTripSearch");
      const savedFilters = localStorage.getItem("seniorTripFilters");
      const savedNeeds = localStorage.getItem("seniorTripNeeds");

      if (savedSearch) setSearch(JSON.parse(savedSearch));
      if (savedFilters) setFilters(JSON.parse(savedFilters));

      if (savedNeeds) {
        try {
          const parsedNeeds = JSON.parse(savedNeeds);

          if (Array.isArray(parsedNeeds.answers)) {
            setNeedsAnswers(parsedNeeds.answers);
          }
        } catch {
          setNeedsAnswers([]);
        }
      } else {
        setNeedsAnswers([]);
      }
    }

    syncFromStorage();
    window.addEventListener("pageshow", syncFromStorage);
    window.addEventListener("focus", syncFromStorage);

    return () => {
      window.removeEventListener("pageshow", syncFromStorage);
      window.removeEventListener("focus", syncFromStorage);
    };
  }, []);

  if (appLanguage === null) {
    return (
      <main className="min-h-screen bg-slate-50 px-6 py-10 text-slate-900">
        <div className="mx-auto max-w-6xl rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
          <p className="text-xl font-semibold">Loading...</p>
        </div>
      </main>
    );
  }

  const t = ui[appLanguage];
  const isHebrew = appLanguage === "he";
  const destination = search.destination || "Rome";
  const lowerDestination = destination.toLowerCase();
  const isRome = lowerDestination.includes("rome");
  const isBrasov = lowerDestination.includes("brasov") || lowerDestination.includes("brașov") || lowerDestination.includes("brășov");
  const isParis = lowerDestination.includes("paris");
  const noGuidedTours = filters.guidedTours === "No guided tours";

  const baseDays = isRome ? romeDays : isBrasov ? brasovDays : isParis ? parisDays : genericDays;
  const mapItems = isRome ? romeMapItems : isBrasov ? brasovMapItems : isParis ? parisMapItems : genericMapItems;
  const notice = isRome ? t.noticeRome : isBrasov ? t.noticeBrasov : isParis ? "This is a Paris itinerary with named places, museums, gardens, rest time, and taxi support." : t.noticeGeneric;

  const numberOfDays = Math.min(14, Math.max(3, Number(search.tripLength.match(/\d+/)?.[0] || 7)));

  const days = Array.from({ length: numberOfDays }, (_, index) => ({
    dayNumber: index + 1,
    ...baseDays[index % baseDays.length],
  }));

  const needsText = needsAnswers.join(" ").toLowerCase();

  const personalNotes = [
    needsAnswers.some((answer) => answer.trim().length > 0)
      ? {
          he: "המסלול צריך לשמש כתוכנית גמישה, בהתאם לצרכים והרצונות שהוזנו בתחילת התהליך.",
          en: "Use this itinerary as a flexible plan based on the needs and wishes entered at the beginning.",
          ro: "Folositi acest itinerar ca un plan flexibil, pe baza nevoilor si dorintelor introduse la inceput.",
        }[appLanguage]
      : "",

    /רגוע|נוח|relaxed|comfortable|comod|relaxat|calm/.test(needsText)
      ? {
          he: "מומלץ לשמור על קצב רגוע, לא להעמיס יותר מדי אתרים ביום אחד, ולהשאיר זמן מנוחה.",
          en: "Keep a relaxed pace, avoid too many sights in one day, and leave time for rest.",
          ro: "Pastrati un ritm relaxat, evitati prea multe obiective intr-o zi si lasati timp pentru odihna.",
        }[appLanguage]
      : "",

    /בוקר|morning|dimineata|prima parte/.test(needsText)
      ? {
          he: "כדאי לתכנן את האתרים החשובים לחלק הראשון של היום, כשהאנרגיה בדרך כלל גבוהה יותר.",
          en: "Plan the most important visits in the first part of the day, when energy is usually higher.",
          ro: "Planificati vizitele cele mai importante in prima parte a zilei, cand energia este de obicei mai buna.",
        }[appLanguage]
      : "",

    /תור|תורים|עומס|הרבה אנשים|crowd|crowds|queue|queues|line|lines|aglomeratie|aglomerat|cozi|rand/.test(needsText)
      ? {
          he: "כדאי להימנע מתורים ועומס: להגיע מוקדם, להזמין כרטיסים מראש, או לבחור חלופה רגועה יותר.",
          en: "Avoid crowds and long queues when possible: arrive early, book tickets in advance, or choose a calmer alternative.",
          ro: "Evitati aglomeratia si cozile lungi cand este posibil: veniti devreme, rezervati bilete in avans sau alegeti o alternativa mai linistita.",
        }[appLanguage]
      : "",

    /מדרגות|עליות|ירידות|אבנים|עמידה|stairs|slopes|cobblestones|standing|scari|pante|piatra|picioare/.test(needsText)
      ? {
          he: "יש לשים לב למדרגות, עליות, אבנים לא ישרות ועמידה ממושכת. מומלץ לבחור מסלולים קצרים ונוחים יותר.",
          en: "Pay attention to stairs, slopes, cobblestones, and long standing. Prefer shorter and easier routes.",
          ro: "Atentie la scari, pante, piatra cubica si stat mult in picioare. Alegeti rute mai scurte si mai usoare.",
        }[appLanguage]
      : "",

    /מונית|taxi|taxiuri/.test(needsText)
      ? {
          he: "אם נוחות חשובה, כדאי לשלב מוניות בין אזורים ולא להסתמך רק על הליכה.",
          en: "If comfort is important, use taxis between areas and do not rely only on walking.",
          ro: "Daca confortul este important, folositi taxiuri intre zone si nu va bazati doar pe mers pe jos.",
        }[appLanguage]
      : "",

    /תחבורה ציבורית|public transport|transport public|comun/.test(needsText)
      ? {
          he: "אם משתמשים בתחבורה ציבורית, כדאי לבחור קווים פשוטים וברורים ולהימנע מהחלפות רבות.",
          en: "If using public transport, prefer simple routes and avoid too many transfers.",
          ro: "Daca folositi transport public, alegeti rute simple si evitati prea multe schimbari.",
        }[appLanguage]
      : "",
  ].filter((note) => note.length > 0);

  return (
    <main
      dir={isHebrew ? "rtl" : "ltr"}
      lang={appLanguage}
      className={`min-h-screen bg-slate-50 px-6 py-10 ${isHebrew ? "text-right" : "text-left"} text-slate-900`}
    >
      <div className="mx-auto max-w-6xl">
        <header className={`mb-8 flex flex-col gap-4 sm:items-center sm:justify-between ${isHebrew ? "sm:flex-row-reverse" : "sm:flex-row"}`}>
          <div>
            <p className="text-lg font-bold text-blue-700">{t.appName}</p>
            <h1 className="text-4xl font-bold">{t.title}</h1>
          </div>

          <a href="/results" className="rounded-2xl border border-blue-700 bg-white px-5 py-3 text-center text-lg font-semibold text-blue-700 hover:bg-blue-50">
            {t.back}
          </a>
        </header>

        <section className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
          <p className="mb-4 inline-block rounded-full bg-blue-50 px-4 py-2 text-lg font-semibold text-blue-700">{t.badge}</p>

          <h2 className="text-4xl font-bold">{t.tripTitle}{destination}</h2>

          <p className="mt-4 max-w-3xl text-xl leading-8 text-slate-600">{notice}</p>

          <div className="mt-8 grid gap-5 md:grid-cols-3">
            <div className="rounded-2xl bg-slate-50 p-5 ring-1 ring-slate-200">
              <p className="text-sm font-semibold text-slate-500">{t.destination}</p>
              <p className="mt-2 text-xl font-bold">{destination}</p>
            </div>

            <div className="rounded-2xl bg-slate-50 p-5 ring-1 ring-slate-200">
              <p className="text-sm font-semibold text-slate-500">{t.tripLength}</p>
              <p className="mt-2 text-xl font-bold">{v(search.tripLength, appLanguage)}</p>
            </div>

            <div className="rounded-2xl bg-slate-50 p-5 ring-1 ring-slate-200">
              <p className="text-sm font-semibold text-slate-500">{t.travelers}</p>
              <p className="mt-2 text-xl font-bold">{v(search.travelers, appLanguage)}</p>
            </div>

            <div className="rounded-2xl bg-slate-50 p-5 ring-1 ring-slate-200">
              <p className="text-sm font-semibold text-slate-500">{t.walking}</p>
              <p className="mt-2 text-xl font-bold">{v(filters.walkingDistance, appLanguage)}</p>
            </div>

            <div className="rounded-2xl bg-slate-50 p-5 ring-1 ring-slate-200">
              <p className="text-sm font-semibold text-slate-500">{t.accommodation}</p>
              <p className="mt-2 text-xl font-bold">{v(filters.accommodationPreference, appLanguage)}</p>
            </div>

            <div className="rounded-2xl bg-slate-50 p-5 ring-1 ring-slate-200">
              <p className="text-sm font-semibold text-slate-500">{t.hotelSource}</p>
              <p className="mt-2 text-xl font-bold">{filters.accommodationSearchSource}</p>
            </div>

            <div className="rounded-2xl bg-slate-50 p-5 ring-1 ring-slate-200">
              <p className="text-sm font-semibold text-slate-500">{t.food}</p>
              <p className="mt-2 text-xl font-bold">{v(filters.foodStyle, appLanguage)}</p>
            </div>

            <div className="rounded-2xl bg-slate-50 p-5 ring-1 ring-slate-200">
              <p className="text-sm font-semibold text-slate-500">{t.tours}</p>
              <p className="mt-2 text-xl font-bold">{v(filters.guidedTours, appLanguage)}</p>
            </div>

            <div className="rounded-2xl bg-slate-50 p-5 ring-1 ring-slate-200">
              <p className="text-sm font-semibold text-slate-500">{t.maps}</p>
              <p className="mt-2 text-xl font-bold">{v(filters.mapPreference, appLanguage)}</p>
            </div>
          </div>
        </section>

        {personalNotes.length > 0 && (
          <section className="mt-8 rounded-3xl bg-amber-50 p-6 shadow-sm ring-1 ring-amber-200">
            <h2 className="text-3xl font-bold text-slate-900">
              {isHebrew
                ? "הערות נוחות אישיות"
                : appLanguage === "ro"
                  ? "Note personale de confort"
                  : "Personal comfort notes"}
            </h2>

            <p className="mt-3 text-xl leading-8 text-slate-600">
              {isHebrew
                ? "ההערות האלו מבוססות על התשובות לשאלות הצרכים והרצונות בתחילת התהליך."
                : appLanguage === "ro"
                  ? "Aceste note se bazeaza pe raspunsurile la intrebarile despre nevoi si dorinte de la inceput."
                  : "These notes are based on the needs-and-wishes answers entered at the beginning."}
            </p>

            <div className="mt-5 grid gap-3">
              {personalNotes.map((note) => (
                <div key={note} className="rounded-2xl bg-white px-5 py-4 text-lg leading-7 text-slate-800">
                  {note}
                </div>
              ))}
            </div>

            <a
              href="/needs"
              className="mt-5 inline-block rounded-2xl border border-amber-700 bg-white px-5 py-3 text-lg font-semibold text-amber-800 hover:bg-amber-100"
            >
              {isHebrew ? "עריכת תשובות" : appLanguage === "ro" ? "Editare raspunsuri" : "Edit answers"}
            </a>
          </section>
        )}

        {!noGuidedTours && (
          <section className="mt-8 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
            <h2 className="text-3xl font-bold">{t.tourOption}</h2>
            <p className="mt-4 text-xl leading-8 text-slate-600">
              {t.yourChoice}: {v(filters.guidedTours, appLanguage)}. {!noGuidedTours && <> {t.tourSource}: {filters.freeWalkingTourSource || "Let the app choose"}. {t.verifyTour}</>}
            </p>
          </section>
        )}

        <section className="mt-8">
          <h2 className="text-3xl font-bold">{t.dailyPlan}</h2>

          <div className="mt-6 grid gap-6">
            {days.map((day) => (
              <article key={day.dayNumber} className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
                <div className={`flex flex-col gap-3 sm:items-start sm:justify-between ${isHebrew ? "sm:flex-row-reverse" : "sm:flex-row"}`}>
                  <div>
                    <h3 className="text-2xl font-bold">
                      {t.day} {day.dayNumber} - {day.title[appLanguage]}
                    </h3>
                    <p className="mt-2 text-lg text-slate-600">{t.area}: {day.area}</p>
                    <p className="mt-1 text-lg text-slate-600">{t.estimatedWalking}: {day.walking}</p>
                    <p className="mt-1 text-lg text-slate-600">{t.transport}: {day.transport[appLanguage]}</p>
                  </div>

                  <span className="rounded-full bg-green-50 px-4 py-2 text-lg font-semibold text-green-700">{t.seniorPace}</span>
                </div>

                <div className="mt-5 grid gap-3">
                  {day.plan[appLanguage].map((item) => (
                    <div key={item} className="rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-lg">
                      {item}
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
            <h2 className="text-3xl font-bold">{t.comfortNotes}</h2>
            <ul className="mt-5 space-y-3 text-lg leading-7 text-slate-700">
              <li>{t.hotelLevel}: {v(filters.hotelLevel, appLanguage)}</li>
              <li>{t.hotelArea}: {v(filters.hotelArea, appLanguage)}</li>
              <li>{t.hotelSource}: {filters.accommodationSearchSource}</li>
              {!noGuidedTours && <li>{t.tourSource}: {filters.freeWalkingTourSource}</li>}
              <li>{t.taxiAdvice}</li>
            </ul>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
            <h2 className="text-3xl font-bold">{t.mapChecklist}</h2>
            <p className="mt-3 text-lg text-slate-600">{t.mapNote}</p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {mapItems.map((item) => (
                <div key={item} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-lg">{item}</div>
              ))}
            </div>
          </div>
        </section>

        <div className={`mt-8 flex flex-col gap-4 ${isHebrew ? "sm:flex-row-reverse" : "sm:flex-row"}`}>
          <a href="/weather" className="rounded-2xl bg-blue-700 px-8 py-4 text-center text-xl font-semibold text-white hover:bg-blue-800">{t.weather}</a>
          <a href="/filters" className="rounded-2xl border border-slate-300 bg-white px-8 py-4 text-center text-xl font-semibold text-slate-800 hover:bg-slate-50">{t.edit}</a>
        </div>
      </div>
    </main>
  );
}












