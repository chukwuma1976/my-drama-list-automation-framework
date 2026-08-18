CREATE TABLE dramas (
    slug VARCHAR(255) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    status VARCHAR(20) NOT NULL CHECK (status IN ('Watching', 'Completed', 'Plan to Watch', 'On-hold', 'Dropped')),
    rating NUMERIC(3,1),
    image TEXT,
    url TEXT NOT NULL
);