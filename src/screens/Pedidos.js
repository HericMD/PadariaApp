import React, { useState, useEffect } from "react";
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Image,
  Button,
  TextInput,
} from "react-native";

import * as ImagePicker from "expo-image-picker";
import usuario from "../services/usuario";
// import { TextInput } from "react-native-paper";

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
      <Text>Seus pedidos:</Text>
      <View>
        {user?.carrinhos.map((carrinho) => (
          <View key={carrinho.id} style={styles.listacarrinho}>
            <Text>
              <li>Carrinho ID {carrinho.id}</li>
            </Text>
            {carrinho.produto.map((produto) => (
              <View key={produto.id} style={styles.listaproduto}>
                <Image
                  source={{ uri: produto.imagem.file }}
                  style={styles.imagem}
                />
                <Text>
                  <li>{produto.nome}</li>
                  <li>Preço por {produto.unidade}</li>
                  <li>R$ {produto.preco}</li>
                  <li>Categoria:{produto.categoria.descricao}</li>
                </Text>
                <View>
                  <Text> Quantidade </Text>
                  <View style={styles.inputView}>
                    <TextInput
                      style={styles.input}
                      placeholder="1"
                      keyboardType="numeric"
                    />
                  </View>
                  <View style={styles.botaoView}>
                    <TouchableOpacity style={styles.botao} >+</TouchableOpacity>
                    <TouchableOpacity style={styles.botao} >-</TouchableOpacity>
                  </View>
                </View>
              </View>
            ))}
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffc187",
  },
  listacarrinho: {
    margin: 5,
    padding: 3,
    borderWidth: 2,
    borderColor: "black",
  },
  listaproduto: {
    flex: 1,
    flexDirection: "row",
    margin: 5,
    padding: 3,
    borderWidth: 2,
    borderColor: "black",
    justifyContent: "space-between",
    backgroundColor: "white",
  },
  imagem: {
    resizeMode: "contain",
    height: 80,
    width: 80,
  },
  botaoView: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  botao: {
    margin: 2,
    padding: 10,
    borderWidth: 1,
    width: 16,
    maxWidth: 16,
    height: 16,
    maxHeight: 16,
    borderRadius: 360,
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    backgroundColor: "orange"
  },
  input: {
    borderWidth: 1,
    borderRadius: 3,
    padding: 1.5,
    width: 23,
    height: 15,
  },
  inputView:{
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  }
});
