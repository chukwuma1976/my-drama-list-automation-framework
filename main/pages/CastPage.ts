import { Page, Locator, expect } from "@playwright/test";

export class CastPage {

    constructor(private page: Page) {
        this.page = page;
    }

    async verifyAllCastMembersPresent(castingData: any) {
        for (const key of Object.keys(castingData)) {
            await this.verifyAllMembersInSection(castingData[key]);
        }
    }

    async verifyAllMembersInSection(members: any) {
        for (const member of members) {
            await expect(this.page.getByRole("link", { name: member.name, exact: true })).toBeVisible();
        }
    }

}