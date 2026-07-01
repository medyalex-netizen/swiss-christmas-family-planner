"use client";

import { useEffect, useState } from "react";

type AppLanguage = "he" | "en" | "ro";

const text = {
  he: {
    appName: "מתכנן טיולים לגיל השלישי",
    title: "שלב 2 מתוך 4: העדפות הטיול",
    backSearch: "חזרה לחיפוש",
    heading: "בחרו את נוחות הטיול",
    description: "בחרו נוחות הליכה, לינה, אוכל, סיורים, מפות ושפת תוצאה.",
    appLanguage: "שפת האפליקציה",
    walkingAbility: "יכולת הליכה",
    walkingDistance: "מרחק הליכה מקסימלי ביום",
    accommodationPreference: "העדפת מלון או דירה",
    accommodationSearchSource: "מקור חיפוש מועדף ללינה",
    hotelLevel: "רמת מלון",
    hotelArea: "אזור לינה מועדף",
    foodStyle: "סגנון אוכל",
    guidedTours: "העדפת סיורים",
    freeWalkingTourSource: "מקור מועדף לסיור הליכה חינמי",
    mapPreference: "אפליקציית מפות מועדפת",
    outputLanguage: "שפת התוצאה",
    continue: "הצג תוצאות טיול מותאמות",
    back: "חזרה",
  },
  en: {
    appName: "Senior Trip Planner",
    title: "Step 2 of 4: Preferences",
    backSearch: "Back to search",
    heading: "Choose your trip comfort",
    description: "Choose walking comfort, accommodation, food, tours, maps, and output language.",
    appLanguage: "App language",
    walkingAbility: "Walking ability",
    walkingDistance: "Maximum walking per day",
    accommodationPreference: "Hotel or apartment preference",
    accommodationSearchSource: "Preferred hotel / Airbnb search source",
    hotelLevel: "Hotel level",
    hotelArea: "Preferred hotel area",
    foodStyle: "Food style",
    guidedTours: "Guided tour preference",
    freeWalkingTourSource: "Preferred free walking tour source",
    mapPreference: "Preferred offline map app",
    outputLanguage: "Output language",
    continue: "See custom trip results",
    back: "Back",
  },
  ro: {
    appName: "Planificator de calatorii pentru seniori",
    title: "Pasul 2 din 4: Preferinte",
    backSearch: "Inapoi la cautare",
    heading: "Alege confortul calatoriei",
    description: "Alege confortul la mers, cazarea, mancarea, tururile, hartile si limba rezultatului.",
    appLanguage: "Limba aplicatiei",
    walkingAbility: "Capacitate de mers",
    walkingDistance: "Mers maxim pe zi",
    accommodationPreference: "Preferinta hotel sau apartament",
    accommodationSearchSource: "Sursa preferata pentru hotel / Airbnb",
    hotelLevel: "Nivel hotel",
    hotelArea: "Zona preferata pentru cazare",
    foodStyle: "Stil de mancare",
    guidedTours: "Preferinta pentru tururi",
    freeWalkingTourSource: "Sursa preferata pentru tur gratuit pe jos",
    mapPreference: "Aplicatie de harti preferata",
    outputLanguage: "Limba rezultatului",
    continue: "Vezi rezultatele personalizate",
    back: "Inapoi",
  },
};

const optionText: Record<string, Record<AppLanguage, string>> = {
  "Easy walking with many rests": {
    he: "הליכה קלה עם הרבה מנוחות",
    en: "Easy walking with many rests",
    ro: "Mers usor cu multe pauze",
  },
  "Very easy walking only": {
    he: "הליכה קלה מאוד בלבד",
    en: "Very easy walking only",
    ro: "Doar mers foarte usor",
  },
  "Moderate walking": {
    he: "הליכה בינונית",
    en: "Moderate walking",
    ro: "Mers moderat",
  },
  "Uses cane": {
    he: "משתמש/ת במקל",
    en: "Uses cane",
    ro: "Foloseste baston",
  },
  "Uses walker": {
    he: "משתמש/ת בהליכון",
    en: "Uses walker",
    ro: "Foloseste cadru de mers",
  },
  "Uses wheelchair": {
    he: "משתמש/ת בכיסא גלגלים",
    en: "Uses wheelchair",
    ro: "Foloseste scaun cu rotile",
  },

  "Up to 1 km per day": {
    he: "עד 1 ק״מ ביום",
    en: "Up to 1 km per day",
    ro: "Pana la 1 km pe zi",
  },
  "1-2 km per day": {
    he: "1-2 ק״מ ביום",
    en: "1-2 km per day",
    ro: "1-2 km pe zi",
  },
  "2-4 km per day": {
    he: "2-4 ק״מ ביום",
    en: "2-4 km per day",
    ro: "2-4 km pe zi",
  },
  "4-6 km per day": {
    he: "4-6 ק״מ ביום",
    en: "4-6 km per day",
    ro: "4-6 km pe zi",
  },
  "Flexible with taxis": {
    he: "גמיש עם מוניות",
    en: "Flexible with taxis",
    ro: "Flexibil cu taxiuri",
  },

  "Hotel": {
    he: "מלון",
    en: "Hotel",
    ro: "Hotel",
  },
  "Airbnb / apartment": {
    he: "Airbnb / דירה",
    en: "Airbnb / apartment",
    ro: "Airbnb / apartament",
  },
  "Either hotel or apartment": {
    he: "מלון או דירה",
    en: "Either hotel or apartment",
    ro: "Hotel sau apartament",
  },
  "Let the app choose the safest senior-friendly option": {
    he: "שהאפליקציה תבחר את האפשרות הבטוחה ביותר",
    en: "Let the app choose the safest senior-friendly option",
    ro: "Aplicatia sa aleaga optiunea cea mai sigura pentru seniori",
  },

  "Let the app choose": {
    he: "שהאפליקציה תבחר",
    en: "Let the app choose",
    ro: "Aplicatia sa aleaga",
  },
  "Booking.com": {
    he: "Booking.com",
    en: "Booking.com",
    ro: "Booking.com",
  },
  "Google Hotels": {
    he: "Google Hotels",
    en: "Google Hotels",
    ro: "Google Hotels",
  },
  "Airbnb": {
    he: "Airbnb",
    en: "Airbnb",
    ro: "Airbnb",
  },
  "Official hotel website": {
    he: "אתר רשמי של המלון",
    en: "Official hotel website",
    ro: "Site-ul oficial al hotelului",
  },
  "Google Maps hotel listings": {
    he: "רשימות מלונות בגוגל מפות",
    en: "Google Maps hotel listings",
    ro: "Hoteluri listate in Google Maps",
  },
  "I do not know": {
    he: "לא יודע/ת",
    en: "I do not know",
    ro: "Nu stiu",
  },

  "Comfortable 3-star hotel": {
    he: "מלון 3 כוכבים נוח",
    en: "Comfortable 3-star hotel",
    ro: "Hotel confortabil de 3 stele",
  },
  "4-star hotel": {
    he: "מלון 4 כוכבים",
    en: "4-star hotel",
    ro: "Hotel de 4 stele",
  },
  "5-star hotel": {
    he: "מלון 5 כוכבים",
    en: "5-star hotel",
    ro: "Hotel de 5 stele",
  },
  "Boutique hotel": {
    he: "מלון בוטיק",
    en: "Boutique hotel",
    ro: "Hotel boutique",
  },
  "Apartment hotel": {
    he: "מלון דירות",
    en: "Apartment hotel",
    ro: "Aparthotel",
  },

  "Quiet central neighborhood": {
    he: "שכונה מרכזית ושקטה",
    en: "Quiet central neighborhood",
    ro: "Cartier central si linistit",
  },
  "Historic center": {
    he: "המרכז ההיסטורי",
    en: "Historic center",
    ro: "Centrul istoric",
  },
  "Near main attractions": {
    he: "קרוב לאטרקציות המרכזיות",
    en: "Near main attractions",
    ro: "Aproape de atractiile principale",
  },
  "Near restaurants and cafes": {
    he: "קרוב למסעדות ובתי קפה",
    en: "Near restaurants and cafes",
    ro: "Aproape de restaurante si cafenele",
  },

  "Local cuisine": {
    he: "אוכל מקומי",
    en: "Local cuisine",
    ro: "Bucatarie locala",
  },
  "Traditional restaurants": {
    he: "מסעדות מסורתיות",
    en: "Traditional restaurants",
    ro: "Restaurante traditionale",
  },
  "Casual restaurants": {
    he: "מסעדות פשוטות ונוחות",
    en: "Casual restaurants",
    ro: "Restaurante simple si confortabile",
  },
  "Fine dining": {
    he: "מסעדות יוקרה",
    en: "Fine dining",
    ro: "Restaurante elegante",
  },
  "Vegetarian": {
    he: "צמחוני",
    en: "Vegetarian",
    ro: "Vegetarian",
  },
  "Kosher": {
    he: "כשר",
    en: "Kosher",
    ro: "Kosher",
  },
  "Gluten-free": {
    he: "ללא גלוטן",
    en: "Gluten-free",
    ro: "Fara gluten",
  },

  "Free walking tours only": {
    he: "רק סיורי הליכה חינמיים",
    en: "Free walking tours only",
    ro: "Doar tururi gratuite pe jos",
  },
  "Free walking tours preferred": {
    he: "עדיפות לסיורי הליכה חינמיים",
    en: "Free walking tours preferred",
    ro: "Prefer tururi gratuite pe jos",
  },
  "Free tours preferred, paid tours okay": {
    he: "עדיפות לחינמי, אפשר גם בתשלום",
    en: "Free tours preferred, paid tours okay",
    ro: "Prefer tururi gratuite, dar accept si platite",
  },
  "Private guided tours only": {
    he: "רק מדריך פרטי",
    en: "Private guided tours only",
    ro: "Doar tururi private",
  },
  "No guided tours": {
    he: "בלי סיורים מודרכים",
    en: "No guided tours",
    ro: "Fara tururi ghidate",
  },
  "Only if short and easy": {
    he: "רק אם קצר וקל",
    en: "Only if short and easy",
    ro: "Doar daca este scurt si usor",
  },

  "GuruWalk Rome": {
    he: "GuruWalk Rome",
    en: "GuruWalk Rome",
    ro: "GuruWalk Rome",
  },
  "New Rome Free Tour": {
    he: "New Rome Free Tour",
    en: "New Rome Free Tour",
    ro: "New Rome Free Tour",
  },
  "Rome Free Walking Tour": {
    he: "Rome Free Walking Tour",
    en: "Rome Free Walking Tour",
    ro: "Rome Free Walking Tour",
  },
  "SANDEMANs Rome": {
    he: "SANDEMANs Rome",
    en: "SANDEMANs Rome",
    ro: "SANDEMANs Rome",
  },
  "Walkative Rome": {
    he: "Walkative Rome",
    en: "Walkative Rome",
    ro: "Walkative Rome",
  },
  "Free Tour Rome": {
    he: "Free Tour Rome",
    en: "Free Tour Rome",
    ro: "Free Tour Rome",
  },

  "Google Maps day-by-day routes": {
    he: "Google Maps - מסלולים לפי יום",
    en: "Google Maps day-by-day routes",
    ro: "Google Maps - rute pe zile",
  },
  "Google Maps saved places list": {
    he: "Google Maps - מקומות שמורים",
    en: "Google Maps saved places list",
    ro: "Google Maps - lista de locuri salvate",
  },
  "Google Maps offline area": {
    he: "Google Maps - אזור להורדה אופליין",
    en: "Google Maps offline area",
    ro: "Google Maps - zona offline",
  },
  "Organic Maps": {
    he: "Organic Maps",
    en: "Organic Maps",
    ro: "Organic Maps",
  },
  "Maps.me": {
    he: "Maps.me",
    en: "Maps.me",
    ro: "Maps.me",
  },
  "Printed address list": {
    he: "רשימת כתובות מודפסת",
    en: "Printed address list",
    ro: "Lista de adrese tiparita",
  },

  "English": {
    he: "אנגלית",
    en: "English",
    ro: "Engleza",
  },
  "Hebrew": {
    he: "עברית",
    en: "Hebrew",
    ro: "Ebraica",
  },
  "Romanian": {
    he: "רומנית",
    en: "Romanian",
    ro: "Romana",
  },
  "French": {
    he: "צרפתית",
    en: "French",
    ro: "Franceza",
  },
  "Spanish": {
    he: "ספרדית",
    en: "Spanish",
    ro: "Spaniola",
  },
  "Italian": {
    he: "איטלקית",
    en: "Italian",
    ro: "Italiana",
  },
  "German": {
    he: "גרמנית",
    en: "German",
    ro: "Germana",
  },
};

function optionLabel(value: string, language: AppLanguage) {
  return optionText[value]?.[language] || value;
}

function Option({
  value,
  language,
}: {
  value: string;
  language: AppLanguage;
}) {
  return <option value={value}>{optionLabel(value, language)}</option>;
}

export default function FiltersPage() {
  const [appLanguage, setAppLanguage] = useState<AppLanguage | null>(null);

  const [walkingAbility, setWalkingAbility] = useState("Easy walking with many rests");
  const [walkingDistance, setWalkingDistance] = useState("2-4 km per day");
  const [accommodationPreference, setAccommodationPreference] = useState("Hotel");
  const [accommodationSearchSource, setAccommodationSearchSource] = useState("Let the app choose");
  const [hotelLevel, setHotelLevel] = useState("Comfortable 3-star hotel");
  const [hotelArea, setHotelArea] = useState("Quiet central neighborhood");
  const [foodStyle, setFoodStyle] = useState("Local cuisine");
  const [guidedTours, setGuidedTours] = useState("Free walking tours only");
  const [freeWalkingTourSource, setFreeWalkingTourSource] = useState("Let the app choose");
  const [mapPreference, setMapPreference] = useState("Google Maps day-by-day routes");
  const [outputLanguage, setOutputLanguage] = useState("Hebrew");

  useEffect(() => {
    const savedLanguage = localStorage.getItem("seniorTripAppLanguage");

    if (savedLanguage === "he" || savedLanguage === "en" || savedLanguage === "ro") {
      setAppLanguage(savedLanguage);
    } else {
      setAppLanguage("he");
    }

    const savedFilters = localStorage.getItem("seniorTripFilters");

    if (savedFilters) {
      const filters = JSON.parse(savedFilters);

      setWalkingAbility(filters.walkingAbility || "Easy walking with many rests");
      setWalkingDistance(filters.walkingDistance || "2-4 km per day");
      setAccommodationPreference(filters.accommodationPreference || "Hotel");
      setAccommodationSearchSource(filters.accommodationSearchSource || "Let the app choose");
      setHotelLevel(filters.hotelLevel || "Comfortable 3-star hotel");
      setHotelArea(filters.hotelArea || "Quiet central neighborhood");
      setFoodStyle(filters.foodStyle || "Local cuisine");
      setGuidedTours(filters.guidedTours || "Free walking tours only");
      setFreeWalkingTourSource(filters.freeWalkingTourSource || "Let the app choose");
      setMapPreference(filters.mapPreference || "Google Maps day-by-day routes");
      setOutputLanguage(filters.outputLanguage || "Hebrew");
    }
  }, []);

  function changeLanguage(language: AppLanguage) {
    setAppLanguage(language);
    localStorage.setItem("seniorTripAppLanguage", language);
  }

  function continueToResults() {
    localStorage.setItem(
      "seniorTripFilters",
      JSON.stringify({
        walkingAbility,
        walkingDistance,
        accommodationPreference,
        accommodationSearchSource,
        hotelLevel,
        hotelArea,
        foodStyle,
        guidedTours,
        freeWalkingTourSource,
        mapPreference,
        outputLanguage,
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

  const t = text[appLanguage];
  const isHebrew = appLanguage === "he";

  return (
    <main
      dir={isHebrew ? "rtl" : "ltr"}
      lang={appLanguage}
      className={`min-h-screen bg-slate-50 px-6 py-10 ${isHebrew ? "text-right" : "text-left"} text-slate-900`}
    >
      <div className="mx-auto max-w-5xl">
        <header className={`mb-8 flex flex-col gap-4 sm:items-center sm:justify-between ${isHebrew ? "sm:flex-row-reverse" : "sm:flex-row"}`}>
          <div>
            <p className="text-lg font-bold text-blue-700">
              {t.appName}
            </p>
            <h1 className="text-4xl font-bold">{t.title}</h1>
          </div>

          <a
            href="/search"
            className="rounded-2xl border border-blue-700 bg-white px-5 py-3 text-center text-lg font-semibold text-blue-700 hover:bg-blue-50"
          >
            {t.backSearch}
          </a>
        </header>

        <section className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
          <div className={`mb-6 flex flex-col gap-4 sm:items-center sm:justify-between ${isHebrew ? "sm:flex-row-reverse" : "sm:flex-row"}`}>
            <div>
              <h2 className="text-3xl font-bold">{t.heading}</h2>
              <p className="mt-4 text-xl leading-8 text-slate-600">
                {t.description}
              </p>
            </div>

            <label className="grid gap-2 text-lg font-semibold">
              {t.appLanguage}
              <select
                value={appLanguage}
                onChange={(event) => changeLanguage(event.target.value as AppLanguage)}
                className="rounded-2xl border border-slate-300 px-4 py-3 text-lg"
              >
                <option value="he">עברית</option>
                <option value="en">English</option>
                <option value="ro">Română</option>
              </select>
            </label>
          </div>

          <form className="mt-8 grid gap-6">
            <label className="grid gap-2 text-lg font-semibold">
              {t.walkingAbility}
              <select value={walkingAbility} onChange={(event) => setWalkingAbility(event.target.value)} className="rounded-2xl border border-slate-300 px-4 py-4 text-lg">
                {["Easy walking with many rests", "Very easy walking only", "Moderate walking", "Uses cane", "Uses walker", "Uses wheelchair"].map((value) => (
                  <Option key={value} value={value} language={appLanguage} />
                ))}
              </select>
            </label>

            <label className="grid gap-2 text-lg font-semibold">
              {t.walkingDistance}
              <select value={walkingDistance} onChange={(event) => setWalkingDistance(event.target.value)} className="rounded-2xl border border-slate-300 px-4 py-4 text-lg">
                {["Up to 1 km per day", "1-2 km per day", "2-4 km per day", "4-6 km per day", "Flexible with taxis"].map((value) => (
                  <Option key={value} value={value} language={appLanguage} />
                ))}
              </select>
            </label>

            <label className="grid gap-2 text-lg font-semibold">
              {t.accommodationPreference}
              <select value={accommodationPreference} onChange={(event) => setAccommodationPreference(event.target.value)} className="rounded-2xl border border-slate-300 px-4 py-4 text-lg">
                {["Hotel", "Airbnb / apartment", "Either hotel or apartment", "Let the app choose the safest senior-friendly option"].map((value) => (
                  <Option key={value} value={value} language={appLanguage} />
                ))}
              </select>
            </label>

            <label className="grid gap-2 text-lg font-semibold">
              {t.accommodationSearchSource}
              <select value={accommodationSearchSource} onChange={(event) => setAccommodationSearchSource(event.target.value)} className="rounded-2xl border border-slate-300 px-4 py-4 text-lg">
                {["Let the app choose", "Booking.com", "Google Hotels", "Airbnb", "Official hotel website", "Google Maps hotel listings", "I do not know"].map((value) => (
                  <Option key={value} value={value} language={appLanguage} />
                ))}
              </select>
            </label>

            <label className="grid gap-2 text-lg font-semibold">
              {t.hotelLevel}
              <select value={hotelLevel} onChange={(event) => setHotelLevel(event.target.value)} className="rounded-2xl border border-slate-300 px-4 py-4 text-lg">
                {["Comfortable 3-star hotel", "4-star hotel", "5-star hotel", "Boutique hotel", "Apartment hotel"].map((value) => (
                  <Option key={value} value={value} language={appLanguage} />
                ))}
              </select>
            </label>

            <label className="grid gap-2 text-lg font-semibold">
              {t.hotelArea}
              <select value={hotelArea} onChange={(event) => setHotelArea(event.target.value)} className="rounded-2xl border border-slate-300 px-4 py-4 text-lg">
                {["Quiet central neighborhood", "Historic center", "Near main attractions", "Near restaurants and cafes", "Let the app choose"].map((value) => (
                  <Option key={value} value={value} language={appLanguage} />
                ))}
              </select>
            </label>

            <label className="grid gap-2 text-lg font-semibold">
              {t.foodStyle}
              <select value={foodStyle} onChange={(event) => setFoodStyle(event.target.value)} className="rounded-2xl border border-slate-300 px-4 py-4 text-lg">
                {["Local cuisine", "Traditional restaurants", "Casual restaurants", "Fine dining", "Vegetarian", "Kosher", "Gluten-free"].map((value) => (
                  <Option key={value} value={value} language={appLanguage} />
                ))}
              </select>
            </label>

            <label className="grid gap-2 text-lg font-semibold">
              {t.guidedTours}
              <select value={guidedTours} onChange={(event) => setGuidedTours(event.target.value)} className="rounded-2xl border border-slate-300 px-4 py-4 text-lg">
                {["Free walking tours only", "Free walking tours preferred", "Free tours preferred, paid tours okay", "Private guided tours only", "No guided tours", "Only if short and easy"].map((value) => (
                  <Option key={value} value={value} language={appLanguage} />
                ))}
              </select>
            </label>

            <label className="grid gap-2 text-lg font-semibold">
              {t.freeWalkingTourSource}
              <select value={freeWalkingTourSource} onChange={(event) => setFreeWalkingTourSource(event.target.value)} className="rounded-2xl border border-slate-300 px-4 py-4 text-lg">
                {["Let the app choose", "GuruWalk Rome", "New Rome Free Tour", "Rome Free Walking Tour", "SANDEMANs Rome", "Walkative Rome", "Free Tour Rome", "I do not know"].map((value) => (
                  <Option key={value} value={value} language={appLanguage} />
                ))}
              </select>
            </label>

            <label className="grid gap-2 text-lg font-semibold">
              {t.mapPreference}
              <select value={mapPreference} onChange={(event) => setMapPreference(event.target.value)} className="rounded-2xl border border-slate-300 px-4 py-4 text-lg">
                {["Google Maps day-by-day routes", "Google Maps saved places list", "Google Maps offline area", "Organic Maps", "Maps.me", "Printed address list", "Let the app choose"].map((value) => (
                  <Option key={value} value={value} language={appLanguage} />
                ))}
              </select>
            </label>

            <label className="grid gap-2 text-lg font-semibold">
              {t.outputLanguage}
              <select value={outputLanguage} onChange={(event) => setOutputLanguage(event.target.value)} className="rounded-2xl border border-slate-300 px-4 py-4 text-lg">
                {["English", "Hebrew", "Romanian", "French", "Spanish", "Italian", "German", "Let the app choose"].map((value) => (
                  <Option key={value} value={value} language={appLanguage} />
                ))}
              </select>
            </label>
          </form>

          <div className={`mt-8 flex flex-col gap-4 ${isHebrew ? "sm:flex-row-reverse" : "sm:flex-row"}`}>
            <a
              href="/results"
              onClick={continueToResults}
              className="rounded-2xl bg-blue-700 px-8 py-4 text-center text-xl font-semibold text-white hover:bg-blue-800"
            >
              {t.continue}
            </a>

            <a
              href="/search"
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



