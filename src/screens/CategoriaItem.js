import React, { useEffect, useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import {
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Button,
} from "react-native";

import produtoService from "../services/produtos";

export default function CategoriaItem({ route, navigation }) {
  const { categoriaItem } = route.params;
  const [produtos, setProdutos] = useState([]);
  useEffect(async () => {
    const data = await produtoService.getProdutosByID(categoriaItem.id);
    setProdutos(data);
    console.log(data);
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.CategoriaItemTitulo}>
          {categoriaItem.descricao}
        </Text>
      </View>
      <View
        style={styles.lista}
      >
        {produtos.map((produto) => (
          <TouchableOpacity
            key={produto.id}
            style={styles.ItemTouch}
            onPress={() => navigation.navigate("Item", { prod: produto })}
          >
            <View style={styles.ItemView}>
              <Image
                source={{ uri: produto.cover.url }}
                style={styles.CategoriaItemImage}
              />
              <View style={styles.info}>
                <Text numberOfLines={2} style={styles.titulo}>
                  {produto.nome}
                </Text>
                <View style={styles.itemPreco}>
                  <Text style={styles.preco}>R$ {produto.preco} por {produto.unidade}</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
  },
  CategoriaItemImage: {
    resizeMode: "contain",
    height: 100,
    width: 100,
    borderRadius: 36,
    padding: 8,
  },
  header: {
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  CategoriaItemTitulo: {
    fontSize: 32,
    color: "#333",
    fontWeight: "bold",
    marginTop: 10,
    marginLeft: 5,
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  lista: {
    display: "flex",
    flexDirection: "column",
  },

  ItemView: {
    display: "flex",
    flex: 1,
    flexDirection: "row",
    backgroundColor: "white",
    borderStyle: "solid",
    borderColor: "black",
    borderWidth: 2,
    borderRadius: 36,
    margin: 12,
    margin: 8
  },

  info:{
    flex: 1,
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
  }
});
