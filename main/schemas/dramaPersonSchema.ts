export const dramaPersonSchema = {
    "$schema": "http://json-schema.org/draft-07/schema#",
    "title": "PersonProfileResponse",
    "type": "object",
    "properties": {
        "id": {
            "type": "string"
        },
        "url": {
            "type": "string",
            "format": "uri"
        },
        "name": {
            "type": "string"
        },
        "image": {
            "type": "string",
            "format": "uri"
        },
        "image_full": {
            "type": "string",
            "format": "uri"
        },
        "personal_info": {
            "type": "object",
            "properties": {
                "first_name": { "type": "string" },
                "family_name": { "type": "string" },
                "native_name": { "type": "string" },
                "also_known_as": { "type": "string" },
                "nationality": { "type": "string" },
                "gender": { "type": "string" },
                "born": { "type": "string" },
                "age": {
                    "type": "string",
                    "pattern": "^[0-9]+$"
                }
            },
            "required": [
                "first_name",
                "family_name",
                "native_name",
                "also_known_as",
                "nationality",
                "gender",
                "born",
                "age"
            ],
            "additionalProperties": false
        },
        "biography": {
            "type": "string"
        },
        "filmography": {
            "type": "object",
            "additionalProperties": {
                "type": "array",
                "items": {
                    "$ref": "#/definitions/FilmographyItem"
                }
            }
        }
    },
    "required": [
        "id",
        "url",
        "name",
        "image",
        "image_full",
        "personal_info",
        "biography",
        "filmography"
    ],
    "additionalProperties": false,

    "definitions": {
        "FilmographyItem": {
            "type": "object",
            "properties": {
                "year": {
                    "type": "string",
                    "pattern": "^([0-9]{4}|TBA)$"
                },
                "title": { "type": "string" },
                "slug": { "type": "string" },
                "url": {
                    "type": "string",
                    "format": "uri"
                },
                "character_name": { "type": "string" },
                "role": { "type": "string" },
                "rating": {
                    "type": "string",
                    "pattern": "^(\\d+(\\.\\d+)?|N/A)$"
                }
            },
            "required": [
                "year",
                "title",
                "slug",
                "url",
                "character_name",
                "role",
                "rating"
            ],
            "additionalProperties": false
        }
    }
}