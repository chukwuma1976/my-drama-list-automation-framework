import test, { expect } from "@playwright/test";
import { generateFullApiUrl } from "../../main/config"
import Ajv from "ajv";
import addFormats from "ajv-formats";
import { dramaCustomListSchema } from "../../main/schemas/dramaCustomListSchema";
import { dramaListCodes } from "../../main/utils/DataGenerator";
import { validateHeaders } from "../../main/utils/validateHeaders";

test.describe("Get custom list dramas", () => {

    const ajv = new Ajv();
    addFormats(ajv);
    const validate = ajv.compile(dramaCustomListSchema);

    dramaListCodes.forEach((list) => {

        test(`get custom drama list for ${list}`, { tag: ['@regression'] }, async ({ request }) => {
            const response = await request.get(generateFullApiUrl(`/api/list/${list}`));
            expect(response.status()).toBe(200);
            const result = await response.json();
            expect(result.url).toContain(list);
            expect(validate(result)).toBeTruthy();
            validateHeaders(response.headers());
        })

    })

    test("get drama for invalid list", { tag: ['@regression'] }, async ({ request }) => {
        const response = await request.get(generateFullApiUrl(`/api/list/invalid`));
        expect(response.status()).toBe(500);
        const result = await response.json();
        expect(result.detail.description).toBe("Internal server error");
    })

    test("get drama for empty parameter list", { tag: ['@regression'] }, async ({ request }) => {
        const response = await request.get(generateFullApiUrl(`/api/list/`));
        expect(response.status()).toBe(404);
        const result = await response.json();
        expect(result.detail).toBe("Not Found");
    })

})