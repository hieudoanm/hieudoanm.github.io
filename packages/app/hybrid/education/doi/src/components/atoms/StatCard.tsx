import { FC, ReactNode } from 'react';

interface StatCardProps {
  label: string;
  value: string | number;
  icon?: ReactNode;
}

const StatCard: FC<StatCardProps> = ({ label, value, icon }) => (
  <div className="card bg-base-200 card-body">
    <div className="flex items-center gap-3">
      {icon && <span className="text-primary text-xl">{icon}</span>}
      <div>
        <p className="text-base-content/60 text-xs tracking-wide uppercase">
          {label}
        </p>
        <p className="text-2xl font-bold">{value}</p>
      </div>
    </div>
  </div>
);

export default StatCard;
