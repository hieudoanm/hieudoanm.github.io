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

const readJson = <T>(key: string): T | null => {
  if (typeof window === 'undefined') return null;
  try {
    const stored = window.localStorage.getItem(key);
    return stored ? (JSON.parse(stored) as T) : null;
  } catch {
    return null;
  }
};

const defaultProfile = (name = 'My Resume'): ResumeProfile => ({
  id: createId(),
  name,
  data: seedResumeData,
});

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
  const [profiles, setProfiles] = useState<ResumeProfile[]>(() => {
    const stored = readJson<ResumeProfile[]>(PROFILES_KEY);
    if (stored && stored.length > 0) return stored;
    const legacy = readJson<ResumeData>(LEGACY_DATA_KEY);
    if (legacy) {
      return [
        {
          id: createId(),
          name: legacy.personal.fullName.trim() || 'My Resume',
          data: legacy,
        },
      ];
    }
    return [defaultProfile()];
  });
  const [activeId, setActiveId] = useState<string>(() => {
    const stored = readJson<string>(ACTIVE_KEY);
    return stored ?? '';
  });

  useEffect(() => {
    if (profiles.length === 0) return;
    if (!profiles.some((profile) => profile.id === activeId)) {
      setActiveId(profiles[0].id);
    }
  }, [profiles, activeId]);

  useEffect(() => {
    try {
      window.localStorage.setItem(PROFILES_KEY, JSON.stringify(profiles));
    } catch {
      // storage may be unavailable (private mode)
    }
  }, [profiles]);

  useEffect(() => {
    if (!activeId) return;
    try {
      window.localStorage.setItem(ACTIVE_KEY, activeId);
    } catch {
      // storage may be unavailable (private mode)
    }
  }, [activeId]);

  const activeProfile =
    profiles.find((profile) => profile.id === activeId) ??
    profiles[0] ??
    defaultProfile();

  const selectProfile = useCallback((id: string) => setActiveId(id), []);

  const updateProfileData = useCallback((id: string, data: ResumeData) => {
    setProfiles((items) =>
      items.map((profile) =>
        profile.id === id ? { ...profile, data } : profile
      )
    );
  }, []);

  const createProfile = useCallback(() => {
    const profile = defaultProfile();
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
      if (items.length === 1) return [defaultProfile()];
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
