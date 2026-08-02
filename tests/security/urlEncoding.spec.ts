import { test, expect } from '@playwright/test';
import { generateFullApiUrl } from '../../main/config';

test.describe('API Path URL Encoding Tests', { tag: ['@security'] }, () => {

    test('should handle raw string with spaces', async ({ request }) => {
        const rawParam = 'Alchemy of Souls';
        // Manually encode to convert spaces into %20
        const dynamicPath = `/api/search/q/${encodeURIComponent(rawParam)}`;

        const fullUrl = generateFullApiUrl(dynamicPath);
        expect(fullUrl).toContain('/api/search/q/Alchemy%20of%20Souls');

        const response = await request.get(fullUrl);
        expect(response.status()).toBe(200);
    });

    test('should handle pre-encoded string safely', async ({ request }) => {
        const preEncodedParam = 'Alchemy%20of%20Souls';
        // If your variable is already pre-encoded, pass it directly
        const dynamicPath = `/api/search/q/${preEncodedParam}`;

        const fullUrl = generateFullApiUrl(dynamicPath);
        expect(fullUrl).toContain('/api/search/q/Alchemy%20of%20Souls');

        const response = await request.get(fullUrl);
        expect(response.status()).toBe(200);
    });

    test('should handle double-encoded string for literal percent matching', async ({ request }) => {
        const doubleEncodedParam = 'Alchemy%2520of%2520Souls';
        // Use this if your backend specifically expects to decode "%2520" back into "%20"
        const dynamicPath = `/api/search/q/${doubleEncodedParam}`;

        const fullUrl = generateFullApiUrl(dynamicPath);
        expect(fullUrl).toContain('/api/search/q/Alchemy%2520of%2520Souls');

        const response = await request.get(fullUrl);
        expect(response.status()).toBe(200);
    });
});
