import React, { useState, useEffect } from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Button,
} from "react-native";

import LoginApi from "../services/login";
import EnderecoService from "../services/enderecos";
import UsuarioService from "../services/usuario";

const ModalEndereco = ({ isVisible, onClose, onSelectEndereco }) => {
  const [user, setUser] = useState(null);
  const [enderecoAtualizado, setEnderecoAtualizado] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      const UserLogado = await LoginApi.UserLogado();
      setUser(UserLogado[0]);
    };

    fetchUser();
  }, []);

  async function adicionar() {
    const UserLogado = await LoginApi.UserLogado();
    console.log(UserLogado[0].endereco_usuario);
    if (UserLogado[0].endereco_usuario == null) {
      const novoEndereco = await EnderecoService.saveEndereco(
        enderecoAtualizado
      );
      const endereconovo = {
        ...UserLogado[0],
        endereco_attachment_key: novoEndereco.id,
      };
      await UsuarioService.updateUsuario(endereconovo);
      alert("Endereco alterado com sucesso! (Recarregue para ver alterações)");
    } else {
      const enderecoAtualizadoComID = {
        ...enderecoAtualizado,
        id: UserLogado[0].endereco_usuario.id,
      };
      await EnderecoService.updateEndereco(enderecoAtualizadoComID);
      alert("Endereco alterado com sucesso! (Recarregue para ver alterações)");
    }
  }

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View>
            <View>
              <Text>Endereço Pessoal Atual:</Text>
              <Text>CEP: {user?.endereco_usuario?.cep}</Text>
              <Text>Complemento: {user?.endereco_usuario?.complemento}</Text>
              <Text>Número: {user?.endereco_usuario?.numero}</Text>
            </View>
          </View>
          <Text>Selecione um endereço:</Text>
          <View style={styles.addendereco}>
            <Text>Adicione endereços:</Text>

            <TextInput
              style={styles.input}
              value={enderecoAtualizado.numero}
              onChangeText={(text) =>
                setEnderecoAtualizado({ ...enderecoAtualizado, numero: text })
              }
              placeholder=" Número"
              keyboardType="numeric"
            />
            <TextInput
              style={styles.input}
              value={enderecoAtualizado.complemento}
              onChangeText={(text) =>
                setEnderecoAtualizado({
                  ...enderecoAtualizado,
                  complemento: text,
                })
              }
              placeholder=" Complemento"
            />
            <TextInput
              style={styles.input}
              value={enderecoAtualizado.cep}
              onChangeText={(text) =>
                setEnderecoAtualizado({ ...enderecoAtualizado, cep: text })
              }
              placeholder=" Cep"
              keyboardType="numeric"
            />

            <Button style={styles.add} title="ADD" onPress={adicionar} />
          </View>
          <TouchableOpacity onPress={onClose}>
            <Text>Fechar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    flexDirection: "column",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    flexDirection: "column",
  },
});

export default ModalEndereco;
