import { readFile } from 'fs/promises';
import fetch from 'node-fetch';
import { createGzip } from 'zlib';

/**
 * Converts a video file to base64, compresses it, and sends it via an API.
 * @param {string} filePath - The path to the video file.
 * @param {string} apiUrl - The API URL where the file should be uploaded.
 */
async function uploadCompressedVideo(filePath, apiUrl) {
    try {
        // Read the video file as a binary buffer
        const videoBuffer = await readFile(filePath);

        // Convert the buffer to a base64 string
        const base64Video = videoBuffer.toString('base64');

        // Compress the base64 string
        const compressedVideo = await gzipCompress(base64Video);

        // Send the compressed base64 video to the API
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ video: compressedVideo.toString('base64') }), // Send as JSON
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const responseData = await response.json();
        console.log('Video uploaded successfully:', responseData);
    } catch (error) {
        console.error('Error uploading video:', error);
    }
}

/**
 * Compresses a string using gzip.
 * @param {string} data - The string to compress.
 * @returns {Promise<Buffer>} - The compressed data as a buffer.
 */
function gzipCompress(data) {
    return new Promise((resolve, reject) => {
        const gzip = createGzip();
        const chunks = [];

        // Gzip the data
        gzip.on('data', (chunk) => chunks.push(chunk));
        gzip.on('end', () => resolve(Buffer.concat(chunks)));
        gzip.on('error', reject);

        gzip.end(data);
    });
}

// Example usage
const videoFilePath = './SmoothSwing-VAUULAC42.mov';
const apiUrl = 'http://172.19.7.50:5173/api/upload';

uploadCompressedVideo(videoFilePath, apiUrl);
