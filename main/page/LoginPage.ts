import { Page, expect } from "@playwright/test";
import { BASE_UI_URL } from "../config";

export class LoginPage {

    constructor(private page: Page) {
        this.page = page;
    }

    async navigateToApp() {
        await this.page.goto(BASE_UI_URL);
        expect(await this.page.title()).toContain("MyDramaList");
    }

    async clickLogin() {
        await this.page.getByRole('link', { name: 'Log in' }).click();
    }

    async loginUser(username: string, password: string) {
        await this.page.getByLabel("Email or username").fill(username);
        await this.page.getByLabel("Password").fill(password);
        await this.page.getByRole("button", { name: "Log in" }).click();

        await this.page.locator("div.el-notification__closeBtn.el-icon-close").click();
    }

    async confirmUserLoggedIn() {
        await expect(this.page.locator("img.header-user-avatar")).toBeVisible();
    }
}