import test, { expect } from "@playwright/test";
import { generateFullApiUrl } from "../../main/config"
import { dramaSlug } from "../../main/utils/DataGenerator";
import Ajv from "ajv";
import addFormats from "ajv-formats";
import { dramaEpisodesSchema } from "../../main/schemas/dramaEpisodesSchema";

test.describe("Get drama episodes", () => {

    const ajv = new Ajv();
    addFormats(ajv);
    const validate = ajv.compile(dramaEpisodesSchema);

    test("get episodes for a drama", async ({ request }) => {
        const response = await request.get(generateFullApiUrl(`/api/id/${dramaSlug}/episodes`));
        expect(response.status()).toBe(200);
        const result = await response.json();
        expect(validate(result)).toBeTruthy();
    })

    test("get episodes with a space as parameter", async ({ request }) => {
        const response = await request.get(generateFullApiUrl(`/api/id/ /episodes`));
        expect(response.status()).toBe(200);
        const result = await response.json();
        expect(result.episodes.length).toBe(0);
    })

    test("get episodes with invalid parameter", async ({ request }) => {
        const response = await request.get(generateFullApiUrl(`/api/id/99999-invalid/episodes`));
        expect(response.status()).toBe(500);
        const result = await response.json();
        expect(result.detail.description).toBe("Internal server error");
    })
})