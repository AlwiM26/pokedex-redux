import React from "react";
import { Provider } from "react-redux";
import {
  NavigationContainer,
  DarkTheme,
  DefaultTheme,
} from "@react-navigation/native";
import MainRoutes from "./src/Routes";
import store from "./src/redux/Store";

const App = () => {
  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: "white",
    },
  };

  return (
    <Provider store={store}>
      <NavigationContainer theme={theme}>
        <MainRoutes />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
