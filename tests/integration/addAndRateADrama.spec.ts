import test, { APIRequestContext, expect } from "@playwright/test";
import { blockAds, dismissNotification } from "../../main/utils/popupBlockers";
import { DramaDetailsPage } from "../../main/pages/DramaDetailsPage";
import { NavBarComponent } from "../../main/components/NavBarComponent";
import { generateFullApiUrl, username } from "../../main/config";
import { RatingsComponent } from "../../main/components/RatingsComponent";
import { dramaForIntegrationTesting } from "../../main/utils/DataGenerator";
import { SearchResultsPage } from "../../main/pages/SearchResultsPage";

test.describe("Integration test to add, rate, update rating, and delete drama", () => {

    let searchResultsPage: SearchResultsPage;
    let dramaDetailsPage: DramaDetailsPage;
    let dramaPage: DramaDetailsPage;
    let navBar: NavBarComponent;
    let ratingsModal: RatingsComponent;
    const { title, slug, url, status, rating, updatedStatus, updateDropdownStatus, updatedRating } = dramaForIntegrationTesting;

    test.beforeEach(async ({ page }) => {
        await blockAds(page);
        searchResultsPage = new SearchResultsPage(page);
        dramaDetailsPage = new DramaDetailsPage(page);
        dramaPage = new DramaDetailsPage(page);
        navBar = new NavBarComponent(page);
        ratingsModal = new RatingsComponent(page);

        await navBar.gotoHomePage();
    })

    test("Integration testing", { tag: ['@regression', '@integration'] }, async ({ page, request }) => {

        //perform API test first to get test data
        const response = await request.get(generateFullApiUrl(`/api/id/${slug}`));
        expect(response.status()).toBe(200);
        const result = await response.json();
        expect(result.slug).toBe(slug);

        await navBar.enterAndPerformSearch(title);
        await navBar.confirmNavigationtoSearchPage();

        await searchResultsPage.selectSearchResult(title);
        expect(page.url()).toBe(url);
        await dismissNotification(page);

        //validate sections of the drama details page
        await dramaDetailsPage.validateThatUrlContains(slug);
        await dramaDetailsPage.validateTitle(result.title);
        await dramaDetailsPage.validateImageUrl(result.image);
        await dramaDetailsPage.validateSynopsis(result.synopsis);
        await dramaDetailsPage.validateDetails(result);
        await dramaDetailsPage.validateStats(result);
        await dramaDetailsPage
            .validateMiscellaneous(result.also_known_as, result.genres, result.tags, result.native_title);
        await dramaDetailsPage.validateRating(result.rating);

        // Add rating, mark as completed, submit in UI
        await dramaPage.clickAddToList();
        await ratingsModal.selectWatchStatus(status);
        await ratingsModal.selectRating(rating);
        await ratingsModal.submitRating();

        await dramaPage.confirmUserRating(rating);

        //Confirm addition to user drama list through API
        await pollAndWaitForDrama(request, { title, slug, url, status, rating });

        //Edit status and rating in UI
        await dramaPage.clickAddToList();
        await ratingsModal.selectRating(updatedRating);
        await ratingsModal.selectWatchStatus(updateDropdownStatus);
        await ratingsModal.submitRating();

        //Confirm status is edited through API
        await pollAndWaitForDrama(request, { status: updatedStatus })
    });

    test.afterEach(async ({ page, request }) => {
        await dramaPage.clickAddToList();
        await ratingsModal.deleteFromList();

        //Ensure drama disappears from user list
        await pollAndWaitForDramaToDisappear(request)
    })

    async function pollAndWaitForDrama(request: APIRequestContext, drama: any) {
        await expect.poll(async () => {
            const response = await request.get(generateFullApiUrl(`/api/dramalist/${username}`));
            const result = await response.json();
            return result.dramas.find((drama: any) => drama.slug === slug);
        }, {
            message: "Drama not found",
            intervals: [1000],
            timeout: 150_000
        }).toMatchObject(drama);
    }

    async function pollAndWaitForDramaToDisappear(request: APIRequestContext) {
        await expect.poll(async () => {
            const response = await request.get(generateFullApiUrl(`/api/dramalist/${username}`));
            const result = await response.json();
            return result.dramas.filter((drama: any) => drama.slug === slug).length;
        }, {
            message: "Drama not deleted",
            intervals: [1000],
            timeout: 150_000
        }).toBe(0);

    }
})