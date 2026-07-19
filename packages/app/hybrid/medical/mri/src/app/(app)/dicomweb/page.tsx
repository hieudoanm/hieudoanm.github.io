'use client';

import { api } from '@/lib/api/client';
import { DicomwebTemplate } from '@/components/templates/DicomwebTemplate';

const DicomwebPage = () => <DicomwebTemplate api={api} />;

export default DicomwebPage;
