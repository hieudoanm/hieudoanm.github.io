import type { Col, GameModule, PayoffMatrix, Row } from './types';

export const bestResponses = (matrix: PayoffMatrix, row: Row): Col[] => {
  const rowIndex = matrix.rows.indexOf(row);
  const aiPayoffs = matrix.cols.map(
    (_, colIdx) => matrix.matrix[rowIndex][colIdx][1]
  );
  const max = Math.max(...aiPayoffs);
  return matrix.cols.filter((_, colIdx) => aiPayoffs[colIdx] === max);
};

export const playerBestResponses = (matrix: PayoffMatrix, col: Col): Row[] => {
  const colIndex = matrix.cols.indexOf(col);
  const playerPayoffs = matrix.rows.map(
    (_, rowIdx) => matrix.matrix[rowIdx][colIndex][0]
  );
  const max = Math.max(...playerPayoffs);
  return matrix.rows.filter((_, rowIdx) => playerPayoffs[rowIdx] === max);
};

export const isNashEquilibrium = (
  matrix: PayoffMatrix,
  row: Row,
  col: Col
): boolean => {
  const aiBR = bestResponses(matrix, row);
  const playerBR = playerBestResponses(matrix, col);
  return aiBR.includes(col) && playerBR.includes(row);
};

export const mixedEquilibrium = (module: GameModule): string | null =>
  module === 'matching-pennies' ? 'Play each action 50/50' : null;

export const getPayoffs = (
  matrix: PayoffMatrix,
  row: Row,
  col: Col
): [number, number] => {
  const ri = matrix.rows.indexOf(row);
  const ci = matrix.cols.indexOf(col);
  return matrix.matrix[ri][ci];
};
