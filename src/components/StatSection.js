import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("screen");

const StatSection = ({ stats }) => {
  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Stats</Text>
        <View style={{ marginTop: 15 }}>
          {stats.map((item, id) => {
            const stat = (item.base_stat / 130) * 150;
            const barColor = stat > 50 ? "#56D3B6" : "#FC7E7E";

            return (
              <View key={id} style={styles.statsContainer}>
                <View style={styles.statsLeft}>
                  <Text style={{ color: "#BBB" }}>{item.stat.name}</Text>
                  <Text style={{ fontWeight: "700" }}>{item.base_stat}</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <View style={styles.statBar}>
                    <View
                      style={{
                        height: 7,
                        backgroundColor: barColor,
                        width: stat > 130 ? 150 : stat,
                        borderRadius: 10,
                      }}
                    />
                  </View>
                </View>
              </View>
            );
          })}
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
  statsContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },
  statsLeft: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginRight: 16,
  },
  statBar: {
    height: 7,
    backgroundColor: "#EEE",
    width: 150,
    borderRadius: 10,
    marginHorizontal: 6,
  },
});

export default StatSection;
