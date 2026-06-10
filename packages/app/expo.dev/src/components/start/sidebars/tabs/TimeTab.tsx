import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View, ViewStyle } from 'react-native';

type Block = {
  label: string;
  start: number;
  end: number;
  color: string;
};

const BLOCKS: Block[] = [
  { label: 'Sleep', start: 0, end: 8, color: '#ffffff' },
  { label: 'Breakfast', start: 8, end: 9, color: '#eab308' },
  { label: 'Morning work', start: 9, end: 12, color: '#ad46ff' },
  { label: 'Lunch', start: 12, end: 13, color: '#eab308' },
  { label: 'Afternoon work', start: 13, end: 18, color: '#ad46ff' },
  { label: 'Dinner', start: 18, end: 19, color: '#eab308' },
  { label: 'Exercise', start: 19, end: 21, color: '#22c55e' },
  { label: 'Relaxation', start: 21, end: 24, color: '#00d5a8' },
];

export function TimeTab() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const currentHour = now.getHours() + now.getMinutes() / 60;
  const activeBlock = BLOCKS.find(
    (b) => currentHour >= b.start && currentHour < b.end
  );

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollArea}>
        <View style={styles.blockList}>
          {BLOCKS.map((block) => {
            const hours = block.end - block.start;
            const isActive = activeBlock?.label === block.label;

            return (
              <View
                key={block.label}
                style={[
                  styles.block,
                  { height: hours * 28 },
                  isActive
                    ? {
                        backgroundColor: `${block.color}22`,
                        borderColor: `${block.color}44`,
                        opacity: 1,
                      }
                    : {
                        backgroundColor: `${block.color}10`,
                        borderColor: `${block.color}30`,
                        opacity: 0.5,
                      },
                ]}>
                <Text style={[styles.blockTime, isActive && styles.activeText]}>
                  {String(block.start).padStart(2, '0')}–
                  {String(block.end).padStart(2, '0')}
                </Text>
                <Text
                  style={[styles.blockLabel, isActive && styles.activeText]}>
                  {block.label}
                </Text>
                <Text
                  style={[styles.blockHours, isActive && styles.activeText]}>
                  {hours}h
                </Text>
                {isActive && (
                  <View style={styles.progressBar}>
                    <View
                      style={[
                        styles.progressFill,
                        {
                          width: `${(((currentHour - block.start) / hours) * 100).toFixed(1)}%`,
                        } as ViewStyle,
                      ]}
                    />
                  </View>
                )}
              </View>
            );
          })}
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          {activeBlock?.label ?? 'off schedule'} ·{' '}
          {String(now.getHours()).padStart(2, '0')}:
          {String(now.getMinutes()).padStart(2, '0')}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollArea: { flex: 1 },
  blockList: { padding: 12, gap: 6 },
  block: {
    borderRadius: 8,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderWidth: 1,
    overflow: 'hidden',
    position: 'relative',
  },
  blockTime: {
    fontSize: 10,
    fontFamily: 'ui-monospace',
    color: '#fff',
    opacity: 0.5,
  },
  blockLabel: {
    flex: 1,
    fontSize: 12,
    fontWeight: '500',
    color: '#fff',
    opacity: 0.6,
  },
  blockHours: {
    fontSize: 10,
    fontFamily: 'ui-monospace',
    color: '#fff',
    opacity: 0.3,
  },
  activeText: { opacity: 1 },
  progressBar: {
    position: 'absolute',
    bottom: 6,
    left: 12,
    right: 12,
    height: 2,
    backgroundColor: 'rgba(220,165,77,0.1)',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: 'rgba(220,165,77,0.3)',
    borderRadius: 4,
  },
  footer: {
    borderTopWidth: 1,
    borderColor: '#1e1d1f',
    padding: 16,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 10,
    letterSpacing: 1,
    textTransform: 'uppercase',
    opacity: 0.2,
    fontFamily: 'ui-monospace',
    color: '#fff',
  },
});
