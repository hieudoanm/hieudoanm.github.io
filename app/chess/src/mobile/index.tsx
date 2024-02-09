import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { registerRootComponent } from 'expo';
import { StatusBar } from 'expo-status-bar';
import React from 'react';

import { ApolloProvider } from '@apollo/client';
import {
  GRAPHQL_URI,
  NEXT_PUBLIC_GRAPHQL_URI,
} from '@chess/common/environments/environments';
import { getApolloClient } from '@chess/graphql/apollo/client';
import InsightsPage from '@chess/mobile/insights';
import PlayersPage from '@chess/mobile/players';

const URI: string = NEXT_PUBLIC_GRAPHQL_URI ?? GRAPHQL_URI ?? '';

const Stack = createNativeStackNavigator();

const App: React.FC = () => {
  return (
    <ApolloProvider client={getApolloClient(URI)}>
      <StatusBar style="auto" />
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Insights" component={InsightsPage} />
          <Stack.Screen name="Players" component={PlayersPage} />
        </Stack.Navigator>
      </NavigationContainer>
    </ApolloProvider>
  );
};

export default App;

registerRootComponent(App);
