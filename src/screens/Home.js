import React, { useState, useEffect } from "react";
import { View, SafeAreaView, Text, TextInput, FlatList, Image, ActivityIndicator, StyleSheet, StatusBar } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import api from "../services/api";
import PokemonCard from "../components/PokemonCard";

const Home = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchData = async () => {
      try {
        const res = await api.get("/pokemon?limit=50");
        const pokemons = res.data.results;

        pokemons.map(async pokemon => {
          try {
            const res = await api.get(`/pokemon/${pokemon.name}`);
            const pokemonDetail = res.data;
            setData(prevPokemon => [...prevPokemon, pokemonDetail]);
          } catch(err) {
            console.error(err);
          }
        });
        
      } catch (error) {
        console.error(error);
      }
    }

    fetchData().then(() => {
      data.sort((a, b) => a.id - b.id);
      setLoading(false);
    });
  }, []);

  return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Pokédex</Text>
          <View style={styles.searchContainer}>
            <Ionicons 
              name="ios-search"
              size={24}
              color="#5d5e7d"
            />
            <TextInput 
              style={styles.txtInput}
              placeholder="Pokémon name"
            />
          </View>
        </View>
        <View style={{flex: 1}}>
        {loading && <ActivityIndicator size="large" color="blue" />}
          <FlatList 
            data={data}
            keyExtractor={item => item.id}
            // contentContainerStyle={{paddingBottom: 150,}}
            renderItem={({item}) => <PokemonCard data={item} />}
          />
        </View>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    marginTop: StatusBar.currentHeight || 0,
    paddingHorizontal: 14,
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
    alignItems: 'center',
    backgroundColor: "#ebf3f5",
    marginVertical: 10,
    padding: 14,
    borderRadius: 5,
  },
  txtInput: {
    fontSize: 17,
    marginLeft: 10,
  }
});

export default Home;