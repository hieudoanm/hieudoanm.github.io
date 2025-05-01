import { initTRPC } from '@trpc/server';

const trpc = initTRPC.create();

export const { procedure, router } = trpc;
