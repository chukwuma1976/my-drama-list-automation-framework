import { expect, test } from '@playwright/test';
import { generateFullApiUrl } from '../../main/config';
import { NavBarComponent } from '../../main/components/NavBarComponent';
import { blockAds } from '../../main/utils/popupBlockers';
import { searchableActress } from '../../main/utils/DataGenerator';
import { PersonDetailsPage } from '../../main/pages/PersonDetailsPage';
import { SearchResultsPage } from '../../main/pages/SearchResultsPage';

test.describe("Search for a person on the website", () => {
    let navBar: NavBarComponent;
    let searchResultsPage: SearchResultsPage;
    let personDetailsPage: PersonDetailsPage;

    test.beforeEach(async ({ page }) => {
        await blockAds(page);

        searchResultsPage = new SearchResultsPage(page);
        personDetailsPage = new PersonDetailsPage(page);
        navBar = new NavBarComponent(page);

        await navBar.gotoHomePage();
    })

    test('Search for a drama and validate details', async ({ page, request }) => {
        const { name, slug } = searchableActress;

        //perform API test first to get test data
        const response = await request.get(generateFullApiUrl(`/api/people/${slug}`));
        expect(response.status()).toBe(200);
        const result = await response.json();
        expect(result.name).toBe(name);

        await navBar.enterAndPerformSearch(name);
        await navBar.confirmNavigationtoSearchPage();

        await searchResultsPage.selectSearchResult(name);

        //validate sections of the person details page
        await personDetailsPage.validatePersonDetailsPageUrl(result.url);
        await personDetailsPage.confirmNameHeader(result.name);
        await personDetailsPage.validateImageUrl(result.image);
        await personDetailsPage.validateBiography(result.biography)
        await personDetailsPage.validateDetails(result.personal_info)
        await personDetailsPage.validateFilmography(result.filmography);


    });

})