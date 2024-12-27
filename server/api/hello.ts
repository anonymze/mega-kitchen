import type { VercelRequest, VercelResponse } from '@vercel/node';
 
export const config = {
  runtime: 'edge'
};
 
export default function handler(
  request: VercelRequest,
  response: VercelResponse,
) {
	// setTimeout(() => {
		// console.log('hey')
	// }, 1000);
  return response.status(200).json({ text: 'I am an Edge Function!' });
}