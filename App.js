import React, { useState, useEffect } from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Button, Switch, Text, Alert, Image } from "react-native";
import Geoloc from './Components/Geoloc';
// import CookieConsent, { Cookies, getCookieConsentValue } from "react-cookie-consent";
import { PermissionsAndroid } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LottieView from 'lottie-react-native';

import CookieBanner from './Components/cookibanner'


const Stack = createStackNavigator();

const requestCameraPermission = async () => {
  try {
    const cameraPermission = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      {
        title: "⚠️ Camera Permission ⚠️",
        message: "Autoriser l'application à accéder à la caméra ?",
        buttonNegative: "Non",
        buttonPositive: "Oui"
      }
    );
    return cameraPermission === PermissionsAndroid.RESULTS.GRANTED;
  } catch (err) {
    console.warn(err);
    return false;
  }
};

const requestLocationPermission = async () => {
  try {
    const locationPermission = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: "⚠️ Localisation Permission  ⚠️",
        message: "Autoriser l'application à utiliser la géolocalisation ?",
        buttonNegative: "Non",
        buttonPositive: "Oui"
      }
    );
    return locationPermission === PermissionsAndroid.RESULTS.GRANTED;
  } catch (err) {
    console.warn(err);
    return false;
  }
};

export default function App() {
  const [grantedCamera, setGrantedCamera] = useState(false);
  const [grantedLocation, setGrantedLocation] = useState(false);
  const [permissionsRequested, setPermissionsRequested] = useState(false);
  const [showToggles, setShowToggles] = useState(false);
  const [cameraToggle, setCameraToggle] = useState(false);
  const [locationToggle, setLocationToggle] = useState(false);

  const handleCameraToggle = () => {
    setCameraToggle(!cameraToggle);
  };

  const handleLocationToggle = () => {
    setLocationToggle(!locationToggle);
  };

  const handlePermissions = async () => {
    setShowToggles(true);
  };

  const handleRequestPermissions = async (navigation) => {
    if (cameraToggle || locationToggle) {
      Alert.alert(
        "Confirmation",
        "Voulez-vous confirmer les autorisations ?",
        [
          {
            text: "Non",
            onPress: () => {
              console.log("Autorisations refusées");
              setCameraToggle(false);
              setLocationToggle(false);
            },
            style: "cancel"
          },
          {
            text: "Oui",
            onPress: async () => {
              if (cameraToggle) {
                const cameraPermissionGranted = await requestCameraPermission();
                setGrantedCamera(cameraPermissionGranted);
                console.log("Autorisation caméra accordée :", cameraPermissionGranted);
              }
              if (locationToggle) {
                const locationPermissionGranted = await requestLocationPermission();
                setGrantedLocation(locationPermissionGranted);
                console.log("Autorisation localisation accordée :", locationPermissionGranted);
              }
              setPermissionsRequested(true);
              navigation.navigate('App');
            }
          }
        ]
      );
    } else {
      console.log("Aucune autorisation sélectionnée");
      setGrantedLocation(false);
      setGrantedCamera(false);
      navigation.navigate('App');
    }
  };

  useEffect(() => {
    if (permissionsRequested) {
      if (grantedCamera) {
        console.log("Autorisation caméra accordée");
        setGrantedCamera(true);
      } else {
        console.log("Autorisation caméra refusée");
        setGrantedCamera(false);
      }
      if (grantedLocation) {
        console.log("Autorisation localisation accordée");
        setGrantedLocation(true);
      } else {
        console.log("Autorisation localisation refusée");
        setGrantedLocation(false);
      }
    }
  }, [permissionsRequested, grantedCamera, grantedLocation]);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" options={{ title: 'Accueil' }} >

          {({ navigation }) => (
            <View style={styles.container}>
              {/* <CookieConsent><Text>This website uses cookies to enhance the user experience.</Text></CookieConsent> */}
<CookieBanner/>
              <View style={styles.animationContainer}>
                <Text style={styles.titleText}>SIMPLONVILLE</Text>
                <View style={styles.neumorphicContainer}>
                  <Text>Bienvenue sur l'app de votre mairie qui vous permettra de reporter un incident dans votre commune!</Text>
                  <Text>Veuillez gérer vos diverses autorisations avant de poursuivre. 👇</Text>
                </View>
                <LottieView
                  autoPlay

                  style={{
                    width: 200,
                    height: 200,
                    backgroundColor: '#eee',

                  }}
                  // Find more Lottie files at https://lottiefiles.com/featured
                  source={require('./assets/logo2.json')}
                />

              </View>
              <StatusBar style="auto" />


              {showToggles ? (
                <View>
                  <View style={styles.toggleContainer}>
                    <Text>Autoriser l'accès à la caméra</Text>
                    <Switch
                      value={cameraToggle}
                      onValueChange={handleCameraToggle}
                    />
                  </View>
                  <View style={styles.toggleContainer}>
                    <Text>Autoriser l'accès à la géolocalisation</Text>
                    <Switch
                      value={locationToggle}
                      onValueChange={handleLocationToggle}
                    />
                  </View>
                  <Button title="Valider les autorisations" onPress={() => handleRequestPermissions(navigation)} />
                </View>
              ) : (
                <Button title="Gérer les autorisations" onPress={handlePermissions} />
              )}
            </View>
          )}
        </Stack.Screen>
        <Stack.Screen name="App" options={{ title: 'Repporting' }}>
          {({ navigation }) => (
            <Geoloc
              grantedLocation={grantedLocation}
              grantedCamera={grantedCamera}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#ecf0f1",
    padding: 10,
  },
  titleContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  titleText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  buttonContainer: {
    alignItems: 'center',
  },
  toggleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },

  animationContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    paddingBottom: 5,
  },
  neumorphicContainer: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,
    margin: 40,
  },
});