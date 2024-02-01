import {
  Card,
  CardHeader,
  Heading,
  List,
  ListItem,
  CardBody,
} from '@chakra-ui/react';
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
    <Card className="overflow-hidden rounded border border-gray-200 shadow">
      <CardHeader>
        <Heading>Status</Heading>
      </CardHeader>
      <List>
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
            <ListItem key={service} className="border-t">
              <CardBody>
                <div className="flex items-center justify-between">
                  <p className="uppercase">{service}</p>
                  <div className={`h-6 w-6 rounded-full ${bgColor}`} />
                </div>
              </CardBody>
            </ListItem>
          );
        })}
      </List>
    </Card>
  );
};
