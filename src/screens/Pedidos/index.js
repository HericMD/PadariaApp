import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Pedidos() {
  return (
    <View style={styles.container}>
      <Text style={styles.aviso}>Você ainda não fez nenhum pedido</Text>
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
  aviso: {
    marginTop: 25,
    fontSize: 18,
    color: '#333',
  },
});