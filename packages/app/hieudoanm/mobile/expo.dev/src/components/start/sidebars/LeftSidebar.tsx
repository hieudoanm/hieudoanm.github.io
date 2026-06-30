import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { StatusTab } from './tabs/StatusTab';
import { TasksTab } from './tabs/TasksTab';
import { TimeTab } from './tabs/TimeTab';

type LeftTab = 'status' | 'tasks' | 'time';

const TABS: { id: LeftTab; label: string }[] = [
  { id: 'status', label: 'Status' },
  { id: 'tasks', label: 'Tasks' },
  { id: 'time', label: 'Time' },
];

export function LeftSidebar() {
  const [tab, setTab] = useState<LeftTab>('tasks');

  return (
    <View style={styles.container}>
      <View style={styles.tabBar}>
        {TABS.map(({ id, label }) => (
          <TouchableOpacity
            key={id}
            activeOpacity={0.7}
            onPress={() => setTab(id)}
            style={[styles.tab, tab === id && styles.tabActive]}>
            <Text style={[styles.tabText, tab === id && styles.tabTextActive]}>
              {label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.content}>
        {tab === 'status' && <StatusTab />}
        {tab === 'tasks' && <TasksTab />}
        {tab === 'time' && <TimeTab />}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  tabBar: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#1e1d1f',
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  tabActive: {
    borderBottomWidth: 2,
    borderColor: '#ffffff',
  },
  tabText: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1,
    textTransform: 'uppercase',
    color: 'rgba(220,165,77,0.6)',
  },
  tabTextActive: {
    color: '#ffffff',
  },
  content: {
    flex: 1,
    minHeight: 0,
  },
});
