import { weatherCodes } from "./weather.constants";
import { formatTemperature, formatWind } from "./weather.helpers";
import type { CurrentWeather } from "./weather.model";

export interface LocationInfo {
	lat: string;
	lon: string;
	display_name: string;
}

export interface Temperature {
	value: number;
	unit: string;
}


export interface Wind {
	speed: number;
	direction: number;
	unit: string;
}

export interface CurrentWeatherAPIRequestBody {
	latitude: number;
	longitude: number;
	current: string;
}

export interface CurrentWeatherAPIResponse {
	temperature: string;
	windspeed: number;
	winddirrection: number;
	weathercode: number;
	is_day: number;
	time: string;
	current_weather: CurrentWeather;
}