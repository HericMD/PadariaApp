import React from "react";
import { MaterialIcons } from "@expo/vector-icons";

import { Image, ScrollView, Text, View, StyleSheet } from "react-native";

export default function Categoriaitem({ route, navigation }) {
  const { categoriaitem } = route.params;

  return (
    <ScrollView showsVerticalScrollIndicator={true} style={styles.container}>
      <Image style={styles.CategoriaitemImage} source={{ uri: categoriaitem.imagem }} />
      <Text style={styles.CategoriaitemTitulo}>{categoriaitem.descricao}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
  },
  CategoriaitemImage: {
    resizeMode: 'contain',
    height: 180,
    borderRadius: 5,
  },
  CategoriaitemTitulo: {
    fontSize: 32,
    color: "#333",
    fontWeight: "bold",
    marginTop: 10,
    marginLeft: 5,
  },
  CategoriaitemPreco: {
    color: "green",
    fontSize: 22,
    marginLeft: 10,
  },
});
