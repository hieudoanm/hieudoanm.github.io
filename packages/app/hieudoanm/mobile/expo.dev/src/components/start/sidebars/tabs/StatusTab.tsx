import { useQuery } from '@tanstack/react-query';
import { useMemo, useState } from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

const STATUS_SERVICES: Record<string, Record<string, string>> = {
  atlassian: {
    analytics: 'https://analytics.status.atlassian.com/api/v2/status.json',
    atlas: 'https://atlas.status.atlassian.com/api/v2/status.json',
    compass: 'https://compass.status.atlassian.com/api/v2/status.json',
    confluence: 'https://confluence.status.atlassian.com/api/v2/status.json',
    developer: 'https://developer.status.atlassian.com/api/v2/status.json',
    'jira-service-management':
      'https://jira-service-management.status.atlassian.com/api/v2/status.json',
    'jira-software':
      'https://jira-software.status.atlassian.com/api/v2/status.json',
    guard: 'https://guard.status.atlassian.com/api/v2/status.json',
    opsgenie: 'https://opsgenie.status.atlassian.com/api/v2/status.json',
    partners: 'https://partners.status.atlassian.com/api/v2/status.json',
    support: 'https://support.status.atlassian.com/api/v2/status.json',
    trello: 'https://trello.status.atlassian.com/api/v2/status.json',
  },
  'server(less)': {
    supabase: 'https://status.supabase.com/api/v2/status.json',
    render: 'https://status.render.com/api/v2/status.json',
    flyio: 'https://status.flyio.net/api/v2/status.json',
    cloudflare: 'https://www.cloudflarestatus.com/api/v2/status.json',
    netlify: 'https://www.netlifystatus.com/api/v2/status.json',
    vercel: 'https://www.vercel-status.com/api/v2/status.json',
  },
  crypto: {
    hedera: 'https://status.hedera.com/api/v2/status.json',
    solana: 'https://status.solana.com/api/v2/status.json',
    polygon: 'https://status.polygon.technology/api/v2/status.json',
  },
  'version control': {
    bitbucket: 'https://bitbucket.status.atlassian.com/api/v2/status.json',
    github: 'https://www.githubstatus.com/api/v2/status.json',
    npm: 'https://status.npmjs.org/api/v2/status.json',
  },
};

const totalCount = Object.values(STATUS_SERVICES).reduce(
  (acc, s) => acc + Object.keys(s).length,
  0
);

function ServiceRow({ service, url }: { service: string; url: string }) {
  const { isPending, error, data } = useQuery<{
    page: { id: string; name: string; url: string; time_zone: string };
    status: { indicator: string; description: string };
  }>({
    queryKey: ['status', service],
    queryFn: () => fetch(url).then((res) => res.json()),
    staleTime: 1000 * 60 * 2,
    retry: 1,
  });

  const isOk = !error && data?.status?.indicator === 'none';
  const isErr = !!error || (!!data && data?.status?.indicator !== 'none');
  const pageName: string = data?.page?.name || service;

  return (
    <View style={styles.serviceRow}>
      <Text style={styles.serviceName} numberOfLines={1}>
        {pageName.replaceAll('-', ' ')}
      </Text>
      <View style={styles.statusDot}>
        {isPending ? (
          <ActivityIndicator size={8} color="#dca54d" />
        ) : isOk ? (
          <View style={[styles.dot, { backgroundColor: '#22c55e' }]} />
        ) : isErr ? (
          <View style={[styles.dot, { backgroundColor: '#ef4444' }]} />
        ) : (
          <View style={[styles.dot, { backgroundColor: '#eab308' }]} />
        )}
      </View>
    </View>
  );
}

export function StatusTab() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredServices = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return STATUS_SERVICES;

    const filtered: Record<string, Record<string, string>> = {};
    Object.entries(STATUS_SERVICES).forEach(([category, services]) => {
      const matching: Record<string, string> = {};
      Object.entries(services).forEach(([service, url]) => {
        if (
          service.toLowerCase().includes(query) ||
          category.toLowerCase().includes(query)
        ) {
          matching[service] = url;
        }
      });
      if (Object.keys(matching).length > 0) {
        filtered[category] = matching;
      }
    });
    return filtered;
  }, [searchQuery]);

  const filteredCount = useMemo(
    () =>
      Object.values(filteredServices).reduce(
        (acc, s) => acc + Object.keys(s).length,
        0
      ),
    [filteredServices]
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search services…"
          placeholderTextColor="rgba(220,165,77,0.6)"
          style={styles.searchInput}
        />
      </View>
      <ScrollView style={styles.scrollArea}>
        <View style={styles.sectionList}>
          {Object.entries(filteredServices).map(([category, services]) => (
            <View key={category} style={styles.categorySection}>
              <Text style={styles.categoryLabel}>{category}</Text>
              <View style={styles.serviceList}>
                {Object.entries(services).map(([service, url]) => (
                  <ServiceRow key={service} service={service} url={url} />
                ))}
              </View>
            </View>
          ))}
          {filteredCount === 0 && (
            <Text style={styles.empty}>No matching services found.</Text>
          )}
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          {searchQuery.trim()
            ? `${filteredCount} found · ${totalCount} services`
            : `${totalCount} services · 2 min refresh`}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  searchContainer: {
    borderBottomWidth: 1,
    borderColor: '#1e1d1f',
    padding: 12,
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
  scrollArea: { flex: 1 },
  sectionList: { padding: 12, gap: 16 },
  categorySection: { gap: 6 },
  categoryLabel: {
    fontSize: 10,
    letterSpacing: 1,
    textTransform: 'uppercase',
    color: 'rgba(220,165,77,0.6)',
    paddingHorizontal: 8,
  },
  serviceList: { gap: 2 },
  serviceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 8,
  },
  serviceName: {
    flex: 1,
    fontSize: 12,
    letterSpacing: 0.3,
    textTransform: 'capitalize',
    color: '#dca54d',
  },
  statusDot: { marginLeft: 8 },
  dot: { width: 8, height: 8, borderRadius: 4 },
  empty: {
    color: 'rgba(220,165,77,0.6)',
    textAlign: 'center',
    paddingVertical: 32,
    fontSize: 12,
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
