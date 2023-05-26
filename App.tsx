import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TextInput } from "react-native";
import { useEffect, useMemo, useState } from "react";
import React from "react";
import { iWeatherApi } from "./utils/types/weatherApi";
import getWeatherData, { getGeoCode } from "./api/openWeatherMap";

export default function App() {
  const [geoLocation, setGeoLocation] = useState<{ lat: number; lng: number }>({
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
    <View style={styles.container}>
      <TextInput
        style={{ height: 40 }}
        placeholder={"Hier den Ort eingeben"}
        onChangeText={(newText) => setLocation(newText)}
        defaultValue={location}
      />
      <Text>{WeatherData}</Text>
      <StatusBar style="auto" />
    </View>
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
