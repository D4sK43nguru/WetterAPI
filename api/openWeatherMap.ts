// import {OPEN_WEATHER_MAP} from "@env"
import axios from "axios";
import { currentWeather, geocode } from "../utils/url/openWeatherMap";
import { iWeatherApi } from "../utils/types/weatherApi";

export default async function getWeatherData(
  lat: number | undefined,
  lon: number | undefined,
  lang = "de",
  mode?: "xml" | "html",
  units: "standard" | "metric" | "imperial" = "metric"
): Promise<iWeatherApi> {
  const api_key = "9ff30058aa402520f85c841a41a5593c";
  if (!(lon && lat)) {
    return {};
  }
  const { data } = await axios.get(currentWeather, {
    params: {
      appId: api_key,
      lat,
      lon,
      lang,
      units,
    },
  });
  console.log(data);
  return data as iWeatherApi;
}

export async function getGeoCode(adress: string) {
  const api_key = "aec692959cd9436e9c972e9b87baca57";
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
