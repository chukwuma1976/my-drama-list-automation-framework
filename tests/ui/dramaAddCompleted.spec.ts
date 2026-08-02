import test, { expect } from "@playwright/test";
import { blockAds, dismissNotification } from "../../main/utils/popupBlockers";
import { DramaDetailsPage } from "../../main/pages/DramaDetailsPage";
import { NavBarComponent } from "../../main/components/NavBarComponent";
import { generateFullUiUrl, username } from "../../main/config";
import { dramaToAdd } from "../../main/utils/DataGenerator";
import { DramaListPage } from "../../main/pages/DramaListPage";
import { RatingsComponent } from "../../main/components/RatingsComponent";

test.describe("Perform different actions with dramas", () => {

    let dramaPage: DramaDetailsPage;
    let navBar: NavBarComponent;
    let dramaList: DramaListPage;
    let ratingsModal: RatingsComponent;
    const { title, slug, url } = dramaToAdd;

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

    test('Add a drama, mark completed. and give it a rating of 10', { tag: ['@regression'] }, async ({ page }) => {

        await dramaPage.clickAddToList();
        await ratingsModal.selectWatchStatus("Completed");
        await ratingsModal.selectRating("10");
        await ratingsModal.submitRating();

        await dramaPage.confirmUserRating("10");

        await navBar.clickUserAvatar();
        await navBar.clickWatchList();

        await dramaList.confirmPresenceOfDrama(title);
        await dramaList.confirmPresenceOfUserRating(title, "10");
    });

    test.afterEach(async ({ page }) => {
        if (!page.url().includes(`dramalist/${username}`)) {
            await dramaList.navigateToDramaList();
        }
        await dramaList.clickEditDrama(title);
        await ratingsModal.deleteFromList();
    })
})