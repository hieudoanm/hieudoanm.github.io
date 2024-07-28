import { Layout } from '@web/layout';
import { evaluate } from 'mathjs';
import { NextPage } from 'next';
import { useState } from 'react';

const setNumber = (
  previous: string,
  digit: '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9'
): string => {
  if (previous === '') return digit;
  const last: string = previous[previous.length - 1] ?? '';
  if (last === '.' || /^\d+$/.test(last)) {
    return `${previous}${digit}`;
  }
  return `${previous} ${digit}`;
};

const CalculatorPage: NextPage = () => {
  const [expression, setExpression] = useState<string>('');
  const btnClass = 'btn btn-outline h-full w-full rounded-full';

  return (
    <Layout nav full>
      <div className='container mx-auto'>
        <div className='p-4 md:p-8'>
          <div className='mx-auto max-w-md rounded-lg border border-base-content p-4'>
            <div className='grid grid-cols-4 gap-4'>
              <div className='col-span-4'>
                <textarea
                  id='expression'
                  name='expression'
                  className='textarea textarea-bordered w-full'
                  value={expression}
                  onChange={(event) => setExpression(event.target.value)}
                />
              </div>
              <div className='col-span-1'>
                <div className='aspect-square w-full'>
                  <button
                    className={btnClass}
                    onClick={() => setExpression('')}>
                    AC
                  </button>
                </div>
              </div>
              <div className='col-span-1'>
                <div className='aspect-square w-full'>
                  <button
                    className={btnClass}
                    onClick={() => {
                      setExpression((previous: string): string => {
                        if (
                          typeof parseFloat(previous) === 'number' ||
                          typeof parseFloat(previous) === 'bigint'
                        ) {
                          return (parseFloat(previous) * -1).toString();
                        }
                        return previous;
                      });
                    }}>
                    +/-
                  </button>
                </div>
              </div>
              <div className='col-span-1'>
                <div className='aspect-square w-full'>
                  <button
                    className={btnClass}
                    onClick={() => {
                      setExpression((previous: string) => {
                        if (
                          typeof parseFloat(previous) === 'number' ||
                          typeof parseFloat(previous) === 'bigint'
                        ) {
                          return (parseFloat(previous) / 100).toFixed(2);
                        }
                        return previous;
                      });
                    }}>
                    %
                  </button>
                </div>
              </div>
              <div className='col-span-1'>
                <div className='aspect-square w-full'>
                  <button
                    className={btnClass}
                    onClick={() =>
                      setExpression((previous: string = '') => `${previous} /`)
                    }>
                    /
                  </button>
                </div>
              </div>
              <div className='col-span-1'>
                <div className='aspect-square w-full'>
                  <button
                    className={btnClass}
                    onClick={() =>
                      setExpression((previous: string = '') =>
                        setNumber(previous, '7')
                      )
                    }>
                    7
                  </button>
                </div>
              </div>
              <div className='col-span-1'>
                <div className='aspect-square w-full'>
                  <button
                    className={btnClass}
                    onClick={() =>
                      setExpression((previous: string = '') =>
                        setNumber(previous, '8')
                      )
                    }>
                    8
                  </button>
                </div>
              </div>
              <div className='col-span-1'>
                <div className='aspect-square w-full'>
                  <button
                    className={btnClass}
                    onClick={() =>
                      setExpression((previous: string = '') =>
                        setNumber(previous, '9')
                      )
                    }>
                    9
                  </button>
                </div>
              </div>
              <div className='col-span-1'>
                <div className='aspect-square w-full'>
                  <button
                    className={btnClass}
                    onClick={() =>
                      setExpression((previous: string = '') => `${previous} *`)
                    }>
                    *
                  </button>
                </div>
              </div>
              <div className='col-span-1'>
                <div className='aspect-square w-full'>
                  <button
                    className={btnClass}
                    onClick={() =>
                      setExpression((previous: string = '') =>
                        setNumber(previous, '4')
                      )
                    }>
                    4
                  </button>
                </div>
              </div>
              <div className='col-span-1'>
                <div className='aspect-square w-full'>
                  <button
                    className={btnClass}
                    onClick={() =>
                      setExpression((previous: string = '') =>
                        setNumber(previous, '5')
                      )
                    }>
                    5
                  </button>
                </div>
              </div>
              <div className='col-span-1'>
                <div className='aspect-square w-full'>
                  <button
                    className={btnClass}
                    onClick={() =>
                      setExpression((previous: string = '') =>
                        setNumber(previous, '6')
                      )
                    }>
                    6
                  </button>
                </div>
              </div>
              <div className='col-span-1'>
                <div className='aspect-square w-full'>
                  <button
                    className={btnClass}
                    onClick={() =>
                      setExpression((previous: string = '') => `${previous} -`)
                    }>
                    -
                  </button>
                </div>
              </div>
              <div className='col-span-1'>
                <div className='aspect-square w-full'>
                  <button
                    className={btnClass}
                    onClick={() =>
                      setExpression((previous: string = '') =>
                        setNumber(previous, '1')
                      )
                    }>
                    1
                  </button>
                </div>
              </div>
              <div className='col-span-1'>
                <div className='aspect-square w-full'>
                  <button
                    className={btnClass}
                    onClick={() =>
                      setExpression((previous: string = '') =>
                        setNumber(previous, '2')
                      )
                    }>
                    2
                  </button>
                </div>
              </div>
              <div className='col-span-1'>
                <div className='aspect-square w-full'>
                  <button
                    className={btnClass}
                    onClick={() =>
                      setExpression((previous: string = '') =>
                        setNumber(previous, '3')
                      )
                    }>
                    3
                  </button>
                </div>
              </div>
              <div className='col-span-1'>
                <div className='aspect-square w-full'>
                  <button
                    className={btnClass}
                    onClick={() =>
                      setExpression((previous: string = '') => `${previous} +`)
                    }>
                    +
                  </button>
                </div>
              </div>
              <div className='col-span-1'>
                <div className='aspect-square w-full'>
                  <button
                    className={btnClass}
                    onClick={() =>
                      setExpression((previous: string = '') =>
                        setNumber(previous, '0')
                      )
                    }>
                    0
                  </button>
                </div>
              </div>
              <div className='col-span-1'>
                <div className='aspect-square w-full'>
                  <button
                    className={btnClass}
                    onClick={() =>
                      setExpression((previous: string = '') => {
                        const lastNumber =
                          previous.split(' ')[previous.split(' ').length - 1] ??
                          '';
                        if (
                          typeof parseFloat(lastNumber) === 'number' ||
                          typeof parseFloat(lastNumber) === 'bigint'
                        ) {
                          const number: number = parseFloat(lastNumber);
                          const decimal: number = number - Math.floor(number);
                          if (decimal === 0) {
                            return `${previous}.`;
                          }
                          return previous;
                        }
                        return previous;
                      })
                    }>
                    .
                  </button>
                </div>
              </div>
              <div className='col-span-1'>
                <div className='aspect-square w-full'>
                  <button
                    className={btnClass}
                    onClick={() =>
                      setExpression((previous: string = '') => `${previous} ^`)
                    }>
                    ^
                  </button>
                </div>
              </div>
              <div className='col-span-1'>
                <div className='aspect-square w-full'>
                  <button
                    className={btnClass}
                    onClick={() => {
                      setExpression(evaluate(expression));
                    }}>
                    =
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CalculatorPage;
