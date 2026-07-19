import { expect, test } from '@playwright/test';

test('hydrates cleanly with pre-existing profile data', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', (err) => errors.push(err.message));

  const profile = {
    id: 'imported-profile',
    name: 'Hieu Doan',
    data: {
      personal: {
        fullName: 'Hieu Doan',
        jobTitle: 'Lead Engineer',
        email: '',
        phone: '',
        address: '',
        website: '',
        linkedin: '',
        github: '',
      },
      summary: 'Lead Engineer with experience at NAB.',
      experience: [
        {
          id: 'exp1',
          company: 'NAB',
          role: 'Lead Engineer',
          location: 'Ho Chi Minh City, Vietnam',
          startDate: 'Jan 2026',
          endDate: 'Present',
          description: 'Back-end: Java, Spring Boot, PostgreSQL.',
        },
      ],
      education: [],
      projects: [],
      skills: [],
      certifications: [],
      languages: [],
      interests: 'Open source',
    },
  };

  await page.addInitScript(
    ([storedProfile]) => {
      window.localStorage.setItem(
        'resume.profiles',
        JSON.stringify([storedProfile])
      );
      window.localStorage.setItem('resume.activeProfile', 'imported-profile');
    },
    [profile]
  );

  await page.goto('/');

  await expect(page.getByLabel('Resume profile')).toHaveValue(
    'imported-profile'
  );
  await expect(page.getByRole('option', { name: 'Hieu Doan' })).toHaveCount(1);
  await expect(page.locator('#resume-sheet')).toContainText('Hieu Doan');
  expect(errors).toEqual([]);
});
