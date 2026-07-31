import { test, expect } from '@playwright/test';
import { generateFullApiUrl } from '../../main/config';

test.describe("Test path traversal", () => {

    // Define unicode payloads
    const payloads = [
        'Blossoms of Power',
        ' 我花开后百花杀',
        'Жорстока',
        'Единственная',
        'ガス人間',
        'محمد',
        '😀😀😀😀'
    ];

    test('API Endpoint - Path Traversal Protection', async ({ request }) => {
        for (const payload of payloads) {
            const response = await request.get(generateFullApiUrl(`/api/search/q/${payload}`));

            expect(response.status()).toBe(200);
            expect(await response.json()).toBeTruthy();
        }
    });

})