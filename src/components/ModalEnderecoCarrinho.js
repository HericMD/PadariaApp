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
import CarrinhoService from "../services/carrinho";

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
    const semCarrinho = (UserLogado[0].endereco_usuario.id == UserLogado[0].carrinho.endereco_carrinho.id)
    if (semCarrinho) {
      const novoEndereco = await EnderecoService.saveEndereco(enderecoAtualizado);
      const endereconovo = {
        id: UserLogado[0].carrinho.id,
        item: UserLogado[0].carrinho.item.map((item) => item.id),
        endereco_carrinho: novoEndereco.id,
      };
      await CarrinhoService.patchCarrinho(endereconovo);
      alert("Endereco alterado com sucesso! (Recarregue para ver alterações)");
    } else{
        const enderecoAtualizadoComID = { ...enderecoAtualizado, id: UserLogado[0].carrinho.endereco_carrinho.id}
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
            <Text>Endereço Atual do Carrinho:</Text>
            <Text>
              <li>CEP: {user?.carrinho?.endereco_carrinho?.cep}</li>
              <li>Complemento: {user?.carrinho?.endereco_carrinho?.complemento}</li>
              <li>Número: {user?.carrinho?.endereco_carrinho?.numero}</li>
            </Text>
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
                setEnderecoAtualizado({ ...enderecoAtualizado, complemento: text })
              }
              placeholder=" Complemento"
            />
            <TextInput
              style={styles.input}
              value={enderecoAtualizado.cep}
              onChangeText={(text) => setEnderecoAtualizado({ ...enderecoAtualizado, cep: text })}
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
  },
});

export default ModalEndereco;
