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

import LoginApi from "../services/login";
import CarrinhoService from "../services/carrinho";
import ItemService from "../services/item";

export default function Carrinho({ navigation }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const UserLogado = await LoginApi.UserLogado();
      setUser(UserLogado[0]);
    };

    fetchUser();
  }, []);

  const incrementQuantidade = (itemId) => {
    const updatedItems = user.carrinho.item.map((item) =>
      item.id === itemId ? { ...item, quantidade: item.quantidade + 1 } : item
    );

    setUser({ ...user, carrinho: { ...user.carrinho, item: updatedItems } });
  };

  const decrementQuantidade = (itemId) => {
    const updatedItems = user.carrinho.item.map((item) =>
      item.id === itemId && item.quantidade > 1
        ? { ...item, quantidade: item.quantidade - 1 }
        : item
    );

    setUser({ ...user, carrinho: { ...user.carrinho, item: updatedItems } });
  };

  const excluirItem = (itemId) => {
    const updatedItems = user.carrinho.item.filter(
      (item) => item.id !== itemId
    );

    setUser({ ...user, carrinho: { ...user.carrinho, item: updatedItems } });
  };

  const salvarAlteracoes = async () => {
    try {
      // Preparar os dados para o patch no ItemService
      const itensAtualizados = user.carrinho.item
        .filter((item) => item.quantidade > 0)
        .map(({ id, quantidade }) => ({ id, quantidade }));
  
      // Realizar o patch no ItemService
      await Promise.all(itensAtualizados.map(async (itemAtualizado) => {
        try {
          // Substitua a linha abaixo pela chamada correta ao seu serviço de update do item
          await ItemService.updateItem({id: itemAtualizado.id, quantidade: itemAtualizado.quantidade });
          console.log(`Item ${itemAtualizado.id} atualizado com sucesso.`);
        } catch (error) {
          console.error(`Erro ao atualizar o item ${itemAtualizado.id}:`, error);
        }
      }));
  
      // Realizar o patch no CarrinhoService
      await CarrinhoService.patchCarrinho({
        id: user.carrinho.id,
        item: user.carrinho.item.map(item => item.id),
        endereco: user.carrinho.endereco.id
      });
  
      console.log("Alterações no carrinho salvas com sucesso!");
    } catch (error) {
      console.error("Erro ao salvar alterações no carrinho:", error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text>Seu Carrinho:</Text>
      <View>
        <View style={styles.listaCarrinho}>
          {user?.carrinho.item.map((item) => (
            <View key={item.id} style={styles.itemCarrinho}>
              <Image
                source={{ uri: item.produto.cover.file }}
                style={styles.imagem}
              />
              <Text>
                <li>{item.produto.nome}</li>
                <li>Preço por {item.produto.unidade}</li>
                <li>R$ {item.produto.preco}</li>
                <li>{item.produto.categoria.descricao}</li>
              </Text>
              <View>
                <Text> Quantidade </Text>
                <View style={styles.inputView}>
                  <TextInput
                    style={styles.input}
                    keyboardType="numeric"
                    value={item.quantidade}
                    onChangeText={(text) =>
                      incrementQuantidade(item.id, Number(text))
                    }
                  />
                </View>
                <View style={styles.botoesQuantidade}>
                  <TouchableOpacity
                    style={styles.botao}
                    onPress={() => incrementQuantidade(item.id)}
                  >
                    <Text>+</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.botao}
                    onPress={() => decrementQuantidade(item.id)}
                  >
                    <Text>-</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <TouchableOpacity onPress={() => excluirItem(item.id)}>
                <Text>X</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
        <View>
          <TouchableOpacity onPress={salvarAlteracoes}>
            <Text>Salvar Alterações no Carrinho</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffc187",
  },
  listaCarrinho: {
    margin: 5,
    padding: 3,
    borderWidth: 2,
    borderColor: "black",
  },
  itemCarrinho: {
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
  botoesQuantidade: {
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
    backgroundColor: "orange",
  },
  input: {
    borderWidth: 1,
    borderRadius: 3,
    padding: 1.5,
    width: 33,
    height: 15,
  },
  inputView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});