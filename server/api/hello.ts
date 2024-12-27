// if you need to delay the timeout, you can use this
// import { waitUntil } from '@vercel/functions';

import { getEnv } from '@vercel/functions';
import { ipAddress } from '@vercel/functions';

export const config = {
	runtime: "edge",
	// not working on edge function (initial response 25 seconds)
	// maxDuration: 5,
};

export default async function handler(request: Request) {
  const { VERCEL_REGION } = getEnv();
  const ip = ipAddress(request);

  console.log(ip);
	console.log(VERCEL_REGION);
	
	return new Response("Hello from Edge Function!", {
		status: 200,
		headers: {
			"Content-Type": "application/json",
		},
	});
}
