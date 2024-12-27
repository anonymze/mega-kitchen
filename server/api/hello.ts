import type { VercelRequest, VercelResponse } from '@vercel/node';
 
export const config = {
  runtime: 'edge',
	duration: 2,
};
 
export default async function handler(
  // request: VercelRequest,
  // response: VercelResponse,
) {
	await new Promise(resolve => setTimeout(resolve, 40000));
	console.log(process.env.VERCEL_REGION);
  return new Response('Hello from Edge Function!');
	
}