// import { Request } from '@edge-runtime/primitives'

export const runtime = 'edge';

export function GET(request: Request) {
  return new Response(JSON.stringify({
    isEdge: process.env.EDGE_RUNTIME === 'edge',
    region: process.env.VERCEL_REGION,
    runtim: process.env.EDGE_RUNTIME,
		request: request.url
  }));
}
