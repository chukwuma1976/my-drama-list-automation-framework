import { Page, Locator, expect } from "@playwright/test";
import { dismissNotification } from "../utils/popupBlockers";

export class RecsPage {
    private nextArrow: Locator;

    constructor(private page: Page) {
        this.page = page;
        this.nextArrow = page.locator("li.page-item.next a.page-link");
    }

    async verifyAllRecsArePresent(recsData: any) {
        const { recommendations, total, pages_fetched } = recsData;

        let hasNext = true;
        let appText: string[] = [];

        while (hasNext) {
            //1. Get elements and text
            const pageRecs = this.page.locator("div.box-body b a.text-primary");
            const recs = await pageRecs.allTextContents();
            let temp = [...recs, ...appText];
            appText = [...temp];

            //2. Check if button is enabled
            if (!(await this.nextArrow.isVisible()) || await this.nextArrow.isDisabled()) {
                hasNext = false;
                break;
            }

            // 3. Click next button and allow page to load
            await this.nextArrow.click();
            await dismissNotification(this.page);

        }

        expect(appText.length).toBe(total);

        //sanitize recommendation titles from UI
        const sanitizedRecs = appText.map((rec: any) => this.normalizeDramaTitle(rec));
        sanitizedRecs.sort();

        //sanitize recommendation titles from backend
        const sanitzedRespRecs = recommendations.map((rec: any) => this.normalizeDramaTitle(rec.title));
        sanitzedRespRecs.sort();

        //verify that the data match
        const allRecommendationsPresent = sanitizedRecs.every((rec: any) => sanitzedRespRecs.includes(rec));
        expect(allRecommendationsPresent).toBeTruthy();

    }

    normalizeDramaTitle(title: string) {
        return title.replace(/\s*\(\d{1,4}\)$/, "").trim();
    }

}