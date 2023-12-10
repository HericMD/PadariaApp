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
import ModalEndereco from "../components/ModalEnderecoCarrinho";

export default function Carrinho({ navigation }) {
  const [user, setUser] = useState(null);
  const [enderecos, setEnderecos] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      const UserLogado = await LoginApi.UserLogado();
      setUser(UserLogado[0]);
    };

    fetchUser();
  }, []);

  async function incrementQuantidade(itemId) {
    const updatedItems = user.carrinho.item.map((item) =>
      item.id === itemId ? { ...item, quantidade: item.quantidade + 1 } : item
    );

    setUser({ ...user, carrinho: { ...user.carrinho, item: updatedItems } });
  }

  async function decrementQuantidade(itemId) {
    const updatedItems = user.carrinho.item.map((item) =>
      item.id === itemId && item.quantidade > 1
        ? { ...item, quantidade: item.quantidade - 1 }
        : item
    );

    setUser({ ...user, carrinho: { ...user.carrinho, item: updatedItems } });
  }

  async function excluirItem(itemId) {
    const updatedItems = user.carrinho.item.filter(
      (item) => item.id !== itemId
    );

    setUser({ ...user, carrinho: { ...user.carrinho, item: updatedItems } });
  }

  function Processar() {
    alert("seu pedido está sendo processado");
  }

  async function salvarAlteracoes() {
    try {
      const itensAtualizados = user.carrinho.item
        .filter((item) => item.quantidade > 0)
        .map(({ id, quantidade }) => ({ id, quantidade }));

      await Promise.all(
        itensAtualizados.map(async (itemAtualizado) => {
          try {
            await ItemService.updateItem({
              id: itemAtualizado.id,
              quantidade: itemAtualizado.quantidade,
            });
            console.log(`Item ${itemAtualizado.id} atualizado com sucesso.`);
          } catch (error) {
            console.error(
              `Erro ao atualizar o item ${itemAtualizado.id}:`,
              error
            );
          }
        })
      );

      if (user.carrinho.item.map((item) => item.id).length != 0) {
        await CarrinhoService.patchCarrinho({
          id: user.carrinho.id,
          item: user.carrinho.item.map((item) => item.id),
          endereco_carrinho: user.carrinho.endereco_carrinho?.id,
        });
      } else {
        await CarrinhoService.deleteCarrinho(user.carrinho);
      }

      console.log("Alterações no carrinho salvas com sucesso!");
    } catch (error) {
      console.error("Erro ao salvar alterações no carrinho:", error);
    }
  }

  function calcularValorTotal() {
    if (!user || !user.carrinho || !user.carrinho.item) {
      return 0;
    }

    return user.carrinho.item.reduce((total, item) => {
      return total + item.produto.preco * item.quantidade;
    }, 0);
  }

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

  if (!(!user || !user.carrinho)) {
    return (
      <ScrollView style={styles.container}>
        <TouchableOpacity onPress={abrirModalEndereco} style={styles.salvar}>
          <Text>Selecione um endereço</Text>
        </TouchableOpacity>
        <View>
          <View style={styles.listaCarrinho}>
            <View style={styles.endereco}>
              <View>
                <Text>Endereço Atual:</Text>
                <Text>CEP: {user?.carrinho?.endereco_carrinho?.cep}</Text>
                <Text>
                  Complemento: {user?.carrinho?.endereco_carrinho?.complemento}
                </Text>
                <Text>Número: {user?.carrinho?.endereco_carrinho?.numero}</Text>
              </View>
            </View>
            {user?.carrinho?.item.map((item) => (
              <View key={item.id} style={styles.itemCarrinho}>
                <Image
                  source={{ uri: item.produto.cover.url }}
                  style={styles.imagem}
                />
                <View>
                  <Text>{item.produto.nome}</Text>
                  <Text>
                    R$ {item.produto.preco} por {item.produto.unidade}
                  </Text>
                  <Text>{item.produto.categoria.descricao}</Text>
                  <Text>
                    Total: R${(item.produto.preco * item.quantidade).toFixed(2)}
                  </Text>
                </View>
                <View>
                  <Text> Quantidade </Text>
                  <View style={styles.inputView}>
                    <TextInput
                      style={styles.input}
                      keyboardType="numeric"
                      value={item.quantidade.toString()}
                      onChangeText={(text) => {
                        const updatedItems = user.carrinho.item.map((itemMap) =>
                          itemMap.id === item.id
                            ? { ...itemMap, quantidade: text }
                            : itemMap
                        );

                        setUser({
                          ...user,
                          carrinho: { ...user.carrinho, item: updatedItems },
                        });
                      }}
                    />
                  </View>
                  <View style={styles.unidade}>
                    <Text>
                      {item.produto.unidade.replace("Peso (KG)", "Quilo")}s
                    </Text>
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
            <View>
              <Text>
                Valor do carrinho: R${calcularValorTotal().toFixed(2)}{" "}
              </Text>
            </View>
          </View>
          <View>
            <TouchableOpacity onPress={salvarAlteracoes} style={styles.salvar}>
              <Text>Salvar Alterações no Carrinho</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={Processar} style={styles.salvar}>
              <Text>Comprar o carrinho</Text>
            </TouchableOpacity>
          </View>
        </View>
        <ModalEndereco
          isVisible={modalVisible}
          onClose={fecharModalEndereco}
          onSelectEndereco={selecionarEndereco}
          enderecos={enderecos}
        />
      </ScrollView>
    );
  } else {
    return (
      <ScrollView style={styles.container}>
        <Text>Seu Carrinho:</Text>

        <View style={styles.vazio}>
          <Text>Parece que seu carrinho está vazio!</Text>
          <Text>Tente adicionar algum item à ele</Text>
        </View>
      </ScrollView>
    );
  }
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
    flexDirection: "column",
  },
  endereco: {
    margin: 5,
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
    padding: 3,
    borderWidth: 2,
    borderColor: "black",
    backgroundColor: "white",
    flexDirection: "column",
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
    borderWidth: 1,
    width: 26,
    height: 26,
    borderRadius: 360,
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    backgroundColor: "orange",
    flexDirection: "column",
  },
  input: {
    // borderWidth: 1,
    // borderRadius: 3,
    // padding: 1.5,
    // width: 9,
    // height: 17,
    flexDirection: "column",
  },
  inputView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  unidade: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },

  vazio: {
    margin: 5,
    padding: 3,
    borderWidth: 2,
    borderColor: "black",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    flexDirection: "column",
  },
  salvar: {
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
    marginBottom: 12,
    flexDirection: "column",
  },
});
