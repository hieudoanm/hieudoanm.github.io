import type { NextApiHandler } from 'next';
import { docs } from './handlers/metadata/docs';
import { health } from './handlers/metadata/health';
import { info } from './handlers/metadata/info';
import { status } from './handlers/metadata/status';
import { version } from './handlers/metadata/version';
import { proxy } from './handlers/utils/proxy';
import type { Route } from './types';

const routes: Route[] = [docs, health, info, status, version, proxy];

const handlerMap: Record<string, NextApiHandler> = {};

for (const r of routes) {
  handlerMap[r.path.replace('/api/rest/', '')] = r.handler;
}

export const getHandler = (endpoint: string): NextApiHandler | undefined =>
  handlerMap[endpoint];

export const getRoutes = (): Route[] => routes;
