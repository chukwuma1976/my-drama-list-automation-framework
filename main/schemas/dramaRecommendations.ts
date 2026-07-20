export const dramaRecommendations = {
    "$schema": "http://json-schema.org/draft-07/schema#",
    "type": "object",
    "properties": {
        "recommendations": {
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "title": { "type": "string" },
                    "year": { "type": "string" },
                    "slug": { "type": "string" },
                    "url": { "type": "string", "format": "uri" },
                    "image": { "type": "string", "format": "uri" },
                    "rating": { "type": "string" },
                    "reasons": {
                        "type": "array",
                        "items": { "type": "string" }
                    },
                    "recommended_by": { "type": "string" },
                    "votes": { "type": "string" }
                },
                "required": [
                    "title",
                    "year",
                    "slug",
                    "url",
                    "image",
                    "rating",
                    "reasons",
                    "recommended_by",
                    "votes"
                ],
                "additionalProperties": false
            }
        },
        "total": { "type": "integer" },
        "url": { "type": "string", "format": "uri" },
        "pages_fetched": { "type": "integer" }
    },
    "required": [
        "recommendations",
        "total",
        "url",
        "pages_fetched"
    ],
    "additionalProperties": false
}