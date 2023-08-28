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

import api from "../../services/api";
import { formatNumber } from "../../helpers/formatNumber";

export default function produtos({ navigation }) {
  //  const [produtos, setprodutos] = useState([]);
  //  useEffect(() => {
  //    async function carregarprodutos() {
  //      const response = await api.get('offers');
  //      const data = response.data.map((offer) => ({
  //        id: offer.id,
  //        offer_url: offer.offer_url,
  //        title: offer.title,
  //        newPrice: formatNumber(offer.newPrice),
  //        price: formatNumber(offer.price),
  //        ingredients: offer.ingredients,
  //        delivery: offer.delivery,
  //        delay: offer.delay,
  //        icon: offer.icon,
  //      }));
  //      setprodutos(data);
  //    }
  //    carregarprodutos();
  //  }, []);

  const [produtos, setProdutos] = useState([]);

  useEffect(async () => {
    const data = await produtoService.getAllProdutos();
    setProdutos(data);
  }, []);

  async function updateProdutos() {
    const data = await produtoService.getAllProdutos();
    setProdutos(data);
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.titulo}>Comida boa e barata!</Text>
          <Text style={styles.subTitulo}>Pratos com frete grátis.</Text>
        </View>
      </View>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        horizontal
        style={styles.lista}
      >

          {produtos.map((produto) => (
            <TouchableOpacity
              style={styles.item}
              key={produto.id}
              onPress={() => navigation.navigate("Item", { item: produto })}
            >
              <Image source={{ uri: produto.imagem }} style={styles.imagem} />
              <View style={styles.info}>
                <Text numberOfLines={2} style={styles.titulo}>
                  {produto.nome}
                </Text>
                <View style={styles.itemPreco}>
                  <Text style={styles.preco}>{produto.preco}</Text>
                  <Text style={styles.precoAntigo}>{produto.preco}</Text>
                  <MaterialIcons name="local-offer" size={15} color="#000" />
                </View>
              </View>
            </TouchableOpacity>
          ))}
          <Button title="Atualizar" onPress={() => updateProdutos()} />

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
    borderColor: "rbga(0,0,0, 0.06)",
    borderRadius: 4,
  },
  imagem: {
    height: 120,
    width: 200,
    backgroundColor: "#000",
  },
  info: {
    marginTop: "auto",
    padding: 10,
  },
  itemPreco: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
  preco: {
    color: "green",
    fontWeight: "bold",
    fontSize: 18,
  },
  precoAntigo: {
    marginLeft: 5,
    fontWeight: "bold",
    color: "#999",
    fontSize: 16,
    textDecorationLine: "line-through",
  },
});
