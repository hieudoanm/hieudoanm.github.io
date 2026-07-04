import { FC, useState } from 'react';
import { ColorPopover } from './ColorPopover';
import { Section } from './Section';

export const NavigationSection: FC = () => {
  const [activeTab, setActiveTab] = useState<
    'overview' | 'api' | 'examples' | 'changelog'
  >('overview');
  const tabContent: Record<string, string> = {
    overview:
      'The Overview tab shows a high-level description of the component, its variants, and usage guidelines. Switch tabs to explore the API reference, live code examples, and version history.',
    api: 'API reference: Button accepts `variant` (primary | ghost | danger), `size` (sm | md | lg), `loading` (boolean), `disabled` (boolean), and all native button props via rest spread.',
    examples:
      '<Button variant="primary" onClick={handleSubmit}>Save changes</Button>',
    changelog:
      'v2.4.0 — Added icon-only variant and loading state. v2.3.0 — New danger variant. v2.2.0 — Keyboard focus ring improvements.',
  };
  NavigationSection.displayName = 'NavigationSection';
  return (
    <Section
      id="navigation"
      label="Navigation"
      title="Find your way"
      sub="Tabs, breadcrumbs, pagination, and more — every pattern users expect, executed with precision.">
      <div className="mb-8">
        <p className="text-base-content/50 mb-4 text-sm">Breadcrumb</p>
        <div className="breadcrumbs text-base-content/50 text-sm">
          <ul>
            {['Home', 'Components', 'Navigation', 'Breadcrumb'].map((l, i) => (
              <li key={l}>
                <a
                  href="#"
                  className={
                    i < 3 ? 'hover:text-primary' : 'text-base-content'
                  }>
                  {l}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="mb-8">
        <p className="text-base-content/50 mb-4 text-sm">Tabs</p>
        <div role="tablist" className="tabs tabs-bordered">
          {(['overview', 'api', 'examples', 'changelog'] as const).map((t) => (
            <button
              key={t}
              role="tab"
              onClick={() => setActiveTab(t)}
              className={`tab capitalize ${activeTab === t ? 'tab-active text-primary' : 'text-base-content/50'}`}>
              {t}
            </button>
          ))}
        </div>
        <p className="text-base-content/50 mt-4 font-mono text-sm leading-relaxed">
          {tabContent[activeTab]}
        </p>
      </div>
      <div className="mb-8">
        <p className="text-base-content/50 mb-4 text-sm">Pagination</p>
        <div className="join">
          {['‹', '1', '2', '3', '…', '12', '›'].map((p, i) => (
            <button
              key={i}
              className={`join-item btn btn-sm ${p === '1' ? 'btn-primary' : 'btn-ghost border-base-300 border'} ${p === '…' ? 'btn-disabled opacity-40' : ''}`}>
              {p}
            </button>
          ))}
        </div>
      </div>
      <div className="flex flex-wrap gap-3">
        <label
          htmlFor="demo-modal"
          className="btn btn-ghost border-base-300 border">
          Open modal ↗
        </label>
        <label
          htmlFor="demo-drawer"
          className="btn btn-ghost border-base-300 border">
          Open drawer ↗
        </label>
        <ColorPopover />
      </div>
    </Section>
  );
};
