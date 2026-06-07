import { SearchBar } from '@/components/start/SearchBar';
import { LeftSidebar } from '@/components/start/sidebars/LeftSidebar';
import { RightSidebar } from '@/components/start/sidebars/RightSidebar';
import {
  chat as chatBookmarks,
  code as codeBookmarks,
  google as googleBookmarks,
  messaging as messagingBookmarks,
  music as musicBookmarks,
  social as socialBookmarks,
  work as workBookmarks,
} from '@/data/bookmarks';
import { agents, clis, extensions, packages } from '@/data/downloads';
import { getTimeInZone, timezones } from '@/data/timezones';
import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ItemCard } from './cards/ItemCard';
import type { ItemCardProps } from './cards/ItemCard';
import type { Download } from '@/data/downloads/types';

type MainTab = 'bookmarks' | 'downloads' | 'tools';
type SidebarTab = 'tasks' | 'clock';

const match = (label: string, q: string) =>
  label.toLowerCase().includes(q.toLowerCase());

function Section({
  label,
  count,
  children,
}: {
  label: string;
  count?: number;
  children: React.ReactNode;
}) {
  return (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionLabel}>{label}</Text>
        {count !== undefined && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{count}</Text>
          </View>
        )}
      </View>
      {children}
    </View>
  );
}

export function StartPage() {
  const [times, setTimes] = useState(() =>
    timezones.map(({ tz }) => getTimeInZone(tz))
  );
  const [today, setToday] = useState('');
  const [tab, setTab] = useState<MainTab>('bookmarks');
  const [query, setQuery] = useState('');
  const [activeSidebar, setActiveSidebar] = useState<SidebarTab | null>(null);
  const { width, height } = useWindowDimensions();
  const isDesktop = width >= 1024;
  const filtering = query.trim().length > 0;

  useEffect(() => {
    setToday(
      new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    );
    const interval = setInterval(
      () => setTimes(timezones.map(({ tz }) => getTimeInZone(tz))),
      1000
    );
    return () => clearInterval(interval);
  }, []);

  const toggleSidebar = useCallback(
    (sidebarTab: SidebarTab) =>
      setActiveSidebar((prev) => (prev === sidebarTab ? null : sidebarTab)),
    []
  );

  const bookmarkSections = useMemo(
    () => [
      { label: 'Chatbot', items: chatBookmarks as ItemCardProps[] },
      { label: 'Code', items: codeBookmarks as ItemCardProps[] },
      { label: 'Google Workspace', items: googleBookmarks as ItemCardProps[] },
      { label: 'Messaging', items: messagingBookmarks as ItemCardProps[] },
      { label: 'Music', items: musicBookmarks as ItemCardProps[] },
      { label: 'Social', items: socialBookmarks as ItemCardProps[] },
      { label: 'Work', items: workBookmarks as ItemCardProps[] },
    ],
    []
  );

  const downloadSections = useMemo(
    () => [
      { label: 'Agents', items: agents },
      { label: 'CLIs', items: clis },
      { label: 'Extensions', items: extensions },
      { label: 'Packages', items: packages },
    ],
    []
  );

  const filteredBookmarks = useMemo(
    () =>
      bookmarkSections.map((s) => ({
        ...s,
        filtered: filtering
          ? s.items.filter((b) => match(b.label, query))
          : s.items,
      })),
    [bookmarkSections, filtering, query]
  );

  const filteredDownloads = useMemo(
    () =>
      downloadSections.map((s) => ({
        ...s,
        filtered: filtering
          ? s.items.filter((a) => match(a.id || a.label, query))
          : s.items,
      })),
    [downloadSections, filtering, query]
  );

  const hasAnyResult =
    filteredBookmarks.some((s) => s.filtered.length > 0) ||
    filteredDownloads.some((s) => s.filtered.length > 0);

  const TABS: { id: MainTab; label: string; emoji: string }[] = [
    { id: 'bookmarks', label: 'Bookmarks', emoji: '🔖' },
    { id: 'downloads', label: 'Downloads', emoji: '📦' },
    { id: 'tools', label: 'Tools', emoji: '🔧' },
  ];

  const renderMainContent = () => (
    <View style={styles.mainContent}>
      <Text style={styles.dateTextDesktop}>{today}</Text>
      <Text style={styles.titleDesktop}>Start Page</Text>

      <View style={styles.searchWrapper}>
        <SearchBar query={query} onChange={setQuery} />
      </View>

      <View style={styles.tabBar}>
        {TABS.map(({ id, label, emoji }) => (
          <Pressable
            key={id}
            onPress={() => setTab(id)}
            style={[styles.tabBtn, tab === id && styles.tabBtnActive]}>
            <Text
              style={[
                styles.tabBtnText,
                tab === id && styles.tabBtnTextActive,
              ]}>
              {emoji} {label}
            </Text>
          </Pressable>
        ))}
      </View>

      <ScrollView
        style={styles.scrollArea}
        contentContainerStyle={styles.scrollContent}>
        {tab === 'bookmarks' && (
          <>
            {filteredBookmarks.map(({ label, filtered }) =>
              !filtering || filtered.length > 0 ? (
                <Section key={label} label={label} count={filtered.length}>
                  <View style={styles.grid}>
                    {filtered.map((bm) => (
                      <View key={bm.label} style={styles.gridItem}>
                        <ItemCard {...bm} />
                      </View>
                    ))}
                  </View>
                </Section>
              ) : null
            )}
          </>
        )}

        {tab === 'downloads' && (
          <>
            {filteredDownloads.map(({ label, filtered }) =>
              !filtering || filtered.length > 0 ? (
                <Section key={label} label={label} count={filtered.length}>
                  <View style={styles.grid}>
                    {(filtered as Download[]).map((a) => (
                      <View key={a.id || a.label} style={styles.gridItem}>
                        <ItemCard {...a} actions={a.downloads} href={a.url} />
                      </View>
                    ))}
                  </View>
                </Section>
              ) : null
            )}
          </>
        )}

        {tab === 'tools' && !filtering && (
          <Text style={styles.noResults}>Tools coming soon</Text>
        )}

        {filtering && !hasAnyResult && (
          <Text style={styles.noResults}>
            No results for &ldquo;{query}&rdquo;
          </Text>
        )}
      </ScrollView>
    </View>
  );

  if (isDesktop) {
    return (
      <SafeAreaView style={styles.desktopContainer}>
        <View style={styles.desktopLayout}>
          <View style={styles.leftCol}>
            <LeftSidebar />
          </View>
          {renderMainContent()}
          <View style={styles.rightCol}>
            <RightSidebar times={times} />
          </View>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.mobileContainer}>
      <ScrollView
        style={styles.mobileScroll}
        contentContainerStyle={styles.mobileContent}>
        <Text style={styles.dateText}>{today}</Text>
        <Text style={styles.title}>Start Page</Text>
        <SearchBar query={query} onChange={setQuery} />

        <View style={styles.tabBar}>
          {TABS.map(({ id, label, emoji }) => (
            <Pressable
              key={id}
              onPress={() => setTab(id)}
              style={[styles.tabBtn, tab === id && styles.tabBtnActive]}>
              <Text
                style={[
                  styles.tabBtnText,
                  tab === id && styles.tabBtnTextActive,
                ]}>
                {emoji} {label}
              </Text>
            </Pressable>
          ))}
        </View>

        {tab === 'bookmarks' && (
          <>
            {filteredBookmarks.map(({ label, filtered }) =>
              !filtering || filtered.length > 0 ? (
                <Section key={label} label={label} count={filtered.length}>
                  <View style={styles.grid}>
                    {filtered.map((bm) => (
                      <View key={bm.label} style={styles.gridItem}>
                        <ItemCard {...bm} />
                      </View>
                    ))}
                  </View>
                </Section>
              ) : null
            )}
          </>
        )}

        {tab === 'downloads' && (
          <>
            {filteredDownloads.map(({ label, filtered }) =>
              !filtering || filtered.length > 0 ? (
                <Section key={label} label={label} count={filtered.length}>
                  <View style={styles.grid}>
                    {(filtered as Download[]).map((a) => (
                      <View key={a.id || a.label} style={styles.gridItem}>
                        <ItemCard {...a} actions={a.downloads} href={a.url} />
                      </View>
                    ))}
                  </View>
                </Section>
              ) : null
            )}
          </>
        )}

        {tab === 'tools' && !filtering && (
          <Text style={styles.noResults}>Tools coming soon</Text>
        )}

        {filtering && !hasAnyResult && (
          <Text style={styles.noResults}>
            No results for &ldquo;{query}&rdquo;
          </Text>
        )}

        <View style={styles.bottomSpacer} />
      </ScrollView>

      {/* Bottom nav */}
      <View style={styles.bottomNav}>
        {(['tasks', 'clock'] as const).map((sidebarTab) => (
          <Pressable
            key={sidebarTab}
            onPress={() => toggleSidebar(sidebarTab)}
            style={[
              styles.navBtn,
              activeSidebar === sidebarTab && styles.navBtnActive,
            ]}>
            <Text style={styles.navBtnIcon}>
              {sidebarTab === 'tasks' ? '📡' : '🕐'}
            </Text>
            <Text
              style={[
                styles.navBtnLabel,
                activeSidebar === sidebarTab && styles.navBtnLabelActive,
              ]}>
              {sidebarTab === 'tasks' ? 'Tasks' : 'Clock'}
            </Text>
          </Pressable>
        ))}
      </View>

      {/* Sidebar drawer */}
      {activeSidebar && (
        <View style={styles.overlay}>
          <Pressable
            style={styles.overlayBg}
            onPress={() => setActiveSidebar(null)}
          />
          <View
            style={[styles.drawer, { height: Math.min(height * 0.7, 520) }]}>
            <View style={styles.drawerHeader}>
              <Text style={styles.drawerTitle}>
                {activeSidebar === 'tasks' ? 'Tasks' : 'Clock'}
              </Text>
              <Pressable
                onPress={() => setActiveSidebar(null)}
                style={styles.drawerClose}>
                <Text style={styles.drawerCloseText}>✕</Text>
              </Pressable>
            </View>
            <View style={styles.drawerContent}>
              {activeSidebar === 'tasks' ? (
                <LeftSidebar />
              ) : (
                <RightSidebar times={times} />
              )}
            </View>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  desktopContainer: {
    flex: 1,
    backgroundColor: '#09090b',
  },
  desktopLayout: {
    flex: 1,
    flexDirection: 'row',
  },
  leftCol: {
    width: 280,
    borderRightWidth: 1,
    borderColor: '#1e1d1f',
  },
  rightCol: {
    width: 320,
    borderLeftWidth: 1,
    borderColor: '#1e1d1f',
  },
  mobileContainer: {
    flex: 1,
    backgroundColor: '#09090b',
  },
  mobileScroll: {
    flex: 1,
  },
  mobileContent: {
    padding: 16,
    paddingBottom: 100,
  },
  dateText: {
    textAlign: 'center',
    fontSize: 10,
    fontFamily: 'ui-monospace',
    letterSpacing: 1,
    textTransform: 'uppercase',
    color: 'rgba(220,165,77,0.6)',
    marginBottom: 8,
  },
  dateTextDesktop: {
    textAlign: 'center',
    fontSize: 10,
    fontFamily: 'ui-monospace',
    letterSpacing: 1,
    textTransform: 'uppercase',
    color: 'rgba(220,165,77,0.6)',
    marginBottom: 8,
    marginTop: 48,
  },
  title: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: '900',
    letterSpacing: -0.5,
    color: '#fff',
    marginBottom: 24,
  },
  titleDesktop: {
    textAlign: 'center',
    fontSize: 30,
    fontWeight: '900',
    letterSpacing: -0.5,
    color: '#fff',
    marginBottom: 24,
  },
  mainContent: {
    flex: 2,
    flexDirection: 'column',
    overflow: 'hidden',
  },
  searchWrapper: {
    paddingHorizontal: 32,
    marginBottom: 24,
  },
  tabBar: {
    flexDirection: 'row',
    paddingHorizontal: 32,
    marginBottom: 32,
    gap: 4,
    maxWidth: 672,
    alignSelf: 'center',
    width: '100%',
  },
  tabBtn: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignItems: 'center',
    backgroundColor: '#171618',
  },
  tabBtnActive: {
    backgroundColor: '#ffffff',
  },
  tabBtnText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#fff',
  },
  tabBtnTextActive: {
    color: '#161616',
  },
  scrollArea: {
    flex: 1,
    paddingHorizontal: 32,
  },
  scrollContent: {
    paddingBottom: 48,
    alignItems: 'center',
  },
  section: {
    marginTop: 40,
    width: '100%',
    maxWidth: 672,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 16,
  },
  sectionLabel: {
    fontSize: 10,
    fontFamily: 'ui-monospace',
    letterSpacing: 1,
    textTransform: 'uppercase',
    color: 'rgba(220,165,77,0.6)',
  },
  badge: {
    backgroundColor: '#1e1d1f',
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: 8,
  },
  badgeText: {
    fontSize: 10,
    fontFamily: 'ui-monospace',
    color: '#fff',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  gridItem: {
    width: '47%',
  },
  noResults: {
    textAlign: 'center',
    marginTop: 80,
    fontSize: 14,
    color: 'rgba(220,165,77,0.6)',
  },
  bottomSpacer: {
    height: 80,
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    borderTopWidth: 1,
    borderColor: '#1e1d1f',
    backgroundColor: '#09090b',
  },
  navBtn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    gap: 4,
  },
  navBtnActive: {},
  navBtnIcon: {
    fontSize: 18,
  },
  navBtnLabel: {
    fontSize: 10,
    color: 'rgba(220,165,77,0.6)',
  },
  navBtnLabelActive: {
    color: '#ffffff',
  },
  overlay: {
    ...StyleSheet.absoluteFill,
    zIndex: 40,
  },
  overlayBg: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  drawer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 64,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    borderTopWidth: 1,
    borderColor: '#1e1d1f',
    backgroundColor: '#09090b',
    overflow: 'hidden',
  },
  drawerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: '#1e1d1f',
  },
  drawerTitle: {
    fontSize: 14,
    fontWeight: '600',
    textTransform: 'capitalize',
    color: '#fff',
  },
  drawerClose: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  drawerCloseText: {
    fontSize: 14,
    color: '#fff',
  },
  drawerContent: {
    flex: 1,
    padding: 16,
  },
});
