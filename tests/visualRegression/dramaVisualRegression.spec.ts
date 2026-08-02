import test, { expect } from "@playwright/test";
import { blockAds, dismissNotification } from "../../main/utils/popupBlockers";
import { DramaDetailsPage } from "../../main/pages/DramaDetailsPage";
import { generateFullUiUrl } from "../../main/config";
import { dramaMyDemon } from "../../main/utils/DataGenerator";
import { RatingsComponent } from "../../main/components/RatingsComponent";
import { WriteReviewPage } from "../../main/pages/WriteReviewPage";

test.describe("Visual regression testing", { tag: ['@visual'] }, () => {
    test.skip(() => !!process.env.CI, "Will not run in CI/CD");

    let dramaDetailsPage: DramaDetailsPage;
    let reviewPage: WriteReviewPage;
    let ratings: RatingsComponent;

    test.beforeEach(async ({ page }) => {
        dramaDetailsPage = new DramaDetailsPage(page);
        reviewPage = new WriteReviewPage(page);
        ratings = new RatingsComponent(page)

        await blockAds(page);
    })

    test("Visual regression testing of drama rating modal page", async ({ page }) => {
        await page.goto(dramaMyDemon.url);
        await dismissNotification(page);
        await dramaDetailsPage.clickAddToList();
        await expect(ratings.getRatingsModal()).toBeVisible();

        await expect(ratings.getRatingsModal()).toHaveScreenshot();
    })

    test("Visual regression testing of review page", async ({ page }) => {
        await page.goto(generateFullUiUrl(`${dramaMyDemon.slug}/write_review`))
        await dismissNotification(page);

        await expect(reviewPage.getReviewForm1()).toBeVisible();
        await expect(reviewPage.getReviewForm2()).toHaveScreenshot();

        await expect(reviewPage.getReviewForm1()).toBeVisible();
        await expect(reviewPage.getReviewForm2()).toHaveScreenshot();
    })

})