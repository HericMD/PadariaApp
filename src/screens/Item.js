import React, { useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  Text,
  View,
  StyleSheet,
  Button,
} from "react-native";

import itemService from "../services/item";

export default function Item({ route, navigation }) {
  const { prod } = route.params;

  const [items, setItems] = useState([]);

  async function addCart() {
    const item = { produto: prod.id };
    await itemService.saveItem(item);
    setItems({});

  }

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
