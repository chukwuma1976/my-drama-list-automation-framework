export const dramaDetailsSchema = {
    "$schema": "http://json-schema.org/draft-07/schema#",
    "type": "object",
    "properties": {
        "slug": { "type": "string" },
        "url": { "type": "string", "format": "uri" },
        "title": { "type": "string" },
        "image": { "type": "string", "format": "uri" },
        "synopsis": { "type": "string" },
        "country": { "type": "string" },
        "episodes": { "type": "string" },
        "aired": { "type": "string" },
        "aired_on": { "type": "string" },
        "original_network": { "type": "string" },
        "duration": { "type": "string" },
        "content_rating": { "type": "string" },
        "score_details": { "type": "string" },
        "ranked": { "type": "string" },
        "popularity": { "type": "string" },
        "watchers": { "type": "string" },
        "native_title": { "type": "string" },
        "also_known_as": {
            "type": "array",
            "items": { "type": "string" }
        },
        "genres": {
            "type": "array",
            "items": { "type": "string" }
        },
        "tags": {
            "type": "array",
            "items": { "type": "string" }
        },
        "rating": { "type": "string" }
    },
    "required": [
        "slug",
        "url",
        "title",
        "image",
        "synopsis",
        "country",
        "episodes",
        "aired",
        "aired_on",
        "original_network",
        "duration",
        "content_rating",
        "score_details",
        "ranked",
        "popularity",
        "watchers",
        "native_title",
        "also_known_as",
        "genres",
        "tags",
        "rating"
    ],
    "additionalProperties": false
}