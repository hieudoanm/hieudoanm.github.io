import { StyleSheet, Text, View } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export const InsightsPage: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text>Insights!</Text>
    </View>
  );
};

export default InsightsPage;
