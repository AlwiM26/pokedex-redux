import React, { useCallback, useEffect, useState } from "react";
import { View, ActivityIndicator } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useDispatch } from "react-redux";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Home from "./screens/Home";
import Detail from "./screens/Detail";
import Favorite from "./screens/Favorite";
import { getPokemons } from "./redux/Actions/Pokemon";

const Stack = createNativeStackNavigator();
Stack.Navigator.defaultProps = {
  screenOptions: {
    headerShown: false,
  },
  mode: "card",
};

const Tab = createBottomTabNavigator();

const PokemonRoutes = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Pokemon" component={Home} />
      <Stack.Screen name="PokemonDetail" component={Detail} />
    </Stack.Navigator>
  );
};

const FavoriteRoutes = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="FavoritePokemon" component={Favorite} />
      <Stack.Screen name="FavoriteDetail" component={Detail} />
    </Stack.Navigator>
  );
};

const MainRoutes = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    dispatch(getPokemons());
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator size="large" color="#FC7E7E" />
      </View>
    );
  }

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarLabelPosition: "beside-icon",
        tabBarIcon: ({ color }) => {
          if (route.name === "Home")
            return (
              <MaterialCommunityIcons name="pokeball" size={25} color={color} />
            );
          else
            return (
              <MaterialCommunityIcons
                name="heart-outline"
                size={22}
                color={color}
              />
            );
        },
        tabBarActiveTintColor: "#FC7E7E",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen
        name="Home"
        component={PokemonRoutes}
        options={{ headerShown: false, title: "Pokédex" }}
      />
      <Tab.Screen
        name="Favorite"
        component={FavoriteRoutes}
        options={{ headerShown: false, title: "Favorite" }}
      />
    </Tab.Navigator>
  );
};

export default MainRoutes;
