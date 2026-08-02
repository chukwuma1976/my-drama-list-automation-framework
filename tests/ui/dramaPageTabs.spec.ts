import test, { expect } from "@playwright/test"
import { DramaDetailsPage } from "../../main/pages/DramaDetailsPage";
import { blockAds, dismissNotification } from "../../main/utils/popupBlockers";
import { generateFullApiUrl } from "../../main/config";
import { dramaVeilOfShadows } from "../../main/utils/DataGenerator";
import { EpisodesPage } from "../../main/pages/EpisodesPage";
import { CastPage } from "../../main/pages/CastPage";
import { RecsPage } from "../../main/pages/RecsPage";

test.describe("Verify functionality of different pages", () => {

    let dramaDetailsPage: DramaDetailsPage;
    const { title, slug, url } = dramaVeilOfShadows;

    test.beforeEach(async ({ page }) => {
        await blockAds(page);
        dramaDetailsPage = new DramaDetailsPage(page);
        await page.goto(url);
        await dramaDetailsPage.validateTitle(title);
        await dismissNotification(page);
    })

    test("Navigate to drama episodes page and verify all episodes are present", async ({ page, request }) => {

        await dramaDetailsPage.clickEpisodesLink();
        const episodesPage = new EpisodesPage(page);

        // Get episode data through API
        const response = await request.get(generateFullApiUrl(`/api/id/${slug}/episodes`));
        expect(response.status()).toBe(200);
        const result = await response.json();

        await episodesPage.verifyAllEpisodeTitles(result);
    })

    test("Navigate to a specific drama episode page and verify all data are present", async ({ page, request }) => {

        await dramaDetailsPage.clickEpisodesLink();
        const episodesPage = new EpisodesPage(page);

        // Get episode data through API
        const response = await request.get(generateFullApiUrl(`/api/id/${slug}/episodes/1`));
        expect(response.status()).toBe(200);
        const result = await response.json();

        await page.goto(result.url);
        await episodesPage.verifyEpisodeInfo(result);

        // Get episode data through API prior to navigating to next episode
        const response2 = await request.get(generateFullApiUrl(`/api/id/${slug}/episodes/2`));
        expect(response2.status()).toBe(200);
        const result2 = await response2.json();

        await episodesPage.navigateToNextEpisode();
        await episodesPage.verifyEpisodeInfo(result2)

    })

    test("Navigate to drama cast page and verify all cast members are present", async ({ page, request }) => {

        await dramaDetailsPage.clickCastLink();
        const castPage = new CastPage(page);

        // Get episode data through API
        const response = await request.get(generateFullApiUrl(`/api/id/${slug}/cast`));
        expect(response.status()).toBe(200);
        const result = await response.json();

        await castPage.verifyAllCastMembersPresent(result.cast);
    })

    test("Navigate to drama recommendations page and verify all recommendations are present", async ({ page, request }) => {

        await dramaDetailsPage.clickRecsLink();
        const recsPage = new RecsPage(page);

        // Get episode data through API
        const response = await request.get(generateFullApiUrl(`/api/id/${slug}/recs`));
        expect(response.status()).toBe(200);
        const result = await response.json();

        await recsPage.verifyAllRecsArePresent(result);
    })
})