import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";

const PokemonCard = props => {
  const { id, name, types } = props.data;

  return (
    <>
      <TouchableOpacity onPress={() => alert(id)}>
        <View style={styles.cardContainer}>
          <View style={styles.leftContainer}>
            <Text style={styles.pokemonName}>{name}</Text>
            {types.map(a => {
              return (
                <View key={a.slot} style={styles.pokemonTypeContainer}>
                  <Text style={styles.pokemonType}>{a.type.name}</Text>
                </View>
              )
            })}
          </View>
          <View style={styles.rightContainer}>
            <Text style={styles.pokemonId}>#00{id}</Text>
            <Image 
              source={{
                uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
              }}
              style={{width: 140, height: 140}}
            />  
          </View>
        </View>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  cardContainer: { 
    flex: 1,
    backgroundColor: "#56D3B6", 
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginVertical: 8, 
    borderRadius: 5, 
    flexDirection: "row", 
    justifyContent: "space-around", 
    alignItems: "center"
  },
  leftContainer: {
    flex: 1,
  },
  pokemonName: {
    color: "white", 
    fontSize: 30, 
    fontWeight: "700"
  },
  pokemonTypeContainer: {
    marginVertical: 4, 
    alignItems: "flex-start"
  },
  pokemonType: {
    color: "white", 
    backgroundColor: "#d5e4e961", 
    borderRadius: 15, 
    alignItems: "center", 
    paddingHorizontal: 15, 
    paddingVertical: 5
  },
  rightContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
  pokemonId: {
    color: "white", 
    fontSize: 20, 
    fontWeight: "700"
  },
});

export default PokemonCard;