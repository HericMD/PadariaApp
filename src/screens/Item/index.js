import React from "react";
import { MaterialIcons } from "@expo/vector-icons";

import { Image, ScrollView, Text, View, StyleSheet } from "react-native";

export default function Item({ route, navigation }) {
  const { item } = route.params;

  return (
    <ScrollView showsVerticalScrollIndicator={true} style={styles.container}>
      <Image style={styles.itemImage} source={{ uri: item.imagem }} />
      <Text style={styles.itemTitulo}>{item.nome}</Text>
      <Text style={styles.itemPreco}>R$ {item.preco}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
  },
  itemImage: {
    resizeMode: 'contain',
    height: 180,
    borderRadius: 5,
  },
  itemTitulo: {
    fontSize: 32,
    color: "#333",
    fontWeight: "bold",
    marginTop: 10,
    marginLeft: 5,
  },
  itemPreco: {
    color: "green",
    fontSize: 22,
    marginLeft: 10,
  },
});
