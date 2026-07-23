import { Locator, Page, expect } from "@playwright/test";

export class DramaDetailsPage {
    private addToListButton: Locator;
    private watchStatusSelect: Locator;
    private ratingsSelect: Locator;
    private submitRatingButton: Locator;
    private cancelRatingButton: Locator;
    private deleteButton: Locator;

    constructor(private page: Page) {
        this.page = page;
        this.addToListButton = page.getByRole("button", { name: "Add to List" });
        this.watchStatusSelect = page.locator("select.select-watch-status");
        this.ratingsSelect = page.locator("select.select-rating");
        this.submitRatingButton = page.getByRole("button", { name: "Submit" });
        this.cancelRatingButton = page.getByRole("button", { name: "Cancel" });
        this.deleteButton = page.getByRole("button", { name: "Delete" })
    }

    async validateThatUrlContains(slug: string) {
        expect.soft(this.page.url()).toContain(slug);
    }

    async validateTitle(title: string) {
        const header = this.page.locator("h1");
        expect.soft(await header.textContent()).toContain(title);
    }

    async validateImageUrl(url: string) {
        const image = this.page.locator(`img[src="${url}"]`);
        await expect.soft(image).toBeVisible();
    }

    async validateSynopsis(synopsis: string) {
        const synopsisText = await this.page.locator("div.show-synopsis").textContent();
        expect.soft(synopsisText).toContain(synopsis);
    }

    async validateDetails(dramadetails: any) {
        const { title, country, episodes, aired, aired_on, original_network, duration, content_rating } = dramadetails;
        const detailsArray = [title, country, episodes, aired, aired_on, original_network, duration, content_rating];

        const detailsContainer = this.page.locator("div.box-body.light-b").first();
        const detailsContainerText = await detailsContainer.textContent();
        expect.soft(detailsArray.every((detail: string) => detailsContainerText?.includes(detail)));
    }

    async validateStats(dramadetails: any) {
        const { score_details, ranked, popularity, watchers } = dramadetails;
        const statsArray = [score_details, ranked, popularity, watchers];

        const statsContainer = this.page.locator("div.box-body.light-b").nth(1);
        const statsContainerText = await statsContainer.textContent();
        expect.soft(statsArray.every((detail: string) => statsContainerText?.includes(detail)));
    }

    async validateMiscellaneous(aka: string[], genres: string[], tags: string[], nativeTitle: string) {
        const miscellaneousContainer = this.page.locator("div.show-detailsxss");
        const miscellaneousText = await miscellaneousContainer.textContent();
        expect.soft(aka.every((detail: string) => miscellaneousText?.includes(detail)));
        expect.soft(aka.every((detail: string) => miscellaneousText?.includes(detail)));
        expect.soft(aka.every((detail: string) => miscellaneousText?.includes(detail)));
        expect.soft(miscellaneousText).toContain(nativeTitle)
    }

    async validateRating(rating: string) {
        const ratingsText = await this.page.locator("div.box.deep-orange").textContent();
        expect.soft(ratingsText).toBe(rating);
    }

    async addToList() {
        await this.addToListButton.click();
    }

    async selectCurrentlyWatching() {
        await this.selectWatchStatus("Currently watching");
    }

    async selectCompleted() {
        await this.selectWatchStatus("Completed");
    }

    async selectPlanToWatch() {
        await this.selectWatchStatus("Plan to watch");
    }

    async selectWatchStatus(option: string) {
        await this.watchStatusSelect.selectOption(option);
    }

    async selectRating(option: string) {
        await this.ratingsSelect.selectOption(option);
    }

    async submitRating() {
        await this.submitRatingButton.click();
    }

    async cancelRating() {
        await this.cancelRatingButton.click();
    }

    async confirmUserRating(rating: string) {
        const userRating = this.page.locator("span.ratingPanel b");
        await expect(userRating).toContainText(rating);
    }

    async clickButtonByStatus(status: string) {
        await this.page.getByRole("button", { name: status }).click();
    }

    async deleteFromList() {
        await this.deleteButton.click();
        this.page.reload();
    }

}