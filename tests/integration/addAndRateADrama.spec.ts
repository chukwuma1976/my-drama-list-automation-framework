import test, { APIRequestContext, expect } from "@playwright/test";
import { blockAds, dismissNotification } from "../../main/utils/popupBlockers";
import { DramaDetailsPage } from "../../main/pages/DramaDetailsPage";
import { NavBarComponent } from "../../main/components/NavBarComponent";
import { generateFullApiUrl, generateFullUiUrl, username } from "../../main/config";
import { DramaListPage } from "../../main/pages/DramaListPage";
import { RatingsComponent } from "../../main/components/RatingsComponent";
import { dramaForIntegrationTesting } from "../../main/utils/DataGenerator";

test.describe("Integration test to add, rate, update rating, and delete drama", () => {

    let dramaPage: DramaDetailsPage;
    let navBar: NavBarComponent;
    let dramaList: DramaListPage;
    let ratingsModal: RatingsComponent;
    const { title, slug, url, status, rating, updatedStatus, updateDropdownStatus, updatedRating } = dramaForIntegrationTesting;

    test.beforeEach(async ({ page }) => {
        await blockAds(page);
        dramaPage = new DramaDetailsPage(page);
        navBar = new NavBarComponent(page);
        dramaList = new DramaListPage(page);
        ratingsModal = new RatingsComponent(page);

        await page.goto(generateFullUiUrl(slug));
        expect(page.url()).toBe(url);
        await dismissNotification(page);

    })

    test("Integration testing", async ({ page, request }) => {

        // Add rating, mark as completed, submit in UI
        await dramaPage.clickAddToList();
        await ratingsModal.selectWatchStatus(status);
        await ratingsModal.selectRating(rating);
        await ratingsModal.submitRating();

        await dramaPage.confirmUserRating(rating);

        //Confirm addition to user drama list through API
        await pollAndWaitForDrama(request, { title, slug, url, status, rating });

        //Edit status in UI
        await dramaPage.clickAddToList();
        await ratingsModal.selectWatchStatus(updateDropdownStatus);
        await ratingsModal.submitRating();

        await pollAndWaitForDrama(request, { status: updatedStatus })
    });

    test.afterEach(async ({ page }) => {
        await dramaPage.clickAddToList();
        await ratingsModal.deleteFromList();
    })

    async function pollAndWaitForDrama(request: APIRequestContext, drama: any) {
        await expect.poll(async () => {
            const response = await request.get(generateFullApiUrl(`/api/dramalist/${username}`));
            const result = await response.json();
            return result.dramas.find((drama: any) => drama.slug === slug);
        }, {
            message: "Drama not found",
            intervals: [1000, 2000, 5000],
            timeout: 120_000
        }).toMatchObject(drama);
    }
})