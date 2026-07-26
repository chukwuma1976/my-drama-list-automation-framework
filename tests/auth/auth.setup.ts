import { test as setup, expect } from '@playwright/test';
import { LoginPage } from '../../main/pages/LoginPage';
import { username, password } from '../../main/config';
import path from 'path';
import { blockAds } from '../../main/utils/popupBlockers';

const authFile = path.join(__dirname, '../../playwright/.auth/user.json');

setup('authenticate', async ({ page }) => {

    const loginPage = new LoginPage(page);

    await blockAds(page);
    await loginPage.navigateToApp();
    await loginPage.clickLogin();
    await loginPage.loginUser(username, password);
    await loginPage.dismissNotification();

    await page.context().storageState({
        path: authFile
    });

});