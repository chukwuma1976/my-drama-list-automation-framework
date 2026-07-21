import { APIRequestContext, expect, test } from '@playwright/test';
import { generateFullApiUrl, password, username } from '../../main/config';
import { LoginPage } from '../../main/pages/LoginPage';
import { NavBarComponent } from '../../main/components/NavBarComponent';
import { CalendarPage } from '../../main/pages/CalendarPage';

test.describe("Check calendar page for currently airing dramas", () => {

    let airingDramas: any;
    let navBar: NavBarComponent;
    let calendarPage: CalendarPage;

    test.beforeEach(async ({ page, request }) => {
        airingDramas = await getCurrentlyAiringDramas(request);

        navBar = new NavBarComponent(page);
        calendarPage = new CalendarPage(page);
        await navBar.gotoHomePage();
        await navBar.clickCalendar();
    })

    test('Check a drama that is airing for each day', async ({ page }) => {
        await calendarPage.blockAds();
        await navBar.confirmNavigationToCalendarPage();
        await calendarPage.checkEachDayForAiringDrama(airingDramas);
    });

    test('Test toggle buttons and filter functions after logging in', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.clickLogin();
        await loginPage.loginUser(username, password);

        await calendarPage.blockAds();
        await calendarPage.clickMyListToggleButton();
        const myListCount = await calendarPage.getCalendarCardCount();

        await calendarPage.clickAllToggleButton();
        const totalCount = await calendarPage.getCalendarCardCount();
        expect(myListCount).not.toBe(totalCount);

        await calendarPage.changeFormat();

        await calendarPage.clickFilterButton();
        await calendarPage.selectFilters("South Korea", "Drama");
        const filterCount = await calendarPage.getCalendarCardCount();
        expect(filterCount).not.toBe(totalCount);
    });


    async function getCurrentlyAiringDramas(request: APIRequestContext): Promise<any> {
        const response = await request.get(generateFullApiUrl("/api/calendar"));
        const result = await response.json();
        return result.days;
    }
})