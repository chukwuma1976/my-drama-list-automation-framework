import { test } from '@playwright/test';
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

    test('Edit profile about me section', async ({ page, browser }) => {

        //Navigate to profile section
        await profilePage.gotoProfilePage();
        await loginPage.dismissNotification();

        //update profile
        await profilePage.uploadImage();
        await profilePage.addALocation(location);
        await profilePage.enterBiography(biography);
        await profilePage.clickSaveChanges();


        //Create new page and navigate to profile page there
        const context = await browser.newContext({
            storageState: 'playwright/.auth/user.json'
        });

        const page2 = await context.newPage();
        await blockAds(page2);
        const profilePage2 = new ProfilePage(page2);
        await profilePage2.gotoProfilePage();

        //validate fields in new page
        await profilePage2.verifyProfileImageIsVisible();
        await profilePage2.validateLocationField(location);
        await profilePage2.validateBiographyField(biography)

        await context.close();
    });

    test('Edit profile picture by uploading a non image file return a 500 server error', async ({ page }) => {

        //Navigate to profile section
        await profilePage.gotoProfilePage();
        await loginPage.dismissNotification();

        //upload non image file
        await profilePage.uploadNonImageFile();

    });

    test.afterEach(async ({ page }) => {
        //clear fields, cleanup
        await profilePage.clearLocationField();
        await profilePage.clearBiographyField();
        await profilePage.clickSaveChanges();
    });

})