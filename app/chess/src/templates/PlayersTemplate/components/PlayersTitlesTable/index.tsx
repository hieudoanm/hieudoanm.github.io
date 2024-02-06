import { TitleBadge } from '@chess/common/components/TitleBadge';
import { TITLED_ABBREVIATIONS } from '@chess/common/constants/chess.constants';
import { TitleTotal } from '../PlayersTitles';

export const PlayersTitlesTable: React.FC<{ titles: TitleTotal[] }> = ({
  titles = [],
}) => {
  if (titles.length === 0) return <></>;

  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th className="w-4">No</th>
            <th>Title</th>
            <th align="right">Total</th>
          </tr>
        </thead>
        <tbody>
          {titles.map(({ title, total }, index) => {
            return (
              <tr key={title} className="border-b px-4 py-2">
                <td>{index + 1}</td>
                <td>
                  <div className="inline-flex items-center gap-x-2">
                    <TitleBadge title={title} />
                    <p>{TITLED_ABBREVIATIONS[title]}</p>
                  </div>
                </td>
                <td align="right">{total}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
