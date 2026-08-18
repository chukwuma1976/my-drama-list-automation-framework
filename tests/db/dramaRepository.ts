import { Client } from 'pg';
import { getConnectionUri } from './testDatabaseContainer';

export interface Drama {
    slug: string;
    title: string;
    status: string;
    rating: number | null;
    image: string;
    url: string;
}

async function getClient(): Promise<Client> {
    const client = new Client({ connectionString: getConnectionUri() });
    await client.connect();
    return client;
}

export async function getAllDramas(): Promise<Drama[] | null> {
    const client = await getClient();
    try {
        const result = await client.query('SELECT * FROM dramas');
        return result.rows;
    } finally {
        await client.end();
    }
}

export async function getDramaBySlug(slug: string): Promise<Drama | null> {
    const client = await getClient();
    try {
        const result = await client.query('SELECT * FROM dramas WHERE slug = $1', [slug]);
        return result.rows[0] ?? null;
    } finally {
        await client.end();
    }
}

export async function updateDramaStatusAndRating(
    slug: string,
    status: string,
    rating: number | null
): Promise<void> {
    const client = await getClient();
    try {
        await client.query(
            'UPDATE dramas SET status = $1, rating = $2 WHERE slug = $3',
            [status, rating, slug]
        );
    } catch (e) {
        console.log(e);
    } finally {
        await client.end();
    }
}

export async function updateDramaWithInvalidValues(
    slug: string,
    status: string,
    rating: number | string | null
): Promise<any> {
    const client = await getClient();
    try {
        await client.query(
            'UPDATE dramas SET status = $1, rating = $2 WHERE slug = $3',
            [status, rating, slug]
        );
    } catch (e: any) {
        return e;
    } finally {
        await client.end();
    }
}