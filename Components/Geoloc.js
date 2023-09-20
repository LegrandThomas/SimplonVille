import React, { useState, useEffect } from 'react';
import { Platform, Text, View, StyleSheet, ScrollView } from 'react-native';
import * as Location from 'expo-location';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import AlertForm from './AlertForm';

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
    <ScrollView contentContainerStyle={styles.container}>
      <View>
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
            style={styles.map}
            region={{
              latitude: location ? location.coords.latitude : 37.78825,
              longitude: location ? location.coords.longitude : -122.4324,
              latitudeDelta: 0.015,
              longitudeDelta: 0.0121,
            }}
          />
        </View>
      </View>
      <AlertForm />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    paddingTop: 20, // Spacing at the top
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
  map: {
    width: 300, 
    height: 200, 
    marginTop: 16,
  },
});
