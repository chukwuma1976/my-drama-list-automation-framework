import test, { expect } from "@playwright/test";
import { generateFullApiUrl } from "../../main/config"
import { dramaSlug } from "../../main/utils/dataGenerator";
import Ajv from "ajv";
import addFormats from "ajv-formats";
import { dramaAllEpisodesDetailsSchema } from "../../main/schemas/dramaAllEpisodesDetailsSchema";
import { validateHeaders } from "../../main/utils/validateHeaders";

test.describe("Get all drama episode details", () => {

    const ajv = new Ajv();
    addFormats(ajv);
    const validate = ajv.compile(dramaAllEpisodesDetailsSchema);

    test(`get drama details for all episodes in a drama`, async ({ request }) => {
        const response = await request.get(generateFullApiUrl(`/api/id/${dramaSlug}/episodes/all`));
        expect(response.status()).toBe(200);
        const result = await response.json();
        expect(validate(result)).toBeTruthy();
        validateHeaders(response.headers());
    })

    test("get drama details with an invalid parameter", async ({ request }) => {
        const response = await request.get(generateFullApiUrl(`/api/id/99999-invalid/episodes/all`));
        expect(response.status()).toBe(500);
        const result = await response.json();
        expect(result.detail.description).toBe("Internal server error");
    })

})