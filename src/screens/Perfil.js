import React, { useState, useEffect } from "react";
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Image,
  Touchable,
} from "react-native";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";

import LoginApi from "../services/login";
import ModalEndereco from "../components/ModalEnderecoPessoal";

export default function Perfil({ navigation }) {
  const [user, setUser] = useState(null);
  const [enderecoAtualizado, setEnderecoAtualizado] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      const UserLogado = await LoginApi.UserLogado();
      setUser(UserLogado[0]);
    };

    fetchUser();
  }, []);

  const [modalVisible, setModalVisible] = useState(false);
  const [enderecoSelecionado, setEnderecoSelecionado] = useState(null);

  function abrirModalEndereco() {
    setModalVisible(true);
  }

  function fecharModalEndereco() {
    setModalVisible(false);
  }

  function selecionarEndereco(endereco) {
    setEnderecoSelecionado(endereco);
  }

  return (
    <View style={styles.container}>
      <Image source={{ uri: user?.foto?.url }} style={styles.foto} />
      <View style={styles.infos}>
        <Text>Nome: {user?.first_name}</Text>
        <Text>Sobrenome: {user?.last_name}</Text>
        <Text>Email: {user?.email}</Text>
      </View>
      <View style={styles.endereco}>
        <Text>Seu endereço:</Text>
        <Text>CEP: {user?.endereco_usuario?.cep}</Text>
        <Text>Complemento: {user?.endereco_usuario?.complemento}</Text>
        <Text>Número: {user?.endereco_usuario?.numero}</Text>
      </View>
      <TouchableOpacity onPress={abrirModalEndereco} style={styles.botao}>
        <Text>Trocar endereço</Text>
      </TouchableOpacity>
      <ModalEndereco
        isVisible={modalVisible}
        onClose={fecharModalEndereco}
        onSelectEndereco={selecionarEndereco}
      />
    </View>
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
  infos: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  endereco: {
    alignItems: "center",
    justifyContent: "center",
  },
  botao:{
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
    marginTop: 10,
    marginLeft: "auto",
    marginRight: "auto",
    backgroundColor: "orange",
    borderWidth: 1,
    padding: 4,
    borderRadius: 12,
  }
});
