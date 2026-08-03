import test, { expect } from "@playwright/test";
import { generateFullApiUrl } from "../../main/config"

test.describe("Health check", () => {


    test("health check endpoint", { tag: ['@smoke', '@regression'] }, async ({ request }) => {
        const response = await request.get(generateFullApiUrl(`/api/health`));
        expect(response.status()).toBe(200);
        const result = await response.json();
        expect(result.status).toBe("healthy");
        expect(result.version).toBeTruthy();
        expect(result.message).toBe("MyDramaList Unofficial API is running");
    })

})