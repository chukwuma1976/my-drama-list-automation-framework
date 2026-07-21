export const dramaEpisodesSchema = {
    "$schema": "http://json-schema.org/draft-07/schema#",
    "title": "DramaEpisodesResponse",
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
                    }
                },
                "required": [
                    "episode_number",
                    "title",
                    "air_date"
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