import { Button, StyleSheet, TouchableOpacity, Text, View } from "react-native";
import React, { useState } from "react";
import WetterComponent from "./src/Wetter/Wetter";
import { Kamera } from "./src/Kamera/Kamera";
// import {Kamera} from "./src/Kamera/kamera";

export default function App() {
  const [mode, setMode] = useState(0);

  return (
    <>
      {mode !== 0 && (
        <TouchableOpacity
          onPress={() => {
            setMode(0);
          }}
          style={styles.appButtonContainer}
        >
          <Text style={styles.appButtonText}>Zurück</Text>
        </TouchableOpacity>
      )}
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
  appButtonContainer: {
    height: "8%",
    elevation: 8,
    backgroundColor: "#009688",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    paddingTop: "9%",

  },
  appButtonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase",
  },
});
