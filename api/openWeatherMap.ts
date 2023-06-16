// import {OPEN_WEATHER_MAP} from "@env"
import axios from "axios";
import {current, currentWeather, geocode} from "../utils/url/openWeatherMap";
import { iWeatherApiRealtime } from "../utils/types/weatherApi";

export default async function getWeatherData(
  location: string
): Promise<iWeatherApiRealtime> {
  const api_key = "d11ac692501b4f959cc201338231606";
  const { data } = await axios.get(current, {
    params: {
      key: api_key,
      q: location,
      aqi: "yes"
    },
  });
  console.log(data);
  return data as iWeatherApiRealtime;
}

export async function getGeoCode(adress: string) {
  const api_key = "d11ac692501b4f959cc201338231606";
  const { data }: any = axios
    .get(geocode, {
      params: {
        text: location,
        lang: 'de',
        apiKey: api_key,
        format: 'json'
      },
    })
  return {lat: data.lat, lng: data.lon} as {lat:number, lng:number};
}
