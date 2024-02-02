'use client';

import type { NextPage } from 'next';
import Head from 'next/head';
import React, { useState } from 'react';
import { FaSpinner } from 'react-icons/fa';
import { v4 } from 'uuid';

const UuidPage: NextPage = () => {
  const [uuid, setUuid] = useState(v4());

  return (
    <>
      <Head>
        <title>UUID</title>
      </Head>
      <div className="flex h-full items-center justify-center">
        <div className="join">
          <input className="input" value={uuid} />
          <button
            type="button"
            onClick={() => setUuid(v4())}
            aria-label={'UUID'}
            className="join-item bg-teal-500">
            <FaSpinner />
          </button>
        </div>
      </div>
    </>
  );
};

export default UuidPage;
