import type { VercelRequest, VercelResponse } from "@vercel/node";

export const config = {
	runtime: "edge",
	// not working on edge function (initial response 25 seconds)
	// maxDuration: 5,
};

export default async function handler(request: Request) {
	console.log(process.env.VERCEL_REGION);

	// You can access request properties like this:
	const { method, url, headers } = request;

	console.log(method, url, headers);

	return new Response("Hello from Edge Function!", {
		status: 200,
		headers: {
			"Content-Type": "application/json",
		},
	});
}
