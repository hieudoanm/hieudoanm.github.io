import { FC } from 'react';

export const PayoffMatrix: FC = () => (
  <div className="border-base-300 overflow-x-auto rounded-lg border text-sm">
    <table className="table-zebra table-sm w-full">
      <thead>
        <tr>
          <th>You</th>
          <th>Opponent</th>
          <th className="text-right">Your Score</th>
          <th className="text-right">Opponent Score</th>
          <th>Meaning</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>🤝 Cooperate</td>
          <td>🤝 Cooperate</td>
          <td className="text-right font-bold">+3</td>
          <td className="text-right font-bold">+3</td>
          <td>Both benefit</td>
        </tr>
        <tr>
          <td>💰 Defect</td>
          <td>🤝 Cooperate</td>
          <td className="text-right font-bold">+5</td>
          <td className="text-right font-bold">−5</td>
          <td>You exploit them</td>
        </tr>
        <tr>
          <td>🤝 Cooperate</td>
          <td>💰 Defect</td>
          <td className="text-right font-bold">−5</td>
          <td className="text-right font-bold">+5</td>
          <td>You get exploited</td>
        </tr>
        <tr>
          <td>💰 Defect</td>
          <td>💰 Defect</td>
          <td className="text-right font-bold">−2</td>
          <td className="text-right font-bold">−2</td>
          <td>Both lose</td>
        </tr>
      </tbody>
    </table>
  </div>
);
PayoffMatrix.displayName = 'PayoffMatrix';
