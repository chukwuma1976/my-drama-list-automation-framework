import test, { expect } from "@playwright/test";
import { generateFullApiUrl } from "../../main/config"
import { actors } from "../../main/utils/dataGenerator";
import Ajv from "ajv";
import addFormats from "ajv-formats";
import { dramaPersonSchema } from "../../main/schemas/dramaPersonSchema";
import { validateHeaders } from "../../main/utils/validateHeaders";

test.describe("Get person details", () => {

    const ajv = new Ajv();
    addFormats(ajv);
    const validate = ajv.compile(dramaPersonSchema);

    actors.forEach((actor) => {

        test(`get person details for ${actor}`, async ({ request }) => {
            const response = await request.get(generateFullApiUrl(`/api/people/${actor}`));
            expect(response.status()).toBe(200);
            const result = await response.json();
            expect(validate(result)).toBeTruthy();
            validateHeaders(response.headers());
        })

    })

    test("get person details with invalid parameter", async ({ request }) => {
        const response = await request.get(generateFullApiUrl(`/api/people/invalid`));
        expect(response.status()).toBe(500);
        const result = await response.json();
        expect(result.detail.description).toBe("Internal server error");
    })

})