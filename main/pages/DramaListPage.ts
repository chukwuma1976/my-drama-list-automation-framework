import { expect, Page } from "@playwright/test";
import { generateFullUiUrl, username } from "../config";

export class DramaListPage {
    private dramaListUrl: string

    constructor(private page: Page) {
        this.page = page;
        this.dramaListUrl = generateFullUiUrl(`dramalist/${username}`);
    }

    async navigateToDramaList() {
        await this.page.goto(this.dramaListUrl);
    }

    async confirmOnRatingsListPage(name: string) {
        await expect(this.page.getByText(name)).toBeVisible()
        expect(this.page.url()).toContain(name);
    }

    async clickEditDrama(title: string) {
        const dramaCell = this.page
            .getByRole("cell", { name: title })
            .getByRole("button", { name: "edit" });
        await expect(dramaCell).toBeVisible();
        await dramaCell.click();
    }

    async confirmPresenceOfDrama(title: string) {
        const dramaCell = this.page.getByRole("cell", { name: title });
        await expect(dramaCell).toBeVisible();
    }

    async confirmPresenceOfUserRating(title: string, rating: string) {
        const ratingCell = this.page
            .getByRole("row", { name: title })
            .getByRole("cell", { name: rating });
        await expect(ratingCell).toBeVisible();
    }

    async clickOnNavigationTabByWatchStatus(status: string) {
        const tab = this.page.getByRole("link", { name: status });
        await expect(tab).toBeVisible();
        await tab.click();
    }

    async verifyPresenceOfAllDramasInList(dramaList: any[]) {
        const dramasByStatus = this.organizeDramasByStatus(dramaList);

        for (const status of Object.keys(dramasByStatus)) {

            const dramasForStatus = dramasByStatus[status] as any[];
            await this.clickOnNavigationTabByWatchStatus(this.convertToTab(status));

            for (const drama of dramasForStatus) {

                const { title, rating } = drama;
                await this.confirmPresenceOfDrama(title);
                if (rating !== "") {
                    await this.confirmPresenceOfUserRating(title, rating);
                }

            }
        }
    }

    convertToTab(status: string) {
        switch (status) {
            case "Watching": return "Currently Watching"
            case "On-hold": return "On Hold"
            default: return status
        }
    }

    organizeDramasByStatus(dramas: any): Record<string, any[]> {
        const organizedDramas: Record<string, any[]> = {};
        for (const drama of dramas) {
            if (!organizedDramas[drama.status]) {
                organizedDramas[drama.status] = [drama];
            } else {
                organizedDramas[drama.status].push(drama);
            }
        }

        return organizedDramas;
    }

}