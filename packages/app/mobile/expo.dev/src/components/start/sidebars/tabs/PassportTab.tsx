import { countries } from '@/data/countries';
import { useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

type Country = {
  name: string;
  official_name: string;
  region: string;
  subregion: string;
  cca2: string;
  cca3: string;
  flag: string;
  rank: number;
};

const REGIONS = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'] as const;

const ranked = (countries as Country[])
  .filter((c) => c.rank > 0)
  .sort((a, b) => a.rank - b.rank);

export function PassportTab() {
  const [search, setSearch] = useState('');
  const [region, setRegion] = useState('');

  const filtered = ranked.filter((c) => {
    const matchesSearch =
      search === '' ||
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.cca2.toLowerCase().includes(search.toLowerCase()) ||
      c.cca3.toLowerCase().includes(search.toLowerCase());
    const matchesRegion = region === '' || c.region === region;
    return matchesSearch && matchesRegion;
  });

  return (
    <View style={styles.container}>
      <View style={styles.searchSection}>
        <TextInput
          value={search}
          onChangeText={setSearch}
          placeholder="Search country, CCA2, CCA3…"
          placeholderTextColor="rgba(220,165,77,0.6)"
          style={styles.searchInput}
        />
        <View style={styles.regionRow}>
          <Pressable
            onPress={() => setRegion('')}
            style={[
              styles.regionChip,
              region === '' && styles.regionChipActive,
            ]}>
            <Text
              style={[
                styles.regionChipText,
                region === '' && styles.regionChipTextActive,
              ]}>
              All
            </Text>
          </Pressable>
          {REGIONS.map((r) => (
            <Pressable
              key={r}
              onPress={() => setRegion((prev) => (prev === r ? '' : r))}
              style={[
                styles.regionChip,
                region === r && styles.regionChipActive,
              ]}>
              <Text
                style={[
                  styles.regionChipText,
                  region === r && styles.regionChipTextActive,
                ]}>
                {r}
              </Text>
            </Pressable>
          ))}
        </View>
        <Text style={styles.countLabel}>
          {filtered.length} countr{filtered.length === 1 ? 'y' : 'ies'}
        </Text>
      </View>
      <ScrollView style={styles.listArea}>
        <View style={styles.countryList}>
          {filtered.map((c) => (
            <View key={c.cca3} style={styles.countryRow}>
              <Text style={styles.rank}>#{c.rank}</Text>
              <Text style={styles.flag}>{c.flag}</Text>
              <View style={styles.countryInfo}>
                <Text style={styles.countryName} numberOfLines={1}>
                  {c.name}
                </Text>
                <Text style={styles.countryMeta}>
                  {c.cca2} · {c.subregion}
                </Text>
              </View>
            </View>
          ))}
        </View>
        {filtered.length === 0 && (
          <Text style={styles.empty}>No countries match.</Text>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  searchSection: {
    padding: 12,
    gap: 8,
    borderBottomWidth: 1,
    borderColor: '#1e1d1f',
  },
  searchInput: {
    backgroundColor: '#171618',
    borderWidth: 1,
    borderColor: '#1e1d1f',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    fontSize: 12,
    color: '#fff',
  },
  regionRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 4 },
  regionChip: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#1e1d1f',
  },
  regionChipActive: { backgroundColor: '#ffffff' },
  regionChipText: { fontSize: 10, color: '#dca54d' },
  regionChipTextActive: { color: '#161616' },
  countLabel: {
    fontSize: 10,
    letterSpacing: 1,
    textTransform: 'uppercase',
    fontWeight: '700',
    color: 'rgba(220,165,77,0.6)',
  },
  listArea: { flex: 1 },
  countryList: { paddingHorizontal: 12 },
  countryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderColor: 'rgba(30,29,31,0.3)',
  },
  rank: {
    width: 28,
    textAlign: 'right',
    fontSize: 10,
    fontFamily: 'ui-monospace',
    color: 'rgba(220,165,77,0.6)',
  },
  flag: { fontSize: 18 },
  countryInfo: { flex: 1, minWidth: 0 },
  countryName: { fontSize: 12, fontWeight: '500', color: '#fff' },
  countryMeta: { fontSize: 10, color: 'rgba(220,165,77,0.6)' },
  empty: {
    textAlign: 'center',
    paddingVertical: 24,
    fontSize: 12,
    color: 'rgba(220,165,77,0.35)',
  },
});
