import { PostgreSqlContainer, StartedPostgreSqlContainer } from '@testcontainers/postgresql';
import { readFileSync } from 'fs';
import { Client } from 'pg';
import path from 'path';

let container: StartedPostgreSqlContainer;

export async function startDatabase(): Promise<StartedPostgreSqlContainer> {
    container = await new PostgreSqlContainer('postgres:16-alpine')
        .withDatabase('mdl_test')
        .withUsername('test')
        .withPassword('test')
        .start();

    // run schema, then seed — mirrors withInitScript from the Java version,
    // but done manually here since the schema/seed split is explicit
    const client = new Client({ connectionString: container.getConnectionUri() });
    await client.connect();

    const schemaSql = readFileSync(path.join(__dirname, 'schema.sql'), 'utf-8');
    await client.query(schemaSql);

    const seedSql = readFileSync(path.join(__dirname, 'seed.sql'), 'utf-8');
    await client.query(seedSql);

    await client.end();
    return container;
}

export async function stopDatabase(): Promise<void> {
    if (container) {
        await container.stop();
    }
}

export function getConnectionUri(): string {
    return container.getConnectionUri();
}