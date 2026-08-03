import test, { expect } from "@playwright/test";
import { generateMockApiUrl } from "../../main/config";
import { payloadToPatchInMockServer } from "../../main/utils/DataGenerator";

test.describe("Testing PATCH method in mock my drama list API", { tag: ['@regression'] }, () => {

    const payload = payloadToPatchInMockServer;

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

    test("Test PATCH request with positive scenario", async ({ request }) => {
        const updateFields = { "status": "Completed", "rating": "10" };
        const expectedDrama = { ...payload, ...updateFields }
        const response = await request.patch(generateMockApiUrl(payload.slug), { data: updateFields });
        expect(response.status()).toBe(200);
        const result = await response.json();
        expect(result).toMatchObject(expectedDrama);
    })

    test("Test PATCH request trying to update non existent resource", async ({ request }) => {
        const updateFields = { "status": "Completed", "rating": "10" };
        const response = await request.patch(generateMockApiUrl("non-existent-resource"), { data: updateFields });
        expect(response.status()).toBe(404);
        const result = await response.json();
        expect(result.message).toBe("Drama not found");
    })

    test("Test PATCH request using entire drama object with modified fields", async ({ request }) => {
        const updateFields = { "status": "Completed", "rating": "10" };
        const expectedDrama = { ...payload, ...updateFields }
        const response = await request.patch(generateMockApiUrl(payload.slug), { data: expectedDrama });
        expect(response.status()).toBe(200);
        const result = await response.json();
        expect(result).toMatchObject(expectedDrama);
    })

    test("Test PATCH request with one of the fields missing", async ({ request }) => {
        const updateFields = { "status": "", "rating": "10" };
        const response = await request.patch(generateMockApiUrl(payload.slug), { data: updateFields });
        expect(response.status()).toBe(422);
        const result = await response.json();
        expect(result.message).toBe("Unprocessable entity");
        expect(result.errors).toContain("status must be present");
    })

    test("Test PATCH request with both of the fields missing", async ({ request }) => {
        const updateFields = { "status": "", "rating": "" };
        const response = await request.patch(generateMockApiUrl(payload.slug), { data: updateFields });
        expect(response.status()).toBe(422);
        const result = await response.json();
        expect(result.message).toBe("Unprocessable entity");
        expect(result.errors).toContain("status must be present");
        expect(result.errors).toContain("rating must be present");
    })

    test("Test PATCH request with a field of the wrong type", async ({ request }) => {
        const updateFields = { "status": "Completed", "rating": 10 };
        const response = await request.patch(generateMockApiUrl(payload.slug), { data: updateFields });
        expect(response.status()).toBe(422);
        const result = await response.json();
        expect(result.message).toBe("Unprocessable entity");
        expect(result.errors).toContain("rating must be a string");
    })

    test("Test PATCH request with an empty object", async ({ request }) => {
        const updateFields = {};
        const response = await request.patch(generateMockApiUrl(payload.slug), { data: updateFields });
        expect(response.status()).toBe(422);
        const result = await response.json();
        expect(result.message).toBe("Unprocessable entity");
        expect(result.errors).toContain("status must be present");
        expect(result.errors).toContain("rating must be present");
    })

    test("Test PATCH request with a non matching status", async ({ request }) => {
        const updateFields = { "status": "Uploading", "rating": "10" };
        const response = await request.patch(generateMockApiUrl(payload.slug), { data: updateFields });
        expect(response.status()).toBe(422);
        const result = await response.json();
        expect(result.message).toBe("Unprocessable entity");
        expect(result.errors).toContain("Invalid status");
    })

    test("Test PATCH request with a rating less than 0", async ({ request }) => {
        const updateFields = { "status": "Watching", "rating": "-10" };
        const response = await request.patch(generateMockApiUrl(payload.slug), { data: updateFields });
        expect(response.status()).toBe(422);
        const result = await response.json();
        expect(result.message).toBe("Unprocessable entity");
        expect(result.errors).toContain("Rating must be between 0 and 10");
    })

    test("Test PATCH request with a rating greater than 10", async ({ request }) => {
        const updateFields = { "status": "Watching", "rating": "10.5" };
        const response = await request.patch(generateMockApiUrl(payload.slug), { data: updateFields });
        expect(response.status()).toBe(422);
        const result = await response.json();
        expect(result.message).toBe("Unprocessable entity");
        expect(result.errors).toContain("Rating must be between 0 and 10");
    })

})