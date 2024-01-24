import compression from 'compression';
import cors from 'cors';
import express, { json } from 'express';

export const app = express();
app.use(cors());
app.use(json());
app.use(compression());

export default app;
