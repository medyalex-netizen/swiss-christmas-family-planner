"use client";

import { useEffect, useState } from "react";

type AppLanguage = "he" | "en" | "ro";

type SearchAnswers = {
  destination: string;
  travelDates?: string;
  tripLength: string;
  travelers: string;
};

type FilterAnswers = {
  walkingDistance: string;
  hotelLevel: string;
  hotelArea: string;
  guidedTours: string;
  freeWalkingTourSource?: string;
  mapPreference: string;
  outputLanguage?: string;
};

type DailyForecast = {
  date: string;
  max: number;
  min: number;
  rainChance: number;
};

const ui = {
  he: {
    appName: "מתכנן טיולים לגיל השלישי",
    title: "בדיקת מזג אוויר וטמפרטורות",
    back: "חזרה למסלול",
    badge: "תחזית חיה",
    weatherFor: "מזג אוויר ל-",
    description:
      "הדף הזה מציג טמפרטורה נוכחית ותחזית לימים הקרובים. אם הטיול הוא בתאריך רחוק, צריך לבדוק שוב קרוב יותר לנסיעה.",
    status: "מצב",
    locationFound: "מיקום התחזית שנמצא",
    currentTemp: "טמפרטורה עכשיו",
    feelsLike: "מרגיש כמו",
    travelDates: "תאריכי הטיול",
    tripLength: "משך הטיול",
    walking: "הליכה",
    maps: "מפות",
    forecast7: "תחזית ל-7 ימים",
    max: "מקסימום",
    min: "מינימום",
    rainChance: "סיכוי לגשם",
    hotTitle: "אם חם מאוד",
    rainTitle: "אם יש גשם",
    checksTitle: "בדיקות לפני סגירת יום הטיול",
    weatherCheck: "מזג אוויר",
    tourCheck: "סיור הליכה",
    mapsCheck: "מפות",
    taxiCheck: "מוניות ומנוחה",
    backItinerary: "חזרה למסלול הטיול",
    backHome: "חזרה לדף הבית",
    notSelected: "לא נבחר",
    loadingLocation: "מחפש מיקום לתחזית...",
    loadingTemps: "טוען טמפרטורות...",
    loaded: "התחזית נטענה בהצלחה.",
    noLocation: "לא נמצא מיקום לתחזית. נסו יעד אחר.",
    failed: "לא הצלחנו לטעון תחזית. בדקו חיבור אינטרנט או נסו שוב.",
    hotTips: [
      "להתחיל את היום מוקדם יותר.",
      "להימנע מהליכה ארוכה אחרי ארוחת צהריים.",
      "להוסיף מנוחה במלון בשעות החמות.",
      "להשתמש ביותר מוניות.",
      "לבחור כנסיות, מוזיאונים, בתי קפה ומקומות מוצלים.",
      "לשמור את ארוחת הערב קרובה למלון.",
    ],
    rainTips: [
      "להיזהר מאבנים חלקות ומדרכות לא ישרות.",
      "להשתמש במוניות במקום הליכות ארוכות.",
      "לבחור מוזיאונים, כנסיות, בתי קפה או שווקים מקורים.",
      "לקצר מסלולי הליכה.",
      "להוסיף זמן מעבר בין מקומות.",
      "לא להתחייב לסיור הליכה ארוך בגשם חזק.",
    ],
    checkTexts: {
      weather: "לבדוק תחזית עדכנית, גשם, עומס חום ורוח לפני כל יום.",
      tour: "לבדוק שעה, נקודת מפגש, משך וקושי של הסיור לפני שיוצאים.",
      maps: "לשמור מקומות במפות. שמות כמו Pantheon, Colosseum, Council Square ו-Black Church נשארים באנגלית או בשם המקורי.",
      taxi: "אם יש חום, גשם, עייפות או הליכה ארוכה — לבחור מונית ומנוחה במקום עוד אתר.",
    },
  },
  en: {
    appName: "Senior Trip Planner",
    title: "Weather and temperature check",
    back: "Back to itinerary",
    badge: "Live forecast",
    weatherFor: "Weather for ",
    description:
      "This page shows the current temperature and the forecast for the next few days. If the trip is far in the future, check again closer to travel.",
    status: "Status",
    locationFound: "Forecast location found",
    currentTemp: "Temperature now",
    feelsLike: "Feels like",
    travelDates: "Travel dates",
    tripLength: "Trip length",
    walking: "Walking",
    maps: "Maps",
    forecast7: "7-day forecast",
    max: "Max",
    min: "Min",
    rainChance: "Rain chance",
    hotTitle: "If it is very hot",
    rainTitle: "If there is rain",
    checksTitle: "Checks before finalizing each day",
    weatherCheck: "Weather",
    tourCheck: "Walking tour",
    mapsCheck: "Maps",
    taxiCheck: "Taxis and rest",
    backItinerary: "Back to itinerary",
    backHome: "Back to home",
    notSelected: "Not selected",
    loadingLocation: "Finding forecast location...",
    loadingTemps: "Loading temperatures...",
    loaded: "Forecast loaded successfully.",
    noLocation: "No forecast location found. Try another destination.",
    failed: "Could not load forecast. Check internet connection or try again.",
    hotTips: [
      "Start the day earlier.",
      "Avoid long walks after lunch.",
      "Add hotel rest during the hottest hours.",
      "Use more taxis.",
      "Choose churches, museums, cafes, and shaded places.",
      "Keep dinner close to the hotel.",
    ],
    rainTips: [
      "Be careful with slippery stones and uneven sidewalks.",
      "Use taxis instead of long walks.",
      "Choose museums, churches, cafes, or covered markets.",
      "Shorten walking routes.",
      "Add extra travel time between places.",
      "Do not commit to a long walking tour in heavy rain.",
    ],
    checkTexts: {
      weather: "Check current forecast, rain, heat load, and wind before each day.",
      tour: "Check time, meeting point, duration, and difficulty before going.",
      maps: "Save places in maps. Names like Pantheon, Colosseum, Council Square, and Black Church stay in English or original spelling.",
      taxi: "If there is heat, rain, tiredness, or long walking, choose taxi and rest instead of one more attraction.",
    },
  },
  ro: {
    appName: "Planificator de calatorii pentru seniori",
    title: "Verificare vreme si temperaturi",
    back: "Inapoi la itinerar",
    badge: "Prognoza live",
    weatherFor: "Vreme pentru ",
    description:
      "Aceasta pagina arata temperatura actuala si prognoza live doar pentru urmatoarele 7 zile. Nu este o prognoza pentru date indepartate precum octombrie. Daca excursia este departe in viitor, verificati din nou mai aproape de calatorie.",
    status: "Status",
    locationFound: "Locatia gasita pentru prognoza",
    currentTemp: "Temperatura acum",
    feelsLike: "Se simte ca",
    travelDates: "Datele calatoriei - nu datele prognozei",
    tripLength: "Durata calatoriei",
    walking: "Mers",
    maps: "Harti",
    forecast7: "Prognoza live pentru urmatoarele 7 zile",
    max: "Maxim",
    min: "Minim",
    rainChance: "Sansa de ploaie",
    hotTitle: "Daca este foarte cald",
    rainTitle: "Daca ploua",
    checksTitle: "Verificari inainte de fiecare zi",
    weatherCheck: "Vreme",
    tourCheck: "Tur pe jos",
    mapsCheck: "Harti",
    taxiCheck: "Taxiuri si odihna",
    backItinerary: "Inapoi la itinerar",
    backHome: "Inapoi acasa",
    notSelected: "Nu a fost ales",
    loadingLocation: "Caut locatia pentru prognoza...",
    loadingTemps: "Incarc temperaturile...",
    loaded: "Prognoza a fost incarcata.",
    noLocation: "Nu am gasit locatia pentru prognoza. Incercati alta destinatie.",
    failed: "Nu am putut incarca prognoza. Verificati internetul sau incercati din nou.",
    hotTips: [
      "Incepeti ziua mai devreme.",
      "Evitati mersul lung dupa pranz.",
      "Adaugati odihna la hotel in orele cele mai calde.",
      "Folositi mai multe taxiuri.",
      "Alegeti biserici, muzee, cafenele si locuri cu umbra.",
      "Pastrati cina aproape de hotel.",
    ],
    rainTips: [
      "Aveti grija la pietre alunecoase si trotuare denivelate.",
      "Folositi taxiuri in loc de mers lung.",
      "Alegeti muzee, biserici, cafenele sau piete acoperite.",
      "Scurtati traseele pe jos.",
      "Adaugati timp suplimentar intre locuri.",
      "Nu alegeti un tur lung pe jos in ploaie puternica.",
    ],
    checkTexts: {
      weather: "Verificati prognoza actuala, ploaia, caldura si vantul inainte de fiecare zi.",
      tour: "Verificati ora, punctul de intalnire, durata si dificultatea inainte de plecare.",
      maps: "Salvati locurile in harti. Nume precum Pantheon, Colosseum, Council Square si Black Church raman in engleza sau in forma originala.",
      taxi: "Daca este cald, ploua, sunteti obosit sau este mers lung, alegeti taxi si odihna in loc de inca un obiectiv.",
    },
  },
};

const valueText: Record<string, Record<AppLanguage, string>> = {
  "7 days": { he: "7 ימים", en: "7 days", ro: "7 zile" },
  "3 days": { he: "3 ימים", en: "3 days", ro: "3 zile" },
  "4 days": { he: "4 ימים", en: "4 days", ro: "4 zile" },
  "5 days": { he: "5 ימים", en: "5 days", ro: "5 zile" },
  "10 days": { he: "10 ימים", en: "10 days", ro: "10 zile" },
  "14 days": { he: "14 ימים", en: "14 days", ro: "14 zile" },
  "1-2 km per day": { he: "1-2 ק״מ ביום", en: "1-2 km per day", ro: "1-2 km pe zi" },
  "2-4 km per day": { he: "2-4 ק״מ ביום", en: "2-4 km per day", ro: "2-4 km pe zi" },
  "4-6 km per day": { he: "4-6 ק״מ ביום", en: "4-6 km per day", ro: "4-6 km pe zi" },
  "Comfortable 3-star hotel": { he: "מלון 3 כוכבים נוח", en: "Comfortable 3-star hotel", ro: "Hotel confortabil de 3 stele" },
  "4-star hotel": { he: "מלון 4 כוכבים", en: "4-star hotel", ro: "Hotel de 4 stele" },
  "Quiet central neighborhood": { he: "שכונה מרכזית ושקטה", en: "Quiet central neighborhood", ro: "Cartier central si linistit" },
  "Free walking tours only": { he: "רק סיורי הליכה חינמיים", en: "Free walking tours only", ro: "Doar tururi gratuite pe jos" },
  "Only if short and easy": { he: "רק אם קצר וקל", en: "Only if short and easy", ro: "Doar daca este scurt si usor" },
  "Google Maps day-by-day routes": { he: "Google Maps - מסלולים לפי יום", en: "Google Maps day-by-day routes", ro: "Google Maps - rute pe zile" },
  "Google Maps offline area": { he: "Google Maps - אזור להורדה אופליין", en: "Google Maps offline area", ro: "Google Maps - zona offline" },
};

const defaultSearch: SearchAnswers = {
  destination: "Rome",
  travelDates: "sept 10-17",
  tripLength: "7 days",
  travelers: "Senior couple",
};

const defaultFilters: FilterAnswers = {
  walkingDistance: "2-4 km per day",
  hotelLevel: "Comfortable 3-star hotel",
  hotelArea: "Quiet central neighborhood",
  guidedTours: "Free walking tours only",
  freeWalkingTourSource: "GuruWalk Rome",
  mapPreference: "Google Maps day-by-day routes",
  outputLanguage: "Hebrew",
};

function translateValue(value: string | undefined, language: AppLanguage) {
  return valueText[value || ""]?.[language] || value || "";
}

export default function WeatherPage() {
  const [appLanguage, setAppLanguage] = useState<AppLanguage | null>(null);
  const [search, setSearch] = useState<SearchAnswers>(defaultSearch);
  const [filters, setFilters] = useState<FilterAnswers>(defaultFilters);

  const [currentTemp, setCurrentTemp] = useState<number | null>(null);
  const [feelsLike, setFeelsLike] = useState<number | null>(null);
  const [dailyForecast, setDailyForecast] = useState<DailyForecast[]>([]);
  const [weatherStatus, setWeatherStatus] = useState("loadingLocation");
  const [matchedLocation, setMatchedLocation] = useState("");

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

      if (savedSearch) {
        setSearch(JSON.parse(savedSearch));
      }

      if (savedFilters) {
        setFilters(JSON.parse(savedFilters));
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

  useEffect(() => {
    async function loadWeather() {
      try {
        const destination = search.destination || "Rome";

        setWeatherStatus("loadingLocation");
        setCurrentTemp(null);
        setFeelsLike(null);
        setDailyForecast([]);

        const geoResponse = await fetch(
          `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
            destination
          )}&count=1&language=en&format=json`
        );

        const geoData = await geoResponse.json();

        if (!geoData.results || geoData.results.length === 0) {
          setWeatherStatus("noLocation");
          return;
        }

        const place = geoData.results[0];

        setMatchedLocation(
          `${place.name}${place.country ? ", " + place.country : ""}`
        );

        setWeatherStatus("loadingTemps");

        const forecastResponse = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${place.latitude}&longitude=${place.longitude}&current=temperature_2m,apparent_temperature&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max&forecast_days=7&timezone=auto`
        );

        const forecastData = await forecastResponse.json();

        setCurrentTemp(forecastData.current?.temperature_2m ?? null);
        setFeelsLike(forecastData.current?.apparent_temperature ?? null);

        const days: DailyForecast[] = forecastData.daily.time.map(
          (date: string, index: number) => ({
            date,
            max: forecastData.daily.temperature_2m_max[index],
            min: forecastData.daily.temperature_2m_min[index],
            rainChance:
              forecastData.daily.precipitation_probability_max?.[index] ?? 0,
          })
        );

        setDailyForecast(days);
        setWeatherStatus("loaded");
      } catch {
        setWeatherStatus("failed");
      }
    }

    loadWeather();
  }, [search.destination]);

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
  const statusText =
    weatherStatus === "loadingLocation"
      ? t.loadingLocation
      : weatherStatus === "loadingTemps"
      ? t.loadingTemps
      : weatherStatus === "loaded"
      ? t.loaded
      : weatherStatus === "noLocation"
      ? t.noLocation
      : t.failed;

  return (
    <main
      dir={isHebrew ? "rtl" : "ltr"}
      lang={appLanguage}
      className={`min-h-screen bg-slate-50 px-6 py-10 ${isHebrew ? "text-right" : "text-left"} text-slate-900`}
    >
      <div className="mx-auto max-w-6xl">
        <header className={`mb-8 flex flex-col gap-4 sm:items-center sm:justify-between ${isHebrew ? "sm:flex-row-reverse" : "sm:flex-row"}`}>
          <div>
            <p className="text-lg font-bold text-blue-700">
              {t.appName}
            </p>
            <h1 className="text-4xl font-bold">{t.title}</h1>
          </div>

          <a
            href="/itinerary"
            className="rounded-2xl border border-blue-700 bg-white px-5 py-3 text-center text-lg font-semibold text-blue-700 hover:bg-blue-50"
          >
            {t.back}
          </a>
        </header>

        <section className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
          <p className="mb-4 inline-block rounded-full bg-blue-50 px-4 py-2 text-lg font-semibold text-blue-700">
            {t.badge}
          </p>

          <h2 className="text-4xl font-bold">
            {t.weatherFor}{destination}
          </h2>

          <p className="mt-4 max-w-3xl text-xl leading-8 text-slate-600">
            {t.description}
          </p>

          <p className="mt-4 rounded-2xl bg-slate-50 p-4 text-lg font-semibold text-slate-700">
            {t.status}: {statusText}
          </p>

          {matchedLocation && (
            <p className="mt-3 text-lg text-slate-600">
              {t.locationFound}: {matchedLocation}
            </p>
          )}

          <div className="mt-8 grid gap-5 md:grid-cols-3">
            <div className="rounded-2xl bg-slate-50 p-5 ring-1 ring-slate-200">
              <p className="text-sm font-semibold text-slate-500">{t.currentTemp}</p>
              <p className="mt-2 text-4xl font-bold">
                {currentTemp === null ? "..." : `${Math.round(currentTemp)}°C`}
              </p>
            </div>

            <div className="rounded-2xl bg-slate-50 p-5 ring-1 ring-slate-200">
              <p className="text-sm font-semibold text-slate-500">{t.feelsLike}</p>
              <p className="mt-2 text-4xl font-bold">
                {feelsLike === null ? "..." : `${Math.round(feelsLike)}°C`}
              </p>
            </div>

            <div className="rounded-2xl bg-slate-50 p-5 ring-1 ring-slate-200">
              <p className="text-sm font-semibold text-slate-500">{t.travelDates}</p>
              <p className="mt-2 text-xl font-bold">{search.travelDates || t.notSelected}</p>
            </div>

            <div className="rounded-2xl bg-slate-50 p-5 ring-1 ring-slate-200">
              <p className="text-sm font-semibold text-slate-500">{t.tripLength}</p>
              <p className="mt-2 text-xl font-bold">{translateValue(search.tripLength, appLanguage)}</p>
            </div>

            <div className="rounded-2xl bg-slate-50 p-5 ring-1 ring-slate-200">
              <p className="text-sm font-semibold text-slate-500">{t.walking}</p>
              <p className="mt-2 text-xl font-bold">{translateValue(filters.walkingDistance, appLanguage)}</p>
            </div>

            <div className="rounded-2xl bg-slate-50 p-5 ring-1 ring-slate-200">
              <p className="text-sm font-semibold text-slate-500">{t.maps}</p>
              <p className="mt-2 text-xl font-bold">{translateValue(filters.mapPreference, appLanguage)}</p>
            </div>
          </div>
        </section>

        <section className="mt-8 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <h2 className="text-3xl font-bold">{t.forecast7}</h2>

          <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {dailyForecast.map((day) => (
              <div key={day.date} className="rounded-2xl bg-slate-50 p-5 ring-1 ring-slate-200">
                <p className="text-lg font-bold">{day.date}</p>
                <p className="mt-2 text-lg">{t.max}: {Math.round(day.max)}°C</p>
                <p className="text-lg">{t.min}: {Math.round(day.min)}°C</p>
                <p className="text-lg">{t.rainChance}: {day.rainChance}%</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
            <h2 className="text-3xl font-bold">{t.hotTitle}</h2>

            <ul className="mt-5 space-y-3 text-lg leading-8 text-slate-700">
              {t.hotTips.map((tip) => (
                <li key={tip}>{tip}</li>
              ))}
            </ul>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
            <h2 className="text-3xl font-bold">{t.rainTitle}</h2>

            <ul className="mt-5 space-y-3 text-lg leading-8 text-slate-700">
              {t.rainTips.map((tip) => (
                <li key={tip}>{tip}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="mt-8 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <h2 className="text-3xl font-bold">{t.checksTitle}</h2>

          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl bg-slate-50 p-5 ring-1 ring-slate-200">
              <h3 className="text-xl font-bold">{t.weatherCheck}</h3>
              <p className="mt-2 text-lg leading-7 text-slate-600">
                {t.checkTexts.weather}
              </p>
            </div>

            <div className="rounded-2xl bg-slate-50 p-5 ring-1 ring-slate-200">
              <h3 className="text-xl font-bold">{t.tourCheck}</h3>
              <p className="mt-2 text-lg leading-7 text-slate-600">
                {t.checkTexts.tour} {filters.freeWalkingTourSource ? `(${filters.freeWalkingTourSource})` : ""}
              </p>
            </div>

            <div className="rounded-2xl bg-slate-50 p-5 ring-1 ring-slate-200">
              <h3 className="text-xl font-bold">{t.mapsCheck}</h3>
              <p className="mt-2 text-lg leading-7 text-slate-600">
                {t.checkTexts.maps}
              </p>
            </div>

            <div className="rounded-2xl bg-slate-50 p-5 ring-1 ring-slate-200">
              <h3 className="text-xl font-bold">{t.taxiCheck}</h3>
              <p className="mt-2 text-lg leading-7 text-slate-600">
                {t.checkTexts.taxi}
              </p>
            </div>
          </div>
        </section>

        <div className={`mt-8 flex flex-col gap-4 ${isHebrew ? "sm:flex-row-reverse" : "sm:flex-row"}`}>
          <a
            href="/itinerary"
            className="rounded-2xl bg-blue-700 px-8 py-4 text-center text-xl font-semibold text-white hover:bg-blue-800"
          >
            {t.backItinerary}
          </a>

          <a
            href="/"
            className="rounded-2xl border border-slate-300 bg-white px-8 py-4 text-center text-xl font-semibold text-slate-800 hover:bg-slate-50"
          >
            {t.backHome}
          </a>
        </div>
      </div>
    </main>
  );
}


