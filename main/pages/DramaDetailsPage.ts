import { Locator, Page, expect } from "@playwright/test";
import { buttonStatuses } from "../utils/DataGenerator";
import { generateFullUiUrl } from "../config";

export class DramaDetailsPage {
    private addToListButton: Locator;

    constructor(private page: Page) {
        this.page = page;
        this.addToListButton = page.getByRole("button", {
            name: new RegExp(`^(?:${buttonStatuses.join("|")})$`)
        });
    }

    async clickEpisodesLink() {
        await this.goToLink("Episodes");
    }

    async clickCastLink() {
        await this.goToLink("Cast");
    }

    async clickRecsLink() {
        await this.goToLink("Recs");
    }

    async goToLink(link: string) {
        await this.page.getByRole("link", { name: link, exact: true }).click();
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

    async clickAddToList() {
        await expect(this.addToListButton).toBeVisible();
        await this.addToListButton.click();
    }

    async confirmUserRating(rating: string) {
        const userRating = this.page.locator("span.ratingPanel b");
        await expect(userRating).toContainText(rating);
    }

    async clickReviewsLink() {
        await this.page.getByRole('link', { name: 'Reviews', exact: true }).click();
    }

}