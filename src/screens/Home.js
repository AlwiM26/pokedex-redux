import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  Image,
  ActivityIndicator,
  StyleSheet,
  StatusBar,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import PokemonCard from "../components/PokemonCard";
import { useSelector } from "react-redux";
import { getPokemons } from "../redux/Actions/Pokemon";

const Home = () => {
  const dispatch = useDispatch();
  const pokemons = useSelector((state) => state.pokemons.pokemons);
  const offset = useSelector((state) => state.pokemons.offset);

  const handleReachEnd = () => {
    dispatch(getPokemons(offset));
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Pokédex</Text>
          <View style={styles.searchContainer}>
            <Ionicons name="ios-search" size={24} color="#5d5e7d" />
            <TextInput style={styles.txtInput} placeholder="Pokémon name" />
          </View>
        </View>
        <View style={{ flex: 1 }}>
          <FlatList
            data={pokemons}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <PokemonCard data={item} />}
            onEndReachedThreshold={0}
            onEndReached={handleReachEnd}
            ListFooterComponent={() => (
              <View style={{ alignItems: "center", justifyContent: "center" }}>
                <ActivityIndicator size="small" color="#FC7E7E" />
              </View>
            )}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    paddingHorizontal: 14,
    backgroundColor: "white",
  },
  header: {
    marginBottom: 4,
  },
  title: {
    color: "#2e3057",
    fontSize: 42,
    fontWeight: "700",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ebf3f5",
    marginVertical: 10,
    padding: 14,
    borderRadius: 5,
  },
  txtInput: {
    fontSize: 17,
    marginLeft: 10,
  },
});

export default Home;
