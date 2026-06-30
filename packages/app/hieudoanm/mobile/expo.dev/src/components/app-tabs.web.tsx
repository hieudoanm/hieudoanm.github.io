import { Tabs, TabList, TabTrigger, TabSlot } from 'expo-router/ui';
import { View, StyleSheet } from 'react-native';

export default function AppTabs() {
  return (
    <Tabs>
      <TabSlot style={{ height: '100%' }} />
      <TabList asChild>
        <View style={styles.hidden}>
          <TabTrigger name="index" href="/" />
          <TabTrigger name="explore" href="/explore" />
        </View>
      </TabList>
    </Tabs>
  );
}

const styles = StyleSheet.create({
  hidden: {
    display: 'none',
  },
});
