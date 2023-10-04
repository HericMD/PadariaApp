import React, { useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";

import categoriaService from "../../services/categorias";

export default function categorias({ navigation }) {
  const [categorias, setCategorias] = useState([]);

  useEffect(async () => {
    const data = await categoriaService.getAllCategorias();
    setCategorias(data);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.titulo}>Categorias</Text>
      </View>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        horizontal
        style={styles.lista}
      >
        {categorias.map((categoria) => (
          <TouchableOpacity
            key={categoria.id}
            style={styles.item}
            onPress={() =>
              navigation.navigate("Categoriaitem", { categoriaitem: categoria })
            }
          >
            <Image source={{ uri: categoria.imagem.file }} style={styles.imagem} />
            <Text style={styles.categoriaTitulo}>{categoria.descricao}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 30,
    marginHorizontal: 0,
    // alignItems: "center",
  },
  header: {
    marginLeft: 20,
  },
  titulo: {
    fontSize: 23,
    fontWeight: "bold",
  },
  lista: {
    marginTop: 10,
    paddingLeft: 20,
  },
  item: {
    marginRight: 15,
    alignItems: "center",
  },
  imagem: {
    width: 200,
    height: 120,
    borderRadius: 10,
  },
  categoriaTitulo: {
    fontSize: 20,
    marginTop: 10,
    color: "white",
    backgroundColor: "black",
    borderStyle: "solid",
    borderColor: "rbga(0,0,0, 0.06)",
    borderRadius: 5,
    paddingTop: 0,
    paddingRight: 4,
    paddingBottom: 2,
    paddingLeft: 4,
  },
});
