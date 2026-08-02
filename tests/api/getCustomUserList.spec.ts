import test, { expect } from "@playwright/test";
import { generateFullApiUrl } from "../../main/config"
import Ajv from "ajv";
import addFormats from "ajv-formats";
import { dramaCustomUserListSchema } from "../../main/schemas/dramaCustomUserListSchema";
import { userListCode } from "../../main/utils/DataGenerator";
import { validateHeaders } from "../../main/utils/validateHeaders";

test.describe("Get custom list dramas", () => {

    const ajv = new Ajv();
    addFormats(ajv);
    const validate = ajv.compile(dramaCustomUserListSchema);

    test(`get a user drama list of 2025`, async ({ request }) => {
        const response = await request.get(generateFullApiUrl(`/api/dramalist/${userListCode}`));
        expect(response.status()).toBe(200);
        const result = await response.json();
        expect(result.url).toContain(userListCode);
        expect(result.username).toBe(userListCode);
        expect(result.user_id).toBe(userListCode);
        expect(validate(result)).toBeTruthy();
        validateHeaders(response.headers());
    })


    test("get drama for invalid list", async ({ request }) => {
        const response = await request.get(generateFullApiUrl(`/api/dramalist/999invalid`));
        expect(response.status()).toBe(500);
        const result = await response.json();
        expect(result.detail.description).toBe("Internal server error");
    })

    test("get drama for empty parameter list", async ({ request }) => {
        const response = await request.get(generateFullApiUrl(`/api/dramalist/`));
        expect(response.status()).toBe(404);
        const result = await response.json();
        expect(result.detail).toBe("Not Found");
    })

})