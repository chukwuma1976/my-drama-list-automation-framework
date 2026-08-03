import { expect, test } from '@playwright/test';
import { generateFullApiUrl } from '../../main/config';
import { NavBarComponent } from '../../main/components/NavBarComponent';
import { blockAds } from '../../main/utils/popupBlockers';
import { sqlInjection } from '../../main/utils/DataGenerator';
import { SearchResultsPage } from '../../main/pages/SearchResultsPage';

test.describe("Test for SQL injection", { tag: ['@security'] }, () => {

    test('Enter a search with SQL injection and expect the page to be blocked', async ({ page, request }) => {

        const searchResultsPage = new SearchResultsPage(page);
        const navBar = new NavBarComponent(page);

        await blockAds(page);
        await navBar.gotoHomePage();

        const responsePromise = page.waitForResponse(response =>
            response.url().includes("/search?q") &&
            response.request().method() === "GET"
        );

        await navBar.enterAndPerformSearch(sqlInjection);

        const response = await responsePromise;
        expect(response.status()).toBe(403);

        await searchResultsPage.confirmThatThePageIsBlocked();
        await searchResultsPage.confirmAbsenceOfSearchResult();

    });

    test("Search for drama with SQL injection in search returns a server error", async ({ request }) => {
        const response = await request.get(generateFullApiUrl(`/api/search/q/${sqlInjection}`));
        expect(response.status()).toBe(500);
        const result = await response.json();
        expect(result).toMatchObject({
            detail: { code: 500, error: true, description: 'Internal server error' }
        });

        /**
         * In a real application the response should be:
         * 
         * 400 Bad Request
         * 404 Not Found
         * 422 Unprocessable Entity
         * 
         * or simply treat the payload as a literal search string and return 200 with no results.
         * 
         * ✅ Never expose unauthorized data
         * ✅ Never crash or throw an unhandled exception
         * ✅ Reject or safely sanitize malicious input
         */
    })

})