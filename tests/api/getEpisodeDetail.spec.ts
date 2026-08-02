import test, { expect } from "@playwright/test";
import { generateFullApiUrl } from "../../main/config"
import { dramaSlug } from "../../main/utils/DataGenerator";
import Ajv from "ajv";
import addFormats from "ajv-formats";
import { dramaEpisodeDetailSchema } from "../../main/schemas/dramaEpisodeDetailSchema";
import { validateHeaders } from "../../main/utils/validateHeaders";

test.describe("Get drama episode details", { tag: ['@regression'] }, () => {

    const ajv = new Ajv();
    addFormats(ajv);
    const validate = ajv.compile(dramaEpisodeDetailSchema);

    for (let i = 1; i <= 10; i++) {
        test(`get drama episode details for episode ${i} a drama`, async ({ request }) => {
            const response = await request.get(generateFullApiUrl(`/api/id/${dramaSlug}/episodes/${i}`));
            expect(response.status()).toBe(200);
            const result = await response.json();
            expect(validate(result)).toBeTruthy();
            validateHeaders(response.headers());
        })
    }

    test("get drama episode details with a negative number as parameter", { tag: ['@regression'] }, async ({ request }) => {
        const response = await request.get(generateFullApiUrl(`/api/id/${dramaSlug}/episodes/-1`));
        expect(response.status()).toBe(500);
        const result = await response.json();
        expect(result.detail.description).toBe('Internal server error');
    })

    test("get drama episode details with an out of bounds large number as parameter", { tag: ['@regression'] }, async ({ request }) => {
        const response = await request.get(generateFullApiUrl(`/api/id/${dramaSlug}/episodes/200`));
        expect(response.status()).toBe(500);
        const result = await response.json();
        expect(result.detail.description).toBe('Internal server error');
    })

    test("get drama episode details with a string as an invalid parameter", { tag: ['@regression'] }, async ({ request }) => {
        const response = await request.get(generateFullApiUrl(`/api/id/${dramaSlug}/episodes/invalid`));
        expect(response.status()).toBe(422);
        const result = await response.json();
        expect(result.detail[0].msg).toBe('Input should be a valid integer, unable to parse string as an integer');
    })

})