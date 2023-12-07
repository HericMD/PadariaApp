import React, {useState, useEffect} from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import { MaterialIcons } from "@expo/vector-icons";

import Home from "./screens/Home";
import Perfil from "./screens/Perfil";
import Pedidos from "./screens/Pedidos";
import Item from "./screens/Item";
import CategoriaItem from "./screens/CategoriaItem";
import Enderecos from "./screens/Enderecos";
import Login from "./screens/Login";
import Cadastro from "./screens/Cadastro";

import { StyleSheet } from "react-native-web";

import { useRecoilValue } from "recoil";
import { userState } from "./recoil/atoms/auth";


const BottomTab = createBottomTabNavigator();
const Stack = createStackNavigator();
const Tab = createMaterialTopTabNavigator();



function LoginRouter() {
  
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>
  );
}

function CadastroRouter() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Cadastro" component={Cadastro} />
    </Stack.Navigator>
  );
}

function HomeRoutes() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name=" " component={Home} />
      <Stack.Screen name="Item" component={Item} />
      <Stack.Screen name="CategoriaItem" component={CategoriaItem} />
    </Stack.Navigator>
  );
}

function PedidosRouter() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Pedidos" component={Pedidos} />
    </Stack.Navigator>
  );
}

function PerfilRoutes() {
  
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Perfil"
        component={Perfil}
        options={{
          headerStyle: { backgroundColor: "black" },
          headerTitleStyle: { color: "white" },
        }}
      />
      <Stack.Screen
        name="Enderecos"
        component={Enderecos}
        options={{
          headerStyle: { backgroundColor: "black" },
          headerTitleStyle: { color: "white" },
        }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          headerStyle: { backgroundColor: "black" },
          headerTitleStyle: { color: "white" },
        }}
      />
    </Stack.Navigator>
  );
}

export default function Routes() {
  const currentuserState = useRecoilValue(userState);

  if (currentuserState.loggedIn) {
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
            name="Pedidos"
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
  } else {
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
            name="Login"
            component={LoginRouter}
            options={{
              headerStyle: { backgroundColor: "black" },
              headerTitleStyle: {
                color: "white",
              },
              tabBarLabel: "Login",
              tabBarIcon: ({ color }) => (
                <MaterialIcons name="home" color={color} size={26} />
              ),
            }}
          />
          <BottomTab.Screen
            name="Cadastro"
            component={CadastroRouter}
            options={{
              headerStyle: { backgroundColor: "black" },
              headerTitleStyle: { color: "white" },
              tabBarLabel: "Cadastro",
              tabBarIcon: ({ color }) => (
                <MaterialIcons name="assignment" color={color} size={26} />
              ),
            }}
          />
        </BottomTab.Navigator>
      </NavigationContainer>
    );
  }
}
