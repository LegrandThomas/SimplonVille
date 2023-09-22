import React, { useState } from "react";
import { StyleSheet, View, Button, Text, Modal } from "react-native";

function CookieBanner() {
  const [modalVisible, setModalVisible] = useState(true);

  const acceptCookies = () => {
alert('cookies acceptés');
    setModalVisible(false);
  };

  const refuseCookies = () => {
    alert('cookies refusés');
    setModalVisible(false);
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
       
        setModalVisible(false);
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text>Nous utilisons des cookies de suivi pour comprendre comment vous utilisez le produit</Text>
          <Text>Veuillez accepter les cookies pour nous aider à améliorer.</Text>
          <Button title="Accepter les cookies" onPress={acceptCookies} />
          <Button title="Refuser les cookies" onPress={refuseCookies} />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Fond semi-transparent
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
});

export default CookieBanner;
