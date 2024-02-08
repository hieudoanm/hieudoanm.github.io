import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { registerRootComponent } from 'expo';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet } from 'react-native';

import InsightsPage from '@chess/mobile/insights';
import PlayersPage from '@chess/mobile/players';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const Stack = createNativeStackNavigator();

const App: React.FC = () => {
  return (
    <>
      <StatusBar style="auto" />
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Insights" component={InsightsPage} />
          <Stack.Screen name="Players" component={PlayersPage} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default App;

registerRootComponent(App);
