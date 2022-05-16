import { View, Text, Image, StyleSheet } from "react-native";
import React, {useEffect, useState} from "react";

const PokemonInfo = ({ navigation, route }) => {
    const [pokemon, setPokemon] = useState({});
    const [isLoading, setLoading] = useState(true);
    const imgURI = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${route.params.pokemonID}.png`

  useEffect(() => {
        fetch(route.params.url)
            .then((response) => response.json())
            .then((json) => setPokemon(json))
            .catch((error) => console.error(error))
            .finally(() => setLoading(false));
    }, []);

    return (
        <View>
            <Text style={{color: 'black'}}>Pokemon id: {route.params.id}</Text>
            <Text style={{color: 'black'}}>{pokemon.name}</Text>

              <Image
                source={{ uri: imgURI }}
                style={{ width: '100%', height: '70%' }}
              />

        </View>
    );
}



export default PokemonInfo;
