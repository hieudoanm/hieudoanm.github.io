import { copyToClipboard } from '@nothing/utils/navigator';
import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { FaArrowRotateLeft, FaCopy } from 'react-icons/fa6';
import { v4 } from 'uuid';

const UuidPage: NextPage = () => {
  const [uuid, setUuid] = useState('');

  useEffect(() => {
    setUuid(v4());
  }, []);

  return (
    <div className="flex h-screen w-screen items-center justify-center p-8">
      <div className="flex flex-col items-center gap-2 md:flex-row">
        <p className="truncate rounded-full bg-black px-4 py-2 text-base text-white">
          {uuid}
        </p>
        <div className="flex items-center justify-center gap-x-2">
          <button
            type="button"
            onClick={() => copyToClipboard(uuid)}
            className="rounded-full bg-black p-2 text-white">
            <FaCopy />
          </button>
          <button
            type="button"
            onClick={() => setUuid(v4())}
            className="rounded-full bg-black p-2 text-white">
            <FaArrowRotateLeft />
          </button>
        </div>
      </div>
    </div>
  );
};

export default UuidPage;
