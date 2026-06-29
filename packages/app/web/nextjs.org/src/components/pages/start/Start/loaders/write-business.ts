import { ComponentType, lazy } from 'react';

const loadwrite_bill_of_sale = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/write-business/WriteBillOfSaleModal').then(
    (m) => ({ default: m.WriteBillOfSaleModal })
  );

const loadwrite_business_name = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/write-business/WriteBusinessNameModal').then(
    (m) => ({ default: m.WriteBusinessNameModal })
  );

const loadwrite_business_plan = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/write-business/WriteBusinessPlanModal').then(
    (m) => ({ default: m.WriteBusinessPlanModal })
  );

const loadwrite_business_slogan = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/write-business/WriteBusinessSloganModal').then(
    (m) => ({ default: m.WriteBusinessSloganModal })
  );

const loadwrite_cold_email = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/write-business/WriteColdEmailModal').then(
    (m) => ({ default: m.WriteColdEmailModal })
  );

const loadwrite_landing_page = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/write-business/WriteLandingPageModal').then(
    (m) => ({ default: m.WriteLandingPageModal })
  );

const loadwrite_nda = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/write-business/WriteNdaModal').then(
    (m) => ({ default: m.WriteNdaModal })
  );

const loadwrite_podcast_script = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/write-business/WritePodcastScriptModal').then(
    (m) => ({ default: m.WritePodcastScriptModal })
  );

const loadwrite_press_release = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/write-business/WritePressReleaseModal').then(
    (m) => ({ default: m.WritePressReleaseModal })
  );

const loadwrite_privacy_policy = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/write-business/WritePrivacyPolicyModal').then(
    (m) => ({ default: m.WritePrivacyPolicyModal })
  );

const loadwrite_purchase_agreement = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/write-business/WritePurchaseAgreementModal').then(
    (m) => ({ default: m.WritePurchaseAgreementModal })
  );

export const loaders: Record<
  string,
  () => Promise<{ default: ComponentType<{ onClose: () => void }> }>
> = {
  'write-bill-of-sale': loadwrite_bill_of_sale,
  'write-business-name': loadwrite_business_name,
  'write-business-plan': loadwrite_business_plan,
  'write-business-slogan': loadwrite_business_slogan,
  'write-cold-email': loadwrite_cold_email,
  'write-landing-page': loadwrite_landing_page,
  'write-nda': loadwrite_nda,
  'write-podcast-script': loadwrite_podcast_script,
  'write-press-release': loadwrite_press_release,
  'write-privacy-policy': loadwrite_privacy_policy,
  'write-purchase-agreement': loadwrite_purchase_agreement,
};
