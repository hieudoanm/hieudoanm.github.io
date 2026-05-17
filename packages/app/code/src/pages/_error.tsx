import type { NextPage, NextPageContext } from 'next';
import { ErrorPage } from '../routes/ErrorPage';

interface ErrorProps {
  statusCode?: number;
}

const ErrorNextPage: NextPage<ErrorProps> = ({ statusCode }) => (
  <ErrorPage statusCode={statusCode} />
);

ErrorNextPage.getInitialProps = ({ res, err }: NextPageContext) => {
  let statusCode: number;
  if (res) {
    statusCode = res.statusCode;
  } else if (err) {
    statusCode = 'statusCode' in err ? (err.statusCode ?? 500) : 500;
  } else {
    statusCode = 404;
  }
  return { statusCode };
};

export default ErrorNextPage;
