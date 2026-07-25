import { test } from '@playwright/test';
import { blockAds } from '../../main/utils/popupBlockers';
import { LoginPage } from '../../main/pages/LoginPage';
import { getAccessibilityScanViolations, logAccessibilityScanResults } from '../../main/utils/accessibilityFunctions';

test.describe("Accessibility testing for login page", () => {

    let loginPage: LoginPage;

    test.beforeEach(async ({ page }) => {
        await blockAds(page);
        loginPage = new LoginPage(page);
    })

    test('Accessibility testing on login page', async ({ page }) => {

        await loginPage.navigateToApp();
        await loginPage.clickLogin();

        const descriptions = await getAccessibilityScanViolations(page);

        logAccessibilityScanResults("Login Page", descriptions);

    });

    test('Accessibility testing on Registration page', async ({ page }) => {

        await loginPage.navigateToApp();
        await loginPage.clickSignUp();

        const descriptions = await getAccessibilityScanViolations(page);

        logAccessibilityScanResults("Registration Page", descriptions);

    });

})