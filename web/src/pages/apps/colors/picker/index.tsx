import { NavbarColors } from '@web/components/NavbarColors';
import colours from '@web/json/colours.json';
import { Layout } from '@web/layout';
import { copyToClipboard } from '@web/utils/copy';
import type { NextPage } from 'next';
import { ChangeEvent, useState } from 'react';

const PickerPage: NextPage = () => {
  const [group, setGroup] = useState<number>(15);
  const rows: string[][] = colours[group];

  return (
    <Layout nav full footer footerContent={<NavbarColors />}>
      <div className='flex h-full items-center justify-center px-8'>
        <div className='flex flex-col gap-y-8'>
          <div className='overflow-hidden rounded'>
            {rows.map((row: string[]) => {
              return (
                <div key={row[0]} className='flex items-center'>
                  {row.map((cell: string) => {
                    return (
                      <div key={cell} className='h-6 w-12'>
                        <button
                          style={{ backgroundColor: cell }}
                          className='h-full w-full origin-center text-xs text-black transition-all hover:z-10 hover:scale-[2] hover:rounded-2xl hover:border hover:shadow-xl'
                          onClick={() => copyToClipboard(cell)}>
                          {cell}
                        </button>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
          <input
            type='range'
            id='group'
            name='group'
            placeholder='Group'
            className='range range-primary range-lg'
            min={0}
            max={15}
            step={1}
            value={group}
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              setGroup(parseInt(event.target.value, 10))
            }
          />
        </div>
      </div>
    </Layout>
  );
};

export default PickerPage;
