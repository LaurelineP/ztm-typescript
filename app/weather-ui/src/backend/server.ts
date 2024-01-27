import path from "node:path"
import formBody from "@fastify/formbody";
import staticFiles from "@fastify/static";
import dotenv from "dotenv";
import { fastify } from "fastify";
import nunjucks from 'nunjucks'
import { locationSchemaRoute } from "./weather/routes.zod";
import { fetchLocationData, fetchWeatherData } from "./weather/weather.api";
import { GEOCODE_API_URL, HTTP_CLIENT, WEATHER_API_URL } from "./weather/weather.constants";
import { CurrentWeather } from '../../../weather/package/weather.model';

dotenv.config();
export const environment = process.env.NODE_ENV;

const templates = new nunjucks.Environment(
  new nunjucks.FileSystemLoader("src/backend/templates")
)


const weatherCodeToImage = (code: number): string => {
  switch (code) {
    case 0: return "/static/img/clear.svg";
    case 1: return "/static/img/clear.svg";
    case 2: return "/static/img/cloudy.svg";
    case 3: return "/static/img/overcast.svg";
    case 45: return "/static/img/fog.svg";
    case 48: return "/static/img/fog.svg";
    case 51: return "/static/img/drizzle.svg";
    case 53: return "/static/img/drizzle.svg";
    case 55: return "/static/img/drizzle.svg";
    case 56: return "/static/img/drizzle.svg";
    case 57: return "/static/img/drizzle.svg";
    case 61: return "/static/img/rain.svg";
    case 63: return "/static/img/rain.svg";
    case 65: return "/static/img/rain.svg";
    case 66: return "/static/img/rain.svg";
    case 67: return "/static/img/rain.svg";
    case 71: return "/static/img/snow.svg";
    case 73: return "/static/img/snow.svg";
    case 75: return "/static/img/snow.svg";
    case 77: return "/static/img/snow.svg";
    case 80: return "/static/img/rain.svg";
    case 81: return "/static/img/rain.svg";
    case 82: return "/static/img/rain.svg";
    case 85: return "/static/img/snow.svg";
    case 86: return "/static/img/snow.svg";
    case 95: return "/static/img/thunderstorm.svg";
    case 96: return "/static/img/thunderstorm.svg";
    case 99: return "/static/img/thunderstorm.svg";
    default: return "/static/img/info.svg";
  }
};


const server = fastify({
  logger: true
})

// middlewares
{
  server.register(formBody)

  server.register(staticFiles, {
    root: path.join(__dirname, "../../dist")
  })
}
server.get('/', async (request, response) => {
  const queryParams = request.query;
  try {
    const { location } = locationSchemaRoute.parse(queryParams);
    const locationInfo = await fetchLocationData(HTTP_CLIENT, GEOCODE_API_URL, location);
    console.log('locationInfo:', locationInfo)

    const weatherInfo = await fetchWeatherData(
      HTTP_CLIENT,
      WEATHER_API_URL,
      locationInfo.lat,
      locationInfo.lon
    );

    const renderedTemplate = templates.render("weather.njk", {
      environment,
      location: locationInfo.display_name,
      currentDate: new Date().toDateString(),
      weather: {
        ...weatherInfo,
        conditionImg: weatherCodeToImage(weatherInfo.weathercode),
        lowTemp: weatherInfo.getLowTemperature(),
        hightTemp: weatherInfo.getHighTemperature(),
      }
    });

    await response
      .header("Content-Type", "text/html; charset=utf-8")
      .send(renderedTemplate);

    console.log(weatherInfo)
  } catch (error) {
    console.error(error);
    const renderedTemplate = templates.render('get_started.njk', { environment });
    response
      .header("Content-Type", "text/html; charset=utf-8")
      .send(renderedTemplate);
  }
})

const startServer = async (): Promise<void> => {
  try {
    await server.listen({ port: 8089 })
  } catch (error) {
    server.log.error(error);
    process.exit(1);
  }
}


startServer();