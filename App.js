import * as React from 'react';
import { Fragment } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import Routes from "./src/routes";
import { PaperProvider } from 'react-native-paper';
import {RecoilRoot} from 'recoil';
import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { createDrawerNavigator } from '@react-navigation/drawer';

import Home from './src/screens/Home';
import Pedidos from "./src/screens/Pedidos";
import Perfil from "./src/screens/Perfil";
import Login from "./src/screens/Login";

// const Drawer = createDrawerNavigator();
// const Stack = createNativeStackNavigator();

// function MainDrawer() {
//   return (
//     <PaperProvider>
//       <NavigationContainer>
//         <Navigator>
//           <Screen name="Home" component={Home} />
//           <Screen name="Pedidos" component={Pedidos} />
//           <Screen name="Perfil" component={Perfil} />
//           <Screen name="Login" component={Login} />
//         </Navigator>
//       </NavigationContainer>
//     </PaperProvider>
//   );
// }

export default function App() {
  return (
    <RecoilRoot>
      <Fragment>
        <StatusBar style="auto" />
        <Routes />
      </Fragment>
    </RecoilRoot>

    // <RecoilRoot>
    //   <MainDrawer />
    // </RecoilRoot>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
