export const dramaListSchema = {
    "type": "object",
    "required": [
        "results",
        "total"
    ],
    "properties": {
        "results": {
            "type": "array",
            "items": {
                "type": "object",
                "required": [
                    "title",
                    "slug",
                    "year",
                    "image",
                    "rating",
                    "url"
                ],
                "properties": {
                    "title": {
                        "type": "string"
                    },
                    "slug": {
                        "type": "string"
                    },
                    "year": {
                        "type": "string"
                    },
                    "image": {
                        "type": "string"
                    },
                    "rating": {
                        "type": "string"
                    },
                    "url": {
                        "type": "string"
                    }
                }
            }
        },
        "total": {
            "type": "integer",
            "minimum": 0
        }
    }
}