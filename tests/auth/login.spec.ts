import { test } from '@playwright/test';
import { password, username } from '../../main/config';
import { LoginPage } from '../../main/pages/LoginPage';
import { missingCredentials, invalidCredentials } from '../../main/utils/DataGenerator';
import { blockAds } from '../../main/utils/popupBlockers';

test.describe("Test login scenarios", () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    await blockAds(page);
    loginPage = new LoginPage(page);
  })

  test('login with valid credentials', { tag: ['@smoke', '@regression'] }, async ({ page }) => {
    await loginPage.navigateToApp();
    await loginPage.clickLogin();
    await loginPage.loginUser(username, password);
    await loginPage.dismissNotification();
    await loginPage.confirmUserLoggedIn();
  });

  missingCredentials.forEach((credential) => {
    test(`Testing login scenario: ${credential.scenario}`, { tag: ['@regression'] }, async ({ page }) => {
      await loginPage.navigateToApp();
      await loginPage.clickLogin();
      await loginPage.loginUser(credential.username, credential.password);
      await loginPage.confirmCredentialsRequired();
    })
  });

  invalidCredentials.forEach(async (credential) => {
    test(`Testing login scenario: ${credential.scenario}`, { tag: ['@regression'] }, async ({ page }) => {
      await loginPage.navigateToApp();
      await loginPage.clickLogin();
      await loginPage.loginUser(credential.username, credential.password);
      await loginPage.confirmCredentialsInvalid();
    })
  })
})