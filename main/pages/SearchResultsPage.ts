import { expect, Page } from "@playwright/test";

export class SearchResultsPage {

    constructor(private page: Page) {
        this.page = page;
    }

    async selectSearchResult(title: string) {
        const searchResult = this.page.locator("h6").getByRole("link", { name: title, exact: true });
        await expect(searchResult).toBeVisible();
        await searchResult.click();
    }

    async confirmNoMatchingResultsMessage() {
        const noResultsMessage = this.page.getByText("There were no results matching the query.");
        await expect(noResultsMessage).toBeVisible();
    }

}