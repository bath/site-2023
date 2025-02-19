export interface WeatherData {
  temperature: number;
  description: string;
}

export interface SunPosition {
  sunAngle: number;
  shadowX: number;
  shadowY: number;
  shadowOpacity: string;
}

export interface TimeInfo {
  currentHour: number;
  currentDay: number;
  formattedTime: string;
}
