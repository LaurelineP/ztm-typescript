// No need due to the use of zod ( see weather.zod.ts )
// export interface LocationInfo {
// 	lat: string;
// 	lon: string;
// 	display_name: string;
// }

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





// No need due to the use of zod( see weather.zod.ts )
// export interface CurrentWeatherAPIResponse {
// 	temperature: string;
// 	windspeed: number;
// 	winddirrection: number;
// 	weathercode: number;
// 	is_day: number;
// 	time: string;
// 	current_weather: CurrentWeather;
// }

export interface LocationInfo {
	lat: string;
	lon: string;
	display_name: string;
}