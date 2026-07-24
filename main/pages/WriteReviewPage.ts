import { expect, Locator, Page } from "@playwright/test";

export class WriteReviewPage {

    private storyRating: Locator;
    private actingRating: Locator;
    private musicRating: Locator;
    private rewatchRating: Locator;
    private overallRating: Locator;

    constructor(private page: Page) {
        this.page = page;

        this.storyRating = page.locator("li.content_story_rating div.dstar-rating");
        this.actingRating = page.locator("li.content_acting_rating div.dstar-rating");
        this.musicRating = page.locator("li.content_music_rating div.dstar-rating");
        this.rewatchRating = page.locator("li.content_rewatch_rating div.dstar-rating");
        this.overallRating = page.locator("li.content_overall_rating div.dstar-rating");
    }

    async clickWriteAReviewButton() {
        await this.page.getByRole('button', { name: 'Write a Review' }).click();
    }

    async setRating(locator: Locator, rating: number) {
        const box = await locator.boundingBox();
        if (!box) {
            throw new Error("Rating widget not found");
        }

        await locator.click({
            position: {
                x: box.width * (rating / 10),
                y: box.height / 2
            }
        });
    }

    async enterStoryRating(rating: string) {
        await this.setRating(this.storyRating, parseFloat(rating));
        await this.confirmPresenceOfRating("story", rating);
    }

    async enterActingRating(rating: string) {
        await this.setRating(this.actingRating, parseFloat(rating));
        await this.confirmPresenceOfRating("acting", rating);
    }

    async enterMusicRating(rating: string) {
        await this.setRating(this.musicRating, parseFloat(rating));
        await this.confirmPresenceOfRating("music", rating);
    }

    async enterRewatchRating(rating: string) {
        await this.setRating(this.rewatchRating, parseFloat(rating));
        await this.confirmPresenceOfRating("rewatch", rating);
    }

    async enterOverallRating(rating: string) {
        await this.setRating(this.overallRating, parseFloat(rating));
        await this.confirmPresenceOfRating("overall", rating);
    }

    async confirmPresenceOfRating(category: string, rating: string) {
        await expect(this.page.locator(`.content_${category}_rating .dstar-right strong`)).toHaveText(rating);

        //confirm presence of tooltip with rating
        await expect(this.page.getByText(`Rating: ${rating}`)).toBeVisible();
    }

    async clickDoesItContainSpoilers(answer: boolean) {
        await this.page.locator("div.row")
            .filter({ hasText: "Does this review contain spoilers?" })
            .getByRole('radio', { name: answer ? 'Yes' : 'No' }).first().click();
    }

    async clickFinishedWatchingShow(answer: boolean) {
        await this.page.locator("div.row")
            .filter({ hasText: "Have you finished watching this title? " })
            .getByRole('radio', { name: answer ? 'Yes' : 'No' }).nth(1).click();
    }

    async addHeadline(headline: string) {
        await this.page.getByRole('textbox', { name: 'What\'s most important to know?' }).fill(headline);
    }

    async addReview(review: string) {
        await this.page.locator('textarea').fill(review);
    }

    async disableComments() {
        await this.page.locator('.el-checkbox__inner').click();
    }

    async clickToSubmitReview() {
        await this.page.getByRole('button', { name: 'Submit Review' }).click();
    }

}