import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  TextInput,
  Image,
} from 'react-native';
import Pokemon from './Pokemon';

const PokemonItems = ({navigation}) => {
  const [pokemon_list, setPokemonList] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [search_text, setSearchText] = useState('');
  const [filtered_data, setFilteredData] = useState([]);

  const getPokemonID = url => {
    const endpoint = url.split('/');
    const index = endpoint.length - 2;
    return endpoint[index];
  };

  const search = search_value => {
    setSearchText({searchText: search_value});

    let filteredData = pokemon_list.filter(function (item) {
      return item.name.includes(search_value);
    });

    setFilteredData(filteredData);
  };

  // get pokemon data from api
  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=10000&offset=0')
      .then(response => response.json())
      .then(json => setPokemonList(json.results))
      .catch(error => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <View>
      {/* search bar */}
      <View style={{flexDirection: 'row', padding: 8}}>
        <TextInput
          style={styles.input}
          placeholder="Search Class..."
          autoCapitalize="none"
          autoCorrect={false}
          onChangeText={search}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => search(search_text)}>
          <Image
            source={require('./../assets/search.png')}
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>

      {isLoading ? (
        <Text>Loading Pokemon</Text>
      ) : (
        <FlatList
          style={{height: 1000}}
          contentContainerStyle={{padding: 8}}
          data={
            filtered_data && filtered_data.length > 0
              ? filtered_data
              : pokemon_list
          }
          keyExtractor={item => {
            item.key;
          }}
          renderItem={({item}) => (
            // pokemon card
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('PokemonInfo', {
                  url: item.url,
                  pokemonID: getPokemonID(item.url),
                })
              }>
              <Pokemon
                name={item.name}
                pokemonURL={item.url}
                pokemonID={getPokemonID(item.url)}
              />
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
  },
  input: {
    flex: 1,
    color: 'black',
    borderStyle: 'solid',
    borderWidth: 0.5,
    borderBottomColor: '#828081',
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8
  },
  button: {
    padding: 15,
    backgroundColor: '#0165b1',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopRightRadius: 8, 
    borderBottomRightRadius: 8
  },
  icon: {
    height: 20,
    width: 20,
  },
});

export default PokemonItems;
