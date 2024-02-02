import React from 'react';

export type StatusTemplateProperties = {
  status: {
    bitbucket: boolean;
    confluence: boolean;
    github: boolean;
    jira: boolean;
    netlify: boolean;
    render: boolean;
    solana: boolean;
    trello: boolean;
    vercel: boolean;
  };
};

export const StatusTemplate: React.FC<StatusTemplateProperties> = ({
  status,
}) => {
  const {
    bitbucket = false,
    confluence = false,
    github = false,
    jira = false,
    netlify = false,
    render = false,
    solana = false,
    trello = false,
    vercel = false,
  } = status;

  return (
    <div className="overflow-hidden rounded border border-gray-200 shadow">
      <div className="px-8 py-4">
        <h1>Status</h1>
      </div>
      <div>
        {Object.entries({
          bitbucket,
          confluence,
          github,
          jira,
          netlify,
          render,
          solana,
          trello,
          vercel,
        }).map(([service, error]) => {
          const bgColor = error ? 'bg-red-500' : 'bg-green-500';
          return (
            <div key={service} className="border-t">
              <div className="flex items-center justify-between">
                <p className="uppercase">{service}</p>
                <div className={`h-6 w-6 rounded-full ${bgColor}`} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
