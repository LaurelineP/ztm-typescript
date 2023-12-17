import { weatherCodes } from "./weather.constants";
import { formatTemperature, formatWind } from "./weather.helpers";
import type { CurrentWeatherAPIResponse, Temperature, Wind } from "./weather.types";

// https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current=temperature_2m&hourly=temperature_2m&current_weather=true
export class CurrentWeather {
	temperature: Temperature;
	wind: Wind;
	weathercode: number;
	isDay: boolean;
	time: string;


	constructor(apiResponse: CurrentWeatherAPIResponse) {
		this.temperature = {
			value: parseInt(apiResponse.temperature),
			unit: '°C',
		}

		this.wind = {
			speed: apiResponse.windspeed,
			direction: apiResponse.winddirrection,
			unit: 'km/h',
		}

		this.weathercode = apiResponse.weathercode;
		this.isDay = (apiResponse.is_day === 1);
		this.time = apiResponse.time;

	}

	getConditions = (): string => weatherCodes[this.weathercode]

	format = (): string => {
		const DESCRIPTION_LENGTH = 16;

		const conditionHeader = "Condition".padStart(DESCRIPTION_LENGTH, " ");
		const temperatureHeader = "Temperature".padStart(DESCRIPTION_LENGTH, " ");
		const windHeader = "Wind".padStart(DESCRIPTION_LENGTH, " ");

		const condition = `${conditionHeader}: ${this.getConditions()}`;
		const temperature = `${temperatureHeader}: ${formatTemperature(this.temperature)}`;
		const wind = `${windHeader}: ${formatWind(this.wind)}`;

		const formattedValues: string[] = [
			condition,
			temperature,
			wind,
		];

		const formattedText = formattedValues.join("\n");

		return formattedText;

	}
}