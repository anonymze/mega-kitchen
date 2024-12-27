import type { VercelRequest, VercelResponse } from '@vercel/node';
 
export const config = {
  runtime: 'edge',
	// not working on edge function (initial response 25 seconds)
	// maxDuration: 5,
};
 
export default async function handler(
	ok: any
  // request: VercelRequest,
  // response: VercelResponse,
) {
	console.dir(ok, { depth: null })
	console.log(process.env.VERCEL_REGION);
  return new Response('Hello from Edge Function!');
	
}