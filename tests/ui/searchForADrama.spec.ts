import { expect, test } from '@playwright/test';
import { generateFullApiUrl } from '../../main/config';
import { NavBarComponent } from '../../main/components/NavBarComponent';
import { blockAds } from '../../main/utils/popupBlockers';
import { searchableDrama } from '../../main/utils/DataGenerator';
import { DramaDetailsPage } from '../../main/pages/DramaDetailsPage';
import { SearchResultsPage } from '../../main/pages/SearchResultsPage';

test.describe("Search for a drama and validate results", () => {
    let navBar: NavBarComponent;
    let searchResultsPage: SearchResultsPage;
    let dramaDetailsPage: DramaDetailsPage;

    test.beforeEach(async ({ page }) => {
        await blockAds(page);

        searchResultsPage = new SearchResultsPage(page);
        dramaDetailsPage = new DramaDetailsPage(page);
        navBar = new NavBarComponent(page);

        await navBar.gotoHomePage();
    })

    test('Search for a drama and validate details', async ({ page, request }) => {
        const { title, slug } = searchableDrama;

        //perform API test first to get test data
        const response = await request.get(generateFullApiUrl(`/api/id/${slug}`));
        expect(response.status()).toBe(200);
        const result = await response.json();
        expect(result.slug).toBe(slug);

        await navBar.enterAndPerformSearch(title);
        await navBar.confirmNavigationtoSearchPage();

        await searchResultsPage.selectSearchResult(title);

        //validate sections of the drama details page
        await dramaDetailsPage.validateThatUrlContains(slug);
        await dramaDetailsPage.validateTitle(result.title);
        await dramaDetailsPage.validateImageUrl(result.image);
        await dramaDetailsPage.validateSynopsis(result.synopsis);
        await dramaDetailsPage.validateDetails(result);
        await dramaDetailsPage.validateStats(result);
        await dramaDetailsPage
            .validateMiscellaneous(result.also_known_as, result.genres, result.tags, result.native_title);
        await dramaDetailsPage.validateRating(result.rating, result.title);


    });

    test('Enter an invalid search', async ({ page, request }) => {

        await navBar.enterAndPerformSearch("========================");
        await navBar.confirmNavigationtoSearchPage();

        await searchResultsPage.confirmNoMatchingResultsMessage();
    });


})