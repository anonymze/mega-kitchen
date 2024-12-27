import { Request, Response } from '@edge-runtime/primitives'

export const runtime = 'edge';

export function GET(request: Request) {
  return new Response().json({
    isEdge: "bonjour",
    // region: process.env.VERCEL_REGION,
    // runtime: process.env.EDGE_RUNTIME,
		// request: request.url
  });
}
