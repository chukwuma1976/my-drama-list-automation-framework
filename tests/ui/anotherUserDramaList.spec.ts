import test, { expect } from "@playwright/test"
import { generateFullApiUrl, generateFullUiUrl, username } from "../../main/config";
import { DramaListPage } from "../../main/pages/DramaListPage";
import { blockAds, dismissNotification } from "../../main/utils/popupBlockers";

test.describe("Test drama list page", () => {

    let userDramaList: any[];
    let dramaListPage: DramaListPage;
    const separateUser = "CASmooth"

    test.beforeEach(async ({ page, request }) => {
        const response = await request.get(generateFullApiUrl(`api/dramalist/${separateUser}`));
        expect(response.status()).toBe(200);
        const result = await response.json();
        expect(result.username).toBe(separateUser);
        userDramaList = result.dramas;

        await blockAds(page);
        dramaListPage = new DramaListPage(page);
        await page.goto(generateFullUiUrl(`dramalist/${separateUser}`));
        await dramaListPage.confirmOnRatingsListPage(result.username)
        await dismissNotification(page);
    })


    test("Confirm that dramas from the server appear in another users Drama list", async ({ page }) => {
        await dramaListPage.verifyPresenceOfDramasInListByPartitioning(userDramaList);
    })

})