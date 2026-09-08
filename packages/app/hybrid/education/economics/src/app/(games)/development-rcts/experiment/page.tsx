'use client';

import Link from 'next/link';
import { NextPage } from 'next';
import { RctSimulatorGame } from '@/games/rcts';

const RctExperimentPage: NextPage = () => (
  <div className="mx-auto flex w-full max-w-5xl flex-col gap-4 p-4 md:p-6">
    <Link
      href="/development-rcts"
      className="text-primary text-sm hover:underline">
      ← Back to Theory
    </Link>
    <h1 className="text-primary text-2xl font-bold tracking-tight">
      RCT Simulator
    </h1>
    <RctSimulatorGame />
  </div>
);

export default RctExperimentPage;
