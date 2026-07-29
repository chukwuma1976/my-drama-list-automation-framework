import { Locator, Page, expect } from "@playwright/test";
import path from "path";
import { generateFullUiUrl } from "../config";

export class ProfilePage {
    private saveButton: Locator;
    private locationInput: Locator;
    private biographyInput: Locator;
    private profileURL: string;

    constructor(private page: Page) {
        this.page = page;
        this.profileURL = generateFullUiUrl("account/profile");
        this.saveButton = page.getByRole("button", { name: "Save changes" });
        this.locationInput = page.getByPlaceholder("Add a location");
        this.biographyInput = page.locator(".tiptap");
    }

    async gotoProfilePage() {
        await this.page.goto(this.profileURL);
    }

    async clickSaveChanges() {
        await this.saveButton.click();
    }

    async uploadImage() {
        this.page.on("response", response => {
            if (response.url().includes("upload")) {
                expect(response.status()).toBe(200);
            }
        })

        const filePath = path.join(__dirname, '../resources/profilepic.jpg');
        await this.page.locator("input[type='file']").setInputFiles(filePath);

        await expect(this.page.getByText("Your profile picture was successfully saved.")).toBeVisible();
    }

    async verifyProfileImageIsVisible() {
        await expect(this.page.locator(".account-profile__avatar img")).toBeVisible();
    }

    async uploadNonImageFile() {
        //Listen for file upload request and assert that it failed
        this.page.on("response", response => {
            if (response.url().includes("upload")) {
                expect(response.status()).toBe(500);
            }
        })
        const filePath = path.join(__dirname, '../resources/nonImageFile.txt');
        await this.page.locator("input[type='file']").setInputFiles(filePath);
    }

    async addALocation(location: string) {
        await this.locationInput.fill(location);
    }

    async validateLocationField(location: string) {
        await expect(this.locationInput).toBeVisible();
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