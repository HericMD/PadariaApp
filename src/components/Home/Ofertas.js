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

import produtoService from "../../services/produtos";

export default function produtos({ navigation }) {
  const [produtos, setProdutos] = useState([]);
  
  useEffect(async () => {
    const data = await produtoService.getAllProdutos();
    setProdutos(data);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.titulo}>Pães, doces e salgados!</Text>
      </View>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        horizontal
        style={styles.lista}
      >

        {produtos.map((produto) => (
          <TouchableOpacity
            key={produto.id}
            style={styles.item}
            onPress={() => navigation.navigate("Item", { prod: produto })}
          >
            <Image source={{ uri: produto.cover.url }} style={styles.imagem} />
            <View style={styles.info}>
              <Text numberOfLines={2} style={styles.titulo}>
                {produto.nome}
              </Text>
              <View style={styles.itemPreco}>
                <Text style={styles.preco}>R$ {produto.preco}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
    marginHorizontal: 0,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 0,
    marginRight: 10,
    marginBottom: 15,
    marginLeft: 20,
  },
  titulo: {
    fontSize: 23,
    fontWeight: "bold",
  },
  subTitulo: {
    color: "#A45710",
  },
  lista: {
    paddingLeft: 20,
  },
  item: {
    width: 200,
    marginRight: 15,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "white",
    backgroundColor: "white",
    borderRadius: 12,
  },
  imagem: {
    resizeMode: 'contain',
    height: 120,
    width: 190,
    borderRadius: 12,
    marginLeft: 'auto',
    marginRight: "auto",
    backgroundColor: "#fff",
  },
  info: {
    marginTop: "auto",
    padding: 10,
  },
  preco: {
    color: "green",
    fontWeight: "bold",
    fontSize: 18,
  },
});
