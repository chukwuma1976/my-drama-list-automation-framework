import test, { expect } from "@playwright/test";
import { generateMockApiUrl, MOCK_API_URL } from "../../main/config";
import { payloadForMockServerIntegrationTest } from "../../main/utils/dataGenerator";

test.describe("Verify complete CRUD workflow for Mock MyDramaList Server", () => {

    const payload = payloadForMockServerIntegrationTest;

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

    test("Integration test for mock My Drama List server", async ({ request }) => {

        // Submit POST request to create a new drama"
        const response = await request.post(MOCK_API_URL, { data: payload });
        expect(response.status()).toBe(201);
        const result = await response.json();
        expect(result).toMatchObject(payload);

        // Retrieve drama using GET /:slug
        const getResponse = await request.get(generateMockApiUrl(payload.slug));
        expect(getResponse.status()).toBe(200);
        expect(await getResponse.json()).toMatchObject(payload);

        // Submit PATCH request updating status and rating 
        const updateFields = { "status": "Completed", "rating": "10" };
        const expectedDrama = { ...payload, ...updateFields }
        const patchResponse = await request.patch(generateMockApiUrl(payload.slug), { data: updateFields });
        expect(patchResponse.status()).toBe(200);
        const patchResult = await patchResponse.json();
        expect(patchResult).toMatchObject(expectedDrama);

        // Retrieve drama again using GET /:slug 
        const getResponse2 = await request.get(generateMockApiUrl(payload.slug));
        expect(getResponse2.status()).toBe(200);
        expect(await getResponse2.json()).toMatchObject(expectedDrama);

        // Submit DELETE request   
        const deleteResponse = await request.delete(generateMockApiUrl(payload.slug));
        expect(deleteResponse.status()).toBe(204);
        expect(deleteResponse.statusText()).toBe("No Content");

        //Retrieve deleted drama using GET /:slug  
        const getResponse3 = await request.get(generateMockApiUrl(payload.slug));
        expect(getResponse3.status()).toBe(404);
    })

})
