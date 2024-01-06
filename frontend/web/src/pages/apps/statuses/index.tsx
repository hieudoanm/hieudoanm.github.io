import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Link,
  List,
  ListItem,
  Text,
} from '@chakra-ui/react';
import { log } from '@hieudoanm/common/log';
import Container from '@hieudoanm/components/Container';
import Head from 'next/head';
import React, { useEffect, useState } from 'react';

type Status = { name: string; page: string; status: boolean };

const StatusPage: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [statuses, setStatuses] = useState<Record<string, Status>>({});

  const getStatusByIndicator = async ({
    url,
    name,
  }: {
    url: string;
    name: string;
  }): Promise<Status> => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      const status = data.status.indicator === 'none';
      const page = data.page.url ?? url;
      return { name, page, status };
    } catch (error) {
      log.error(error);
      return { name, page: url, status: false };
    }
  };

  const getStatuses = async (): Promise<{
    github: Status;
    vercel: Status;
    netlify: Status;
    render: Status;
    confluence: Status;
    jiraSoftware: Status;
    bitbucket: Status;
    trello: Status;
    solana: Status;
  }> => {
    const [
      github,
      vercel,
      netlify,
      render,
      confluence,
      jiraSoftware,
      bitbucket,
      trello,
      solana,
    ] = await Promise.all([
      getStatusByIndicator({
        url: 'https://www.githubstatus.com/api/v2/status.json',
        name: 'GitHub',
      }),
      getStatusByIndicator({
        url: 'https://www.vercel-status.com/api/v2/status.json',
        name: 'Vercel',
      }),
      getStatusByIndicator({
        url: 'https://www.netlifystatus.com/api/v2/status.json',
        name: 'Netlify',
      }),
      getStatusByIndicator({
        url: 'https://status.render.com/api/v2/status.json',
        name: 'Render',
      }),
      getStatusByIndicator({
        url: 'https://jira-software.status.atlassian.com/api/v2/status.json',
        name: 'Jira Software',
      }),
      getStatusByIndicator({
        url: 'https://confluence.status.atlassian.com/api/v2/status.json',
        name: 'Confluence',
      }),
      getStatusByIndicator({
        url: 'https://bitbucket.status.atlassian.com/api/v2/status.json',
        name: 'BitBucket',
      }),
      getStatusByIndicator({
        url: 'https://trello.status.atlassian.com/api/v2/status.json',
        name: 'Trello',
      }),
      getStatusByIndicator({
        url: 'https://status.solana.com/api/v2/status.json',
        name: 'Solana',
      }),
    ]);
    return {
      github,
      vercel,
      netlify,
      render,
      confluence,
      jiraSoftware,
      bitbucket,
      trello,
      solana,
    };
  };

  useEffect(() => {
    const getStatusesAsync = async () => {
      const {
        github,
        vercel,
        netlify,
        render,
        confluence,
        jiraSoftware,
        bitbucket,
        trello,
        solana,
      } = await getStatuses();
      setStatuses({
        github,
        vercel,
        netlify,
        render,
        confluence,
        jiraSoftware,
        bitbucket,
        trello,
        solana,
      });
      setLoading(false);
    };
    getStatusesAsync();
  }, [getStatuses]);

  return (
    <>
      <Head>
        <title>Statuses</title>
      </Head>
      <Container>
        <div className="p-8">
          <Card className="border border-gray-200 shadow">
            <CardHeader>
              <Heading className="text-xl">Statuses</Heading>
            </CardHeader>
            {loading ? (
              <List>
                <ListItem className="border-t border-gray-200">
                  <p className="py-8 text-center">Loading</p>
                </ListItem>
              </List>
            ) : (
              <List>
                {Object.entries(statuses).map(
                  ([service, { name, page, status }]) => {
                    const bgColor = status ? 'bg-green-500' : 'bg-red-500';
                    return (
                      <ListItem key={service} className="border-t">
                        <CardBody>
                          <div className="flex items-center justify-between">
                            <Link href={page} target="_blank">
                              <Text textDecoration="underline">{name}</Text>
                            </Link>
                            <Box
                              className={`h-6 w-6 rounded-full ${bgColor}`}
                            />
                          </div>
                        </CardBody>
                      </ListItem>
                    );
                  }
                )}
              </List>
            )}
          </Card>
        </div>
      </Container>
    </>
  );
};

export default StatusPage;
