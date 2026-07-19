import { test } from '@playwright/test';
import { password, username } from '../../main/config';
import { LoginPage } from '../../main/page/LoginPage';

test.describe("Navigate to My Drama List", () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
  })

  test('has title', async ({ page }) => {
    await loginPage.navigateToApp();
    await loginPage.clickLogin();
    await loginPage.loginUser(username, password);
    await loginPage.confirmUserLoggedIn();
  });

})