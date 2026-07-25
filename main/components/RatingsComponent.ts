import { expect, Locator, Page } from "@playwright/test";

export class RatingsComponent {
    private watchStatusSelect: Locator;
    private ratingsSelect: Locator;
    private submitRatingButton: Locator;
    private cancelRatingButton: Locator;
    private deleteButton: Locator;
    private ratingsModal: Locator;

    constructor(private page: Page) {
        this.page = page;
        this.submitRatingButton = page.getByRole("button", { name: "Submit" });
        this.cancelRatingButton = page.getByRole("button", { name: "Cancel" });
        this.deleteButton = page.getByRole("button", { name: "Delete" });
        this.watchStatusSelect = page.locator("select.select-watch-status");
        this.ratingsSelect = page.locator("select.select-rating");
        this.ratingsModal = page.locator("div.el-dialog__body div.col-sm-9").filter({ hasText: "Status" });
    }

    async selectWatchStatus(option: string) {
        await expect(this.watchStatusSelect).toBeVisible();
        await this.watchStatusSelect.selectOption(option);
    }

    async selectRating(option: string) {
        await expect(this.ratingsSelect).toBeVisible();
        await this.ratingsSelect.selectOption(option);
    }

    async submitRating() {
        await expect(this.submitRatingButton).toBeVisible();
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

    getRatingsModal(): Locator {
        return this.ratingsModal;
    }
}