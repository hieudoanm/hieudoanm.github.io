import { FC } from 'react';

export const TabsCard: FC = () => (
  <div className="tabs tabs-lift">
    <input
      type="radio"
      name="demo_tabs"
      className="tab"
      aria-label="Tab 1"
      defaultChecked
    />
    <div className="tab-content bg-base-100 border-base-300 p-5">
      Tab content 1
    </div>
    <input type="radio" name="demo_tabs" className="tab" aria-label="Tab 2" />
    <div className="tab-content bg-base-100 border-base-300 p-5">
      Tab content 2
    </div>
    <input type="radio" name="demo_tabs" className="tab" aria-label="Tab 3" />
    <div className="tab-content bg-base-100 border-base-300 p-5">
      Tab content 3
    </div>
  </div>
);

TabsCard.displayName = 'TabsCard';
