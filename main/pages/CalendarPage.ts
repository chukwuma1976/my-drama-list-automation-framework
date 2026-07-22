import { expect, Locator, Page } from "@playwright/test";
import { daysOfTheWeek } from "../utils/DataGenerator";

export class CalendarPage {
    private calendarResults: Locator;
    private filterPanel: Locator;

    constructor(private page: Page) {
        this.page = page;
        this.calendarResults = page.locator("#episode-calendar-results");
        this.filterPanel = this.page.locator("div.calendar-filter-panel");
    }

    async checkEachDayForAiringDrama(airingDramas: any) {
        for (const day of daysOfTheWeek) {
            await this.confirmCalendarDayContainsDrama(day, airingDramas);
        }
    }

    async confirmCalendarDayContainsDrama(day: string, airingDramas: any) {

        const dramaTitles = airingDramas[day].map((drama: any) => drama.title);
        const linkByDay = this.page.locator("a.weekday").filter({ hasText: day });
        await expect(linkByDay).toBeVisible();
        await linkByDay.click();
        const dayDramas = this.page.locator('div[id^="d"]').filter({ has: this.page.getByRole("heading", { name: day }) });
        const dayDramaText = await dayDramas.textContent();
        expect.soft(dramaTitles.some((title: string) => dayDramaText?.includes(title))).toBeTruthy();

    }

    async clickAllToggleButton() {
        const button = this.page.getByRole("button", { name: "All" });
        await expect(button).toBeVisible();
        await button.click();
    }

    async clickMyListToggleButton() {
        const button = this.page.getByRole("button", { name: "My List" });
        await expect(button).toBeVisible();
        await button.click();
    }

    async getCalendarCardCount(): Promise<number> {
        await this.page.waitForTimeout(500);
        return await this.calendarResults.locator("div.el-card").count();
    }

    async clickFilterButton() {
        const filterButton = this.page.getByRole("button", { name: "Filters" })
        await expect(filterButton).toBeVisible();
        await filterButton.click();
    }

    async selectFilters(country: string, contentType: string) {
        await this.filterPanel.locator(`input[value='${country}']`).check();
        await this.filterPanel.locator(`input[value='${contentType}']`).check();
        await this.filterPanel.getByRole("button", { name: "Apply" }).click();
    }

    async changeFormat() {
        await this.page.locator("div.display-format").click();
    }

    async clickQuarterTab(quarter: number, twoDigitYear: string) {
        await this.page.getByText(`Q${quarter} '${twoDigitYear}`).click();
    }

    async confirmQuarterContainsMoreDramasThan(airingDramas: any) {
        await expect(this.page.locator("#footer")).toBeVisible();
        const quarterDramas = this.page.locator('div.el-card');
        const quarterDramaCount = (await quarterDramas.all()).length;
        const airingDramaCount = daysOfTheWeek
            .map((day: string) => airingDramas[day].length)
            .reduce((prev: number, current: number) => prev + current);
        expect(quarterDramaCount).toBeGreaterThan(airingDramaCount);

    }

}