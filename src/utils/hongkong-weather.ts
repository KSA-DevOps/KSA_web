import type {
  LocalWeatherForecast,
  CurrentWeatherReport,
  NineDayForecast,
  SpecialWeatherTips,
  WeatherWarning,
  WeatherWarningInfo,
  HongKongWeatherData,
} from "../types/hongkong-weather";

const WEATHER_API_BASE =
  "https://data.weather.gov.hk/weatherAPI/opendata/weather.php";

// Simple in-memory cache for weather data
interface WeatherCache {
  data: HongKongWeatherData | null;
  timestamp: number;
  ttl: number; // Time to live in milliseconds
}

const weatherCache: WeatherCache = {
  data: null,
  timestamp: 0,
  ttl: 10 * 60 * 1000, // 10 minutes cache
};

// Fetch Local Weather Forecast
export async function getLocalWeatherForecast(): Promise<LocalWeatherForecast | null> {
  try {
    const response = await fetch(`${WEATHER_API_BASE}?dataType=flw&lang=en`);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error("Failed to fetch local weather forecast:", error);
    return null;
  }
}

// Fetch Current Weather Report
export async function getCurrentWeatherReport(): Promise<CurrentWeatherReport | null> {
  try {
    const response = await fetch(
      `${WEATHER_API_BASE}?dataType=rhrread&lang=en`,
    );
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error("Failed to fetch current weather report:", error);
    return null;
  }
}

// Fetch 9-Day Weather Forecast
export async function getNineDayForecast(): Promise<NineDayForecast | null> {
  try {
    const response = await fetch(`${WEATHER_API_BASE}?dataType=fnd&lang=en`);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error("Failed to fetch 9-day forecast:", error);
    return null;
  }
}

// Fetch Special Weather Tips
export async function getSpecialWeatherTips(): Promise<SpecialWeatherTips | null> {
  try {
    const response = await fetch(`${WEATHER_API_BASE}?dataType=swt&lang=en`);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error("Failed to fetch special weather tips:", error);
    return null;
  }
}

// Fetch Weather Warning Information
export async function getWeatherWarningInfo(): Promise<WeatherWarningInfo | null> {
  try {
    const response = await fetch(
      `${WEATHER_API_BASE}?dataType=warningInfo&lang=en`,
    );
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();
    return Object.keys(data).length > 0 ? data : null;
  } catch (error) {
    console.error("Failed to fetch weather warning info:", error);
    return null;
  }
}

// Mock WTCSGNL data for testing (when no real typhoon warning is active)
export function getMockWTCSGNL(): WeatherWarningInfo {
  return {
    WTCSGNL: {
      name: "Tropical Cyclone Warning Signal",
      code: "TC8NE",
      actionCode: "ISSUE",
      type: "Gale or Storm Signal No. 8 Northeast",
      issueTime: "2025-09-14T08:30:00+08:00",
      updateTime: "2025-09-14T10:15:00+08:00",
      contents: [
        {
          text: "The Tropical Cyclone Warning Signal No. 8 Northeast is in force. Winds with mean speeds of 63 km/h or more are expected from the northeast quarter. Members of the public should take appropriate precautions and avoid unnecessary outdoor activities.",
        },
      ],
    },
  };
}

// Get Weather Warning Info with optional mock for testing
export async function getWeatherWarningInfoWithMock(
  useMock: boolean = false,
): Promise<WeatherWarningInfo | null> {
  if (useMock) {
    return getMockWTCSGNL();
  }
  return await getWeatherWarningInfo();
}

// Get All Weather Data
export async function getAllWeatherData(): Promise<HongKongWeatherData> {
  const now = Date.now();

  // Check if cached data is still valid
  if (weatherCache.data && now - weatherCache.timestamp < weatherCache.ttl) {
    return weatherCache.data;
  }

  // Fetch fresh data if cache is expired or empty
  const [
    localForecast,
    currentWeather,
    nineDayForecast,
    specialTips,
    warningInfo,
  ] = await Promise.all([
    getLocalWeatherForecast(),
    getCurrentWeatherReport(),
    getNineDayForecast(),
    getSpecialWeatherTips(),
    getWeatherWarningInfo(),
  ]);

  const weatherData: HongKongWeatherData = {
    localForecast,
    currentWeather,
    nineDayForecast,
    specialTips,
    warningInfo,
    lastUpdate: new Date().toISOString(),
  };

  // Update cache
  weatherCache.data = weatherData;
  weatherCache.timestamp = now;

  return weatherData;
}

// Cache management functions
export function clearWeatherCache(): void {
  weatherCache.data = null;
  weatherCache.timestamp = 0;
}

export function getWeatherCacheStatus(): {
  cached: boolean;
  age: number;
  ttl: number;
} {
  const now = Date.now();
  const age = now - weatherCache.timestamp;
  return {
    cached: weatherCache.data !== null,
    age,
    ttl: weatherCache.ttl,
  };
}

// Utility functions for weather data processing
export function getMainTemperature(
  currentWeather: CurrentWeatherReport | null,
): number | null {
  if (!currentWeather?.temperature?.data) return null;

  // Try to get Tai Po temperature first (school area)
  const taiPoTemp = currentWeather.temperature.data.find(
    (temp) => temp.place === "Tai Po",
  );

  return taiPoTemp?.value || currentWeather.temperature.data[0]?.value || null;
}

export function getMainHumidity(
  currentWeather: CurrentWeatherReport | null,
): number | null {
  if (!currentWeather?.humidity?.data?.[0]) return null;
  return currentWeather.humidity.data[0].value;
}

export function formatUpdateTime(
  timeStr: string,
  lang: "ko" | "en" = "en",
): string {
  try {
    const date = new Date(timeStr);
    if (lang === "ko") {
      return date.toLocaleString("ko-KR", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        timeZone: "Asia/Hong_Kong",
      });
    } else {
      return date.toLocaleString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        timeZone: "Asia/Hong_Kong",
      });
    }
  } catch (error) {
    return timeStr;
  }
}

export function translateDayName(
  englishDay: string,
  lang: "ko" | "en",
): string {
  if (lang === "en") return englishDay;

  const dayTranslations: Record<string, string> = {
    Monday: "월요일",
    Tuesday: "화요일",
    Wednesday: "수요일",
    Thursday: "목요일",
    Friday: "금요일",
    Saturday: "토요일",
    Sunday: "일요일",
    Today: "오늘",
    Tomorrow: "내일",
  };

  return dayTranslations[englishDay] || englishDay;
}

export function formatForecastDate(dateStr: string, lang: "ko" | "en"): string {
  try {
    // Hong Kong API returns date in format like "20250915"
    if (dateStr.length === 8) {
      const year = dateStr.substring(0, 4);
      const month = dateStr.substring(4, 6);
      const day = dateStr.substring(6, 8);
      const date = new Date(`${year}-${month}-${day}`);

      if (lang === "ko") {
        return date.toLocaleDateString("ko-KR", {
          month: "long",
          day: "numeric",
        });
      } else {
        return date.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        });
      }
    }
    return dateStr;
  } catch (error) {
    return dateStr;
  }
}

export function getWeatherIcon(iconCode: number): string {
  // Enhanced mapping of Hong Kong Observatory weather icons to emoji
  const iconMap: Record<number, string> = {
    50: "☀️", // Sunny
    51: "🌤️", // Sunny periods
    52: "⛅", // Sunny intervals
    53: "🌦️", // Sunny periods with a few showers
    54: "🌦️", // Sunny intervals with showers
    60: "☁️", // Cloudy
    61: "☁️", // Overcast
    62: "🌧️", // Light rain
    63: "🌧️", // Rain
    64: "🌧️", // Heavy rain
    65: "⛈️", // Thunderstorms
    70: "🌤️", // Fine
    71: "🌫️", // Hazy
    72: "�️", // Misty
    73: "🌫️", // Foggy
    74: "☀️", // Mainly clear
    75: "☀️", // Clear
    76: "🌤️", // Partly cloudy
    77: "☁️", // Cloudy
    80: "🌦️", // Windy
    81: "💨", // Dry
    82: "�", // Humid
    83: "🌡️", // Hot
    84: "🌡️", // Warm
    85: "❄️", // Cool
    90: "⛈️", // Thundery showers
    91: "⛈️", // Heavy thundery showers
    92: "⛈️", // Severe thunderstorms
  };

  return iconMap[iconCode] || "🌤️";
}

// Get Typhoon Warning Signal information
export function getTyphoonWarningSignal(
  warningInfo: WeatherWarningInfo | null,
): { signal: string | null; color: string } {
  if (!warningInfo || !warningInfo.WTCSGNL) {
    return { signal: null, color: "" };
  }

  const warning = warningInfo.WTCSGNL;
  const warningText = warning.contents?.[0]?.text || "";

  // Extract signal number from warning text
  const signalMatch =
    warningText.match(/Signal No\. (\d+)/i) ||
    warningText.match(/信號第(\d+)號/);
  if (!signalMatch) {
    return { signal: null, color: "" };
  }

  const signalNumber = signalMatch[1];

  // Determine color based on signal level
  let color = "";
  switch (signalNumber) {
    case "1":
      color = "text-green-700 bg-green-50 border-green-200";
      break;
    case "3":
      color = "text-yellow-800 bg-yellow-50 border-yellow-300";
      break;
    case "8":
      color = "text-orange-800 bg-orange-50 border-orange-300";
      break;
    case "9":
    case "10":
      color = "text-red-800 bg-red-50 border-red-300";
      break;
    default:
      color = "text-blue-800 bg-blue-50 border-blue-200";
  }

  return { signal: `TC${signalNumber}`, color };
}

// Weather warning metadata mapping
export const WEATHER_WARNING_INFO = {
  WFIRE: {
    nameKo: "화재 위험 경보",
    nameEn: "Fire Danger Warning",
    emoji: "🔥",
    severity: "warning",
    color: "orange",
  },
  WFROST: {
    nameKo: "서리 경보",
    nameEn: "Frost Warning",
    emoji: "❄️",
    severity: "caution",
    color: "blue",
  },
  WHOT: {
    nameKo: "폭염 경보",
    nameEn: "Hot Weather Warning",
    emoji: "🌡️",
    severity: "warning",
    color: "red",
  },
  WCOLD: {
    nameKo: "한파 경보",
    nameEn: "Cold Weather Warning",
    emoji: "🥶",
    severity: "caution",
    color: "blue",
  },
  WMSGNL: {
    nameKo: "강풍 몬순 신호",
    nameEn: "Strong Monsoon Signal",
    emoji: "💨",
    severity: "warning",
    color: "yellow",
  },
  WRAIN: {
    nameKo: "폭우 경보",
    nameEn: "Rainstorm Warning Signal",
    emoji: "🌧️",
    severity: "danger",
    color: "red",
  },
  WFNTSA: {
    nameKo: "신계 북부 침수 특별 공고",
    nameEn: "Special Announcement on Flooding in the northern New Territories",
    emoji: "🌊",
    severity: "danger",
    color: "purple",
  },
  WL: {
    nameKo: "산사태 경보",
    nameEn: "Landslip Warning",
    emoji: "⛰️",
    severity: "danger",
    color: "red",
  },
  WTCSGNL: {
    nameKo: "태풍 경보",
    nameEn: "Tropical Cyclone Warning Signal",
    emoji: "🌪️",
    severity: "danger",
    color: "red",
  },
  WTMW: {
    nameKo: "쓰나미 경보",
    nameEn: "Tsunami Warning",
    emoji: "🌊",
    severity: "extreme",
    color: "purple",
  },
  WTS: {
    nameKo: "뇌우 경보",
    nameEn: "Thunderstorm Warning",
    emoji: "⛈️",
    severity: "warning",
    color: "yellow",
  },
} as const;

export function getWarningDisplayInfo(warningKey: string, lang: "ko" | "en") {
  const info =
    WEATHER_WARNING_INFO[warningKey as keyof typeof WEATHER_WARNING_INFO];
  if (!info) return null;

  return {
    name: lang === "ko" ? info.nameKo : info.nameEn,
    emoji: info.emoji,
    severity: info.severity,
    color: info.color,
  };
}

export function getWarningSeverityStyles(severity: string) {
  switch (severity) {
    case "extreme":
      return "bg-purple-100 border-purple-500 text-purple-800";
    case "danger":
      return "bg-red-100 border-red-500 text-red-800";
    case "warning":
      return "bg-orange-100 border-orange-500 text-orange-800";
    case "caution":
      return "bg-yellow-100 border-yellow-500 text-yellow-800";
    default:
      return "bg-gray-100 border-gray-500 text-gray-800";
  }
}

export function getActiveWarnings(
  warningInfo: WeatherWarningInfo | null,
): Array<{ key: string; warning: WeatherWarning }> {
  if (!warningInfo) return [];

  const activeWarnings: Array<{ key: string; warning: WeatherWarning }> = [];

  Object.entries(warningInfo).forEach(([key, warning]) => {
    if (
      warning &&
      (warning.actionCode === "ISSUE" ||
        warning.actionCode === "EXTEND" ||
        warning.actionCode === "REISSUE")
    ) {
      activeWarnings.push({ key, warning });
    }
  });

  return activeWarnings;
}
