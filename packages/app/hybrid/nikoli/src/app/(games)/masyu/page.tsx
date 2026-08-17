'use client';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Masyu } from '@/games/Masyu';
import { NextPage } from 'next';

const MasyuPage: NextPage = () => {
  return (
    <div className="flex h-full flex-col">
      <Masyu />
    </div>
  );
};

export default MasyuPage;
