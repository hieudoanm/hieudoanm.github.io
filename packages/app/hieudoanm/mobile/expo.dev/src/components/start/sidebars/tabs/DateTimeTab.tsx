import { CityCard } from '@/components/start/cards/CityCard';
import { events, type Event } from '@/data/calendar/events';
import { months } from '@/data/calendar/months';
import { timezones } from '@/data/timezones';
import type { WeatherData } from '@/data/weather';
import { useQueries } from '@tanstack/react-query';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

const DAY_SHORT = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const getEventsForDate = (date: Date): Event[] =>
  events.filter(({ year = 0, month = 0, date: d = 0, frequency = '' }) => {
    const yearMatch =
      year === 0 || frequency === 'annual' || year === date.getFullYear();
    const monthMatch = month === 0 || month === date.getMonth() + 1;
    const dateMatch = d === 0 || d === date.getDate();
    return yearMatch && monthMatch && dateMatch;
  });

export function DateTimeTab({ times }: { times: string[] }) {
  const today = new Date();
  const [month, setMonth] = useState(today.getMonth());
  const [year, setYear] = useState(today.getFullYear());
  const [chosenDate, setChosenDate] = useState(today);

  const weatherQueries = useQueries({
    queries: timezones.map(({ lat, lon }) => ({
      queryKey: ['open-meteo', lat, lon],
      queryFn: async () => {
        const res = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code`
        );
        return (await res.json()).current as WeatherData;
      },
      staleTime: 1000 * 60 * 10,
    })),
  });

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const prevDays = new Date(year, month, 0).getDate();

  const calendarData: ({ date: number; currentMonth: string } | null)[][] = [];
  let week: ({ date: number; currentMonth: string } | null)[] = [];

  for (let i = 0; i < firstDay; i++) {
    week.push({ date: prevDays - firstDay + i + 1, currentMonth: 'previous' });
  }
  for (let d = 1; d <= daysInMonth; d++) {
    week.push({ date: d, currentMonth: 'current' });
    if (week.length === 7) {
      calendarData.push(week);
      week = [];
    }
  }
  if (week.length > 0) {
    let nextDay = 1;
    while (week.length < 7) {
      week.push({ date: nextDay++, currentMonth: 'next' });
    }
    calendarData.push(week);
  }

  const chosenEvents = getEventsForDate(chosenDate);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.controls}>
        <Pressable
          onPress={() => {
            if (month === 0) {
              setMonth(11);
              setYear((y) => y - 1);
            } else setMonth((m) => m - 1);
          }}
          style={styles.arrowBtn}>
          <Text style={styles.arrowText}>‹</Text>
        </Pressable>
        <View style={styles.pickerRow}>
          <Text style={styles.monthYear}>
            {months[month].month} {year}
          </Text>
        </View>
        <Pressable
          onPress={() => {
            if (month === 11) {
              setMonth(0);
              setYear((y) => y + 1);
            } else setMonth((m) => m + 1);
          }}
          style={styles.arrowBtn}>
          <Text style={styles.arrowText}>›</Text>
        </Pressable>
      </View>

      <View style={styles.calendar}>
        <View style={styles.calHeader}>
          <Text style={styles.calHeaderCell}>Wk</Text>
          {DAY_SHORT.map((d) => (
            <Text key={d} style={styles.calHeaderCell}>
              {d.charAt(0)}
            </Text>
          ))}
        </View>
        {calendarData.map((week, i) => (
          <View key={i} style={styles.calWeek}>
            <Text style={styles.weekNum}>{i + 1}</Text>
            {week.map((dateObj, j) => {
              if (!dateObj) return <View key={j} style={styles.calDay} />;
              const { date, currentMonth } = dateObj;
              const cellDate = new Date(
                year,
                currentMonth === 'previous'
                  ? month - 1
                  : currentMonth === 'next'
                    ? month + 1
                    : month,
                date
              );
              const isToday =
                currentMonth === 'current' &&
                date === today.getDate() &&
                month === today.getMonth() &&
                year === today.getFullYear();
              const isChosen =
                cellDate.toDateString() === chosenDate.toDateString();
              const hasEvents =
                currentMonth === 'current' &&
                getEventsForDate(cellDate).length > 0;
              const isCurrent = currentMonth === 'current';

              return (
                <Pressable
                  key={j}
                  onPress={() => setChosenDate(cellDate)}
                  style={[
                    styles.calDay,
                    isChosen && styles.calDayChosen,
                    isToday && !isChosen && styles.calDayToday,
                  ]}>
                  <Text
                    style={[
                      styles.calDayText,
                      isChosen && styles.calDayTextChosen,
                      isToday && !isChosen && styles.calDayTextToday,
                      !isCurrent && styles.calDayTextMuted,
                      hasEvents &&
                        isCurrent &&
                        !isChosen &&
                        styles.calDayTextEvent,
                    ]}>
                    {date}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        ))}
      </View>

      <View style={styles.divider} />

      <View>
        <Text style={styles.sectionTitle}>Events</Text>
        {chosenEvents.length === 0 ? (
          <Text style={styles.emptyText}>No events on this date.</Text>
        ) : (
          chosenEvents.map((event) => (
            <View key={event.title} style={styles.eventCard}>
              <Text style={styles.eventTitle}>{event.title}</Text>
              <Text style={styles.eventField}>{event.field}</Text>
            </View>
          ))
        )}
      </View>

      <View style={styles.divider} />

      <View>
        <Text style={styles.sectionTitle}>World Clock</Text>
        {timezones
          .map((tz, index) => ({ tz, index }))
          .filter(({ tz }) => tz.favorite)
          .map(({ tz, index }) => (
            <CityCard
              key={tz.label}
              label={tz.label}
              time={times[index]}
              weather={weatherQueries[index].data}
              index={index}
            />
          ))}
        <View style={styles.separator} />
        {timezones
          .map((tz, index) => ({ tz, index }))
          .filter(({ tz }) => !tz.favorite)
          .map(({ tz, index }) => (
            <CityCard
              key={tz.label}
              label={tz.label}
              time={times[index]}
              weather={weatherQueries[index].data}
              index={index}
            />
          ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 12, gap: 16 },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  arrowBtn: {
    width: 32,
    height: 32,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#1e1d1f',
    alignItems: 'center',
    justifyContent: 'center',
  },
  arrowText: { fontSize: 18, color: '#fff' },
  pickerRow: { flex: 1, alignItems: 'center' },
  monthYear: { fontSize: 14, fontWeight: '700', color: '#fff' },
  calendar: { gap: 4 },
  calHeader: { flexDirection: 'row', gap: 2 },
  calHeaderCell: {
    width: 28,
    textAlign: 'center',
    fontSize: 10,
    color: 'rgba(220,165,77,0.6)',
    fontWeight: '500',
    paddingBottom: 4,
  },
  calWeek: { flexDirection: 'row', gap: 2 },
  weekNum: {
    width: 28,
    textAlign: 'center',
    fontSize: 10,
    color: 'rgba(220,165,77,0.6)',
    paddingVertical: 6,
  },
  calDay: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  calDayChosen: {
    backgroundColor: '#ffffff',
  },
  calDayToday: {},
  calDayText: { fontSize: 11, color: '#fff' },
  calDayTextChosen: { color: '#161616', fontWeight: '700' },
  calDayTextToday: { color: '#ad46ff', fontWeight: '700' },
  calDayTextMuted: { color: 'rgba(220,165,77,0.2)' },
  calDayTextEvent: { color: '#ffffff' },
  divider: { height: 1, backgroundColor: '#1e1d1f' },
  sectionTitle: {
    fontSize: 10,
    letterSpacing: 1,
    textTransform: 'uppercase',
    fontWeight: '700',
    color: 'rgba(220,165,77,0.6)',
    marginBottom: 8,
  },
  emptyText: { fontSize: 12, color: 'rgba(220,165,77,0.35)' },
  eventCard: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
    borderRadius: 8,
    padding: 8,
    marginBottom: 8,
  },
  eventTitle: { fontSize: 11, fontWeight: '600', color: '#ffffff' },
  eventField: { fontSize: 10, color: 'rgba(255,255,255,0.6)', marginTop: 2 },
  separator: { height: 1, backgroundColor: '#1e1d1f', marginVertical: 4 },
});
