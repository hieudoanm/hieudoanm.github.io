import { DownloadsTemplate } from '@/components/shared/templates/DownloadsTemplate';
import { download } from '@/content/download';

const DownloadsPage = () => <DownloadsTemplate {...download} />;

export default DownloadsPage;
