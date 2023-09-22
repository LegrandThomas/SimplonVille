import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import * as MailComposer from 'expo-mail-composer';
import * as ImagePicker from 'expo-image-picker';
import { Camera } from 'expo-camera';
import { CameraType } from 'expo-camera/build/Camera.types';


export default function AlertForm(props) {
    const { city, street, number, location, camera } = props;
    console.log(camera);
    console.log(location);

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

    const [type, setType] = useState(CameraType.back);
    const [fullAdress, setFullAdress] = useState('');

    useEffect(() => {

        const ad = number + ' ' + street + ' ' + city;
        setFullAdress(ad);
    }, [city, street, number]);

    function toggleCameraType() {
        setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
    }
    // if (!permission)  

    // if (!permission.granted)  





    const pickImage = async () => {
        try {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });
            console.log(result);
            console.log(result.assets[0].uri);
            if (!result.canceled) {
                setPhoto(result.assets[0].uri);
            }
        } catch (error) {
            console.log('Error picking an image:', error);
        }
    };
    const handleSubmit = async () => {
        console.log('formulaire soumis');
        console.log('Type d\'Alerte :', alertType);
        console.log('Description de l\'Alerte :', description);
        console.log('Date :', date);
        console.log('Heures :', hours);
        console.log('Adresse :', address);
        console.log('Photo :', photo);
        console.log('Prénom :', firstName);
        console.log('Nom :', lastName);
        console.log('Email :', email);
        console.log('Téléphone :', phone);

        if (
            alertType === '' ||
            description === '' ||
            date === '' ||
            hours === '' ||
            firstName === '' ||
            lastName === '' ||
            email === '' ||
            phone === ''
        ) {
            alert("Veuillez renseigner tous les champs!");
        } else {
            const emailOptions = {
                subject: 'Alert Form Submission',
                body: `
                    Type d'Alerte : ${alertType}
                    Description de l'Alerte : ${description}
                    Date : ${date}
                    Heures : ${hours}
                    Adresse : ${address}
                    Prénom : ${firstName}
                    Nom : ${lastName}
                    Email : ${email}
                    Téléphone : ${phone}
                `,
                recipients: ['pro.legrand.thomas@gmail.com'],
                attachments: photo ? [photo] : [],
            };

            try {
                await MailComposer.composeAsync(emailOptions);
                console.log('Email composed successfully.');
            } catch (error) {
                console.error('Error composing email:', error);
            }
        }
    };
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Formulaire d'Alerte</Text>

            <View style={styles.fieldContainer}>
                <Text>Service concerné : *</Text>
                <Picker
                    selectedValue={alertType}
                    onValueChange={(itemValue) => setAlertType(itemValue)}
                >
                    <Picker.Item label="Voirie" value="Voirie" />
                    <Picker.Item label="Stationnement" value="Stationnement" />
                    <Picker.Item label="Travaux" value="Travaux" />
                </Picker>
            </View>

            <View style={styles.fieldContainer}>
                <Text>Description de l'Alerte : *</Text>
                <TextInput
                    style={styles.input}
                    value={description}
                    onChangeText={(text) => setDescription(text)}
                    multiline={true}
                    placeholder="Saisissez la description de l'alerte"
                />
            </View>

            <View style={styles.row}>
                <View style={styles.half}>
                    <Text>Date : *</Text>
                    <TextInput
                        style={styles.input}
                        value={date}
                        onChangeText={(text) => setDate(text)}
                        placeholder="format JJ/MM/AAAA"
                    />
                </View>

                <View style={styles.half}>
                    <Text>Heures : *</Text>
                    <TextInput
                        style={styles.input}
                        value={hours}
                        onChangeText={(text) => setHours(text)}
                        placeholder="format hh:mm"
                    />
                </View>
            </View>
            {location ? (
                <View style={styles.half}>
                    <Text>Adresse : *</Text>
                    <TextInput
                        style={styles.input}
                        value={fullAdress}
                        onChangeText={(text) => setAddress(text)}
                        editable={false}
                    />
                </View>
            ) : (
                <View style={styles.half}>
                    <Text>Adresse : *</Text>
                    <TextInput
                        style={styles.input}
                        value={address}
                        onChangeText={(text) => setAddress(text)}
                    />
                </View>
            )}
            <View style={styles.fieldContainer}>
                <Text>Photo : *</Text>
                {photo ? (
                    <Image
                        source={{ uri: photo }}
                        style={{ width: 100, height: 100 }}
                    />
                ) : (
                    <Button
                        title="Joindre une photo"
                        onPress={pickImage}
                    />
                )}
            </View>


            {/* <View>
                <Camera style={{ width: 200, height: 200 }} type={type}>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
                            <Text style={styles.text}>Basculer la caméra</Text>
                        </TouchableOpacity>
                    </View>
                </Camera>
            </View> */}
            <View style={styles.row}>
                <View style={styles.half}>
                    <Text>Prénom : *</Text>
                    <TextInput
                        style={styles.input}
                        value={firstName}
                        onChangeText={(text) => setFirstName(text)}
                        placeholder="ex: Elmut"
                    />
                </View>

                <View style={styles.half}>
                    <Text>Nom : *</Text>
                    <TextInput
                        style={styles.input}
                        value={lastName}
                        onChangeText={(text) => setLastName(text)}
                        placeholder="ex: Tardelpik"
                    />
                </View>
            </View>

            <Text>Email : *</Text>
            <TextInput
                style={styles.input}
                value={email}
                onChangeText={(text) => setEmail(text)}
                keyboardType="email-address"
                placeholder="format toto@toto.com"
            />

            <Text>Téléphone : *</Text>
            <TextInput
                style={styles.input}
                value={phone}
                onChangeText={(text) => setPhone(text)}
                keyboardType="phone-pad"
                placeholder="ex: 06.06.06.06.06"
            />

            <Button title="Envoyer au service concerné" onPress={handleSubmit} />
            <Text style={styles.smalltext}>* Champs Requis</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
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
        margin: 50,
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
    smalltext: {
        color: 'red',
        fontSize: 14,
    },

});