import test, { expect } from "@playwright/test";
import { generateFullApiUrl } from "../../main/config"
import { dramaSlug } from "../../main/utils/dataGenerator";
import Ajv from "ajv";
import addFormats from "ajv-formats";
import { dramaReviewsSchema } from "../../main/schemas/dramaReviewsSchema";
import { validateHeaders } from "../../main/utils/validateHeaders";

test.describe("Get reviews", () => {

    const ajv = new Ajv();
    addFormats(ajv);
    const validate = ajv.compile(dramaReviewsSchema);

    test(`get reviews for all episodes in a drama`, async ({ request }) => {
        const response = await request.get(generateFullApiUrl(`/api/id/${dramaSlug}/reviews`));
        expect(response.status()).toBe(200);
        const result = await response.json();
        expect(validate(result)).toBeTruthy();
        validateHeaders(response.headers());
    })

    test("get reviews with an invalid parameter", async ({ request }) => {
        const response = await request.get(generateFullApiUrl(`/api/id/99999-invalid/reviews`));
        expect(response.status()).toBe(500);
        const result = await response.json();
        expect(result.detail.description).toBe("Internal server error");
    })

})