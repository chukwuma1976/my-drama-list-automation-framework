import { test } from '@playwright/test';
import { password, username } from '../../main/config';
import { LoginPage } from '../../main/page/LoginPage';
import { missingCredentials, invalidCredentials } from '../../main/utils/DataGenerator';

test.describe("Navigate to My Drama List", () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
  })

  test('login with valid credentials', async ({ page }) => {
    await loginPage.navigateToApp();
    await loginPage.clickLogin();
    await loginPage.loginUser(username, password);
    await loginPage.dismissNotification();
    await loginPage.confirmUserLoggedIn();
  });

  missingCredentials.forEach(async (credential) => {
    test(`Testing login scenario: ${credential.scenario}`, async ({ page }) => {
      await loginPage.navigateToApp();
      await loginPage.clickLogin();
      await loginPage.loginUser(credential.username, credential.password);
      await loginPage.confirmCredentialsRequired();
    })
  });

  invalidCredentials.forEach(async (credential) => {
    test(`Testing login scenario: ${credential.scenario}`, async ({ page }) => {
      await loginPage.navigateToApp();
      await loginPage.clickLogin();
      await loginPage.loginUser(credential.username, credential.password);
      await loginPage.confirmCredentialsInvalid();
    })
  })
})