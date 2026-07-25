import test, { expect } from "@playwright/test";
import { generateFullApiUrl } from "../../main/config"
import { dramaSlug } from "../../main/utils/dataGenerator";
import Ajv from "ajv";
import addFormats from "ajv-formats";
import { dramaDetailsSchema } from "../../main/schemas/dramaDetailsSchema";
import { validateHeaders } from "../../main/utils/validateHeaders";

test.describe("Get drama details", () => {

    const ajv = new Ajv();
    addFormats(ajv);
    const validate = ajv.compile(dramaDetailsSchema);

    test("get drama details for a drama", async ({ request }) => {
        const response = await request.get(generateFullApiUrl(`/api/id/${dramaSlug}`));
        expect(response.status()).toBe(200);
        const result = await response.json();
        expect(result.slug).toBe(dramaSlug);
        expect(validate(result)).toBeTruthy();
        validateHeaders(response.headers());
    })

    test("get drama details with missing parameter", async ({ request }) => {
        const response = await request.get(generateFullApiUrl(`/api/id/`));
        expect(response.status()).toBe(404);
        const result = await response.json();
        expect(result.detail).toBe("Not Found");
    })

    test("get drama details with invalid parameter", async ({ request }) => {
        const response = await request.get(generateFullApiUrl(`/api/id/99999-invalid`));
        expect(response.status()).toBe(500);
        const result = await response.json();
        expect(result.detail.description).toBe("Internal server error");
    })
})