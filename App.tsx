import {Button, StyleSheet, View} from "react-native";
import React, {useState} from "react";
import WetterComponent from "./src/Wetter/Wetter";
import React from "react";
import { iWeatherApi } from "./utils/types/weatherApi";
import getWeatherData, { getGeoCode } from "./api/openWeatherMap";

export default function App() {
  const [mode, setMode] = useState(0);
    lat: 52.0825322,
    lng: 7.0150057,
  });
  const [location, setLocation] = useState("Ahaus");
  const [language, setLanguage] = useState("de");
  const [weatherData, setWeatherData] = useState<iWeatherApi>();

  useEffect(() => {
    let active = true;
    fetchData();
    console.log(location)

    return () => {
      active = false;
    };
    async function fetchData() {
      const res = await getGeoCode(location);
      if (!active) {
        return;
      }
      setGeoLocation(res);
    }
  }, [location]);

  useEffect(() => {
    let active = true;
    fetchData();
    return () => {
      active = false;
    };
    async function fetchData() {
      console.log(geoLocation)
      const res = await getWeatherData(
        geoLocation.lat,
        geoLocation.lng,
        language || "de"
      );
      if (!active) {
        return;
      }
      setWeatherData(res);
    }
  }, [geoLocation]);
  const WeatherData = <Text>{weatherData?.visibility}</Text>;

  return (
    <>
    {mode !== 0 && <Button
        onPress={() => {
          setMode(0);
        }}
        title={"Zurück"}
      />}
      {mode == 0 && (
        <View style={styles.container}>
          <Button
            onPress={() => {
              setMode(1);
            }}
            title={"Wetter"}
          />
      <Text>{WeatherData}</Text>
      <StatusBar style="auto" />
        </View>
      )}
      {mode == 1 && <WetterComponent />}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
