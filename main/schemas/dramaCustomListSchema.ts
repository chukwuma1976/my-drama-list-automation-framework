export const dramaCustomListSchema = {
    "$schema": "http://json-schema.org/draft-07/schema#",
    "title": "DramaListCollectionResponse",
    "type": "object",
    "properties": {
        "title": {
            "type": "string"
        },
        "description": {
            "type": "string"
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
                    "image": {
                        "type": "string",
                        "format": "uri"
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
        "title",
        "description",
        "dramas",
        "total",
        "url"
    ],
    "additionalProperties": false
}