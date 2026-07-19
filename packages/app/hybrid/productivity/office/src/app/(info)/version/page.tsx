import { VersionTemplate } from '@/components/shared/templates/VersionTemplate';
import { buildVersion } from '@/content/version';

const VersionPage = () => <VersionTemplate version={buildVersion} />;

export default VersionPage;
