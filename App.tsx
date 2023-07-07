import {Button, StyleSheet, View} from "react-native";
import React, {useState} from "react";
import WetterComponent from "./src/Wetter/Wetter";
import { Kamera } from "./src/Kamera/Kamera";
// import {Kamera} from "./src/Kamera/kamera";

export default function App() {
  const [mode, setMode] = useState(0);

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
          <Button
            onPress={() => {
              setMode(2);
            }}
            title={"Kamera"}
          />

        </View>
      )}
      {mode == 1 && <WetterComponent />}
      {mode == 2 && <Kamera />}
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
