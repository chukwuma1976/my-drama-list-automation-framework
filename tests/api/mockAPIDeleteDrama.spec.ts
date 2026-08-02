import test, { expect } from "@playwright/test";
import { generateMockApiUrl } from "../../main/config";
import { slugToBeDeletedInMockServer } from "../../main/utils/dataGenerator";

test.describe("Testing DELETE method in mock my drama list API", () => {

    const slug = slugToBeDeletedInMockServer;

    // Check if local server is running
    test.beforeAll(async ({ request }) => {
        try {
            const response = await request.get(generateMockApiUrl("health"));
            test.skip(response.status() !== 200, "Skipping group: Health check API is down");
        } catch (error: any) {
            test.skip(true, `Health check failed with error: ${error.message}`);
        }
        console.log("Mock my drama list server running...")
    })

    // Reset testing data
    test.beforeEach(async ({ request }) => {
        await request.post(generateMockApiUrl("reset"))
    });

    test("Test DELETE request with positive scenario", async ({ request }) => {
        const response = await request.delete(generateMockApiUrl(slug));
        expect(response.status()).toBe(204);
        expect(response.statusText()).toBe("No Content");
    })

    test("Test DELETE request trying to delete non existent resource", async ({ request }) => {
        const response = await request.delete(generateMockApiUrl("non-existent-resource"));
        expect(response.status()).toBe(404);
        expect(response.statusText()).toBe("Not Found");
    })

})