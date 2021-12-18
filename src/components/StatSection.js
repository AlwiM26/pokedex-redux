import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("screen");

const StatSection = (props) => {
  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Stats</Text>
        <Text style={styles.textEntries}>{props.textEntries}</Text>
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
  },
  textEntries: {
    fontSize: 15,
    textAlign: "justify",
  },
});

export default StatSection;
