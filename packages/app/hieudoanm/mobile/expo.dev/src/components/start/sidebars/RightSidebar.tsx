import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { CurrencyTab } from './tabs/CurrencyTab';
import { DateTimeTab } from './tabs/DateTimeTab';
import { PassportTab } from './tabs/PassportTab';

type RightTab = 'currency' | 'date-time' | 'passport';

const TABS: { id: RightTab; label: string }[] = [
  { id: 'currency', label: 'Currency' },
  { id: 'date-time', label: 'Date/Time' },
  { id: 'passport', label: 'Passport' },
];

export function RightSidebar({ times }: { times: string[] }) {
  const [tab, setTab] = useState<RightTab>('date-time');

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
        {tab === 'currency' && <CurrencyTab />}
        {tab === 'date-time' && <DateTimeTab times={times} />}
        {tab === 'passport' && <PassportTab />}
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
