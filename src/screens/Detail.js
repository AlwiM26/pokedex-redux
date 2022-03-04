import React from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  View,
  SafeAreaView,
  ScrollView,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  FlatList,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import AboutSection from "../components/AboutSection";
import StatSection from "../components/StatSection";
import EvolutionSection from "../components/EvolutionSection";
import getColor from "../assets/Style/Colors";
import bg from '../assets/poke-back.png';

const Detail = () => {
  const route = useRoute();
  const navigator = useNavigation();
  const data = route.params.pokemonData;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: getColor(data.color) }}>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={() => navigator.goBack()}>
            <AntDesign name="arrowleft" size={30} color="black" />
          </TouchableOpacity>
          <Text style={styles.title}>{data.name}</Text>
          <TouchableOpacity>
            <AntDesign name="hearto" size={30} color="black" />
          </TouchableOpacity>
        </View>
        <View style={styles.contentContainer}>
          <View
            style={{
              alignSelf: "center",
              padding: 10,
              marginBottom: 10,
              borderRadius: 10,
            }}
          >
            <ImageBackground
              source={bg}
              style={{width: 255, height: 255}}
            >
              <Image
                source={{ uri: data.pokemonSprite }}
                style={{
                  width: 250,
                  height: 250,
                }}
              />
            </ImageBackground>
          </View>
          <ScrollView
            horizontal={true}
            pagingEnabled
            snapToAlignment="center"
            showsHorizontalScrollIndicator={false}
          >
            <AboutSection pokemonData={data} />
            <StatSection stats={data.stats} />
            <EvolutionSection evolutionChain={data.evolutionChain} />
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    paddingHorizontal: 14,
  },
  title: {
    fontSize: 25,
    fontWeight: "500",
  },
  contentContainer: {
    flex: 1,
  },
  indicatorContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  indicatorDot: {
    width: 8,
    height: 8,
    borderRadius: 5,
    backgroundColor: "black",
    margin: 10,
  },
});

export default Detail;
