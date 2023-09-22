import React, { useState } from "react";
import { StyleSheet, View, Button, Text, Modal } from "react-native";

function CookieBanner() {
  const [modalVisible, setModalVisible] = useState(true);

  const acceptCookies = () => {
    // Mettez ici votre logique pour accepter les cookies
    // Par exemple, enregistrez l'acceptation dans l'état global ou AsyncStorage
    setModalVisible(false);
  };

  const refuseCookies = () => {
    // Mettez ici votre logique pour refuser les cookies
    // Par exemple, enregistrez le refus dans l'état global ou AsyncStorage
    setModalVisible(false);
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        // Mettez ici votre logique si l'utilisateur ferme la modal sans cliquer sur Accepter ou Refuser
        setModalVisible(false);
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text>Nous utilisons des cookies de suivi pour comprendre comment vous utilisez le produit</Text>
          <Text>et aidez-nous à l'améliorer.</Text>
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
