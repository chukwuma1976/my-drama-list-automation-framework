import { expect, Locator, Page } from "@playwright/test";

export class RatingsComponent {
    private watchStatusSelect: Locator;
    private ratingsSelect: Locator;
    private submitRatingButton: Locator;
    private cancelRatingButton: Locator;
    private deleteButton: Locator;

    constructor(private page: Page) {
        this.page = page;
        this.submitRatingButton = page.getByRole("button", { name: "Submit" });
        this.cancelRatingButton = page.getByRole("button", { name: "Cancel" });
        this.deleteButton = page.getByRole("button", { name: "Delete" });
        this.watchStatusSelect = page.locator("select.select-watch-status");
        this.ratingsSelect = page.locator("select.select-rating");
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

    async deleteFromList() {
        await this.deleteButton.click();
    }

    async confirmRatingsDropdownDisabled() {
        await expect(this.ratingsSelect).toBeDisabled();
    }
}