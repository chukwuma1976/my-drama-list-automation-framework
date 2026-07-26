import { Page, Locator, expect } from "@playwright/test";

export class EpisodesPage {
    private episodes: Locator;

    constructor(private page: Page) {
        this.page = page;
        this.episodes = page.locator("div.episode h2");
    }

    async verifyAllEpisodeTitles(episodeData: any) {
        const episodeHeadersText = await this.episodes.allInnerTexts();
        expect(episodeData.total).toBe(episodeHeadersText.length);

        const allEpisodesPresent = episodeData.episodes.every((episode: any) => episodeHeadersText.includes(episode.title));
        expect(allEpisodesPresent).toBeTruthy();
    }

    async verifyEpisodeInfo(episode: any) {
        expect(this.page.url()).toBe(episode.url);
        await expect(this.page.getByText(episode.title, { exact: true })).toBeVisible();
        await expect(this.page.getByText(episode.description)).toBeVisible();
        await expect(this.page.getByText(episode.air_date)).toBeVisible();
        await expect(this.page.getByText(`Season: ${episode.season}`)).toBeVisible();
    }

    async navigateToNextEpisode() {
        await this.page.getByRole("link", { name: "Next Episode" }).click();
    }

}