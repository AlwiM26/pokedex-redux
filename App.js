import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Image, ActivityIndicator, StyleSheet } from "react-native";
import Home from "./src/screens/Home";
import api from './src/services/api';

const App = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get("/pokemon?limit=50");

        res.data.results.map(async pokemon => {
          try {
            const pokemonDetail = await api.get(`/pokemon/${pokemon.name}`);
            setData(prevPokemon => [...prevPokemon, pokemonDetail.data]);
          } catch (error) {
            console.log(error);
          }
        });

        setLoading(false);

      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, []);

  return (
    <Home />
    // <View style={{marginTop: 40, paddingHorizontal: 10,}}>
    //   <Text style={{fontWeight: '700', fontSize: 24,}}>Pokedex</Text>
    //   {loading && <ActivityIndicator size="large" color="green" />}
    //   <FlatList 
    //     data={data}
    //     keyExtractor={item => item.id}
    //     renderItem={({item}) => (
    //       <View>
    //         <Text>{item.name}</Text>
    //         <Image 
    //           source={{
    //             uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${item.id}.png`,
    //           }}
    //           style={{width: 50, height: 50}}
    //         />
    //         {item.types.map(a => {
    //           return (
    //             <View key={a.slot}>
    //               <Text>{a.type.name}</Text>
    //             </View>
    //           )
    //         })}
    //       </View>
    //     )}
    //   />
    // </View>
  );
};

export default App;