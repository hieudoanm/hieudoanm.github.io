import type { FC } from 'react';
import type { TemplateProps } from '../../common';

export const BillReminder: FC<TemplateProps> = ({ data }) => {
  const title = (data.title as string) ?? '';
  const bills =
    (data.bills as {
      name: string;
      amount: string;
      dueDate: string;
      paid: boolean;
    }[]) ?? [];

  return (
    <div className="bg-base-100 flex h-full w-full flex-col p-12">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-base-content text-lg font-bold">{title}</h1>
        <span className="text-neutral text-[10px] font-medium">Due Soon</span>
      </div>
      <div className="flex flex-col gap-3">
        {bills.map((bill, i) => (
          <div
            key={i}
            className={`rounded-box flex items-center justify-between border px-4 py-3 ${
              bill.paid
                ? 'bg-base-300/50 border-transparent'
                : 'border-accent/20'
            }`}>
            <div className="flex items-center gap-3">
              <span
                className={`flex h-4 w-4 items-center justify-center rounded-full border text-[8px] font-bold ${
                  bill.paid
                    ? 'border-accent bg-accent text-accent-content'
                    : 'border-neutral/30 text-transparent'
                }`}>
                {bill.paid ? '✓' : ''}
              </span>
              <div>
                <p
                  className={`text-sm font-medium ${bill.paid ? 'text-neutral/40 line-through' : 'text-base-content'}`}>
                  {bill.name}
                </p>
                <p className="text-neutral text-[10px]">Due {bill.dueDate}</p>
              </div>
            </div>
            <span
              className={`text-sm font-semibold ${bill.paid ? 'text-neutral/30' : 'text-base-content'}`}>
              {bill.amount}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

BillReminder.displayName = 'BillReminder';
