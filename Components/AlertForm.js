import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

export default function AlertForm() {
  const [alertType, setAlertType] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [hours, setHours] = useState('');
  const [address, setAddress] = useState('');
  const [photo, setPhoto] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = () => {
    // Traitez les données du formulaire ici
    // Réinitialisez les champs après la soumission si nécessaire.
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Formulaire d'Alerte</Text>

      <View style={styles.row}>
        <View style={styles.half}>
          <Text>Type d'Alerte :</Text>
          <Picker
            selectedValue={alertType}
            onValueChange={(itemValue) => setAlertType(itemValue)}
          >
            <Picker.Item label="Voirie" value="Voirie" />
            <Picker.Item label="Stationnement" value="Stationnement" />
            <Picker.Item label="Travaux" value="Travaux" />
            {/* Ajoutez d'autres options d'alerte au besoin */}
          </Picker>
        </View>

        <View style={styles.half}>
          <Text>Description de l'Alerte :</Text>
          <TextInput
            style={styles.input}
            value={description}
            onChangeText={(text) => setDescription(text)}
            multiline={true}
          />
        </View>
      </View>

      <View style={styles.row}>
        <View style={styles.half}>
          <Text>Date :</Text>
          <TextInput
            style={styles.input}
            value={date}
            onChangeText={(text) => setDate(text)}
          />
        </View>

        <View style={styles.half}>
          <Text>Heures :</Text>
          <TextInput
            style={styles.input}
            value={hours}
            onChangeText={(text) => setHours(text)}
          />
        </View>
      </View>

      <Text>Adresse :</Text>
      <TextInput
        style={styles.input}
        value={address}
        onChangeText={(text) => setAddress(text)}
      />

      <Text>Photo :</Text>
      <TextInput
        style={styles.input}
        value={photo}
        onChangeText={(text) => setPhoto(text)}
      />

      <View style={styles.row}>
        <View style={styles.half}>
          <Text>Prénom :</Text>
          <TextInput
            style={styles.input}
            value={firstName}
            onChangeText={(text) => setFirstName(text)}
          />
        </View>

        <View style={styles.half}>
          <Text>Nom :</Text>
          <TextInput
            style={styles.input}
            value={lastName}
            onChangeText={(text) => setLastName(text)}
          />
        </View>
      </View>

      <Text>Email :</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={(text) => setEmail(text)}
        keyboardType="email-address"
      />

      <Text>Téléphone :</Text>
      <TextInput
        style={styles.input}
        value={phone}
        onChangeText={(text) => setPhone(text)}
        keyboardType="phone-pad"
      />

      <Button title="Soumettre" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  half: {
    flex: 1,
    marginRight: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    marginBottom: 12,
    padding: 8,
  },
});
