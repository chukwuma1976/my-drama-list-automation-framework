import test, { expect } from "@playwright/test";
import { blockAds, dismissNotification } from "../../main/utils/popupBlockers";
import { DramaDetailsPage } from "../../main/pages/DramaDetailsPage";
import { NavBarComponent } from "../../main/components/NavBarComponent";
import { generateFullUiUrl } from "../../main/config";
import { dramasToNotRate } from "../../main/utils/DataGenerator";
import { DramaListPage } from "../../main/pages/DramaListPage";
import { RatingsComponent } from "../../main/components/RatingsComponent";

test.describe("Perform different actions with dramas", () => {

    let dramaPage: DramaDetailsPage;
    let navBar: NavBarComponent;
    let dramaList: DramaListPage;
    let ratingsModal: RatingsComponent;

    test.beforeEach(async ({ page }) => {
        await blockAds(page);
        dramaPage = new DramaDetailsPage(page);
        navBar = new NavBarComponent(page);
        dramaList = new DramaListPage(page);
        ratingsModal = new RatingsComponent(page);
    })


    dramasToNotRate.forEach((drama) => {
        const { slug, url, status } = drama;
        test(`For a drama, select ${status} from dropdown menu does not allow ratings`, async ({ page }) => {

            await page.goto(generateFullUiUrl(slug));
            expect(page.url()).toBe(url);
            await dismissNotification(page);

            await dramaPage.clickAddToList();
            await ratingsModal.selectWatchStatus(status);
            await ratingsModal.confirmRatingsDropdownDisabled();
            await ratingsModal.cancelRating();
        });
    })

})