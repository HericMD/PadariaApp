import React, { useEffect, useState } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import {
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from 'react-native';

import api from '../../services/api';
import { formatNumber } from '../../helpers/formatNumber';

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
            key={oferta.id}
            onPress={() => navigation.navigate('Item', { item: oferta })}
          >
            <Image source={{ uri: produto.imagem }} style={styles.imagem} />
            <View style={styles.info}>
              <Text numberOfLines={2} style={styles.titulo}>
                {oferta.title}
              </Text>
              <View style={styles.itemPreco}>
                <Text style={styles.preco}>{oferta.newPrice}</Text>
                <Text style={styles.precoAntigo}>{oferta.price}</Text>
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
    borderStyle: 'solid',
    borderColor: 'rbga(0,0,0, 0.06)',
    borderRadius: 4,
  },
  imagem: {
    height: 120,
    width: 190,
    backgroundColor: "#fff",
  },
  info: {
    marginTop: "auto",
    padding: 10,
  },
  itemPreco: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  preco: {
    color: "green",
    fontWeight: "bold",
    fontSize: 18,
  },
  precoAntigo: {
    marginLeft: 5,
    fontWeight: 'bold',
    color: '#999',
    fontSize: 16,
    textDecorationLine: 'line-through',
  },
});
