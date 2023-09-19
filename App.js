import React from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Button } from "react-native";
import Geoloc from './Components/Geoloc';
import { PermissionsAndroid } from 'react-native';

const requestPermissions = async () => {
  try {
    const cameraGranted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      {
        title: "Camera Permission",
        message: "Please allow camera access for this app.",
        buttonNeutral: "Ask Me Later",
        buttonNegative: "Cancel",
        buttonPositive: "OK"
      }
    );

    const locationGranted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: "Location Permission",
        message: "Please allow location access for this app.",
        buttonNeutral: "Ask Me Later",
        buttonNegative: "Cancel",
        buttonPositive: "OK"
      }
    );

    // Check if both permissions are granted
    if (cameraGranted === PermissionsAndroid.RESULTS.GRANTED && locationGranted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log("Camera and location access granted");
      return true;
    } else {
      console.log("Camera or location permission denied");
      return false;
    }
  } catch (err) {
    console.warn(err);
    return false;
  }
};

export default function App() {
  const handlePermissions = async () => {
    const granted = await requestPermissions();
    if (granted) {
      // Les autorisations sont accordées, vous pouvez maintenant utiliser la géolocalisation, la caméra, etc.
    } else {
      // Les autorisations ont été refusées, gérez cela en conséquence.
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Button title="Request Permissions" onPress={handlePermissions} />
      {/* <Geoloc /> */}
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#d6fc7c",
    padding: 10
  },
  item: {
    margin: 30,
    fontSize: 20,
    fontWeight: "italics",
    textAlign: "center"
  }
});