import { ChessOpening } from '@prisma/client';
import Link from 'next/link';
import { OpeningsHeader } from './components/OpeningsHeader';

export type OpeningsTemplateProperties = {
  ecos: string[];
  openings: ChessOpening[];
};

export const OpeningsTemplate: React.FC<OpeningsTemplateProperties> = ({
  ecos = [],
  openings = [],
}) => {
  return (
    <div className="flex flex-col gap-y-4 py-4 md:gap-y-8 md:py-8">
      <OpeningsHeader ecos={ecos} total={openings.length} />
      <div className="overflow-auto rounded border border-gray-200 shadow">
        <table className="table">
          <thead>
            <tr>
              <th className="w-4">No</th>
              <th className="w-4">ECO</th>
              <th>Name</th>
              <th>FEN</th>
            </tr>
          </thead>
          <tbody>
            {openings.map(
              (
                { eco = '', name = '', fen = '' }: ChessOpening,
                index: number
              ) => {
                return (
                  <tr key={`${eco}-${name}`}>
                    <td>{index + 1}</td>
                    <td>
                      <Link href={`/openings/${eco}`}>{eco}</Link>
                    </td>
                    <td>
                      <p title={name} className="w-32 truncate md:w-auto">
                        {name}
                      </p>
                    </td>
                    <td>
                      <p title={fen} className="w-32 truncate md:w-auto">
                        {fen}
                      </p>
                    </td>
                  </tr>
                );
              }
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
