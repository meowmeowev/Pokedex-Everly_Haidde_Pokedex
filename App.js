import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import PokemonItems from './components/PokemonItems';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import PokemonInfo from './components/PokemonInfo';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={PokemonItems}
          options={{
            header: () => (
              <View style={{backgroundColor: '#CC0000', alignItems: 'center', justifyContent: 'center', height: 56}}>
                <Image
                  source={require('./assets/pokedex.png')}
                  resizeMode="contain"
                  style={{
                    height: 40,
                    width: '100%',
                  }}
                />
              </View>
            ),
            headerVisible: false,
          }}
        />
        <Stack.Screen
          name="PokemonInfo"
          component={PokemonInfo}
          options={{title: 'Pokemon Info'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 200,
  },
});

export default App;
