import { Pressable, StyleSheet, Text, View } from 'react-native';

export interface Tool {
  label: string;
  description: string;
  emoji: string;
  color: string;
  onClick: () => void;
}

export function ToolCard({ label, description, emoji, color, onClick }: Tool) {
  return (
    <Pressable
      onPress={onClick}
      style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}>
      <View style={styles.cardBody}>
        <View
          style={[
            styles.iconContainer,
            { backgroundColor: `${color}22`, borderColor: `${color}44` },
          ]}>
          <Text style={styles.emoji}>{emoji}</Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.label} numberOfLines={1}>
            {label}
          </Text>
          <Text style={styles.description} numberOfLines={1}>
            {description}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#171618',
    borderWidth: 1,
    borderColor: '#1e1d1f',
    borderRadius: 16,
    overflow: 'hidden',
  },
  cardPressed: {
    opacity: 0.9,
    transform: [{ scale: 1.02 }],
  },
  cardBody: {
    padding: 16,
    alignItems: 'center',
    gap: 8,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emoji: {
    fontSize: 20,
  },
  textContainer: {
    alignItems: 'center',
  },
  label: {
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: -0.3,
    color: '#fff',
  },
  description: {
    fontSize: 10,
    letterSpacing: 1,
    textTransform: 'uppercase',
    color: '#dca54d',
    marginTop: 2,
  },
});
