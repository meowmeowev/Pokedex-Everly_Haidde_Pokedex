import {View, Text, Image} from "react-native";
import { SvgCssUri } from 'react-native-svg';
import React, {useEffect, useState} from "react";

const Pokemon = (props) => {
    const [pokemon, setPokemon] = useState();
    const [isLoading, setLoading] = useState(true);
    const svgURI = `https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${props.pokemonID}.svg`

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

            <SvgCssUri
                width="70%"
                height="70%"
                uri= {svgURI}
            />

        </View>
    );
}

export default Pokemon
