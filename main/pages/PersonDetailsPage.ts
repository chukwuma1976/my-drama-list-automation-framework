import { Page, expect } from "@playwright/test";

export class PersonDetailsPage {

    constructor(private page: Page) {
        this.page = page;
    }

    async validateFilmography(filmography: any) {
        const categories = Object.keys(filmography);
        for (const section of categories) {
            await this.validateFilmographySection(section, filmography[section]);
        }
    }

    async validateFilmographySection(name: string, section: any) {
        const filmographySection = this.page.locator("table.table.film-list").filter({ hasText: name });
        const sectionText = await filmographySection.textContent();
        Object.values(section).every((val: unknown) => sectionText?.includes(String(val)) ?? false);
    }

    async validatePersonDetailsPageUrl(personUrl: string) {
        expect(this.page.url()).toBe(personUrl);
    }

    async confirmNameHeader(name: string) {
        const header = this.page.locator("div.box-header h1").filter({ hasText: name });
        await expect(header).toBeVisible();
    }

    async validateImageUrl(url: string) {
        const image = this.page.locator(`img[src="${url}"]`).nth(1);
        await expect.soft(image).toBeVisible();
    }

    async validateBiography(synopsis: string) {
        const synopsisText = await this.page.locator("div.box-body").first().textContent();
        expect.soft(synopsisText).toContain(synopsis.substring(0, 100));
    }

    async validateDetails(personalDetails: any) {
        const detailsArray = Object.values(personalDetails) as string[];

        const detailsContainer = this.page.locator("div.box.clear.hidden-sm-down").first();
        const detailsContainerText = await detailsContainer.textContent();
        expect.soft(detailsArray.every((detail: string) => detailsContainerText?.includes(detail)));

    }
}