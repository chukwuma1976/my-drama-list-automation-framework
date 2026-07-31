import { test, expect } from '@playwright/test';
import { SearchResultsPage } from '../../main/pages/SearchResultsPage';
import { NavBarComponent } from '../../main/components/NavBarComponent';
import { blockAds } from '../../main/utils/popupBlockers';

test.describe("Test special character injection", () => {

    const specialCharacters = `!@#$%^&*()_+=~\`in {[]} | \\ : ; " <>, . ? / 🚀`

    test('Enter a search with special characters and the API returns 200', async ({ page, request }) => {

        const searchResultsPage = new SearchResultsPage(page);
        const navBar = new NavBarComponent(page);

        await blockAds(page);
        await navBar.gotoHomePage();

        const responsePromise = page.waitForResponse(response =>
            response.url().includes("/search?q") &&
            response.request().method() === "GET"
        );

        await navBar.enterAndPerformSearch(specialCharacters);

        const response = await responsePromise;
        expect(response.status()).toBe(200); //Ensure server does not crash

        await searchResultsPage.confirmAbsenceOfSearchResult();

    });

})