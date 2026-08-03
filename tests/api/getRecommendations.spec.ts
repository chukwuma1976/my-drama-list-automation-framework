import test, { expect } from "@playwright/test";
import { generateFullApiUrl } from "../../main/config"
import { dramaSlug } from "../../main/utils/DataGenerator";
import Ajv from "ajv";
import addFormats from "ajv-formats";
import { dramaRecommendations } from "../../main/schemas/dramaRecommendations";
import { validateHeaders } from "../../main/utils/validateHeaders";

test.describe("Get recommendations", { tag: ['@regression'] }, () => {

    const ajv = new Ajv();
    addFormats(ajv);
    const validate = ajv.compile(dramaRecommendations);

    test("get recommendations for a drama", async ({ request }) => {
        const response = await request.get(generateFullApiUrl(`/api/id/${dramaSlug}/recs`));
        expect(response.status()).toBe(200);
        const result = await response.json();
        expect(result.url).toContain(dramaSlug);
        expect(validate(result)).toBeTruthy();
        validateHeaders(response.headers());
    })

    test("get recommendations with missing parameter", async ({ request }) => {
        const response = await request.get(generateFullApiUrl(`/api/id//recs`));
        expect(response.status()).toBe(500);
        const result = await response.json();
        expect(result.detail.description).toBe("Internal server error");
    })

    test("get recommendations with invalid parameter", async ({ request }) => {
        const response = await request.get(generateFullApiUrl(`/api/id/99999-invalid/recs`));
        expect(response.status()).toBe(500);
        const result = await response.json();
        expect(result.detail.description).toBe("Internal server error");
    })
})