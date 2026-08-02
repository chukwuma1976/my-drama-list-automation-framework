import { test, expect } from '@playwright/test';
import { generateFullApiUrl } from '../../main/config';
import { searchableDrama } from '../../main/utils/DataGenerator';

test('Validate response security headers', async ({ request }) => {
    // Make the GET request
    const response = await request.get(generateFullApiUrl(`/api/search/q/${searchableDrama.slug}`));
    const headers = response.headers();

    // 1. Validate Strict-Transport-Security (HSTS) is present and includes max-age
    const hsts = headers['strict-transport-security'];
    expect(hsts, 'HSTS header should be present').toBeDefined();
    expect(hsts).toContain('max-age');

    // 2. Verify server header is generic (e.g., Vercel) and doesn't leak specific version numbers
    const server = headers['server'];
    expect(server, 'Server header should be present').toBeDefined();
    expect(server).not.toMatch(/\d+\.\d+/); // Ensures no version like "2.4.41" is disclosed
});