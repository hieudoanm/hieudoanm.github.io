import type { WeatherData } from '@/data/weather';
import { weatherCodeToText } from '@/data/weather';
import { StyleSheet, Text, View } from 'react-native';

export function WeatherBadge({ weather }: { weather?: WeatherData }) {
  if (!weather) {
    return <Text style={styles.weatherPlaceholder}>…</Text>;
  }
  return (
    <View style={styles.weatherBadge}>
      <Text style={styles.temp}>{weather.temperature_2m}°C</Text>
      <Text style={styles.weatherDesc}>
        {weatherCodeToText(weather.weather_code)}
      </Text>
    </View>
  );
}

export function CityCard({
  label,
  time,
  weather,
  ...rest
}: {
  label: string;
  time: string;
  weather?: WeatherData;
  index: number;
}) {
  void rest;
  const [hh, mm, ss] = time.split(':');
  return (
    <View style={styles.card}>
      <View style={styles.cardBody}>
        <View style={styles.leftSection}>
          <View style={styles.titleRow}>
            <View style={styles.dot} />
            <Text style={styles.label}>{label}</Text>
          </View>
          <View style={styles.timeRow}>
            <Text style={styles.timeDigit}>{hh}</Text>
            <Text style={styles.timeSeparator}>:</Text>
            <Text style={styles.timeDigit}>{mm}</Text>
            <Text style={styles.timeSeparator}>:</Text>
            <Text style={styles.timeSeconds}>{ss}</Text>
          </View>
        </View>
        <View style={styles.rightSection}>
          <WeatherBadge weather={weather} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#171618',
    borderWidth: 1,
    borderColor: '#1e1d1f',
    borderRadius: 16,
  },
  cardBody: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
  },
  leftSection: {
    flex: 1,
    minWidth: 0,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 4,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#ffffff',
    opacity: 0.7,
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 1,
    textTransform: 'uppercase',
    opacity: 0.6,
    color: '#fff',
  },
  timeRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  timeDigit: {
    fontFamily: 'ui-monospace',
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: -0.5,
    color: '#fff',
  },
  timeSeparator: {
    fontFamily: 'ui-monospace',
    fontSize: 18,
    opacity: 0.3,
    color: '#fff',
  },
  timeSeconds: {
    fontFamily: 'ui-monospace',
    fontSize: 14,
    opacity: 0.5,
    color: '#fff',
  },
  rightSection: {
    flexShrink: 0,
  },
  weatherBadge: {
    alignItems: 'flex-end',
    gap: 2,
  },
  temp: {
    fontSize: 12,
    fontFamily: 'ui-monospace',
    fontWeight: '600',
    letterSpacing: 0.5,
    color: '#fff',
  },
  weatherDesc: {
    fontSize: 10,
    opacity: 0.5,
    color: '#fff',
  },
  weatherPlaceholder: {
    fontSize: 12,
    fontStyle: 'italic',
    opacity: 0.4,
    color: '#fff',
  },
});
