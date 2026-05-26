import type { APIEvent } from '@solidjs/start/server';
import { appRouter } from '@hieudoanm/server/routers/_app';

/**
 * tRPC handler for SolidStart.
 * Minimal wrapper — will need a full tRPC adapter for SolidStart.
 * Currently returns 501 to indicate the adapter is not yet integrated.
 */
export async function GET(event: APIEvent) {
  return new Response(
    JSON.stringify({
      error: 'tRPC GET not implemented — use POST for tRPC queries/mutations.',
    }),
    { status: 501, headers: { 'Content-Type': 'application/json' } }
  );
}

export async function POST(event: APIEvent) {
  try {
    const body = await event.request.json();
    const url = new URL(event.request.url);
    const path = url.pathname.replace(/^\/?api\/trpc\//, '');

    // Basic tRPC call dispatch — placeholder until full adapter is added
    const { procedure, input } = extractProcedureCall(path, body);
    const result = await executeProcedure(procedure, input);

    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('[tRPC]', err);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

function extractProcedureCall(
  path: string,
  body: any
): { procedure: string; input: any } {
  // Expect path like "genai.generate" or "youtube.transcript.summarise"
  return {
    procedure: path.replace(/\.json$/, ''),
    input: body?.input ?? body ?? {},
  };
}

async function executeProcedure(procedure: string, input: any): Promise<any> {
  // Walk the appRouter to find the procedure
  const parts = procedure.split('.');
  let current: any = appRouter;

  for (const part of parts) {
    if (!current || !current[part]) {
      throw new Error(`Procedure "${procedure}" not found`);
    }
    current = current[part];
  }

  if (typeof current?.mutation !== 'function') {
    throw new Error(`Procedure "${procedure}" is not a mutation`);
  }

  return await current.mutation({ input });
}
