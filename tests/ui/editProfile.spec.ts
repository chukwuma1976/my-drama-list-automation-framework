import { test } from '@playwright/test';
import { password, username } from '../../main/config';
import { NavBarComponent } from '../../main/components/NavBarComponent';
import { blockAds } from '../../main/utils/popupBlockers';
import { LoginPage } from '../../main/pages/LoginPage';
import { ProfilePage } from '../../main/pages/ProfilePage';
import { updateInfo } from '../../main/utils/DataGenerator';

test.describe("Test that user can edit their profile as end to end test", () => {
    let loginPage: LoginPage;
    let navBar: NavBarComponent;
    let profilePage: ProfilePage;
    const { location, biography } = updateInfo;

    test.beforeEach(async ({ page }) => {
        await blockAds(page);
        loginPage = new LoginPage(page);
        navBar = new NavBarComponent(page);
        profilePage = new ProfilePage(page);
    })

    test('Login and edit profile about me section', async ({ page }) => {

        // Login and navigate to profile section
        await loginPage.navigateToApp();
        await loginPage.clickLogin();
        await loginPage.loginUser(username, password);
        await loginPage.dismissNotification();

        await navBar.clickUserAvatar();
        await navBar.clickSettings();
        await loginPage.dismissNotification();

        //update profile
        await profilePage.uploadImage();
        await profilePage.addALocation(location);
        await profilePage.enterBiography(biography);
        await profilePage.clickSaveChanges();

        //Logout
        await navBar.signOutUser();

        //Log back in
        await loginPage.clickLogin();
        await loginPage.loginUser(username, password);
        await loginPage.dismissNotification();

        await navBar.clickUserAvatar();
        await navBar.clickSettings();
        await loginPage.dismissNotification();

        //validate fields
        await profilePage.verifyProfileImageIsVisible();
        await profilePage.validateLocationField(location);
        await profilePage.validateBiographyField(biography)

    });

    test.afterEach(async ({ page }) => {
        //clear fields, cleanup
        await profilePage.clearLocationField();
        await profilePage.clearBiographyField();
        await profilePage.clickSaveChanges();
    });

})