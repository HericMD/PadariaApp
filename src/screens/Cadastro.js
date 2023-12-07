import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

import LoginApi from "../services/login"

export default function Cadastro() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [cpf, setCpf] = useState('');
  const [telefone, setTelefone] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');

  async function Cadastrar(){
    // Aqui você pode realizar o envio dos dados para a API ou realizar outras ações de cadastro
    // Certifique-se de tratar validações antes de enviar os dados

    // Exemplo de como os dados podem ser utilizados
    const novoUsuario = {
      first_name: nome,
      email: email,
      password: senha,
      cpf: cpf,
      telefone: telefone,
      data_nascimento: dataNascimento,
      its_superuser: true,
      is_staff: true,
      is_active: true,
    };

    console.log(email)
    console.log('Novo Usuário:', novoUsuario);
    await LoginApi.Cadastrar(novoUsuario);
    // Enviar os dados para a API ou realizar outras ações
    console.log('Novo Usuário:', novoUsuario);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.cadastro}>Tela de Cadastro</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={nome}
        onChangeText={setNome}
      />
      <TextInput
        style={styles.input}
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="CPF"
        value={cpf}
        onChangeText={setCpf}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Telefone"
        value={telefone}
        onChangeText={setTelefone}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Data de Nascimento"
        value={dataNascimento}
        onChangeText={setDataNascimento}
        keyboardType="numeric"
      />
      <TouchableOpacity style={styles.botao} onPress={Cadastrar}>
        <Text style={styles.textoBotao}>Cadastrar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffc187',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cadastro: {
    marginBottom: 20,
    fontSize: 18,
    color: '#333',
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
  },
  botao: {
    backgroundColor: 'orange',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  textoBotao: {
    color: 'white',
    fontSize: 16,
  },
});