import { openBrowserAsync } from 'expo-web-browser';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export interface Action {
  label: string;
  url: string;
}

export interface ItemCardProps {
  label: string;
  href: string;
  emoji: string;
  description?: string;
  color?: string;
  badge?: string;
  actions?: Action[];
}

export function ItemCard({
  label,
  href,
  emoji,
  description,
  color,
  badge,
  actions,
}: ItemCardProps) {
  const handleOpen = (url: string) => {
    openBrowserAsync(url);
  };

  return (
    <Pressable
      onPress={() => handleOpen(href)}
      style={({ pressed }) => [
        styles.card,
        pressed && styles.cardPressed,
        color ? { borderColor: `${color}44` } : undefined,
      ]}>
      {badge && (
        <View
          style={[
            styles.badge,
            color
              ? { backgroundColor: `${color}22`, borderColor: `${color}44` }
              : undefined,
          ]}>
          <Text style={[styles.badgeText, color ? { color } : undefined]}>
            {badge}
          </Text>
        </View>
      )}
      <View style={styles.cardBody}>
        <View
          style={[
            styles.iconContainer,
            color
              ? { backgroundColor: `${color}22`, borderColor: `${color}44` }
              : styles.iconDefault,
          ]}>
          <Text style={styles.emoji}>{emoji}</Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.label} numberOfLines={1}>
            {label}
          </Text>
          <Text style={styles.description} numberOfLines={1}>
            {description ?? label}
          </Text>
        </View>
        {(actions ?? [{ label: 'Open in new tab', url: href }]).map(
          (action, index) => (
            <Pressable
              key={index}
              onPress={(e) => {
                e.stopPropagation?.();
                handleOpen(action.url);
              }}
              style={({ pressed }) => [
                styles.actionButton,
                pressed && styles.actionButtonPressed,
              ]}>
              <Text style={styles.actionText}>{action.label}</Text>
            </Pressable>
          )
        )}
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
  badge: {
    position: 'absolute',
    top: -4,
    right: 0,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 999,
    zIndex: 1,
  },
  badgeText: {
    fontFamily: 'ui-monospace',
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 1,
    textTransform: 'uppercase',
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
  iconDefault: {
    backgroundColor: '#1e1d1f',
    borderWidth: 1,
    borderColor: '#1e1d1f',
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
  actionButton: {
    backgroundColor: '#ffffff',
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  actionButtonPressed: {
    opacity: 0.8,
  },
  actionText: {
    color: '#161616',
    fontSize: 12,
    fontWeight: '600',
  },
});
