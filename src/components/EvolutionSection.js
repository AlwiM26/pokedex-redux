import React from "react";
import { View, Text, Image, ImageBackground, FlatList, StyleSheet, Dimensions } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import bg from '../assets/poke-back.png';

const { width } = Dimensions.get("screen");

const EvolutionSection = ({ evolutionChain }) => {

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Evolution</Text>
        <View style={{ flex: 1, justifyContent: 'space-around', }}>
          <FlatList
            data={evolutionChain}
            keyExtractor={(item) => item.minLevel}
            renderItem={({ item }) => (
              <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', marginVertical: 10}}>
                <View style={{marginVertical: 10}}>
                  <ImageBackground
                    source={bg}
                    style={{width: 120, height: 120, justifyContent: 'center', alignItems: 'center'}}
                  >
                    <Image
                      source={{
                        uri: item.pokemonSprite,
                      }}
                      style={{ width: 115, height: 115 }}
                    />
                  </ImageBackground>
                  <Text>{item.pokemonName}</Text>
                </View>
                <View>
                  <ImageBackground
                    source={bg}
                    style={{width: 120, height: 120, justifyContent: 'center', alignItems: 'center'}}
                  >
                    <Image
                      source={{
                        uri: item.evolveToSprite,
                      }}
                      style={{ width: 115, height: 115 }}
                    />
                  </ImageBackground>
                  <Text>{item.evolveToName}</Text>
                </View>
              </View>
            )}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: width,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'white',
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
  },
  contentContainer: {
    flex: 1,
    width: width,
    paddingHorizontal: 14,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    marginTop: 10,
  },
});

export default EvolutionSection;
