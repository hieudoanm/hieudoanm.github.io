import { Layout } from '@web/layout';
import { NextPage } from 'next';
import alphabet from '@web/json/korean/alphabet.json';
import { FC } from 'react';

const Key: FC<{ latin: string; hangul: string; shift?: string }> = ({
  latin = '',
  hangul = '',
  shift = '',
}) => {
  return (
    <div className='relative aspect-square w-full rounded-lg border border-base-content'>
      <div className='absolute left-2 top-1'>{latin}</div>
      <div className='absolute bottom-1 left-2'>{hangul}</div>
      <div className='absolute right-2 top-1'>{shift}</div>
    </div>
  );
};

const Keyboard: FC = () => {
  return (
    <div className='flex flex-col gap-y-1 md:gap-y-2'>
      <div className='grid grid-cols-10 gap-x-1 md:gap-x-2'>
        <div className='col-span-1'>
          <Key latin='Q' hangul='' />
        </div>
        <div className='col-span-1'>
          <Key latin='W' hangul='' />
        </div>
        <div className='col-span-1'>
          <Key latin='E' hangul='' />
        </div>
        <div className='col-span-1'>
          <Key latin='R' hangul='' />
        </div>
        <div className='col-span-1'>
          <Key latin='T' hangul='' />
        </div>
        <div className='col-span-1'>
          <Key latin='Y' hangul='' />
        </div>
        <div className='col-span-1'>
          <Key latin='U' hangul='' />
        </div>
        <div className='col-span-1'>
          <Key latin='I' hangul='' />
        </div>
        <div className='col-span-1'>
          <Key latin='O' hangul='' />
        </div>
        <div className='col-span-1'>
          <Key latin='P' hangul='' />
        </div>
      </div>
      <div className='grid grid-cols-10 gap-x-1 md:gap-x-2'>
        <div className='col-span-1'>
          <Key latin='A' hangul='' />
        </div>
        <div className='col-span-1'>
          <Key latin='S' hangul='' />
        </div>
        <div className='col-span-1'>
          <Key latin='D' hangul='' />
        </div>
        <div className='col-span-1'>
          <Key latin='F' hangul='' />
        </div>
        <div className='col-span-1'>
          <Key latin='G' hangul='' />
        </div>
        <div className='col-span-1'>
          <Key latin='H' hangul='' />
        </div>
        <div className='col-span-1'>
          <Key latin='J' hangul='' />
        </div>
        <div className='col-span-1'>
          <Key latin='K' hangul='' />
        </div>
        <div className='col-span-1'>
          <Key latin='L' hangul='' />
        </div>
      </div>
      <div className='grid grid-cols-10 gap-x-1 md:gap-x-2'>
        <div className='col-span-1'>
          <Key latin='Z' hangul='' />
        </div>
        <div className='col-span-1'>
          <Key latin='X' hangul='' />
        </div>
        <div className='col-span-1'>
          <Key latin='C' hangul='' />
        </div>
        <div className='col-span-1'>
          <Key latin='V' hangul='' />
        </div>
        <div className='col-span-1'>
          <Key latin='B' hangul='' />
        </div>
        <div className='col-span-1'>
          <Key latin='N' hangul='' />
        </div>
        <div className='col-span-1'>
          <Key latin='M' hangul='' />
        </div>
        <div className='col-span-1' />
        <div className='col-span-1' />
        <div className='col-span-1' />
      </div>
    </div>
  );
};

const KoreanPage: NextPage = () => {
  return (
    <Layout nav>
      <div className='container mx-auto'>
        <div className='p-4 md:p-8'>
          <div className='flex flex-col gap-y-4 md:gap-y-8'>
            <div className='overflow-x-auto'>
              <table className='table'>
                <thead>
                  <tr>
                    <th>Category</th>
                    <th>Hangul</th>
                    <th>Latin</th>
                  </tr>
                </thead>
                <tbody>
                  {alphabet.map(({ hangul, latin, category, subcategory }) => {
                    return (
                      <tr key={hangul}>
                        <td className='capitalize'>
                          {subcategory} {category}
                        </td>
                        <td>{hangul}</td>
                        <td>{latin}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <Keyboard />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default KoreanPage;
