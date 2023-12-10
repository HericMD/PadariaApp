import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import * as SecureStore from 'expo-secure-store';
import { useSetRecoilState } from 'recoil';
import { userState } from '../recoil/atoms/auth';

import loginApi from '../services/login';
import CarrinhoApi from '../services/carrinho'

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState(null);

  const setUser = useSetRecoilState(userState);

  const login = async () => {
    try {
      const data = await loginApi.login(email, password);
      setUser({
        loggedIn: true,
        access: data.access,
        refresh: data.refresh,
      });
      setEmail('');
      setPassword('');
      setErrorMsg(null);
      // await SecureStore.setItemAsync('access', data.access);

      if(true){
        const UserLogado = await loginApi.UserLogado();
        console.log("logado!")
        console.log(UserLogado[0])
        if(UserLogado[0].carrinho == null){
          console.log("sem carrinho!")
          // await CarrinhoApi.saveCarrinho({endereco_carrinho: null, item: [0]})
        }
      }


      navigation.goBack();
    } catch (error) {
      setUser({ loggedIn: false, access: null, refresh: null });
      setErrorMsg('Usuário ou senha inválidos!');
      await SecureStore.deleteItemAsync('access');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        label="Email"
        style={{ width: '90%', marginBottom: 10 }}
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        label="Senha"
        type="password"
        secureTextEntry={true}
        style={{ width: '90%', marginBottom: 10 }}
        value={password}
        onChangeText={setPassword}
      />
      <Button mode="contained" onPress={() => login()}>
        Entrar
      </Button>
      <Text>{errorMsg}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
});