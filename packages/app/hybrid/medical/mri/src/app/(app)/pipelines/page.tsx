'use client';

import { api } from '@/lib/api/client';
import { PipelinesTemplate } from '@/components/templates/PipelinesTemplate';

const PipelinesPage = () => <PipelinesTemplate api={api} />;

export default PipelinesPage;
