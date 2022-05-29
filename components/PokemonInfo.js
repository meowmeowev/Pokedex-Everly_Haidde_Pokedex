import {View, Text, Image, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';

const PokemonInfo = ({navigation, route}) => {
  const [pokemon, setPokemon] = useState({});
  const [isLoading, setLoading] = useState(true);
  const imgURI = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${route.params.pokemonID}.png`;

  useEffect(() => {
    setTimeout(
      () =>
        fetch(route.params.url)
          .then(response => response.json())
          .then(json => {
            let newJson = json;
            newJson.name =
              newJson.name.charAt(0).toUpperCase() + newJson.name.slice(1);
            setPokemon(newJson);
          })
          .catch(error => console.error(error))
          .finally(() => setLoading(false)),
      1000,
    )
  }, []);

  return (
    <View style={{alignItems: 'center', justifyContent: 'center'}}>
      {isLoading ? (
        <View
          style={{backgroundColor: '#3498DB', height: '100%', width: '100%'}}>
          <Image
            style={{width: '100%'}}
            source={require('./../assets/loading.png')}
          />
        </View>
      ) : (
        <View style={{alignItems: 'center'}}>
          <Text style={{color: 'black', fontSize: 20}}>
            POKEMON ID: {route.params.pokemonID}
          </Text>
          <Text style={{color: 'black', fontSize: 32}}>{pokemon.name}</Text>
          <Image
            source={{uri: imgURI}}
            style={{width: '70%', aspectRatio: 1, alignSelf: 'center'}}
          />

          <View>
            <Text style={styles.stats}>Height: {pokemon.height}</Text>
            <Text style={styles.stats}>Weight: {pokemon.weight}</Text>
            <Text style={styles.stats}>STATS</Text>
            <Text style={styles.stats}>HP: {pokemon.stats[0].base_stat}</Text>
            <Text style={styles.stats}>
              Attack: {pokemon.stats[1].base_stat}
            </Text>
            <Text style={styles.stats}>
              Defense: {pokemon.stats[2].base_stat}
            </Text>
            <Text style={styles.stats}>
              Special Attack: {pokemon.stats[3].base_stat}
            </Text>
            <Text style={styles.stats}>
              Special Defense: {pokemon.stats[4].base_stat}
            </Text>
            <Text style={styles.stats}>
              Speed: {pokemon.stats[5].base_stat}
            </Text>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  stats: {
    fontSize: 20,
  },
});

export default PokemonInfo;
