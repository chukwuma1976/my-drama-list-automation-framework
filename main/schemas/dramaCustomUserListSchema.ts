export const dramaCustomUserListSchema = {
    "$schema": "http://json-schema.org/draft-07/schema#",
    "title": "UserWatchlistResponse",
    "type": "object",
    "properties": {
        "username": {
            "type": "string"
        },
        "user_id": {
            "type": "string",
        },
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
                    "status": {
                        "type": "string",
                        "enum": [
                            "Watching",
                            "Completed",
                            "Plan to Watch",
                            "On-hold",
                            "Dropped"
                        ]
                    },
                    "rating": {
                        "type": "string",
                        "pattern": "^(\\d+(\\.\\d+)?|)$"
                    },
                    "image": {
                        "type": "string"
                    },
                    "url": {
                        "type": "string",
                        "format": "uri"
                    }
                },
                "required": [
                    "title",
                    "slug",
                    "status",
                    "rating",
                    "image",
                    "url"
                ],
                "additionalProperties": false
            }
        },
        "total": {
            "type": "integer",
            "minimum": 0
        },
        "url": {
            "type": "string",
            "format": "uri"
        }
    },
    "required": [
        "username",
        "user_id",
        "dramas",
        "total",
        "url"
    ],
    "additionalProperties": false
}