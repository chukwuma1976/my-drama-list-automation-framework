import { Locator, Page, expect } from "@playwright/test";
import { BASE_UI_URL } from "../config";

export class NavBarComponent {

    private navBarContainer: Locator;
    private homeTab: Locator;
    private exploreTab: Locator;
    private communityTab: Locator;
    private calendarTab: Locator;
    private searchInput: Locator;
    private languageButton: Locator;
    private userAvatar: Locator;
    private homeButton: Locator;
    private darkModeButton: Locator;
    private darkModeIndicator: Locator;

    constructor(private page: Page) {
        this.page = page;
        this.navBarContainer = page.locator("div#top-nav");
        this.homeTab = this.navBarContainer.getByText("Home");
        this.exploreTab = this.navBarContainer.getByText("Explore");
        this.communityTab = this.navBarContainer.getByText("Community");
        this.calendarTab = this.navBarContainer.getByRole('link', { name: 'Calendar', exact: true });
        this.languageButton = this.page.locator("div#mdl-lang");
        this.searchInput = this.navBarContainer.getByRole('textbox', { name: 'Find Asian Dramas, Movies,' });
        this.userAvatar = this.page.locator("img.header-user-avatar");
        this.homeButton = this.page.getByRole('link', { name: 'MyDramaList v6.7' });
        this.darkModeButton = this.page.getByRole("link", { name: "Dark Mode" });
        this.darkModeIndicator = this.darkModeButton.getByRole("button");
    }

    async gotoHomePage() {
        await this.page.goto(BASE_UI_URL, { waitUntil: "domcontentloaded" });
    }

    async clickHomebutton() {
        await this.homeButton.click();
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

    async clickUserAvatar() {
        await this.clickTab(this.userAvatar);
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

    async signOutUser() {
        await this.clickTab(this.userAvatar);
        await this.page.getByRole("link", { name: "Sign out" }).click();
    }

    async clickTab(tab: Locator) {
        await expect(tab).toBeVisible();
        await tab.click();
    }

    async clickSettings() {
        await this.page.getByRole("link", { name: "Settings" }).click();
    }

    async clickWatchList() {
        await this.page.getByRole("link", { name: "My Watchlist" }).click();
    }

    async clickDarkModeButton() {
        await this.clickUserAvatar();
        await expect(this.darkModeButton).toBeVisible();
        await this.darkModeButton.click();
    }

    async getDarkModeIndicator(): Promise<string | null> {
        await expect(this.darkModeIndicator).toBeVisible();
        return await this.darkModeIndicator.textContent();
    }

}