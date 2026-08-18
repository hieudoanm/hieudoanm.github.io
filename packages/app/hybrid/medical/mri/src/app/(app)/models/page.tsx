'use client';

import { api } from '@/lib/api/client';
import { ModelsTemplate } from '@/components/templates/ModelsTemplate';

const ModelsPage = () => <ModelsTemplate api={api} />;

export default ModelsPage;
