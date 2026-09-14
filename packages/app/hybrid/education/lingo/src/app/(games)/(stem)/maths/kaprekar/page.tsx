'use client';

import { Kaprekar } from '@/games/maths/kaprekar';
import { NextPage } from 'next';

const KaprekarPage: NextPage = () => (
  <div className="p-4 md:p-6">
    <Kaprekar />
  </div>
);

export default KaprekarPage;
