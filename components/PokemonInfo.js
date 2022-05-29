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
        newJson.name = newJson.name.charAt(0).toUpperCase() + newJson.name.slice(1);
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
      <Text>ID: {pokemon.id}</Text>
      <Text>Height: {pokemon.height}</Text>
      <Text>Weight: {pokemon.weight}</Text>
      <Text>STATS</Text>
      <Text>HP: {pokemon.stats[0].base_stat}</Text>
      <Text>Attack: {pokemon.stats[1].base_stat}</Text>
      <Text>Defense: {pokemon.stats[2].base_stat}</Text>
      <Text>Special Attack: {pokemon.stats[3].base_stat}</Text>
      <Text>Special Defense: {pokemon.stats[4].base_stat}</Text>
      <Text>Speed: {pokemon.stats[5].base_stat}</Text>
    </View>
  );
};

const styles = StyleSheet.create({});

export default PokemonInfo;
