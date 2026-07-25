import { test } from '@playwright/test';
import { blockAds } from '../../main/utils/popupBlockers';
import AxeBuilder from '@axe-core/playwright';
import { LoginPage } from '../../main/pages/LoginPage';

test.describe("Accessibility testing for login page", () => {

    let loginPage: LoginPage;

    test.beforeEach(async ({ page }) => {
        await blockAds(page);
        loginPage = new LoginPage(page);
    })

    test('Accessibility testing on login page', async ({ page }) => {

        await loginPage.navigateToApp();
        await loginPage.clickLogin();

        const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
        const descriptions = accessibilityScanResults.violations.map(violation => violation.description);

        console.log(`Accessibility scan recommendations for Login Page\n`);
        descriptions.forEach((description, index) => console.log(`\t ${index + 1}) ${description}`));

    });

    test('Accessibility testing on Registration page', async ({ page }) => {

        await loginPage.navigateToApp();
        await loginPage.clickSignUp();

        const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
        const descriptions = accessibilityScanResults.violations.map(violation => violation.description);

        console.log(`Accessibility scan recommendations for Registration Page\n`);
        descriptions.forEach((description, index) => console.log(`\t ${index + 1}) ${description}`));

    });

})