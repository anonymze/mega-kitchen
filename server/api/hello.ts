import { ipAddress } from "@vercel/functions";
import { getEnv } from "@vercel/functions";
import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";


// if you need to delay the timeout, you can use this
// import { waitUntil } from '@vercel/functions';

export const config = {
	runtime: "edge",
	// not working on edge function (initial response 25 seconds)
	// maxDuration: 5,
};

export default async function handler(request: Request) {
	const { VERCEL_REGION } = getEnv();
	const ip = ipAddress(request);

	console.log(VERCEL_REGION);
	console.log(ip);
	console.log(process.env.OPENAI_API_KEY);

	const result = streamText({
		model: openai("gpt-4o"),
		prompt: "Hello, how are you?",
		
	});

	return result.toDataStreamResponse();
}
