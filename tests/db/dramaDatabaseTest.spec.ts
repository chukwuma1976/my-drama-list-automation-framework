import { test, expect } from '@playwright/test';
import { startDatabase, stopDatabase } from '../db/testDatabaseContainer';
import { getAllDramas, getDramaBySlug, updateDramaStatusAndRating, updateDramaWithInvalidValues } from '../db/dramaRepository';

test.describe.serial('Drama DB verification', { tag: ['@regression', '@database'] }, () => {
    test.beforeAll(async () => {
        await startDatabase();
    });

    test.afterAll(async () => {
        await stopDatabase();
    });

    test('seeded drama has expected initial state', async () => {
        const drama = await getDramaBySlug('790870-que-gu');
        expect(drama?.title).toBe('Key to the Phoenix Heart');
        expect(drama?.status).toBe('Watching');
        expect(Number(drama?.rating)).toBe(10.0);
    });

    test('get all dramas returns a list of dramas with unique IDs', async () => {
        const dramas = await getAllDramas();
        const uniqueIDs = new Set(dramas?.map(drama => drama.slug));

        expect(Array.isArray(dramas)).toBeTruthy();
        expect(dramas?.length).toBeGreaterThan(1);
        expect(uniqueIDs.size).toBe(dramas?.length);
    });

    test('updating status and rating persists correctly', async () => {
        await updateDramaStatusAndRating('756307-manager-kim', 'Completed', 9.5);

        const updated = await getDramaBySlug('756307-manager-kim');
        expect(updated?.status).toBe('Completed');
        expect(Number(updated?.rating)).toBe(9.5);
    });

    test('unrated dramas correctly store NULL, not zero', async () => {
        const drama = await getDramaBySlug('798802-chilling-romance');
        expect(drama?.rating).toBeNull(); // distinguishes "not rated" from "rated 0" — matches real MDL semantics
    });

    test('updating a drama with an invalid status causes a constraint error', async () => {
        const result = await updateDramaWithInvalidValues('756307-manager-kim', "invalid", 9.5);

        expect(result.severity).toBe("ERROR");
        expect(result.detail).toContain("Failing row");
        expect(result.constraint).toBe("dramas_status_check");
    });

    test('updating a drama with a wrong type of string for a rating causes an error', async () => {
        const result = await updateDramaWithInvalidValues('756307-manager-kim', "Completed", "Good");

        expect(result.severity).toBe("ERROR");
        expect(result.where).toBe("unnamed portal parameter $2 = '...'");
    });

    test('retrieving a drama with a non existent slug id does not return any rows', async () => {
        const drama = await getDramaBySlug('790870-non-existent');
        expect(drama).toBeNull();
    });

});