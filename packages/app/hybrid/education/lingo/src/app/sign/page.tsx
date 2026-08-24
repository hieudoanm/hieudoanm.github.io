'use client';

import { ToolTemplate } from '@/components/templates/ToolTemplate';
import { Sign } from '@/components/features/sign';
import { NextPage } from 'next';

const SignPage: NextPage = () => (
  <ToolTemplate title="Sign Language">
    <div className="h-[70vh] overflow-hidden rounded-xl">
      <Sign />
    </div>
  </ToolTemplate>
);

export default SignPage;
