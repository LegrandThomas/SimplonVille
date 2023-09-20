import React, { useState, useEffect } from 'react';
import { Platform, Text, View, StyleSheet, ScrollView } from 'react-native';
import * as Location from 'expo-location';
import MapView,{Marker,PROVIDER_GOOGLE } from 'react-native-maps';
import AlertForm from './AlertForm';

export default function Geoloc({ grantedLocation }) {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [mapRegion, setMapRegion] = useState(null);
  const [mapReady, setMapReady] = useState(false);

  useEffect(() => {
    if (grantedLocation) {
      (async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status === 'granted') {
          let location = await Location.getCurrentPositionAsync({});
          setLocation(location);
          setMapReady(true);
        } else {
          setErrorMsg('Permission to access location was denied');
        }
      })();
    } else {
      setErrorMsg('Géolocalisation désactivée');
    }
  }, [grantedLocation]);


  useEffect(() => {
    if (mapReady && location) {
      setMapRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        // latitude: 50.76667,
        // longitude:  1.63333,wimille coordonnées
        latitudeDelta: 0.015,
        longitudeDelta: 0.0121,
      });
    }
  }, [mapReady, location]);

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
     
          {mapReady && mapRegion && (
            <MapView
          
              provider={PROVIDER_GOOGLE}
              style={styles.map}
              region={mapRegion}
              
            >
              <Marker  coordinate={mapRegion}/>
               
       
            </MapView>
          )}
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
    paddingTop: 20,
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
