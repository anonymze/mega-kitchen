import type { VercelRequest, VercelResponse } from '@vercel/node';
 
export const config = {
  runtime: 'edge',
	maxDuration: 1,
};
 
export default function handler(
  // request: VercelRequest,
  // response: VercelResponse,
) {
	console.log(process.env.VERCEL_REGION);
  return new Response('Hello from Edge Function!');
	
}