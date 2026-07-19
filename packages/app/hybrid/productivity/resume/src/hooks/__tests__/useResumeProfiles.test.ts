import { act, renderHook } from '@testing-library/react';
import { seedResumeData } from '../../data/seed';
import { useResumeProfiles } from '../useResumeProfiles';

describe('useResumeProfiles', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('creates a default profile when nothing is stored', () => {
    const { result } = renderHook(() => useResumeProfiles());
    expect(result.current.profiles).toHaveLength(1);
    expect(result.current.activeProfile.id).toBe(result.current.activeId);
    expect(result.current.activeProfile.data).toEqual(seedResumeData);
  });

  it('migrates the legacy resume.data key into a profile', () => {
    window.localStorage.setItem('resume.data', JSON.stringify(seedResumeData));
    const { result } = renderHook(() => useResumeProfiles());
    expect(result.current.profiles).toHaveLength(1);
    expect(result.current.profiles[0].data).toEqual(seedResumeData);
  });

  it('reads stored profiles', () => {
    const stored = [{ id: 'p1', name: 'Existing', data: seedResumeData }];
    window.localStorage.setItem('resume.profiles', JSON.stringify(stored));
    const { result } = renderHook(() => useResumeProfiles());
    expect(result.current.profiles[0].name).toBe('Existing');
  });

  it('tolerates invalid stored JSON', () => {
    window.localStorage.setItem('resume.profiles', 'not-json');
    const { result } = renderHook(() => useResumeProfiles());
    expect(result.current.profiles).toHaveLength(1);
  });

  it('creates and selects a new profile', () => {
    const { result } = renderHook(() => useResumeProfiles());
    const original = result.current.activeId;
    act(() => result.current.createProfile());
    expect(result.current.profiles).toHaveLength(2);
    expect(result.current.activeId).not.toBe(original);
  });

  it('renames a profile', () => {
    const { result } = renderHook(() => useResumeProfiles());
    act(() =>
      result.current.renameProfile(result.current.activeId, '  New Name  ')
    );
    expect(result.current.profiles[0].name).toBe('New Name');
  });

  it('ignores a blank rename', () => {
    const { result } = renderHook(() => useResumeProfiles());
    act(() => result.current.renameProfile(result.current.activeId, '   '));
    expect(result.current.profiles[0].name).toBe('My Resume');
  });

  it('deletes a profile', () => {
    const { result } = renderHook(() => useResumeProfiles());
    act(() => result.current.createProfile());
    const created = result.current.activeId;
    act(() => result.current.deleteProfile(created));
    expect(result.current.profiles).toHaveLength(1);
    expect(result.current.profiles[0].id).not.toBe(created);
  });

  it('keeps at least one profile when deleting the only one', () => {
    const { result } = renderHook(() => useResumeProfiles());
    act(() => result.current.deleteProfile(result.current.activeId));
    expect(result.current.profiles).toHaveLength(1);
  });

  it('updates the data of a profile', () => {
    const { result } = renderHook(() => useResumeProfiles());
    const data = {
      ...seedResumeData,
      personal: { ...seedResumeData.personal, fullName: 'Updated Name' },
    };
    act(() => result.current.updateProfileData(result.current.activeId, data));
    expect(result.current.activeProfile.data.personal.fullName).toBe(
      'Updated Name'
    );
  });
});
