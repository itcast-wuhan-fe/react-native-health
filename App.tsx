import React, { useRef, useEffect, useState } from "react";
import { View, Text } from "react-native";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import AppNavigator from "./src/AppNavigator";
import reactNavigationHelper from "./src/utils/reactNavigationHelper";
import * as Font from "expo-font";
import constant from "./src/constant";
import authContext from "./src/context/auth";
import commonStore, { StoreKeys } from "./src/utils/commonStore";
import { async } from "q";

const Container = createAppContainer(AppNavigator);
const App = () => {
  const _ref = useRef(null);
  const [auth, setAuth] = useState({
    token: "",
    setToken: (newToken: string) => {
      commonStore.setItemAsync(StoreKeys.token, newToken);
      setAuth(oldAuth => ({ ...oldAuth, ...{ token: newToken } }));
    }
  });
  const getStoredToken = async () => {
    try {
      const token = await commonStore.getItemAsync(StoreKeys.token);
      if (token && token.length > 0) {
        auth.setToken(token);
      }
    } catch (error) {}
  };
  useEffect(() => {
    reactNavigationHelper.setNavigatorRef(_ref);
    Font.loadAsync({
      [constant.healthIcon]: require("./assets/fonts/health-icon.ttf")
    });
    getStoredToken();
  }, []);
  return (
    <authContext.Provider value={auth}>
      <Container ref={_ref}></Container>
    </authContext.Provider>
  );
};

export default App;
