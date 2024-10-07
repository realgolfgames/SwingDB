import { connectToDB } from '$lib/db';
import { golf_swing_chunks_model } from '$lib/models';
import type { RequestHandler } from '@sveltejs/kit';
import { v4 as uuidv4 } from 'uuid';

const CHUNK_SIZE = 10 * 1024 * 1024; // 10MB in bytes

export const POST: RequestHandler = async ({ request }) => {
	const connection = await connectToDB();

	if (!connection) {
		return new Response('Failed to connect to database', { status: 500 });
	}

	// Try to parse the incoming JSON
	let video: string;
	try {
		const data = await request.json();
		video = data.video; // Assuming the video is sent as a base64 string
	} catch (error) {
		return new Response(`Invalid JSON format: ${error}`, { status: 400 });
	}

	// Check if video is provided
	if (!video) {
		return new Response('No video provided', { status: 400 });
	}

	const chunks = splitIntoChunks(video);

	if (chunks instanceof Error) {
		return new Response(chunks.message, { status: 400 });
	}

	// Save chunks to database
	try {
		const video_id = uuidv4();

		for (let i = 0; i < chunks.length; i++) {
			// Save chunk to database
			const golf_swing_chunk = new golf_swing_chunks_model({
				video_id,
				item_number: i,
				chunk: chunks[i]
			});

			await golf_swing_chunk.save();
		}

		return new Response(JSON.stringify({ message: 'Video uploaded successfully', video_id }), {
			status: 200
		});
	} catch (err) {
		return new Response(JSON.stringify({ message: `Failed to upload video: ${err}` }), {
			status: 500
		});
	}
};

/**
 * Splits a base64 string into chunks of a specified size.
 * @param {string} base64String - The base64 string to split.
 * @param {number} chunkSize - The size of each chunk (default: 10MB).
 * @returns {string[] | Error} - An array of base64 string chunks or an Error object.
 */
function splitIntoChunks(base64String: string, chunkSize = CHUNK_SIZE): string[] | Error {
	// Check if the video is larger than 10MB and return an error
	if (base64String.length > chunkSize) {
		return new Error('Video size exceeds 10MB limit');
	}

	const numChunks = Math.ceil(base64String.length / chunkSize);
	const chunks: string[] = [];

	for (let i = 0; i < numChunks; i++) {
		const chunk = base64String.slice(i * chunkSize, (i + 1) * chunkSize);
		chunks.push(chunk);
	}

	return chunks;
}
