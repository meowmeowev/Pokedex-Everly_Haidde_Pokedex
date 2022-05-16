import {View, Text, Image} from "react-native";
import { SvgCssUri } from 'react-native-svg';
import React, {useEffect, useState} from "react";

const PokemonInfo = ({ navigation, route }) => {
    const [pokemon, setPokemon] = useState({});
    const [isLoading, setLoading] = useState(true);
    const svgURI = `https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${route.params.id}.svg`

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

            <SvgCssUri
                width="70%"
                height="70%"
                uri= {svgURI}
            />

        </View>
    );
}

export default PokemonInfo
