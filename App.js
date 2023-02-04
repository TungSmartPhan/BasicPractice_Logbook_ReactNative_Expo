import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Button,
  Vibration,
  TouchableOpacity,
  ToastAndroid,
  Alert,
} from "react-native";
import { Audio } from "expo-av";

const DURATION = 1000;
const ExcersiseA = () => {
  //vibration defind
  const startVibration = () => {
    // Starting the vibration with Duration is 1000mili
    Vibration.vibrate(DURATION);
    ToastAndroid.showWithGravity(
      "Vibrate Successful",
      ToastAndroid.SHORT,
      ToastAndroid.CENTER
    );
  };
  const stopVibration = () => {
    Vibration.cancel();
    ToastAndroid.showWithGravity(
      "Vibrate in Cancle",
      ToastAndroid.SHORT,
      ToastAndroid.CENTER
    );
  };

  // sounds/music defind
  const [sound, setSound] = React.useState();

  async function playSound() {
    console.log("Loading Sound");
    const { sound } = await Audio.Sound.createAsync(
      require("./assets/ayaka.mp3")
    );
    setSound(sound);

    console.log("Playing Sound");
    await sound.playAsync();
  }
  async function stopSound() {
    setSound(sound);
    console.log("Stop playing Sound");
    await sound.unloadAsync();
  }

 

  const createThreeButtonAlert = () =>
    Alert.alert("^_^", "Wanna Viberation or Wanna Listen ?", [
      {
        text: "Ask me later",
        onPress: () => console.log("Ask me later pressed"),
      },
      {
        text: "Vibaration",
        onPress: () =>
          //Alert inside dialog alert
          Alert.alert(
            "^^",
            "Wanna Viberation ?",
            [
              {
                text: "No",
                onPress: () => stopVibration() + console.log("Stop Vibration"),
                //  style: "cancel"
              },
              {
                text: "Yes",
                onPress: () =>
                  startVibration() + console.log("Playing Vibration"),
              },
            ],
            { cancelable: false }
          ) + console.log("Vibration Alert is turning On"),
        // style: "cancel",
      },
      {
        text: "Ringing",
        onPress: () =>
          //Alert inside dialog alert
          Alert.alert(
            "^^",
            "Wanna Listen ?",
            [
              {
                text: "Stop",
                onPress: () =>
                  stopSound() +
                  console.log("Stop Sound") +
                  ToastAndroid.showWithGravity(
                    "Stop Sound Successful",
                    ToastAndroid.SHORT,
                    ToastAndroid.CENTER
                  ),
                //  style: "cancel"
              },
              {
                text: "Yes",
                onPress: () =>
                  playSound() +
                  ToastAndroid.showWithGravity(
                    "Playing Sound Successful",
                    ToastAndroid.SHORT,
                    ToastAndroid.CENTER
                  ) +
                  console.log("Playing Sound..."),
              },
            ],
            { cancelable: false }
          ) + console.log("Ringging Alert is turning On"),
      },
    ]);

  return (
    <View style={styles.container}>
      <Text style={styles.header}> Click Me to Open Excersice A </Text>
      <Button title="Press Me" onPress={createThreeButtonAlert}></Button>
    </View>
  );
};

export default ExcersiseA;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingTop: 44,
    padding: 8,
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  paragraph: {
    margin: 24,
    textAlign: "center",
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: "#737373",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  Text: {
    color: "white",
    backgroundColor: "#667254",
    fontSize: 50,
  },
});
