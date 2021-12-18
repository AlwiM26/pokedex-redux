import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { Ionicons, FontAwesome } from "@expo/vector-icons";

const { width, height } = Dimensions.get("screen");

const AboutSection = ({ pokemonData }) => {
  const {
    textEntries,
    height,
    weight,
    abilities,
    genderRate,
    eggGroups,
    habitat,
    captureRate,
    growthRate,
  } = pokemonData;

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>About</Text>
        <Text style={styles.textEntries}>{textEntries}</Text>
        <Text style={styles.characteristicTitle}>Characteristic</Text>
        <View style={styles.characteristicContainer}>
          <View style={styles.itemContainer}>
            <Text style={{ flex: 1 }}>Habitat</Text>
            <Text style={{ flex: 2 }}>{habitat}</Text>
          </View>

          <View style={styles.itemContainer}>
            <Text style={{ flex: 1 }}>Height</Text>
            <Text style={{ flex: 2 }}>
              {height / 10} m ({(height / 3.048).toFixed(2)} ft)
            </Text>
          </View>

          <View style={styles.item}>
            <Text style={{ flex: 1 }}>Weight</Text>
            <Text style={{ flex: 2 }}>
              {weight / 10} kg ({(weight / 4.536).toFixed(2)} lbs)
            </Text>
          </View>

          <View style={styles.itemContainer}>
            <Text style={{ flex: 1 }}>Abilities</Text>
            <View style={{ flexDirection: "row", flex: 2 }}>
              {abilities.map((item, id) => {
                if (id === abilities.length - 1) {
                  return <Text key={id}>{item.ability.name}</Text>;
                } else {
                  return <Text key={id}>{item.ability.name}, </Text>;
                }
              })}
            </View>
          </View>

          <View style={styles.itemContainer}>
            <Text style={{ flex: 1 }}>Gender rate</Text>
            <View style={{ flex: 2 }}>
              {genderRate === -1 ? (
                <View style={{ flexDirection: "row" }}>
                  <FontAwesome name="genderless" size={16} color="#111" />
                  <Text>Genderless</Text>
                </View>
              ) : (
                <View style={{ flexDirection: "row" }}>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Ionicons name="male" size={20} color="#59BCFF" />
                    <Text>{100 - genderRate} %</Text>
                  </View>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Ionicons name="female" size={20} color="#FF80F0" />
                    <Text>{genderRate} %</Text>
                  </View>
                </View>
              )}
            </View>
          </View>

          <View style={styles.itemContainer}>
            <Text style={{ flex: 1 }}>Egg groups</Text>
            <View style={{ flexDirection: "row", flex: 2 }}>
              {eggGroups.map((item, id) => {
                if (id === eggGroups.length - 1) {
                  return <Text key={id}>{item.name}</Text>;
                } else {
                  return <Text key={id}>{item.name}, </Text>;
                }
              })}
            </View>
          </View>

          <View style={styles.itemContainer}>
            <Text style={{ flex: 1 }}>Capture rate</Text>
            <View style={{ flex: 2 }}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Text>0</Text>
                <View
                  style={{
                    height: 7,
                    backgroundColor: "#d1d3d7",
                    width: 150,
                    borderRadius: 10,
                    marginHorizontal: 6,
                  }}
                >
                  <View
                    style={{
                      height: 7,
                      backgroundColor: "blue",
                      width: (captureRate / 255) * 150,
                      borderRadius: 10,
                    }}
                  />
                </View>
                <Text>255</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: width - 28,
    justifyContent: "center",
    alignItems: "center",
  },
  contentContainer: {
    flex: 1,
    width: width - 40,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 1,
  },
  textEntries: {
    fontSize: 15,
    textAlign: "justify",
    marginBottom: 8,
  },
  characteristicTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 8,
  },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 5,
  },
});

export default AboutSection;
