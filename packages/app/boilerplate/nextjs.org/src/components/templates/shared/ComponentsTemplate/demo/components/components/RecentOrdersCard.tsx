import { FC } from 'react';

export const RecentOrdersCard: FC = () => {
  const orders = [
    { name: 'Charlie Chapman', status: 'Send', badge: 'badge-info' },
    { name: 'Howard Hudson', status: 'Failed', badge: 'badge-error' },
    { name: 'Fiona Fisher', status: 'In progress', badge: 'badge-warning' },
    { name: 'Nick Nelson', status: 'Completed', badge: 'badge-success' },
    { name: 'Amanda Anderson', status: 'Completed', badge: 'badge-success' },
  ];
  return (
    <div className="card bg-base-100 card-sm border-base-300 border shadow-sm">
      <div className="card-body">
        <h3 className="card-title text-sm">Recent orders</h3>
        <div className="flex flex-col gap-2">
          {orders.map((o) => (
            <div
              key={o.name}
              className="flex items-center justify-between text-sm">
              <span>{o.name}</span>
              <span className={`badge badge-xs ${o.badge}`}>{o.status}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

RecentOrdersCard.displayName = 'RecentOrdersCard';
