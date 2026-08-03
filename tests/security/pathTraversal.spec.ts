import { test, expect } from '@playwright/test';
import { generateFullApiUrl } from '../../main/config';

test.describe("Test path traversal", { tag: ['@security'] }, () => {

    // Define standard payloads for both Linux and Windows environments
    const payloads = [
        '../../../../etc/passwd',
        '..\\..\\..\\..\\windows\\win.ini',
        '..%2f..%2f..%2f..%2fetc%2fpasswd' // URL encoded
    ];

    test('API Endpoint - Path Traversal Protection', async ({ request }) => {
        for (const payload of payloads) {
            // Send a GET request to your file retrieval API route

            const response = await request.get(generateFullApiUrl(`/api/search/q`), {
                params: {
                    filename: payload
                }
            });

            // Check that the server safely blocks the request (e.g., 400 Bad Request or 403 Forbidden)
            expect(response.status()).toBe(404);
        }
    });

})