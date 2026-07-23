import test, { expect } from "@playwright/test";
import { blockAds, dismissNotification } from "../../main/utils/popupBlockers";
import { DramaDetailsPage } from "../../main/pages/DramaDetailsPage";
import { NavBarComponent } from "../../main/components/NavBarComponent";
import { generateFullUiUrl } from "../../main/config";
import { dramaToAdd } from "../../main/utils/DataGenerator";

test.describe("Perform different actions with dramas", () => {

    let dramaPage: DramaDetailsPage;
    let navBar: NavBarComponent;
    const { title, slug, url } = dramaToAdd;

    test.beforeEach(async ({ page }) => {
        await blockAds(page);
        dramaPage = new DramaDetailsPage(page);
        navBar = new NavBarComponent(page);
        await page.goto(generateFullUiUrl(slug));
        expect(page.url()).toBe(url);
        await dismissNotification(page);
    })

    test('Add a drama and give it a rating', async ({ page }) => {
        await dramaPage.addToList();
        await dramaPage.selectCompleted();
        await dramaPage.selectRating("10");
        await dramaPage.submitRating();

        await dramaPage.confirmUserRating("10");
        await dramaPage.clickButtonByStatus("Completed");
        await dramaPage.deleteFromList();
        await dramaPage.confirmUserRating("0");

        await page.waitForTimeout(10000);
    });


})