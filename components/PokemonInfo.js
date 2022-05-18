import {View, Text, Image, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';

const PokemonInfo = ({navigation, route}) => {
  const [pokemon, setPokemon] = useState({});
  const [isLoading, setLoading] = useState(true);
  const imgURI = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${route.params.pokemonID}.png`;

  useEffect(() => {
    fetch(route.params.url)
      .then(response => response.json())
      .then(json => {
        let newJson = json;
        newJson.name =
          newJson.name.charAt(0).toUpperCase() + newJson.name.slice(1);
        setPokemon(newJson);
      })
      .catch(error => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <View>
      <Text style={{color: 'black'}}>Pokemon id: {route.params.id}</Text>
      <Text style={{color: 'black'}}>{pokemon.name}</Text>

      <Image source={{uri: imgURI}} style={{height: '70%', aspectRatio: 1}} />
    </View>
  );
};

const styles = StyleSheet.create({});

export default PokemonInfo;
