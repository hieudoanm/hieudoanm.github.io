import { FC } from 'react';

export const RegistrationCard: FC = () => (
  <div className="card bg-base-100 card-sm border-base-300 overflow-hidden border shadow-sm">
    <div className="card-body">
      <h3 className="card-title text-sm">Create new account</h3>
      <div className="form-control">
        <input
          type="text"
          placeholder="Username"
          className="input input-bordered input-sm w-full"
        />
      </div>
      <div className="form-control">
        <input
          type="password"
          placeholder="Password"
          className="input input-bordered input-sm w-full"
        />
      </div>
      <div className="status status-error" />
      <div className="flex flex-col gap-2">
        <label className="flex cursor-pointer items-center gap-2 text-xs">
          <input type="checkbox" className="toggle toggle-xs" />
          Accept terms without reading
        </label>
        <label className="flex cursor-pointer items-center gap-2 text-xs">
          <input type="checkbox" className="toggle toggle-xs" />
          Subscribe to spam emails
        </label>
      </div>
      <div className="card-actions justify-end">
        <button className="btn btn-primary btn-sm">Register</button>
      </div>
      <a href="#" className="link link-primary text-xs">
        Or login
      </a>
    </div>
  </div>
);

RegistrationCard.displayName = 'RegistrationCard';
