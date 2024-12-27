// import { Request } from '@edge-runtime/primitives'

export const runtime = 'edge';

export function GET(request: Request) {

  return new Response(`Hello from ${process.env.VERCEL_REGION}`);
}
