import test, { expect } from "@playwright/test"
import { generateFullApiUrl, username } from "../../main/config";
import { DramaListPage } from "../../main/pages/DramaListPage";
import { blockAds, dismissNotification } from "../../main/utils/popupBlockers";

test.describe("Test drama list page", () => {

    let userDramaList: any[];
    let dramaListPage: DramaListPage;

    test.beforeEach(async ({ page, request }) => {
        const response = await request.get(generateFullApiUrl(`/api/dramalist/${username}`));
        expect(response.status()).toBe(200);
        const result = await response.json();
        expect(result.username).toBe(username);
        userDramaList = result.dramas;

        await blockAds(page);
        dramaListPage = new DramaListPage(page);
        await dramaListPage.navigateToDramaList();
        await dramaListPage.confirmOnRatingsListPage(result.username)
        await dismissNotification(page);
    })

    test("Confirm that dramas from the server appear in UI Drama list", async ({ page }) => {
        await dramaListPage.verifyPresenceOfAllDramasInList(userDramaList);
    })

})