import { ComponentType, lazy } from 'react';

const loadwrite_real_estate_bio = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/write/real-estate/WriteRealEstateBioModal').then(
    (m) => ({ default: m.WriteRealEstateBioModal })
  );

const loadwrite_real_estate_description = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/write/real-estate/WriteRealEstateDescriptionModal').then(
    (m) => ({ default: m.WriteRealEstateDescriptionModal })
  );

const loadwrite_real_estate_listing = () =>
  import('@hieudoanm.github.io/components/pages/start/modals/write/real-estate/WriteRealEstateListingModal').then(
    (m) => ({ default: m.WriteRealEstateListingModal })
  );

export const loaders: Record<
  string,
  () => Promise<{ default: ComponentType<{ onClose: () => void }> }>
> = {
  'write-real-estate-bio': loadwrite_real_estate_bio,
  'write-real-estate-description': loadwrite_real_estate_description,
  'write-real-estate-listing': loadwrite_real_estate_listing,
};
