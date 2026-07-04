import { ComponentType } from 'react';

const loadWriteBillOfSale = () =>
  import('@hieudoanm.github.io/components/pages/start/apps/write-business/WriteBillOfSaleModal').then(
    (m) => ({ default: m.WriteBillOfSaleModal })
  );

const loadWriteBusinessName = () =>
  import('@hieudoanm.github.io/components/pages/start/apps/write-business/WriteBusinessNameModal').then(
    (m) => ({ default: m.WriteBusinessNameModal })
  );

const loadWriteBusinessPlan = () =>
  import('@hieudoanm.github.io/components/pages/start/apps/write-business/WriteBusinessPlanModal').then(
    (m) => ({ default: m.WriteBusinessPlanModal })
  );

const loadWriteBusinessSlogan = () =>
  import('@hieudoanm.github.io/components/pages/start/apps/write-business/WriteBusinessSloganModal').then(
    (m) => ({ default: m.WriteBusinessSloganModal })
  );

const loadWriteColdEmail = () =>
  import('@hieudoanm.github.io/components/pages/start/apps/write-business/WriteColdEmailModal').then(
    (m) => ({ default: m.WriteColdEmailModal })
  );

const loadWriteLandingPage = () =>
  import('@hieudoanm.github.io/components/pages/start/apps/write-business/WriteLandingPageModal').then(
    (m) => ({ default: m.WriteLandingPageModal })
  );

const loadWriteNda = () =>
  import('@hieudoanm.github.io/components/pages/start/apps/write-business/WriteNdaModal').then(
    (m) => ({ default: m.WriteNdaModal })
  );

const loadWritePodcastScript = () =>
  import('@hieudoanm.github.io/components/pages/start/apps/write-business/WritePodcastScriptModal').then(
    (m) => ({ default: m.WritePodcastScriptModal })
  );

const loadWritePressRelease = () =>
  import('@hieudoanm.github.io/components/pages/start/apps/write-business/WritePressReleaseModal').then(
    (m) => ({ default: m.WritePressReleaseModal })
  );

const loadWritePrivacyPolicy = () =>
  import('@hieudoanm.github.io/components/pages/start/apps/write-business/WritePrivacyPolicyModal').then(
    (m) => ({ default: m.WritePrivacyPolicyModal })
  );

const loadWritePurchaseAgreement = () =>
  import('@hieudoanm.github.io/components/pages/start/apps/write-business/WritePurchaseAgreementModal').then(
    (m) => ({ default: m.WritePurchaseAgreementModal })
  );

export const loaders: Record<
  string,
  () => Promise<{ default: ComponentType<{ onClose: () => void }> }>
> = {
  'write-bill-of-sale': loadWriteBillOfSale,
  'write-business-name': loadWriteBusinessName,
  'write-business-plan': loadWriteBusinessPlan,
  'write-business-slogan': loadWriteBusinessSlogan,
  'write-cold-email': loadWriteColdEmail,
  'write-landing-page': loadWriteLandingPage,
  'write-nda': loadWriteNda,
  'write-podcast-script': loadWritePodcastScript,
  'write-press-release': loadWritePressRelease,
  'write-privacy-policy': loadWritePrivacyPolicy,
  'write-purchase-agreement': loadWritePurchaseAgreement,
};
