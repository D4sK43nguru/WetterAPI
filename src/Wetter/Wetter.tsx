import { Button, Image, StyleSheet, Text, TextInput, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { iWeatherApiRealtime } from "../../utils/types/weatherApi";
import getWeatherData, { getGeoCode } from "../../api/openWeatherMap";
import { useDebounce } from "../../utils/hooks/useDebounce";

const WetterComponent = () => {
  const [geoLocation, setGeoLocation] = useState<{ lat: number; lng: number }>({
    lat: 52.0825322,
    lng: 7.0150057,
  });
  const [location, setLocation] = useState("Ahaus");
  const [language, setLanguage] = useState("de");
  const [weatherData, setWeatherData] = useState<iWeatherApiRealtime>();
  const debouncedLocation = useDebounce<string>(location, 100);

  useEffect(() => {
    let active = true;
    fetchData();
    console.log(weatherData);
    return () => {
      active = false;
    };
    async function fetchData() {
      console.log(debouncedLocation);
      const res = await getWeatherData(debouncedLocation);
      if (!active) {
        return;
      }
      setWeatherData(res);
    }
  }, [debouncedLocation]);

  return (
    <View style={styles.container}>
      <View style={{ marginBottom: "5px" }}>
        <TextInput
          style={{
            height: 40,
            borderStyle: "solid",
            borderWidth: 1,
            borderRadius: 500,
            textAlign: "center",
          }}
          placeholder={"Hier den Ort eingeben"}
          onChangeText={(newText) => setLocation(newText)}
          defaultValue={location}
        />
        <Button title="Suche ausführen" />
      </View>
      {weatherData && (
        <View
          style={{
            borderStyle: "solid",
            borderWidth: 1,
            backgroundColor: "#00ffdc",
            padding: "2px",
          }}
        >
          <Image
            source={{uri: `https:${weatherData?.current.condition.icon}`}}
            style={styles.icon}
          />
          <Text>Sichtbarkeit: {weatherData?.current.vis_km}</Text>
          <Text>Temperatur: {weatherData?.current.temp_c}</Text>
          <Text>Gefühlt: {weatherData?.current.feelslike_c}</Text>
          <Text>Wind: {weatherData?.current.wind_kph}km/h</Text>
          <Text>Windrichtung: {weatherData?.current.wind_dir}</Text>
        </View>
      )}
      <StatusBar style="auto" />
    </View>
  );
};
export default WetterComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    width: 50,
    height: 50,
  },
});
