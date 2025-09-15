// Hong Kong Weather API Types
export interface LocalWeatherForecast {
  generalSituation: string;
  tcInfo: string;
  fireDangerWarning: string;
  forecastPeriod: string;
  forecastDesc: string;
  outlook: string;
  updateTime: string;
}

export interface CurrentWeatherReport {
  rainfall: {
    data: Array<{
      unit: string;
      place: string;
      max: number;
      main: string;
    }>;
    startTime: string;
    endTime: string;
  };
  icon: number[];
  iconUpdateTime: string;
  uvindex: string;
  updateTime: string;
  temperature: {
    data: Array<{
      place: string;
      value: number;
      unit: string;
    }>;
    recordTime: string;
  };
  warningMessage: string;
  mintempFrom00To09: string;
  rainfallFrom00To12: string;
  rainfallLastMonth: string;
  rainfallJanuaryToLastMonth: string;
  tcmessage: string;
  humidity: {
    recordTime: string;
    data: Array<{
      unit: string;
      value: number;
      place: string;
    }>;
  };
}

export interface NineDayForecast {
  generalSituation: string;
  weatherForecast: Array<{
    forecastDate: string;
    week: string;
    forecastWind: string;
    forecastWeather: string;
    forecastMaxtemp: {
      value: number;
      unit: string;
    };
    forecastMintemp: {
      value: number;
      unit: string;
    };
    forecastMaxrh: {
      value: number;
      unit: string;
    };
    forecastMinrh: {
      value: number;
      unit: string;
    };
    ForecastIcon: number;
    PSR: string;
  }>;
  updateTime: string;
  seaTemp: {
    place: string;
    value: number;
    unit: string;
    recordTime: string;
  };
  soilTemp: Array<{
    place: string;
    value: number;
    unit: string;
    recordTime: string;
    depth: {
      unit: string;
      value: number;
    };
  }>;
}

export interface SpecialWeatherTips {
  swt: Array<{
    desc: string;
    updateTime: string;
  }>;
}

// Weather Warning Types (for future use)
export interface WeatherWarning {
  name: string;
  code: string;
  actionCode: string;
  type?: string; // Signal type description
  issueTime: string;
  updateTime?: string; // Last update time
  expireTime?: string;
  contents: Array<{
    text: string;
  }>;
}

export interface WeatherWarningInfo {
  WFIRE?: WeatherWarning; // Fire Danger Warning
  WFROST?: WeatherWarning; // Frost Warning
  WHOT?: WeatherWarning; // Hot Weather Warning
  WCOLD?: WeatherWarning; // Cold Weather Warning
  WMSGNL?: WeatherWarning; // Strong Monsoon Signal
  WRAIN?: WeatherWarning; // Rainstorm Warning Signal
  WFNTSA?: WeatherWarning; // Special Announcement on Flooding in the northern New Territories
  WL?: WeatherWarning; // Landslip Warning
  WTCSGNL?: WeatherWarning; // Tropical Cyclone Warning Signal
  WTMW?: WeatherWarning; // Tsunami Warning
  WTS?: WeatherWarning; // Thunderstorm Warning
  [key: string]: WeatherWarning | undefined; // Allow for additional warning types
}

// Comprehensive Weather Data
export interface HongKongWeatherData {
  localForecast: LocalWeatherForecast | null;
  currentWeather: CurrentWeatherReport | null;
  nineDayForecast: NineDayForecast | null;
  specialTips: SpecialWeatherTips | null;
  warningInfo: WeatherWarningInfo | null;
  lastUpdate: string;
}
