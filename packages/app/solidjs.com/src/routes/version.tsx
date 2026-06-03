import { VersionTemplate } from '@hieudoanm.github.io/components/templates/app/VersionTemplate';

const VersionPage = () => {
  const now = new Date();
  const pad = (n: number) => n.toString().padStart(2, '0');
  const version = [
    now.getFullYear(),
    pad(now.getMonth() + 1),
    pad(now.getDate()),
    pad(now.getHours()),
    pad(now.getMinutes()),
    pad(now.getSeconds()),
  ].join('.');

  return <VersionTemplate version={version} />;
};

export default VersionPage;
