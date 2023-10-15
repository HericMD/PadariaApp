import React, { useEffect, useState } from "react";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
  Button,
  FlatList,
  Image,
} from "react-native";

import enderecoService from "../services/enderecos";

export default function enderecos() {
  const [enderecos, setEnderecos] = useState([]);
  const [endereco, setEndereco] = useState({});

  useEffect(async () => {
    const data = await enderecoService.getAllEnderecos();
    setEnderecos(data);
  }, []);

  async function adicionar() {
    if (endereco.id) {
      await enderecoService.updateEndereco(endereco);
    } else {
      await enderecoService.saveEndereco(endereco);
    }
    setEnderecos({});

    const data = await enderecoService.getAllEnderecos();
    setEnderecos(data);
  }

  function editar(endereco) {
    setEndereco(endereco);
  }

  async function excluir(endereco) {
    await enderecoService.deleteEndereco(endereco);
    const data = await enderecoService.getAllEnderecos();
    setEnderecos(data);
  }

  return (
    <View style={styles.container}>
      <View>
        <View style={styles.addendereco}>
          <Text>Adicione endereços:</Text>

          <TextInput
            style={styles.input}
            value={endereco.numero}
            onChangeText={(text) => setEndereco({ ...endereco, numero: text })}
            placeholder=" Número"
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            value={endereco.complemento}
            onChangeText={(text) =>
              setEndereco({ ...endereco, complemento: text })
            }
            placeholder=" Complemento"
          />
          <TextInput
            style={styles.input}
            value={endereco.cep}
            onChangeText={(text) => setEndereco({ ...endereco, cep: text })}
            placeholder=" Cep"
            keyboardType="numeric"
          />

          <Button style={styles.add} title="ADD" onPress={adicionar} />
        </View>
      </View>
      <ScrollView>
        <View style={styles.listaendereco}>
          <Text>Seus endereços: </Text>

          <FlatList
            data={enderecos}
            keyExtractor={(item) => item.toString()}
            renderItem={({ item }) => (
              <View style={styles.enderecos}>
                <Text>
                  <li>Cep: {item.cep}</li>
                  <li>Complemento: {item.complemento}</li>
                  <li>Múmero: {item.numero}</li>
                </Text>
                <View style={styles.botoes}>
                  <TouchableOpacity onPress={() => editar(item)}>
                    <Image
                      source={{
                        uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Edit_icon_%28the_Noun_Project_30184%29.svg/2048px-Edit_icon_%28the_Noun_Project_30184%29.svg.png",
                      }}
                      style={styles.imagem}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => excluir(item)}>
                    <Image
                      source={{
                        uri: "https://cdn.iconscout.com/icon/free/png-512/free-bin-2782756-2316163.png?f=avif&w=256",
                      }}
                      style={styles.imagem}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffc187",
  },
  addendereco: {
    marginTop: 10,
    alignItems: "center",
    paddingBottom: 15,
  },
  input: {
    backgroundColor: "white",
    marginTop: 13,
    marginBottom: 5,
    padding: 5,
    borderRadius: 13,
    color: "gray",
  },
  listaendereco: {
    alignItems: "center",
  },
  enderecos: {
    display: "flex",
    // flexDirection: "row",
  },
  edit: {
    backgroundColor: "yellow",
  },
  delete: {
    backgroundColor: "red",
    color: "white",
    marginLeft: 6,
    marginRight: 6,
    paddingLeft: 3,
    paddingRight: 3,
    borderRadius: 60,
  },
  imagem: {
    width: 30,
    height: 30,
  },
  botoes:{
    flexDirection: 'row',
  }
});
