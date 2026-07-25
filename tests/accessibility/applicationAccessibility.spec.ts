import { test } from '@playwright/test';
import { NavBarComponent } from '../../main/components/NavBarComponent';
import { blockAds, dismissNotification } from '../../main/utils/popupBlockers';
import { generateFullUiUrl, username } from '../../main/config';
import { dramaForAccessibility, searchableActressForAccessiblity } from '../../main/utils/dataGenerator';
import { DramaDetailsPage } from '../../main/pages/DramaDetailsPage';
import { WriteReviewPage } from '../../main/pages/WriteReviewPage';
import { ProfilePage } from '../../main/pages/ProfilePage';
import { getAccessibilityScanViolations, logAccessibilityScanResults } from '../../main/utils/accessibilityFunctions';

test.describe("Accessibility testing on different pages of the application", () => {

    let navBar: NavBarComponent;

    test.beforeEach(async ({ page }) => {
        navBar = new NavBarComponent(page);
        await blockAds(page);
    })

    test('Accessibility testing on landing page', async ({ page }) => {

        await navBar.gotoHomePage();
        await dismissNotification(page);

        const descriptions = await getAccessibilityScanViolations(page);

        logAccessibilityScanResults("Landing Page", descriptions);

    });

    test('Accessibility testing on calendar page', async ({ page }) => {

        await navBar.gotoHomePage();
        await navBar.clickCalendar();
        await dismissNotification(page);

        const descriptions = await getAccessibilityScanViolations(page);

        logAccessibilityScanResults("Calendar Page", descriptions);

    });

    test('Accessibility testing on person details page', async ({ page }) => {

        await page.goto(generateFullUiUrl(`people/${searchableActressForAccessiblity.slug}`));
        await dismissNotification(page);

        const descriptions = await getAccessibilityScanViolations(page);

        logAccessibilityScanResults("Person Details Page", descriptions);

    });

    test('Accessibility testing on drama details page', async ({ page }) => {

        await page.goto(generateFullUiUrl(`/${dramaForAccessibility.slug}`));
        await dismissNotification(page);

        const descriptions = await getAccessibilityScanViolations(page);

        logAccessibilityScanResults("Drama Details Page", descriptions);

    });

    test('Accessibility testing on user drama list page', async ({ page }) => {

        await page.goto(generateFullUiUrl(`/dramalist/${username}`));
        await dismissNotification(page);

        const descriptions = await getAccessibilityScanViolations(page);

        logAccessibilityScanResults("User Drama List Page", descriptions);

    });

    test('Accessibility testing on drama review page', async ({ page }) => {

        await page.goto(generateFullUiUrl(`/${dramaForAccessibility.slug}`));
        await new DramaDetailsPage(page).clickReviewsLink();
        await new WriteReviewPage(page).clickWriteAReviewButton();
        await dismissNotification(page);

        const descriptions = await getAccessibilityScanViolations(page);

        logAccessibilityScanResults("Drama Review Page", descriptions);

    });

    test('Accessibility testing on user profile page', async ({ page }) => {

        await new ProfilePage(page).gotoProfilePage();
        await dismissNotification(page);

        const descriptions = await getAccessibilityScanViolations(page);

        logAccessibilityScanResults("User Profile Page", descriptions);

    });

})