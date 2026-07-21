export const seasonalDramasSchema = {
    "$schema": "http://json-schema.org/draft-07/schema#",
    "title": "DramasResponse",
    "type": "object",
    "properties": {
        "dramas": {
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "title": {
                        "type": "string"
                    },
                    "slug": {
                        "type": "string"
                    },
                    "image": {
                        "type": "string",
                        "format": "uri"
                    },
                    "rating": {
                        "type": "string",
                        "pattern": "^\\d+(\\.\\d+)?$"
                    },
                    "url": {
                        "type": "string",
                        "format": "uri"
                    }
                },
                "required": [
                    "title",
                    "slug",
                    "image",
                    "rating",
                    "url"
                ],
                "additionalProperties": false
            }
        },
        "total": {
            "type": "integer",
            "minimum": 0
        },
        "year": {
            "type": "integer",
            "minimum": 1900
        },
        "quarter": {
            "type": "integer",
            "minimum": 1,
            "maximum": 4
        },
        "season": {
            "type": "string",
            "enum": ["winter", "spring", "summer", "fall"]
        }
    },
    "required": [
        "dramas",
        "total",
        "year",
        "quarter",
        "season"
    ],
    "additionalProperties": false
}