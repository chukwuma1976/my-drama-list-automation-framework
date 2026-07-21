import { Page } from "@playwright/test";
import { blockedDomains } from "../resources/blockedDomains";

export async function blockAds(page: Page) {
    await page.route("**/*", route => {
        const url = route.request().url();

        if (blockedDomains.some(domain => url.includes(domain))) {
            console.log(`Blocked: ${url}`);
            return route.abort();
        }

        return route.continue();
    });
}