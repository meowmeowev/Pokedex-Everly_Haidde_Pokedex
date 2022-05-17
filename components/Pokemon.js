import { View, Text, Image, StyleSheet } from "react-native";
import React, {useEffect, useState} from "react";

const Pokemon = (props) => {
  const [pokemon, setPokemon] = useState();
  const [isLoading, setLoading] = useState(true);
  const imgURI = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${props.pokemonID}.png`

  const pokemonName = props.name.charAt(0).toUpperCase() + props.name.slice(1);

    useEffect(() => {
      fetch(props.pokemonURL)
        .then((response) => response.json())
        .then((json) => setPokemon(json.results))
        .catch((error) => console.error(error))
        .finally(() => setLoading(false));
    }, []);

    return (
      <View style={{backgroundColor: 'black', marginBottom: 10, padding: 5}}>
        <Text style={{color: 'white'}}>Pokemon id: {props.pokemonID}</Text>
        <Text style={{color: 'white'}}>{pokemonName}</Text>

        <Image source={{ uri: imgURI }} style={styles.pokemonImage} />
      </View>
    );
}

const styles = StyleSheet.create({
  pokemonImage: {
    height: 100,
    aspectRatio: 1,
  },
})

export default Pokemon
