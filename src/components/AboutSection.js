import React from "react";
import { View, ScrollView, Text, StyleSheet, Dimensions } from "react-native";
import { Ionicons, FontAwesome } from "@expo/vector-icons";

const { width } = Dimensions.get("screen");

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
  } = pokemonData;

  return (
    <View style={styles.container} >
      <View style={styles.contentContainer}>
        <ScrollView
          showsVerticalScrollIndicator={false}
        >
        <Text style={styles.title}>About</Text>
        <Text style={styles.textEntries}>{textEntries}</Text>
        <Text style={styles.characteristicTitle}>Characteristic</Text>
        <View style={styles.characteristicContainer}>
          <View style={styles.itemContainer}>
            <Text style={{ flex: 1, color: "#BBB" }}>Habitat</Text>
            <Text style={{ flex: 2, fontWeight: "500" }}>{habitat}</Text>
          </View>

          <View style={styles.itemContainer}>
            <Text style={{ flex: 1, color: "#BBB" }}>Height</Text>
            <Text style={{ flex: 2, fontWeight: "500" }}>
              {height / 10} m ({(height / 3.048).toFixed(2)} ft)
            </Text>
          </View>

          <View style={styles.itemContainer}>
            <Text style={{ flex: 1, color: "#BBB" }}>Weight</Text>
            <Text style={{ flex: 2, fontWeight: "500" }}>
              {weight / 10} kg ({(weight / 4.536).toFixed(2)} lbs)
            </Text>
          </View>

          <View style={styles.itemContainer}>
            <Text style={{ flex: 1, color: "#BBB" }}>Abilities</Text>
            <View style={{ flexDirection: "row", flex: 2 }}>
              {abilities.map((item, id) => {
                if (id === abilities.length - 1) {
                  return (
                    <Text key={id} style={{ fontWeight: "500" }}>
                      {item.ability.name}
                    </Text>
                  );
                } else {
                  return (
                    <Text key={id} style={{ fontWeight: "500" }}>
                      {item.ability.name},{" "}
                    </Text>
                  );
                }
              })}
            </View>
          </View>

          <View style={styles.itemContainer}>
            <Text style={{ flex: 1, color: "#BBB" }}>Gender rate</Text>
            <View style={{ flex: 2 }}>
              {genderRate === -1 ? (
                <View style={{ flexDirection: "row" }}>
                  <FontAwesome name="genderless" size={16} color="#111" />
                  <Text style={{ fontWeight: "500" }}> Genderless</Text>
                </View>
              ) : (
                <View style={{ flexDirection: "row" }}>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Ionicons name="male" size={20} color="#59BCFF" />
                    <Text style={{ fontWeight: "500" }}>
                      {" "}
                      {100 - genderRate} %
                    </Text>
                  </View>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Ionicons name="female" size={20} color="#FF80F0" />
                    <Text style={{ fontWeight: "500" }}> {genderRate} %</Text>
                  </View>
                </View>
              )}
            </View>
          </View>

          <View style={styles.itemContainer}>
            <Text style={{ flex: 1, color: "#BBB" }}>Egg groups</Text>
            <View style={{ flexDirection: "row", flex: 2 }}>
              {eggGroups.map((item, id) => {
                if (id === eggGroups.length - 1) {
                  return (
                    <Text key={id} style={{ fontWeight: "500" }}>
                      {item.name}
                    </Text>
                  );
                } else {
                  return (
                    <Text key={id} style={{ fontWeight: "500" }}>
                      {item.name},{" "}
                    </Text>
                  );
                }
              })}
            </View>
          </View>

          <View style={styles.itemContainer}>
            <Text style={{ flex: 1, color: "#BBB" }}>Capture rate</Text>
            <View style={{ flex: 2 }}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Text style={{ fontWeight: "500" }}>0</Text>
                <View
                  style={{
                    height: 7,
                    backgroundColor: "#EEE",
                    width: 150,
                    borderRadius: 10,
                    marginHorizontal: 6,
                  }}
                >
                  <View
                    style={styles.captureRateBar(captureRate)}
                  />
                </View>
                <Text style={{ fontWeight: "500" }}>255</Text>
              </View>
            </View>
          </View>
        </View>
        </ScrollView>
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
    marginBottom: 8,
    marginTop: 10,
  },
  textEntries: {
    fontSize: 15,
    textAlign: "justify",
    marginBottom: 20,
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
  captureRateBar: captureRate => ({
    height: 7,
    backgroundColor: captureRate > 125 ? "#56D3B6" : "#FC7E7E",
    width: (captureRate / 255) * 150,
    borderRadius: 10,
  }),
});

export default AboutSection;
