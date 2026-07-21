export const dramaReviewsSchema = {
    "$schema": "http://json-schema.org/draft-07/schema#",
    "title": "ReviewsResponse",
    "type": "object",
    "properties": {
        "reviews": {
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "author": {
                        "type": "string"
                    },
                    "rating": {
                        "type": "string",
                        "pattern": "^\\d+(\\.\\d+)?$"
                    },
                    "content": {
                        "type": "string"
                    },
                    "date": {
                        "type": "string"
                    }
                },
                "required": [
                    "author",
                    "rating",
                    "content",
                    "date"
                ],
                "additionalProperties": false
            }
        },
        "total": {
            "type": "integer",
            "minimum": 0
        }
    },
    "required": [
        "reviews",
        "total"
    ],
    "additionalProperties": false
}