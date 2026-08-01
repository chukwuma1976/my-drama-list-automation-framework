import test, { expect } from "@playwright/test";
import { generateMockApiUrl, MOCK_API_URL } from "../../main/config";
import { existingPayloadSlug, payloadToPostInPostServer } from "../../main/utils/DataGenerator";

test.describe("Testing POST method in mock my drama list API", () => {

    const payload = payloadToPostInPostServer;

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

    test("Test POST request with positive scenario", async ({ request }) => {
        const response = await request.post(MOCK_API_URL, { data: payload });
        expect(response.status()).toBe(201);
        const result = await response.json();
        expect(result).toMatchObject(payload);
    })

    test("Test POST request with adding existing resource", async ({ request }) => {
        const res = await request.get(generateMockApiUrl(existingPayloadSlug));
        const existingPayload = await res.json();

        const response = await request.post(MOCK_API_URL, { data: existingPayload });
        expect(response.status()).toBe(409);

        const result = await response.json();
        expect(result.message).toBe("Drama already exists.");
    })

    test("Test POST request with non matching status", async ({ request }) => {
        payload.slug = "non-matching-status"
        payload.status = "non matching"
        const response = await request.post(MOCK_API_URL, { data: payload });
        expect(response.status()).toBe(422);

        const result = await response.json();
        expect(result.message).toBe('Unprocessable entity');
        expect(result.errors).toContain('Invalid status');
    })

    test("Test POST request with rating less than 0", async ({ request }) => {
        payload.slug = "rating less than 0"
        payload.rating = "-9.5";
        const response = await request.post(MOCK_API_URL, { data: payload });
        expect(response.status()).toBe(422);

        const result = await response.json();
        expect(result.message).toBe('Unprocessable entity');
        expect(result.errors).toContain("Rating must be between 0 and 10");
    })

    test("Test POST request with rating greater than 10", async ({ request }) => {
        payload.slug = "rating-greater-than-10"
        payload.rating = "10.5";
        const response = await request.post(MOCK_API_URL, { data: payload });
        expect(response.status()).toBe(422);

        const result = await response.json();
        expect(result.message).toBe('Unprocessable entity');
        expect(result.errors).toContain("Rating must be between 0 and 10");
    })

    test("Test POST request with missing field", async ({ request }) => {
        payload.slug = "payload-with-missing-field"
        payload.rating = "";
        const response = await request.post(MOCK_API_URL, { data: payload });
        expect(response.status()).toBe(422);

        const result = await response.json();
        expect(result.message).toBe('Unprocessable entity');
        expect(result.errors).toContain("rating must be present");
    })

    test("Test POST request with payload containing extra field", async ({ request }) => {
        const original = { ...payload }
        const extraFieldPayload = {
            ...payload,
            "extrafield": "just a little something extra"
        }
        const response = await request.post(MOCK_API_URL, { data: extraFieldPayload });
        expect(response.status()).toBe(201);

        const result = await response.json();
        // Check response to ensure that extra field is not present in returned object
        expect(result).not.toMatchObject(extraFieldPayload);
        expect(result).toMatchObject(original);
    })

    test("Test POST request with payload containing field of wrong type", async ({ request }) => {
        const payload = {
            "slug": "744135-the-killer-s-shopping-mall",
            "url": "https://mydramalist.com/744135-the-killer-s-shopping-mall",
            "title": "A Shop for Killers (2024)",
            "image": "https://i.mydramalist.com/QJNjwg_4c.jpg?v=1",
            "rating": 8.5, //this should also be string
            "status": "watching"
        }
        const response = await request.post(MOCK_API_URL, { data: payload });
        expect(response.status()).toBe(422);

        const result = await response.json();
        expect(result.message).toBe('Unprocessable entity');
        expect(result.errors).toContain("rating must be a string");
    })

})