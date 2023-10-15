import React from "react";

import { Image, ScrollView, Text, View, StyleSheet } from "react-native";

export default function CategoriaItem({ route, navigation }) {
  const { categoriaItem } = route.params;

  return (
    <ScrollView showsVerticalScrollIndicator={true} style={styles.container}>
      <Image style={styles.CategoriaItemImage} source={{ uri: categoriaItem.imagem }} />
      <Text style={styles.CategoriaItemTitulo}>{categoriaItem.descricao}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
  },
  CategoriaItemImage: {
    resizeMode: 'contain',
    height: 180,
    borderRadius: 5,
  },
  CategoriaItemTitulo: {
    fontSize: 32,
    color: "#333",
    fontWeight: "bold",
    marginTop: 10,
    marginLeft: 5,
  },
  CategoriaItemPreco: {
    color: "green",
    fontSize: 22,
    marginLeft: 10,
  },
});
