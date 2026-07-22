import { Locator, Page, expect } from "@playwright/test";
import path from "path";

export class ProfilePage {
    private saveButton: Locator;
    private locationInput: Locator;
    private biographyInput: Locator;

    constructor(private page: Page) {
        this.page = page;
        this.saveButton = page.getByRole("button", { name: "Save changes" });
        this.locationInput = page.getByPlaceholder("Add a location");
        this.biographyInput = page.locator(".tiptap");
    }

    async clickSaveChanges() {
        await this.saveButton.click();
    }

    async uploadImage() {
        const filePath = path.join(__dirname, '../resources/profilepic.jpg');
        await this.page.locator("input[type='file']").setInputFiles(filePath);

        await expect(this.page.getByText("Your profile picture was successfully saved.")).toBeVisible();
    }

    async verifyProfileImageIsVisible() {
        await expect(this.page.locator(".account-profile__avatar img")).toBeVisible();
    }

    async addALocation(location: string) {
        await this.locationInput.fill(location);
    }

    async validateLocationField(location: string) {
        const value = await this.locationInput.inputValue();
        expect(value).toBe(location);
    }

    async clearLocationField() {
        await this.clearInputField(this.locationInput);
    }

    async clearInputField(inputField: Locator) {
        await inputField.clear();
    }

    async enterBiography(biography: string) {
        await this.biographyInput.fill(biography);
    }

    async validateBiographyField(biography: string) {
        await expect(this.biographyInput).toHaveText(biography);
    }

    async clearBiographyField() {
        await this.clearInputField(this.biographyInput);
    }
}