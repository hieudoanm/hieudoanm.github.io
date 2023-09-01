import React, { useCallback, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import Hexagon from '../components/atoms/Hexagon';
import useWindowSize from '../hooks/use-window-size';

const themes = ['theme-0'];

export const HomePage: React.FC = () => {
  const { width, height } = useWindowSize();

  const [theme, setTheme] = useState(themes[0]);
  const [{ maxRows, maxColumns }, setMax] = useState({
    maxColumns: Math.floor(width / 128) + 10,
    maxRows: Math.floor(height / 112) * 2 + 10,
  });

  useEffect(() => {
    const newMaxColumns = Math.floor(width / 128) + 5;
    const newMaxRows = Math.floor(height / 112) * 2 + 5;

    setMax({ maxColumns: newMaxColumns, maxRows: newMaxRows });
  }, [width, height]);

  const columns = [...Array.from({ length: maxColumns + 1 }).keys()].map(
    (index: number) => index
  );
  const rows = [...Array.from({ length: maxRows + 1 }).keys()].map(
    () => columns
  );

  const changeTheme = () => {
    const themeIndex = themes.indexOf(theme);
    const nextIndex = themeIndex + 1 === themes.length ? 0 : themeIndex + 1;
    const nextTheme = themes[`${nextIndex}`];
    setTheme(nextTheme);
  };

  const updateLevel1 = useCallback(
    ({ row, column }: { row: number; column: number }) => {
      const leftLevel1 = row % 2 === 0 ? 0 : -1;
      const rightLevel1 = row % 2 === 0 ? 1 : 0;
      const boxes = [
        { row: row - 2, column },
        { row: row - 1, column: column + leftLevel1 },
        { row: row - 1, column: column + rightLevel1 },
        { row: row + 1, column: column + leftLevel1 },
        { row: row + 1, column: column + rightLevel1 },
        { row: row + 2, column },
      ].map(
        ({ row: rowIndex, column: columnIndex }) =>
          `hexagon-${rowIndex}-${columnIndex}`
      );
      for (const id of boxes) {
        document.querySelector(`#${id}`)?.classList.add('level-1');
      }
    },
    []
  );

  const updateLevel2 = useCallback(
    ({
      row,
      column,
      left,
      right,
    }: {
      row: number;
      column: number;
      left: number;
      right: number;
    }) => {
      const boxes = [
        { row: row - 4, column },
        { row: row - 3, column: column + left },
        {
          row: row - 3,
          column: column + right,
        },
        { row: row - 2, column: column + 1 },
        { row: row - 2, column: column + -1 },
        { row, column: column + -1 },
        { row, column: column + 1 },
        { row: row + 2, column: column + 1 },
        { row: row + 2, column: column + -1 },
        { row: row + 3, column: column + left },
        {
          row: row + 3,
          column: column + right,
        },
        { row: row + 4, column },
      ].map(
        ({ row: rowIndex, column: columnIndex }) =>
          `hexagon-${rowIndex}-${columnIndex}`
      );
      for (const id of boxes) {
        document.querySelector(`#${id}`)?.classList.add('level-2');
      }
    },
    []
  );

  const updateLevel3 = useCallback(
    ({
      row,
      column,
      left,
      right,
    }: {
      row: number;
      column: number;
      left: number;
      right: number;
    }) => {
      const level3Boxes = [
        { row: row - 6, column },
        { row: row - 5, column: column + left },
        {
          row: row - 5,
          column: column + right,
        },
        { row: row - 4, column: column - 1 },
        { row: row - 4, column: column + 1 },
        {
          row: row - 3,
          column: column + left - 1,
        },
        {
          row: row - 3,
          column: column + right + 1,
        },
        {
          row: row - 1,
          column: column + left - 1,
        },
        {
          row: row - 1,
          column: column + right + 1,
        },
        {
          row: row + 1,
          column: column + left - 1,
        },
        {
          row: row + 1,
          column: column + right + 1,
        },
        {
          row: row + 3,
          column: column + left - 1,
        },
        {
          row: row + 3,
          column: column + right + 1,
        },
        { row: row + 4, column: column - 1 },
        { row: row + 4, column: column + 1 },
        {
          row: row + 5,
          column: column + left,
        },
        {
          row: row + 5,
          column: column + right,
        },
        { row: row + 6, column },
      ].map(
        ({ row: rowIndex, column: columnIndex }) =>
          `hexagon-${rowIndex}-${columnIndex}`
      );
      for (const id of level3Boxes) {
        document.querySelector(`#${id}`)?.classList.add('level-3');
      }
    },
    []
  );

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>HIEU DOAN (hieudoanm)</title>
      </Helmet>
      <div className={theme}>
        <main className="w-screen h-screen overflow-hidden">
          <div className="relative">
            <div className="absolute top-0 right-0 left-0 bottom-0 mx-auto">
              <div className="relative">
                {rows.map((rowColumns: number[], row: number) => {
                  return rowColumns.map((column: number) => {
                    return (
                      <button
                        type="button"
                        id={`hexagon-${row}-${column}`}
                        key={`hexagon-row-${column}`}
                        data-row={row}
                        data-column={column}
                        className="relative"
                        onClick={() => changeTheme()}
                        onMouseLeave={() => {
                          const classNames: string[] = [
                            '.level-1',
                            '.level-2',
                            '.level-3',
                          ];
                          for (const className of classNames) {
                            const oldBoxes =
                              document.querySelectorAll(className);
                            for (const box of oldBoxes) {
                              box.classList.remove(className.replace('.', ''));
                            }
                          }
                        }}
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        onMouseOver={(event: any) => {
                          const newRow = Number.parseInt(
                            event.target.dataset.row,
                            10
                          );
                          const newColumn = Number.parseInt(
                            event.target.dataset.column,
                            10
                          );
                          const right = row % 2 ? 0 : 1;
                          const left = row % 2 ? -1 : 0;
                          // Level 1
                          updateLevel1({ row: newRow, column: newColumn });
                          // Level 2
                          updateLevel2({
                            row: newRow,
                            column: newColumn,
                            left,
                            right,
                          });
                          updateLevel3({
                            row: newRow,
                            column: newColumn,
                            left,
                            right,
                          });
                          // Level 3
                        }}
                      >
                        <Hexagon />
                      </button>
                    );
                  });
                })}
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default HomePage;
