
import React, {useEffect, useState} from 'react';
import {
    StyleSheet,
    Text,
    View,
    FlatList, TouchableOpacity, TextInput, Image,
} from 'react-native';
import Pokemon from "./Pokemon";

const PokemonItems = ({navigation}) => {

    const [pokemon_list, setPokemonList] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [search_text, setSearchText] = useState('');
    const [filtered_data, setFilteredData] = useState([]);

    const getPokemonID = (url) =>{
        const endpoint = url.split('/')
        const index = (endpoint.length)-2;
        return endpoint[index]
    }

    const search = (search_value) => {
        setSearchText({searchText: search_value});

        let filteredData = pokemon_list.filter(function (item) {
            return item.name.includes(search_value);
        });

        setFilteredData(filteredData);
    }

    useEffect(() => {
        fetch('https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0')
            .then((response) => response.json())
            .then((json) => setPokemonList(json.results))
            .catch((error) => console.error(error))
            .finally(() => setLoading(false));
    }, []);


    return (
        <View>
            <TextInput style={styles.input}
                       placeholder="Search Class..."
                       autoCapitalize='none'
                       autoCorrect={false}
                       onChangeText={search}
            />
            <TouchableOpacity style={styles.button}
                              onPress={() => search(search_text)}>
                <Image source={require('./../assets/search.png')} style={styles.icon}/>
            </TouchableOpacity>
            {isLoading? <Text>Loading Pokemon</Text> :
                <FlatList
                    style={{height: 1000, padding: 5}}
                    data={filtered_data && filtered_data.length > 0 ? filtered_data : pokemon_list}
                    keyExtractor={(item) => {item.key}}
                    renderItem={({item}) =>
                        <TouchableOpacity style={{height: 100}}
                                          onPress={() => navigation.navigate('PokemonInfo', { url: item.url, pokemonID: getPokemonID(item.url) })}>
                            <Pokemon
                                name = {item.name}
                                pokemonURL = {item.url}
                                pokemonID = {getPokemonID(item.url)}
                            />

                        </TouchableOpacity>
                    }
                />
            }
        </View>
    );
};

const styles = StyleSheet.create({
    container:{
        flexDirection: "column",
    },
    search:{
        margin:10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    },
    input:{
        color: 'black',
        width: "85%",
        borderStyle:"solid",
        borderWidth: .5,
        borderBottomColor: "#828081"
    },
    button:{
        padding: 15,
        backgroundColor: '#0165b1',
        alignItems: "center",
        justifyContent: "center"
    },
    icon:{
        height: 20,
        width: 20
    },
    list_container: {
        flex: 1,
        paddingTop: 22
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
    },
    class_container:{
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        margin: 12,
        height: 200,
        width: "94%",
        backgroundColor: 'white',
    },
    shadowProp: {
        shadowColor: '#171717',
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    class_info:{
        padding: 10,
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        height: 140,
        width: "100%",
        backgroundColor: '#0165b1',
        justifyContent: "center"
    },
    // normal_text:{
    //     color: 'white'
    // },
    subject:{
        color: 'white',
        fontSize: 18,
        fontWeight: "bold"
    },
    class_footer:{
        padding: 10,
        flexDirection: "row",
        height: 60,
        alignItems: "center",
    },
    profile:{
        marginRight: 5,
        height: 35,
        width: 35
    },
    enter_button:{
        flexDirection: "row",
        position: "absolute",
        right: 10,
        width: 100,
        height: 35,
        marginHorizontal: "1.3%",
        alignItems: "center",
        justifyContent: "center",
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: '#0165b1'
    },
    text_button:{
        marginRight: 5,
        fontSize: 16,
        color: '#0165b1',
        fontWeight: "bold"
    },
    arrow_icon:{
        height: 13,
        width: 11
    },
    elevation: {
        elevation: 20,
        shadowColor: '#171717',
    },
});

export default PokemonItems;
