import type { NextPage } from 'next';
import { ErrorPage } from '../routes/ErrorPage';

const ServerErrorPage: NextPage = () => <ErrorPage statusCode={500} />;

export default ServerErrorPage;
