import {View, Text, Image, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import {backgroundColors, textColors} from '../assets/colors';

const Pokemon = props => {
  const [pokemon, setPokemon] = useState({});
  const [isLoading, setLoading] = useState(true);
  const [pokemonColor, setPokemonColor] = useState('white');
  const imgURI = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${props.pokemonID}.png`;

  const pokemonName = props.name.charAt(0).toUpperCase() + props.name.slice(1);

  useEffect(() => {
    fetch(props.pokemonURL)
      .then(response => response.json())
      .then(json => {
        setPokemon(json);
        fetch(json.species.url)
          .then(response => response.json())
          .then(json => {
            setPokemonColor(json.color.name);
          })
          .catch(error => console.error(error))
          .finally(() => setLoading(false));
      })
      .catch(error => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <View
      style={[
        styles.pokemonCard,
        {backgroundColor: backgroundColors[pokemonColor]},
      ]}>
      <View style={{flex: 1}}>
        <Text style={{color: textColors[pokemonColor]}}>
          Pokemon id: {props.pokemonID}
        </Text>
        <Text style={[styles.pokemonName, {color: textColors[pokemonColor]}]}>
          {pokemonName}
        </Text>
      </View>

      <Image source={{uri: imgURI}} style={styles.pokemonImage} />

    </View>
  );
};

const styles = StyleSheet.create({
  pokemonCard: {
    marginBottom: 10,
    padding: 14,
    flexDirection: 'row',
    borderRadius: 10,
  },

  pokemonImage: {
    height: 100,
    aspectRatio: 1,
  },

  pokemonName: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default Pokemon;
