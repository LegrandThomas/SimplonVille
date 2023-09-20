import React, { useState, useEffect } from 'react';
import { Platform, Text, View, StyleSheet } from 'react-native';
import * as Location from 'expo-location';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps

export default function Geoloc({ grantedLocation }) {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    if (grantedLocation) {
      (async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status === 'granted') {
          let location = await Location.getCurrentPositionAsync({});
          setLocation(location);
        } else {
          setErrorMsg('Permission to access location was denied');
        }
      })();
    } else {
      setErrorMsg('Géolocalisation désactivée');
    }
  }, [grantedLocation]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Coordonnées de localisation</Text>
      {errorMsg ? (
        <Text style={styles.error}>{errorMsg}</Text>
      ) : (
        location && (
          <View>
            <Text style={styles.label}>Latitude :</Text>
            <Text style={styles.value}>{location.coords.latitude}</Text>

            <Text style={styles.label}>Longitude :</Text>
            <Text style={styles.value}>{location.coords.longitude}</Text>
          </View>
        )
      )}
      <View>
     <MapView
       provider={PROVIDER_GOOGLE} 
       region={{
         latitude: 37.78825,
         longitude: -122.4324,
         latitudeDelta: 0.015,
         longitudeDelta: 0.0121,
       }}
     >
     </MapView>
   </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  error: {
    fontSize: 18,
    color: 'red',
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 8,
  },
  value: {
    fontSize: 16,
  },
});
