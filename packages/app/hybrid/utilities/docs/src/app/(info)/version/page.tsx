'use client';

import { VersionTemplate } from '@hieudoanm.github.io/components/templates/app/VersionTemplate';
import { buildVersion } from '@hieudoanm.github.io/content/version';
import { NextPage } from 'next';

const VersionPage: NextPage = () => <VersionTemplate version={buildVersion} />;

export default VersionPage;
