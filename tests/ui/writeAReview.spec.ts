import test, { expect } from "@playwright/test"
import { blockAds, dismissNotification } from "../../main/utils/popupBlockers";
import { DramaDetailsPage } from "../../main/pages/DramaDetailsPage";
import { dramaMyDemon } from "../../main/utils/DataGenerator";
import { generateFullUiUrl } from "../../main/config";
import { WriteReviewPage } from "../../main/pages/WriteReviewPage";

test.describe("Write a review", () => {

    let dramaDetailsPage: DramaDetailsPage;
    let writeReviewPage: WriteReviewPage;

    test.beforeEach(async ({ page }) => {

        dramaDetailsPage = new DramaDetailsPage(page);
        writeReviewPage = new WriteReviewPage(page);

        await blockAds(page);
        await page.goto(generateFullUiUrl(dramaMyDemon.slug));

        await dramaDetailsPage.clickReviewsLink();
        await writeReviewPage.clickWriteAReviewButton();
        await dismissNotification(page);
    })

    test("Write a review", async ({ page }) => {

        await writeReviewPage.enterStoryRating("8.0");
        await writeReviewPage.enterActingRating("9.5");
        await writeReviewPage.enterMusicRating("8.0");
        await writeReviewPage.enterRewatchRating("7.0");
        await writeReviewPage.enterOverallRating("8.5");

        await writeReviewPage.clickDoesItContainSpoilers(true);
        await writeReviewPage.clickFinishedWatchingShow(true);
        await writeReviewPage.addHeadline("My review of My Demon");
        await writeReviewPage.addReview("This is where the supernatural meets reality");
        await writeReviewPage.disableComments();
        await writeReviewPage.clickToSubmitReview();
    })

})
