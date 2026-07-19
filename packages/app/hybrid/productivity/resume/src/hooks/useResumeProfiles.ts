import { useCallback, useEffect, useState } from 'react';
import { seedResumeData } from '../data/seed';
import type { ResumeData } from '../types/resume';
import { createId } from '../utils/id';

export interface ResumeProfile {
  id: string;
  name: string;
  data: ResumeData;
}

const PROFILES_KEY = 'resume.profiles';
const ACTIVE_KEY = 'resume.activeProfile';
const LEGACY_DATA_KEY = 'resume.data';
const SEED_PROFILE_ID = 'seed-profile';

const readJson = <T>(key: string): T | null => {
  if (typeof window === 'undefined') return null;
  try {
    const stored = window.localStorage.getItem(key);
    return stored ? (JSON.parse(stored) as T) : null;
  } catch {
    return null;
  }
};

const buildProfile = (
  name = 'My Resume',
  id: string = createId()
): ResumeProfile => ({ id, name, data: seedResumeData });

const seedProfile = (): ResumeProfile =>
  buildProfile('My Resume', SEED_PROFILE_ID);

interface ResumeProfilesResult {
  profiles: ResumeProfile[];
  activeId: string;
  activeProfile: ResumeProfile;
  selectProfile: (id: string) => void;
  createProfile: () => void;
  renameProfile: (id: string, name: string) => void;
  deleteProfile: (id: string) => void;
  updateProfileData: (id: string, data: ResumeData) => void;
}

export const useResumeProfiles = (): ResumeProfilesResult => {
  const [profiles, setProfiles] = useState<ResumeProfile[]>(() => [
    seedProfile(),
  ]);
  const [activeId, setActiveId] = useState<string>('');
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const stored = readJson<ResumeProfile[]>(PROFILES_KEY);
    if (stored && stored.length > 0) {
      setProfiles(stored);
      const active = readJson<string>(ACTIVE_KEY);
      if (active && stored.some((profile) => profile.id === active)) {
        setActiveId(active);
      }
    } else {
      const legacy = readJson<ResumeData>(LEGACY_DATA_KEY);
      if (legacy) {
        setProfiles([
          buildProfile(legacy.personal.fullName.trim() || 'My Resume'),
        ]);
      }
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    if (profiles.length === 0) return;
    if (!profiles.some((profile) => profile.id === activeId)) {
      setActiveId(profiles[0].id);
    }
  }, [profiles, activeId, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(PROFILES_KEY, JSON.stringify(profiles));
    } catch {
      // storage may be unavailable (private mode)
    }
  }, [profiles, hydrated]);

  useEffect(() => {
    if (!hydrated || !activeId) return;
    try {
      window.localStorage.setItem(ACTIVE_KEY, activeId);
    } catch {
      // storage may be unavailable (private mode)
    }
  }, [activeId, hydrated]);

  const activeProfile =
    profiles.find((profile) => profile.id === activeId) ??
    profiles[0] ??
    buildProfile();

  const selectProfile = useCallback((id: string) => setActiveId(id), []);

  const updateProfileData = useCallback((id: string, data: ResumeData) => {
    setProfiles((items) =>
      items.map((profile) =>
        profile.id === id ? { ...profile, data } : profile
      )
    );
  }, []);

  const createProfile = useCallback(() => {
    const profile = buildProfile();
    setProfiles((items) => [...items, profile]);
    setActiveId(profile.id);
  }, []);

  const renameProfile = useCallback((id: string, name: string) => {
    const clean = name.trim();
    if (!clean) return;
    setProfiles((items) =>
      items.map((profile) =>
        profile.id === id ? { ...profile, name: clean } : profile
      )
    );
  }, []);

  const deleteProfile = useCallback((id: string) => {
    setProfiles((items) => {
      if (items.length === 1) return [buildProfile()];
      return items.filter((profile) => profile.id !== id);
    });
  }, []);

  return {
    profiles,
    activeId,
    activeProfile,
    selectProfile,
    createProfile,
    renameProfile,
    deleteProfile,
    updateProfileData,
  };
};
