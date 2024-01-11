import cors from 'cors';
import express, { json } from 'express';
import compression from 'compression';

export const app = express();
app.use(cors());
app.use(json());
app.use(compression());

export default app;
