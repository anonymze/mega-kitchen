// import { Request, Response } from '@edge-runtime/primitives'

export const config = {
  runtime: 'edge',
}

export function GET(request: Request) {
	console.log(process.env.VERCEL_REGION);
  return new Response('Hello from Edge Function!')
}
