import test, { expect } from "@playwright/test";
import { generateFullApiUrl } from "../../main/config"
import { dramaSlug } from "../../main/utils/dataGenerator";
import Ajv from "ajv";
import addFormats from "ajv-formats";
import { dramaCastAndCrewSchema } from "../../main/schemas/dramaCastAndCrewSchema";
import { validateHeaders } from "../../main/utils/validateHeaders";

test.describe("Get cast and crew", () => {

    const ajv = new Ajv();
    addFormats(ajv);
    const validate = ajv.compile(dramaCastAndCrewSchema);

    test("get drama cast and crew for a drama", async ({ request }) => {
        const response = await request.get(generateFullApiUrl(`/api/id/${dramaSlug}/cast`));
        expect(response.status()).toBe(200);
        const result = await response.json();
        expect(validate(result)).toBeTruthy();
        validateHeaders(response.headers());
    })

    test("get drama cast and crew with invalid parameter", async ({ request }) => {
        const response = await request.get(generateFullApiUrl(`/api/id/99999-invalid/cast`));
        expect(response.status()).toBe(500);
        const result = await response.json();
        expect(result.detail.description).toBe("Internal server error");
    })
})