import { Locator, Page, expect } from "@playwright/test";
import { BASE_UI_URL } from "../config";

export class NavBarComponent {

    navBarContainer: Locator;
    homeTab: Locator;
    exploreTab: Locator;
    communityTab: Locator;
    calendarTab: Locator;
    searchInput: Locator;
    languageButton: Locator;

    constructor(private page: Page) {
        this.page = page;
        this.navBarContainer = page.locator("div#top-nav");
        this.homeTab = this.navBarContainer.getByText("Home");
        this.exploreTab = this.navBarContainer.getByText("Explore");
        this.communityTab = this.navBarContainer.getByText("Community");
        this.calendarTab = this.navBarContainer.getByRole('link', { name: 'Calendar', exact: true });
        this.languageButton = this.page.locator("div#mdl-lang");
        this.searchInput = this.navBarContainer.getByRole('textbox', { name: 'Find Asian Dramas, Movies,' });
    }

    async gotoHomePage() {
        await this.page.goto(BASE_UI_URL, { waitUntil: "domcontentloaded" });
    }

    async clickHome() {
        await this.clickTab(this.homeTab);
    }

    async clickExplore() {
        await this.clickTab(this.exploreTab);
    }

    async clickCommunity() {
        await this.clickTab(this.communityTab);
    }

    async clickCalendar() {
        await this.clickTab(this.calendarTab);
    }

    async clickLanguageButton() {
        await this.clickTab(this.languageButton);
    }

    async confirmCalendarTabPresent() {
        await expect(this.calendarTab).toBeVisible();
    }

    async confirmPresenceOfSearchInput() {
        await expect(this.searchInput).toBeVisible();
    }

    async enterAndPerformSearch(query: string) {
        await this.searchInput.fill(query);
        await this.navBarContainer.locator("button[type='submit']").click();
    }

    async confirmNavigationToCalendarPage() {
        expect(this.page.url()).toContain("episode-calendar");
    }

    async confirmNavigationtoSearchPage() {
        expect(this.page.url()).toContain("search");
    }

    async clickTab(tab: Locator) {
        await expect(tab).toBeVisible();
        await tab.click();
    }

}