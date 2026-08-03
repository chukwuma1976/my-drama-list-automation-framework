import test, { expect } from "@playwright/test";
import { generateFullApiUrl } from "../../main/config";
import { NavBarComponent } from "../../main/components/NavBarComponent";
import { SearchResultsPage } from "../../main/pages/SearchResultsPage";
import { blockAds } from "../../main/utils/popupBlockers";

test.describe("Test for extremely long input", { tag: ['@security'] }, () => {

    const veryLongInput = "A".repeat(10000);

    test("Test very long input", async ({ page }) => {
        const searchResultsPage = new SearchResultsPage(page);
        const navBar = new NavBarComponent(page);

        await blockAds(page);
        await navBar.gotoHomePage();

        const responsePromise = page.waitForResponse(response =>
            response.url().includes("/search?q") &&
            response.request().method() === "GET"
        );

        await navBar.enterAndPerformSearch(veryLongInput);

        const response = await responsePromise;
        expect(response.status()).toBe(200);

        await searchResultsPage.confirmPresenceOfSearchResult(veryLongInput);

    })

})