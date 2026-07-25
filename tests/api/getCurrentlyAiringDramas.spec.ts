import test, { expect } from "@playwright/test";
import { generateFullApiUrl } from "../../main/config"
import Ajv from "ajv";
import addFormats from "ajv-formats";
import { dramasCurrentlyAiringSchema } from "../../main/schemas/dramasCurrentlyAiringSchema";
import { validateHeaders } from "../../main/utils/validateHeaders";

test.describe("Get currently airing dramas", () => {

    const ajv = new Ajv();
    addFormats(ajv);
    const validate = ajv.compile(dramasCurrentlyAiringSchema);

    test("get currently airing dramas", async ({ request }) => {
        const response = await request.get(generateFullApiUrl("/api/calendar"));
        expect(response.status()).toBe(200);
        const result = await response.json();
        expect(validate(result)).toBeTruthy();
        validateHeaders(response.headers());
    })

    test("get currently airing dramas with mispelled URL", async ({ request }) => {
        const response = await request.get(generateFullApiUrl("/api/calAndar"));
        expect(response.status()).toBe(404);
        const result = await response.json();
        expect(result.detail).toBe("Not Found");
    })

})