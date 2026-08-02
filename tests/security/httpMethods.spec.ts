import { test, expect } from '@playwright/test';
import { generateFullApiUrl } from '../../main/config';
import { dramaMyDemon } from '../../main/utils/DataGenerator';

test.describe('API HTTP Verification methods', () => {
    // The endpoints for this particular API only have GET methods, all other methods return 405 Method not Supported

    test('should handle GET request with ok response', async ({ request }) => {
        const response = await request.get(generateFullApiUrl(`/api/search/q/${dramaMyDemon.slug}`));
        expect(response.status()).toBe(200);
        expect(response.statusText()).toBe("OK");

    });

    test('should not be able to handle POST request', async ({ request }) => {
        const response = await request.post(generateFullApiUrl(`/api/search/q/${dramaMyDemon.slug}`));
        expect(response.status()).toBe(405);
        expect(response.statusText()).toBe("Method Not Allowed");
    });

    test('should not be able to handle PUT request', async ({ request }) => {
        const response = await request.put(generateFullApiUrl(`/api/search/q/${dramaMyDemon.slug}`));
        expect(response.status()).toBe(405);
        expect(response.statusText()).toBe("Method Not Allowed");
    });

    test('should not be able to handle PATCH request', async ({ request }) => {
        const response = await request.patch(generateFullApiUrl(`/api/search/q/${dramaMyDemon.slug}`));
        expect(response.status()).toBe(405);
        expect(response.statusText()).toBe("Method Not Allowed");
    });

    test('should not be able to handle DELETE request', async ({ request }) => {
        const response = await request.delete(generateFullApiUrl(`/api/search/q/${dramaMyDemon.slug}`));
        expect(response.status()).toBe(405);
        expect(response.statusText()).toBe("Method Not Allowed");
    });
});
