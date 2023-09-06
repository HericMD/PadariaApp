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
} from "react-native";

import enderecoService from "../../services/enderecos";

export default function enderecos() {
  const [enderecos, setEnderecos] = useState([]);
  const [endereco, setEndereco] = useState({});

  useEffect(async () => {
    const data = await enderecoService.getAllEnderecos();
    setEnderecos(data);
  }, []);

  async function adicionar() {
    if (endereco.id) {
      await enderecoService.updateEndereco(data);
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
    await enderecoService.deleteEndereco(endereco.id);
    const data = await enderecoService.GetAllEnderecos();
    setEnderecos(data);
  }

  return (
    <View style={styles.container}>
      <View>
        <Text>Adicione endereços:</Text>

        <View style={styles.addendereco}>
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

      {/* <View>
        <View>
          <Text>Endereços: </Text>
        </View>

        {enderecos.map((enderecos) => (
          <View key={enderecos.id}>
            <Text>
              {enderecos.complemento} - {enderecos.numero} - {enderecos.cep}
            </Text>
          </View>
        ))}
      </View> */}
      <View style={styles.listaendereco}>
        <Text>Seus endereços: </Text>
        <FlatList
          style={styles.lista}
          data={enderecos}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.enderecos}>
              <Text onPress={() => editar(item)}>
                {item.numero} - {item.complemento} - {item.cep}
              </Text>
              <Button
                style={styles.excluirbutton}
                title="Excluir"
                onPress={() => excluir(item)}
              />
            </View>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffc187",
    // alignItems: "center",
  },
  addendereco: {
    alignItems: "center",
    paddingBottom: 15,
  },
  input: {
    marginTop: 13,
    marginBottom: 5,
    padding: 5,
    borderRadius: 13,
    color: "gray",
  },
  lista: {
    
  },
  enderecos: {
    backgroundColor: "white",
    alignItems: "center",
    display: 'flex',
    flexDirection: 'row',
  },
});
