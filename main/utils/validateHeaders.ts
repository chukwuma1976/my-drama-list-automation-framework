import { expect } from "@playwright/test";
import { expectedHeaders } from "../resources/expectedHeaders";

export async function validateHeaders(headers: any) {


    for (const expected of expectedHeaders) {

        const actual = headers[expected.header];
        if (!actual) continue;  // A particular header may not exist for an endpoint

        switch (expected.type) {

            case "equals":
                expect(actual).toBe(expected.value);
                break;

            case "contains":
                expect(actual).toContain(expected.value);
                break;

            case "exists":
                expect(actual).toBeDefined();
                break;
        }

    }
}