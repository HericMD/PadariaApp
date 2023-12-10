import React, { useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  Text,
  View,
  StyleSheet,
  Button,
} from "react-native";

import LoginApi from "../services/login";
import itemService from "../services/item";
import carrinhoService from "../services/carrinho";

export default function Item({ route, navigation }) {
  const { prod } = route.params;

  const [items, setItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  async function addCart() {
    const item = { produto: prod.id };
    const newItem = await itemService.saveItem(item);
    setItems({});

    const UserLogado = await LoginApi.UserLogado();

    if (UserLogado[0].carrinho == null) {
      const UserLogado = await LoginApi.UserLogado();

      const carrinhoNovo = await carrinhoService.saveCarrinho({
        ...UserLogado[0].endereco_carrinho,
        item: [newItem.id],
      });
      const novoCarrinho = {
        ...UserLogado[0],
        carrinho_attachment_key: carrinhoNovo.id,
      };

      if (UserLogado[0].endereco_usuario == null) {
        alert(
          "ops... Parece que você ainda não tem um endereço, crie um endereço em seu perfil para adicionar itens ao seu carrinho!"
        );
      } else {
        await LoginApi.CriarCarrinho(novoCarrinho);

        alert("Seu carrinho foi criado com sucesso! :D");
      };
    } else {
      const listaAtual = UserLogado[0].carrinho.item.map((item) => item.id);
      const listaProdutosAtuais = UserLogado[0].carrinho.item.map(
        (item) => item.produto.id
      );
      if (listaProdutosAtuais.includes(newItem.produto)) {
        alert("Esse item já está em seu carrinho!");
      } else {
        listaAtual.push(newItem.id);

        const itemcarrinho = {
          id: UserLogado[0].carrinho.id,
          item: listaAtual,
          endereco_carrinho: UserLogado[0].carrinho.endereco_carrinho.id,
        };
        await carrinhoService.patchCarrinho(itemcarrinho);
        alert("Adicionado ao carrinho com sucesso!");
      };
    };
  };

  return (
    <ScrollView showsVerticalScrollIndicator={true} style={styles.container}>
      <Text>{prod.id}</Text>
      <Image style={styles.itemImage} source={{ uri: prod.cover.url }} />
      <Text style={styles.itemTitulo}>{prod.nome}</Text>
      <Text style={styles.itemDesc}>{prod.descricao}</Text>
      <Text style={styles.itemPreco}>R$ {prod.preco}</Text>
      <Button title="Adicionar ao carrinho" onPress={addCart} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
  },
  itemImage: {
    resizeMode: "contain",
    height: 180,
    borderRadius: 5,
  },
  itemTitulo: {
    fontSize: 32,
    color: "#333",
    fontWeight: "bold",
    marginTop: 5,
    marginLeft: 10,
  },
  itemDesc: {
    fontSize: 15,
    color: "#333",
    fontWeight: "bold",
    marginTop: 0,
    marginLeft: 10,
  },
  itemPreco: {
    color: "green",
    fontSize: 22,
    marginLeft: 10,
  },
});
