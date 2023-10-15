import React from 'react';

import { ScrollView, StyleSheet } from 'react-native';
import Ofertas from '../components/Home/Ofertas';
import Categorias from '../components/Home/Categorias';

export default function Home({ navigation }) {
  return (
    <ScrollView showsHorizontalScrollIndicator={true} style={styles.container}>
      <Ofertas navigation={navigation} />
      <Categorias navigation={navigation} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffc187',
  },

  
});