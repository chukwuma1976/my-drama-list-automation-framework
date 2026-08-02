import { test, expect } from "@playwright/test";
import { LoginPage } from "../../main/pages/LoginPage";
import { blockAds, dismissNotification } from "../../main/utils/popupBlockers";

test.describe("Visual regression testing for login page", { tag: ['@visual'] }, () => {
    test.skip(() => !!process.env.CI, "Will not run in CI/CD");

    let loginPage: LoginPage

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);

        await blockAds(page);
        await loginPage.navigateToApp();
        await loginPage.clickLogin();

        await page.waitForLoadState();
    })

    test("Visual regression testing of login page", async ({ page }) => {
        await expect(loginPage.getLoginModal()).toBeVisible();
        await expect(loginPage.getLoginModal()).toHaveScreenshot();
    })

    test("Visual regression testing of nav bar", async ({ page }) => {
        await expect(loginPage.getNavBar()).toBeVisible();
        await expect(loginPage.getNavBar()).toHaveScreenshot();
    })

})