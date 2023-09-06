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
        await enderecoService.saveEndereco(data);
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

        <View>
          <TextInput
            style={styles.input}
            value={enderecos.numero}
            onChangeText={(text) => setEnderecos({ ...endereco, numero: text})}
            placeholder=" Número"
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            value={enderecos.complemento}
            onChangeText={(text) => setEnderecos({ ...endereco, complemento: text})}
            placeholder=" Complemento"
          />
          <TextInput
            style={styles.input}
            value={enderecos.cep}
            onChangeText={(text) => setEnderecos({ ...endereco, cep: text})}
            placeholder=" Cep"
            keyboardType="numeric"
          />

          <Button title="ADD" onPress={adicionar} />
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
      <FlatList
        data={enderecos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View>
            <Text onPress={() => editar(item)}>
            {/* <Text> */}
              {item.numero} - {item.complemento} - {item.cep}
            </Text>
            <Button title="X" onPress={() => excluir(item)} />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffc187",
    // alignItems: "center",
  },
  input: {
    backgroundColor: "white",
    marginTop: 13,
    marginRight: 13,
    marginBottom: 5,
    marginLeft: 13,
    padding: 5,
    borderRadius: 13,
    color: "gray",
  },
});
