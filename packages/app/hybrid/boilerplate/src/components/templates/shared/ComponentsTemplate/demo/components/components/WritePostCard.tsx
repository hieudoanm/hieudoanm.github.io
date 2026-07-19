import { FC } from 'react';

export const WritePostCard: FC = () => (
  <div className="card bg-base-100 card-sm border-base-300 overflow-hidden border shadow-sm">
    <div className="card-body">
      <h3 className="card-title text-sm">
        <span>✎</span> Write a new post
      </h3>
      <div className="join">
        <button className="btn btn-xs join-item">B</button>
        <button className="btn btn-xs join-item">I</button>
        <button className="btn btn-xs join-item">U</button>
      </div>
      <textarea
        className="textarea textarea-bordered w-full"
        placeholder="What's happening?"
        rows={3}
      />
      <div className="flex items-center justify-between">
        <button className="btn btn-xs">Add files</button>
        <span className="text-base-content/40 text-xs">1200 remaining</span>
      </div>
      <div className="card-actions justify-end">
        <button className="btn btn-xs">Draft</button>
        <button className="btn btn-primary btn-xs">Publish</button>
      </div>
    </div>
  </div>
);

WritePostCard.displayName = 'WritePostCard';
