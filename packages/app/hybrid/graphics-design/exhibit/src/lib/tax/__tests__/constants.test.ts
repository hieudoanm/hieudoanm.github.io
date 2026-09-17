import {
  PERSONAL_DEDUCTION,
  DEPENDENT_DEDUCTION,
  INSURANCE_CAP,
  EMPLOYEE_INSURANCE,
  EMPLOYER_INSURANCE,
  TAX_BRACKETS,
  TAX_TYPE_LABELS,
  SUBMISSION_STATUS_LABELS,
  AUDIT_STATUS_LABELS,
} from '../constants';

describe('constants', () => {
  it('has correct personal deduction', () => {
    expect(PERSONAL_DEDUCTION).toBe(11_000_000);
  });

  it('has correct dependent deduction', () => {
    expect(DEPENDENT_DEDUCTION).toBe(4_400_000);
  });

  it('has correct insurance cap', () => {
    expect(INSURANCE_CAP).toBe(36_000_000);
  });

  it('has employee insurance rates summing to ~10.5%', () => {
    const sum = Object.values(EMPLOYEE_INSURANCE).reduce((a, b) => a + b, 0);
    expect(sum).toBeCloseTo(0.105);
  });

  it('has employer insurance rates summing to ~21.5%', () => {
    const sum = Object.values(EMPLOYER_INSURANCE).reduce((a, b) => a + b, 0);
    expect(sum).toBeCloseTo(0.215);
  });

  it('has 7 tax brackets', () => {
    expect(TAX_BRACKETS).toHaveLength(7);
  });

  it('has last bracket with Infinity limit', () => {
    expect(TAX_BRACKETS[TAX_BRACKETS.length - 1].limit).toBe(Infinity);
  });

  it('has labels for all tax types', () => {
    expect(TAX_TYPE_LABELS.PIT).toBeDefined();
    expect(TAX_TYPE_LABELS.CIT).toBeDefined();
    expect(TAX_TYPE_LABELS.VAT).toBeDefined();
    expect(TAX_TYPE_LABELS.FCT).toBeDefined();
  });

  it('has labels for all submission statuses', () => {
    expect(SUBMISSION_STATUS_LABELS.draft).toBeDefined();
    expect(SUBMISSION_STATUS_LABELS.submitted).toBeDefined();
    expect(SUBMISSION_STATUS_LABELS.accepted).toBeDefined();
    expect(SUBMISSION_STATUS_LABELS.rejected).toBeDefined();
    expect(SUBMISSION_STATUS_LABELS.amended).toBeDefined();
  });

  it('has labels for all audit statuses', () => {
    expect(AUDIT_STATUS_LABELS.pending).toBeDefined();
    expect(AUDIT_STATUS_LABELS.in_progress).toBeDefined();
    expect(AUDIT_STATUS_LABELS.completed).toBeDefined();
    expect(AUDIT_STATUS_LABELS.flagged).toBeDefined();
  });
});
