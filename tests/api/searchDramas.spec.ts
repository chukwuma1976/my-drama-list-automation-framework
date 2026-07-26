import test, { expect } from "@playwright/test";
import { generateFullApiUrl } from "../../main/config"
import { dramaList } from "../../main/utils/dataGenerator";
import Ajv from "ajv";
import addFormats from "ajv-formats";
import { dramaListSchema } from "../../main/schemas/dramaListSchema";
import { validateHeaders } from "../../main/utils/validateHeaders";

test.describe("Search for dramas", () => {
    const ajv = new Ajv();
    addFormats(ajv);
    const validate = ajv.compile(dramaListSchema);

    dramaList.forEach((drama) => {
        test(`Search for a drama by name of ${drama}`, async ({ request }) => {
            const response = await request.get(generateFullApiUrl(`/api/search/q/${drama}`));
            expect(response.status()).toBe(200);
            const result = await response.json();
            expect(Array.isArray(result.results)).toBeTruthy();
            expect(validate(result)).toBeTruthy();
            validateHeaders(response.headers());
        })
    })

    test("Search for drama with missing drama name", async ({ request }) => {
        const response = await request.get(generateFullApiUrl("/api/search/q/"));
        expect(response.status()).toBe(404);
        const result = await response.json();
        expect(result.detail).toBe("Not Found");
    })

})