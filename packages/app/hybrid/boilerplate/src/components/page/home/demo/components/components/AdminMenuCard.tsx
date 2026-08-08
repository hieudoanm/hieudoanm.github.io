import { FC } from 'react';

export const AdminMenuCard: FC = () => (
  <div className="card bg-base-100 border-base-300 border shadow-sm">
    <div className="card-body p-0">
      <ul className="menu w-full">
        <li className="menu-title">Admin panel</li>
        <li>
          <a>
            Databases
            <span className="badge badge-sm">7</span>
          </a>
        </li>
        <li>
          <a>Products</a>
        </li>
        <li>
          <a>
            Messages
            <span className="badge badge-sm">29</span>
          </a>
        </li>
        <li>
          <a>Access tokens</a>
        </li>
        <li>
          <a>
            Users
            <span className="status status-info" />
          </a>
        </li>
        <li>
          <a>Settings</a>
        </li>
      </ul>
    </div>
  </div>
);

AdminMenuCard.displayName = 'AdminMenuCard';
