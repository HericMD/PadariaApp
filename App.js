import * as React from 'react';
import { Fragment } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import Routes from "./src/routes";
import {RecoilRoot} from 'recoil';

export default function App() {
  return (
    <RecoilRoot>
      <Fragment>
        <StatusBar style="auto" />
        <Routes />
      </Fragment>
    </RecoilRoot>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
