import {
  convert,
  CURRENCIES,
  CURRENCY_NAMES,
  QUICK_PAIRS,
} from '@/data/currencies';
import { useCallback, useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

export function CurrencyTab() {
  const [from, setFrom] = useState('USD');
  const [to, setTo] = useState('SGD');
  const [amount, setAmount] = useState('1');

  const converted = useCallback(() => {
    const n = Number.parseFloat(amount);
    if (Number.isNaN(n) || n < 0) return null;
    return convert(n, from, to);
  }, [amount, from, to])();

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.field}>
        <Text style={styles.label}>Amount</Text>
        <TextInput
          value={amount}
          onChangeText={setAmount}
          keyboardType="decimal-pad"
          style={styles.amountInput}
          placeholderTextColor="rgba(220,165,77,0.6)"
        />
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>From</Text>
        <View style={styles.currencyRow}>
          {CURRENCIES.slice(0, 8).map((c) => (
            <Pressable
              key={c}
              onPress={() => setFrom(c)}
              style={[
                styles.currencyChip,
                from === c && styles.currencyChipActive,
              ]}>
              <Text
                style={[
                  styles.currencyChipText,
                  from === c && styles.currencyChipTextActive,
                ]}>
                {c}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>

      <Pressable
        onPress={() => {
          setFrom(to);
          setTo(from);
        }}
        style={({ pressed }) => [
          styles.swapButton,
          pressed && styles.swapPressed,
        ]}>
        <Text style={styles.swapText}>⇅ Swap</Text>
      </Pressable>

      <View style={styles.field}>
        <Text style={styles.label}>To</Text>
        <View style={styles.currencyRow}>
          {CURRENCIES.slice(0, 8).map((c) => (
            <Pressable
              key={c}
              onPress={() => setTo(c)}
              style={[
                styles.currencyChip,
                to === c && styles.currencyChipActive,
              ]}>
              <Text
                style={[
                  styles.currencyChipText,
                  to === c && styles.currencyChipTextActive,
                ]}>
                {c}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>

      <View style={styles.resultBox}>
        {converted !== null ? (
          <>
            <Text style={styles.resultSub}>
              {parseFloat(amount || '0').toLocaleString()} {from} =
            </Text>
            <Text style={styles.resultMain}>
              {converted.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 4,
              })}
              <Text style={styles.resultUnit}> {to}</Text>
            </Text>
            <Text style={styles.resultRate}>
              1 {from} ={' '}
              {convert(1, from, to).toLocaleString(undefined, {
                minimumFractionDigits: 4,
                maximumFractionDigits: 6,
              })}{' '}
              {to}
            </Text>
          </>
        ) : (
          <Text style={styles.resultSub}>Enter a valid amount</Text>
        )}
      </View>

      <View style={styles.quickSection}>
        <Text style={styles.quickLabel}>1 {from} vs majors</Text>
        {QUICK_PAIRS.filter((c) => c !== from).map((currency) => {
          const rate = convert(1, from, currency);
          const isTarget = currency === to;
          return (
            <Pressable
              key={currency}
              onPress={() => setTo(currency)}
              style={[styles.quickRow, isTarget && styles.quickRowActive]}>
              <View style={styles.quickInfo}>
                <Text
                  style={[
                    styles.quickCode,
                    isTarget && styles.quickCodeActive,
                  ]}>
                  {currency}
                </Text>
                <Text style={styles.quickName}>
                  {CURRENCY_NAMES[currency]?.split(' ')[0]}
                </Text>
              </View>
              <Text
                style={[styles.quickRate, isTarget && styles.quickRateActive]}>
                {rate.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 4,
                })}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <Text style={styles.footerNote}>Rates via ECB</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 12, gap: 12 },
  field: { gap: 4 },
  label: {
    fontSize: 10,
    letterSpacing: 1,
    textTransform: 'uppercase',
    color: 'rgba(220,165,77,0.6)',
  },
  amountInput: {
    backgroundColor: '#171618',
    borderWidth: 1,
    borderColor: '#1e1d1f',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 18,
    fontFamily: 'ui-monospace',
    fontWeight: '700',
    color: '#fff',
  },
  currencyRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 4 },
  currencyChip: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#1e1d1f',
  },
  currencyChipActive: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderColor: '#ffffff',
  },
  currencyChipText: { fontSize: 12, fontWeight: '700', color: '#dca54d' },
  currencyChipTextActive: { color: '#ffffff' },
  swapButton: {
    borderWidth: 1,
    borderColor: '#1e1d1f',
    borderRadius: 8,
    paddingVertical: 8,
    alignItems: 'center',
  },
  swapPressed: { opacity: 0.7 },
  swapText: { fontFamily: 'ui-monospace', letterSpacing: 2, color: '#fff' },
  resultBox: {
    backgroundColor: '#171618',
    borderWidth: 1,
    borderColor: '#1e1d1f',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
  },
  resultSub: {
    fontSize: 10,
    fontFamily: 'ui-monospace',
    letterSpacing: 1,
    textTransform: 'uppercase',
    color: 'rgba(220,165,77,0.6)',
    marginBottom: 4,
  },
  resultMain: {
    fontSize: 24,
    fontFamily: 'ui-monospace',
    fontWeight: '700',
    letterSpacing: -0.5,
    color: '#ffffff',
  },
  resultUnit: { fontSize: 16, color: 'rgba(220,165,77,0.6)' },
  resultRate: {
    fontSize: 10,
    fontFamily: 'ui-monospace',
    color: 'rgba(220,165,77,0.6)',
    marginTop: 4,
  },
  quickSection: { gap: 4 },
  quickLabel: {
    fontSize: 10,
    letterSpacing: 1,
    textTransform: 'uppercase',
    color: 'rgba(220,165,77,0.6)',
    marginBottom: 4,
  },
  quickRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 8,
  },
  quickRowActive: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  quickInfo: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  quickCode: {
    fontSize: 12,
    fontFamily: 'ui-monospace',
    fontWeight: '700',
    color: '#dca54d',
  },
  quickCodeActive: { color: '#ffffff' },
  quickName: { fontSize: 10, color: 'rgba(220,165,77,0.6)' },
  quickRate: { fontSize: 12, fontFamily: 'ui-monospace', color: '#dca54d' },
  quickRateActive: { color: '#ffffff', fontWeight: '700' },
  footerNote: {
    fontSize: 10,
    fontFamily: 'ui-monospace',
    letterSpacing: 1,
    textTransform: 'uppercase',
    textAlign: 'center',
    opacity: 0.2,
    paddingTop: 4,
    color: '#fff',
  },
});
