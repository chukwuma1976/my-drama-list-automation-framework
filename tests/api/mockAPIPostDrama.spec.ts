import test, { expect } from "@playwright/test";
import { generateMockApiUrl, MOCK_API_URL } from "../../main/config";

test.describe("Testing POST method in mock my drama list API", () => {

    const payload = {
        "slug": "746993-my-demon",
        "url": "https://mydramalist.com/746993-my-demon",
        "title": "My Demon (2023)",
        "image": "https://i.mydramalist.com/0w0mZ6_4c.jpg?v=1",
        "rating": "8.5",
        "status": "watching"
    }

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
        await request.post(MOCK_API_URL, { data: payload });
        //Now add the same payload again
        const response = await request.post(MOCK_API_URL, { data: payload });
        expect(response.status()).toBe(409);

        const result = await response.json();
        expect(result.message).toBe("Drama already exists.");
    })

    test("Test POST request with non matching status", async ({ request }) => {
        payload.status = "non matching"
        const response = await request.post(MOCK_API_URL, { data: payload });
        expect(response.status()).toBe(422);

        const result = await response.json();
        expect(result.message).toBe('Unprocessable entity');
        expect(result.errors).toContain('Invalid status');
    })

    test("Test POST request with rating less than 0", async ({ request }) => {
        payload.rating = "-9.5";
        const response = await request.post(MOCK_API_URL, { data: payload });
        expect(response.status()).toBe(422);

        const result = await response.json();
        expect(result.message).toBe('Unprocessable entity');
        expect(result.errors).toContain("Rating must be between 0 and 10");
    })

    test("Test POST request with rating greater than 10", async ({ request }) => {
        payload.rating = "10.5";
        const response = await request.post(MOCK_API_URL, { data: payload });
        expect(response.status()).toBe(422);

        const result = await response.json();
        expect(result.message).toBe('Unprocessable entity');
        expect(result.errors).toContain("Rating must be between 0 and 10");
    })

    test("Test POST request with missing field", async ({ request }) => {
        payload.rating = "";
        const response = await request.post(MOCK_API_URL, { data: payload });
        expect(response.status()).toBe(422);

        const result = await response.json();
        expect(result.message).toBe('Unprocessable entity');
        expect(result.errors).toContain("rating must be present");
    })

    test("Test POST request with payload containing extra field", async ({ request }) => {
        const payload = {
            "slug": "62085-a-wonderful-rumor",
            "url": "https://mydramalist.com/62085-a-wonderful-rumor",
            "title": "The Uncanny Counter (2020)",
            "image": "https://i.mydramalist.com/v3032_4c.jpg?v=1",
            "rating": "8.5", //this should also be string
            "status": "watching"
        }
        const extraFieldPayload = { ...payload, "extrafield": "just a little something extra" }
        const response = await request.post(MOCK_API_URL, { data: extraFieldPayload });
        expect(response.status()).toBe(201);

        const result = await response.json();
        // Check response to ensure that extra field is not present in returned object
        expect(result).not.toMatchObject(extraFieldPayload);
        expect(result).toMatchObject(payload);
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