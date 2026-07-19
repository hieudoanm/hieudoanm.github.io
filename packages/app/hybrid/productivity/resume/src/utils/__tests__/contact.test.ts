import { seedResumeData } from '../../data/seed';
import { collectContact } from '../contact';

describe('collectContact', () => {
  it('returns only non-empty personal fields', () => {
    const items = collectContact(seedResumeData);
    expect(items).toContain(seedResumeData.personal.email);
    expect(items).toContain(seedResumeData.personal.phone);
    expect(items).toContain(seedResumeData.personal.website);
  });

  it('skips empty fields', () => {
    const data = {
      ...seedResumeData,
      personal: { ...seedResumeData.personal, email: '', phone: '  ' },
    };
    const items = collectContact(data);
    expect(items).not.toContain('');
    expect(items).not.toContain('  ');
  });
});
