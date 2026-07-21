export const dramaAllEpisodesDetailsSchema = {
    "$schema": "http://json-schema.org/draft-07/schema#",
    "title": "FullEpisodesResponse",
    "type": "object",
    "properties": {
        "episodes": {
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "episode_number": {
                        "type": "string",
                        "pattern": "^[0-9]+$"
                    },
                    "title": {
                        "type": "string"
                    },
                    "air_date": {
                        "type": "string"
                    },
                    "description": {
                        "type": "string"
                    },
                    "image": {
                        "type": "string",
                        "format": "uri"
                    },
                    "rating": {
                        "type": "string",
                        "pattern": "^(\\d+(\\.\\d+)?|-)/10$"
                    },
                    "season": {
                        "type": "string",
                        "pattern": "^[0-9]+$"
                    }
                },
                "required": [
                    "episode_number",
                    "title",
                    "air_date",
                    "description",
                    "image",
                    "rating",
                    "season"
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
        "episodes",
        "total"
    ],
    "additionalProperties": false
}