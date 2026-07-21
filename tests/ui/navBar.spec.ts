import test from "@playwright/test"
import { NavBarComponent } from "../../main/components/NavBarComponent"

test.describe("check contents and functionality of navigation bar", () => {

    let navBar: NavBarComponent;

    test.beforeEach(async ({ page }) => {
        navBar = new NavBarComponent(page);
        await navBar.gotoHomePage();
    })

    test("check contents of navigation bar", async ({ page }) => {
        await navBar.clickHome();
        await navBar.clickExplore();
        await navBar.clickCommunity();
        await navBar.confirmCalendarTabPresent();
        await navBar.clickLanguageButton();
        await navBar.confirmPresenceOfSearchInput();
    })

    test("confirm calendar button navigates to calendar page", async ({ page }) => {
        await navBar.clickCalendar();
        await navBar.confirmNavigationToCalendarPage();
    })

    test("confirm search with input works", async ({ page }) => {
        await navBar.enterAndPerformSearch("Moving");
        await navBar.confirmNavigationtoSearchPage();
    })
})