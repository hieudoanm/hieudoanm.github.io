import {
  MOCK_USERS,
  MOCK_COMPANIES,
  MOCK_SUBMISSIONS,
  MOCK_AUDITS,
} from '../mock';

describe('MOCK_USERS', () => {
  it('has at least one user', () => {
    expect(MOCK_USERS.length).toBeGreaterThanOrEqual(1);
  });

  it('users have required fields', () => {
    for (const user of MOCK_USERS) {
      expect(user.id).toBeTruthy();
      expect(user.name).toBeTruthy();
      expect(user.email).toBeTruthy();
      expect(user.role).toBeDefined();
    }
  });
});

describe('MOCK_COMPANIES', () => {
  it('has at least two companies', () => {
    expect(MOCK_COMPANIES.length).toBeGreaterThanOrEqual(2);
  });

  it('companies have required fields', () => {
    for (const company of MOCK_COMPANIES) {
      expect(company.id).toBeTruthy();
      expect(company.name).toBeTruthy();
      expect(company.taxCode).toBeTruthy();
    }
  });
});

describe('MOCK_SUBMISSIONS', () => {
  it('has submissions', () => {
    expect(MOCK_SUBMISSIONS.length).toBeGreaterThan(0);
  });

  it('submissions have required fields', () => {
    for (const sub of MOCK_SUBMISSIONS) {
      expect(sub.id).toBeTruthy();
      expect(sub.companyId).toBeTruthy();
      expect(sub.taxType).toBeDefined();
      expect(sub.status).toBeDefined();
      expect(sub.deadline).toBeTruthy();
    }
  });

  it('has submissions with different statuses', () => {
    const statuses = new Set(MOCK_SUBMISSIONS.map((s) => s.status));
    expect(statuses.size).toBeGreaterThan(1);
  });
});

describe('MOCK_AUDITS', () => {
  it('has audits', () => {
    expect(MOCK_AUDITS.length).toBeGreaterThan(0);
  });

  it('audits have required fields', () => {
    for (const audit of MOCK_AUDITS) {
      expect(audit.id).toBeTruthy();
      expect(audit.submissionId).toBeTruthy();
      expect(audit.auditType).toBeDefined();
      expect(audit.status).toBeDefined();
      expect(typeof audit.riskScore).toBe('number');
    }
  });

  it('audits have findings and checks', () => {
    for (const audit of MOCK_AUDITS) {
      expect(Array.isArray(audit.findings)).toBe(true);
      expect(Array.isArray(audit.checks)).toBe(true);
    }
  });
});
