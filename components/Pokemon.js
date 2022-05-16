import { View, Text, Image, StyleSheet } from "react-native";
import React, {useEffect, useState} from "react";

const Pokemon = (props) => {
    const [pokemon, setPokemon] = useState();
    const [isLoading, setLoading] = useState(true);
    const imgURI = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonID}.png`

  useEffect(() => {
        fetch(props.pokemonURL)
            .then((response) => response.json())
            .then((json) => setPokemon(json.results))
            .catch((error) => console.error(error))
            .finally(() => setLoading(false));
    }, []);

    return (
        <View>
            <Text>Pokemon id: {props.pokemonID}</Text>
            <Text>{props.name}</Text>

          <Image source={{ uri: imgURI }} style={styles.pokemonImage} />

        </View>
    );
}

const styles = StyleSheet.create({
  pokemonImage: {
    width: '75%',
    height: '70%',
  },
})

export default Pokemon
