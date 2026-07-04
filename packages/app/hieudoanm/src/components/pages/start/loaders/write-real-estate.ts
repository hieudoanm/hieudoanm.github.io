import { ComponentType } from 'react';

const loadWriteRealEstateBio = () =>
  import('@hieudoanm.github.io/components/pages/start/apps/write-real-estate/WriteRealEstateBioModal').then(
    (m) => ({ default: m.WriteRealEstateBioModal })
  );

const loadWriteRealEstateDescription = () =>
  import('@hieudoanm.github.io/components/pages/start/apps/write-real-estate/WriteRealEstateDescriptionModal').then(
    (m) => ({ default: m.WriteRealEstateDescriptionModal })
  );

const loadWriteRealEstateListing = () =>
  import('@hieudoanm.github.io/components/pages/start/apps/write-real-estate/WriteRealEstateListingModal').then(
    (m) => ({ default: m.WriteRealEstateListingModal })
  );

export const loaders: Record<
  string,
  () => Promise<{ default: ComponentType<{ onClose: () => void }> }>
> = {
  'write-real-estate-bio': loadWriteRealEstateBio,
  'write-real-estate-description': loadWriteRealEstateDescription,
  'write-real-estate-listing': loadWriteRealEstateListing,
};
