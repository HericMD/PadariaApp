import { Fragment } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import Routes from "./src/routes";
// import { PaperProvider } from 'react-native-paper';
import {RecoilRoot} from 'recoil';

// import Home from './src/screens/Home';
// import Pedidos from "./src/screens/Pedidos";
// import Perfil from "./src/screens/Perfil";
// import Login from "./src/screens/Login";

// function MainDrawer() {
//   return (
//     <PaperProvider>
//       <NavigationContainer>
//         <Drawer.Navigator>
//           <Drawer.Screen name="Home" component={Home} />
//           <Drawer.Screen name="Pedidos" component={Pedidos} />
//           <Drawer.Screen name="Perfil" component={Perfil} />
//           <Drawer.Screen name="Login" component={Login} />
//         </Drawer.Navigator>
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
