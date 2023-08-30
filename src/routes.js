import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import { MaterialIcons } from "@expo/vector-icons";

import Home from "./screens/Home";
import Perfil from "./screens/Perfil";
import Pedidos from "./screens/Pedidos";
import PedidosAnteriores from "./screens/PedidosAnteriores";
import Pagamentos from "./screens/Pagamentos";
import Item from "./screens/Item";
import Categoriaitem from "./screens/Categoriaitem"
import { StyleSheet } from "react-native-web";

const BottomTab = createBottomTabNavigator();
const Stack = createStackNavigator();
const Tab = createMaterialTopTabNavigator();

function HomeRoutes() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name=" " component={Home} />
      <Stack.Screen name="Item" component={Item} />
      <Stack.Screen name="Categoria" component={Categoriaitem} />
    </Stack.Navigator>
  );
}

function PedidosRouter() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Pedidos" component={Pedidos} />
      <Tab.Screen
        name="PedidosAnteriores"
        component={PedidosAnteriores}
        options={{ tabBarLabel: "Pedidos Anteriores" }}
      />
    </Tab.Navigator>
  );
}

function PerfilRoutes() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Perfil" component={Perfil} 
      options={{
        headerStyle: { backgroundColor: 'black' },
        headerTitleStyle: { color: 'white' }
      }}
      />
      <Stack.Screen name="Pagamentos" component={Pagamentos} 
      options={{
        headerStyle: { backgroundColor: 'black' },
        headerTitleStyle: { color: 'white' }
      }}
      />
    </Stack.Navigator>
  );
}

export default function Routes() {
  return (
    <NavigationContainer>
      <BottomTab.Navigator
        screenOptions={{
          tabBarActiveTintColor: "#E06903",
          tabBarInactiveTintColor: "#fff",
          tabBarStyle: { backgroundColor: "black" },
        }}
      >
        <BottomTab.Screen
          name="Padaria Legal :]"
          component={HomeRoutes}
          options={{
            headerStyle: { backgroundColor: "black" },
            headerTitleStyle: {
              color: "white",
            },
            tabBarLabel: "Início",
            tabBarIcon: ({ color }) => (
              <MaterialIcons name="home" color={color} size={26} />
            ),
          }}
        />
        <BottomTab.Screen
          name="PedidosRouter"
          component={PedidosRouter}
          options={{
            headerStyle: { backgroundColor: "black" },
            headerTitleStyle: { color: "white" },
            tabBarLabel: "Pedidos",
            tabBarIcon: ({ color }) => (
              <MaterialIcons name="assignment" color={color} size={26} />
            ),
          }}
        />
        <BottomTab.Screen
          name="PerfilRoutes"
          component={PerfilRoutes}
          options={{
            headerStyle: { backgroundColor: "black" },
            headerTitleStyle: { color: "white" },
            headerShown: false,
            tabBarLabel: "Perfil",
            tabBarIcon: ({ color }) => (
              <MaterialIcons name="person" color={color} size={26} />
            ),
          }}
        />
      </BottomTab.Navigator>
    </NavigationContainer>
  );
}
