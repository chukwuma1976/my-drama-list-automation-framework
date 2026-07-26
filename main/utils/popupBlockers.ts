import { Page } from "@playwright/test";
import { blockedDomains } from "../resources/blockedDomains";

export async function blockAds(page: Page) {
    await page.route("**/*", route => {
        const url = route.request().url();

        if (blockedDomains.some(domain => url.includes(domain))) {
            return route.abort();
        }

        return route.continue();
    });
}

export async function dismissNotification(page: Page) {
    await page.locator("div.el-notification__closeBtn.el-icon-close").click();
}