import { Locator, Page, expect } from "@playwright/test";
import { BASE_UI_URL } from "../config";

export class LoginPage {
    private loginModal: Locator;
    private navBar: Locator;

    constructor(private page: Page) {
        this.page = page;
        this.loginModal = page.locator("div.el-dialog__body");
        this.navBar = page.locator("div.navbar");
    }

    async navigateToApp() {
        await this.page.goto(BASE_UI_URL, { waitUntil: "domcontentloaded" });
        expect(await this.page.title()).toContain("MyDramaList");
    }

    async clickLogin() {
        await this.page.getByRole('link', { name: 'Log in' }).click();
    }

    async clickSignUp() {
        await this.page.getByRole('link', { name: 'Sign up' }).click();
    }

    async loginUser(username: string, password: string) {
        await this.page.getByLabel("Email or username").fill(username);
        await this.page.getByLabel("Password").fill(password);
        await this.page.getByRole("button", { name: "Log in" }).click();
    }

    async dismissNotification() {
        await this.page.locator("div.el-notification__closeBtn.el-icon-close").click();
    }

    async confirmUserLoggedIn() {
        await expect(this.page.locator("img.header-user-avatar")).toBeVisible();
    }

    async confirmCredentialsRequired() {
        await expect(this.page.getByText("Email/username and password are required")).toBeVisible();
    }

    async confirmCredentialsInvalid() {
        await expect(this.page.getByText("Invalid password or username")).toBeVisible();
    }

    getLoginModal(): Locator {
        return this.loginModal;
    }

    getNavBar(): Locator {
        return this.navBar
    }
}