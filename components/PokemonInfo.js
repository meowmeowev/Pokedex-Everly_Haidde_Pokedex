import {View, Text, Image} from "react-native";
import React, {useEffect, useState} from "react";

const PokemonInfo = ({ navigation, route }) => {
    const [pokemon, setPokemon] = useState({});
    const [isLoading, setLoading] = useState(true);
    const imgURI = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonID}.png`

  useEffect(() => {
        fetch(route.params.url)
            .then((response) => response.json())
            .then((json) => setPokemon(json))
            .catch((error) => console.error(error))
            .finally(() => setLoading(false));
    }, []);

    return (
        <View>
            <Text>Pokemon id: {route.params.id}</Text>
            <Text>{pokemon.name}</Text>

              <Image
                source={{ uri: imgURI }}
                style={{ width: '100%', height: '70%' }}
              />

        </View>
    );
}

export default PokemonInfo;
