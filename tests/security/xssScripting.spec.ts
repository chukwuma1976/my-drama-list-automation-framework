import { expect, test } from '@playwright/test';
import { NavBarComponent } from '../../main/components/NavBarComponent';
import { blockAds } from '../../main/utils/popupBlockers';
import { SearchResultsPage } from '../../main/pages/SearchResultsPage';

test.describe("Test for XSS injection", { tag: ['@security'] }, () => {

    test('Enter a search with XSS injection and expect the page to be blocked', async ({ page, request }) => {

        const searchResultsPage = new SearchResultsPage(page);
        const navBar = new NavBarComponent(page);

        await blockAds(page);
        await navBar.gotoHomePage();

        let xssDetected = false;
        const XSSInjection = '<script>alert("XSS Injection Detected")</script>'

        const responsePromise = page.waitForResponse(response =>
            response.url().includes("/search?q") &&
            response.request().method() === "GET"
        );

        page.on("dialog", dialog => {
            if (dialog.type() === "alert" && dialog.message() === "XSS Injection Detected") {
                xssDetected = true;
                dialog.accept();
            }
        })

        await navBar.enterAndPerformSearch(XSSInjection);

        const response = await responsePromise;
        if (!process.env.CI) {
            /**
            GitHub Actions CI/CD Execution (200):
            Cloudflare treats traffic from datacenter/cloud provider IP ranges (like Azure/GitHub Actions IPs) differently or 
            routes it through different WAF (Web Application Firewall) rule levels. In this environment, Cloudflare forwards the 
            request to the origin web server (cfOrigin;dur=52), and the origin web application itself is handling/sanitizing the 
            inputs and returning a standard 200 OK HTML page (albeit with empty or safe sanitized results).
             */
            expect(response.status()).toBe(403);
            await searchResultsPage.confirmThatThePageIsBlocked();
            await searchResultsPage.confirmAbsenceOfSearchResult();
        }

        expect(xssDetected).toBe(false);

    });

})