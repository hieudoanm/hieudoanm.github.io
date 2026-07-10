import type { NextPage } from 'next';
import { ErrorPage } from '../routes/ErrorPage';

const NotFoundPage: NextPage = () => <ErrorPage statusCode={404} />;

export default NotFoundPage;
