import React, { useState, useEffect } from "react";
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Image,
} from "react-native";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";

import * as ImagePicker from "expo-image-picker";
import usuario from "../services/usuario";

export default function Perfil({ navigation }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const users = await usuario.getAllUsuarios();
      // const users = await usuario.getUsuarioInfo();
      setUser(users[0]);
    };

    fetchUser();
  }, []);

  const selectImage = async () => {
    let permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Você precisa permitir o acesso à galeria para continuar!");
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });

    if (
      pickerResult.cancelled ||
      !pickerResult.assets ||
      pickerResult.assets.length === 0
    )
      return;

    const selectedImage = pickerResult.assets[0];

    try {
      await usuario.updateUserImage(user.id, selectedImage);
      const updatedUser = await usuario.getUserById(user.id);
      setUser(updatedUser);
    } catch (error) {
      console.error("Failed to update image:", error);
      alert("Erro ao atualizar a imagem.");
    }
  };

  const handleLogout = async () => {
    await usuario.logout();
    navigation.navigate("Login");
  };

  return (
    <ScrollView style={styles.container}>
      <View>
        <Image source={{ uri: user?.foto?.url }} style={styles.foto} />
        <View style={styles.nome}>
          <li>{user?.first_name}</li>
          <li>{user?.last_name}</li>
          <li>{user?.email}</li>
        </View>
        <Text></Text>
      </View>
      <TouchableOpacity
        style={styles.option}
        onPress={() => navigation.navigate("Enderecos")}
      >
        <MaterialCommunityIcons name="map-marker" size={35} color="black" />
        <ScrollView style={styles.info}>
          <Text style={styles.title}>Endereços</Text>
          <Text style={styles.description}>Meus endreços de entrega</Text>
        </ScrollView>
        <MaterialIcons name="keyboard-arrow-right" color="black" size={20} />
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffc187",
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    marginTop: 5,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    border: 1,
  },
  info: {
    marginLeft: 20,
  },
  title: {
    color: "black",
    fontSize: 18,
  },
  description: {
    fontSize: 16,
    color: "#676462",
  },
  foto: {
    resizeMode: "contain",
    height: 190,
    width: 190,
    borderRadius: 90,
    marginLeft: "auto",
    marginRight: "auto",
  },
  nome: {
    alignItems: 'center',
    justifyContent: 'center',
  }
});
