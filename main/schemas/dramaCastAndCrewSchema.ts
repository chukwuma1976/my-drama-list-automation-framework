export const dramaCastAndCrewSchema = {
    "$schema": "http://json-schema.org/draft-07/schema#",
    "title": "DramaCastResponse",
    "type": "object",
    "required": ["cast", "total"],
    "additionalProperties": false,
    "properties": {
        "total": {
            "type": "integer",
            "minimum": 0,
            "description": "Total count of cast and crew members"
        },
        "cast": {
            "type": "object",
            "additionalProperties": {
                "type": "array",
                "items": {
                    "$ref": "#/definitions/CastMember"
                }
            }
        }
    },
    "definitions": {
        "CastMember": {
            "type": "object",
            "required": ["name", "character", "image", "profile_url"],
            "additionalProperties": false,
            "properties": {
                "name": {
                    "type": "string",
                    "minLength": 1
                },
                "character": {
                    "type": "string"
                },
                "image": {
                    "type": "string",
                    "format": "uri"
                },
                "profile_url": {
                    "type": "string",
                    "format": "uri"
                }
            }
        }
    }
}