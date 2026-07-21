import test, { expect } from "@playwright/test";
import { generateFullApiUrl } from "../../main/config"
import Ajv from "ajv";
import addFormats from "ajv-formats";
import { seasonalDramasSchema } from "../../main/schemas/seasonalDramasSchema";

test.describe("Get seasonal dramas", () => {

    const ajv = new Ajv();
    addFormats(ajv);
    const validate = ajv.compile(seasonalDramasSchema);

    [1, 2, 3, 4].forEach((season) => {

        test(`get dramas for season ${season} of 2025`, async ({ request }) => {
            const response = await request.get(generateFullApiUrl(`/api/seasonal/2025/${season}`));
            expect(response.status()).toBe(200);
            const result = await response.json();
            expect(result.year).toBe(2025);
            expect(result.quarter).toBe(season)
            expect(validate(result)).toBeTruthy();
        })

    })

    test("get drama for non existent (invalid) season", async ({ request }) => {
        const response = await request.get(generateFullApiUrl(`/api/seasonal/2025/5`));
        expect(response.status()).toBe(400);
        const result = await response.json();
        expect(result.detail.description).toBe("Quarter must be 1, 2, 3, or 4");
    })

    test("get drama for negative number (invalid) season", async ({ request }) => {
        const response = await request.get(generateFullApiUrl(`/api/seasonal/2025/-1`));
        expect(response.status()).toBe(400);
        const result = await response.json();
        expect(result.detail.description).toBe("Quarter must be 1, 2, 3, or 4");
    })

})