import { test } from '@playwright/test';
import { password, username } from '../../main/config';
import { LoginPage } from '../../main/pages/LoginPage';
import { NavBarComponent } from '../../main/components/NavBarComponent';
import { blockAds } from '../../main/utils/popupBlockers';

test.describe("Test logout functionality", () => {

    test('login with valid credentials then log out', async ({ page }) => {
        await blockAds(page);
        const loginPage = new LoginPage(page);
        await loginPage.navigateToApp();
        await loginPage.clickLogin();
        await loginPage.loginUser(username, password);
        await loginPage.dismissNotification();
        await loginPage.confirmUserLoggedIn();
        await new NavBarComponent(page).signOutUser();
    });


})