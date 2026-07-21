export const dramaEpisodeDetailSchema = {
    "$schema": "http://json-schema.org/draft-07/schema#",
    "title": "EpisodeDetail",
    "type": "object",
    "properties": {
        "episode_number": {
            "type": "string",
            "pattern": "^[0-9]+$"
        },
        "url": {
            "type": "string",
            "format": "uri"
        },
        "title": {
            "type": "string"
        },
        "image": {
            "type": "string",
            "format": "uri"
        },
        "description": {
            "type": "string"
        },
        "air_date": {
            "type": "string"
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
        "url",
        "title",
        "image",
        "description",
        "air_date",
        "rating",
        "season"
    ],
    "additionalProperties": false
}