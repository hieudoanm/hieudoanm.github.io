import { openBrowserAsync } from 'expo-web-browser';
import { useCallback, useRef } from 'react';
import {
  Pressable,
  StyleSheet,
  TextInput,
  View,
  Text,
  Platform,
} from 'react-native';

export function SearchBar({
  query,
  onChange,
}: {
  query: string;
  onChange: (v: string) => void;
}) {
  const inputRef = useRef<TextInput>(null);

  const googleSearch = useCallback(() => {
    if (!query.trim()) return;
    openBrowserAsync(
      `https://www.google.com/search?q=${encodeURIComponent(query.trim())}`,
      {}
    );
  }, [query]);

  const onKeyDown = useCallback(
    (e: { key: string }) => {
      if (Platform.OS === 'web' && e.key === 'Enter') {
        googleSearch();
      }
    },
    [googleSearch]
  );

  return (
    <View style={styles.container}>
      <TextInput
        ref={inputRef}
        value={query}
        onChangeText={onChange}
        onKeyPress={onKeyDown}
        placeholder="Search or filter…"
        placeholderTextColor="#dca54d"
        style={styles.input}
        returnKeyType="search"
        onSubmitEditing={googleSearch}
      />
      <Pressable
        onPress={googleSearch}
        style={({ pressed }) => [
          styles.button,
          pressed && styles.buttonPressed,
        ]}>
        <Text style={styles.buttonText}>🔍</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
  },
  input: {
    flex: 1,
    backgroundColor: '#171618',
    borderWidth: 1,
    borderColor: '#1e1d1f',
    borderRightWidth: 0,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 14,
    color: '#fff',
  },
  button: {
    backgroundColor: '#1e1d1f',
    borderWidth: 1,
    borderColor: '#1e1d1f',
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    paddingHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonPressed: {
    opacity: 0.8,
  },
  buttonText: {
    fontSize: 16,
  },
});
