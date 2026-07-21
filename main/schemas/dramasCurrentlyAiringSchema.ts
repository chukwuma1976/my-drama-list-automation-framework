export const dramasCurrentlyAiringSchema = {
    "$schema": "http://json-schema.org/draft-07/schema#",
    "title": "AiringScheduleResponse",
    "type": "object",
    "properties": {
        "days": {
            "type": "object",
            "properties": {
                "Monday": { "$ref": "#/definitions/DaySchedule" },
                "Tuesday": { "$ref": "#/definitions/DaySchedule" },
                "Wednesday": { "$ref": "#/definitions/DaySchedule" },
                "Thursday": { "$ref": "#/definitions/DaySchedule" },
                "Friday": { "$ref": "#/definitions/DaySchedule" },
                "Saturday": { "$ref": "#/definitions/DaySchedule" },
                "Sunday": { "$ref": "#/definitions/DaySchedule" }
            },
            "additionalProperties": false
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
        "days",
        "total",
        "url"
    ],
    "additionalProperties": false,

    "definitions": {
        "DaySchedule": {
            "type": "array",
            "items": {
                "$ref": "#/definitions/AiringItem"
            }
        },
        "AiringItem": {
            "type": "object",
            "properties": {
                "title": {
                    "type": "string"
                },
                "slug": {
                    "type": "string"
                },
                "url": {
                    "type": "string",
                    "format": "uri"
                },
                "image": {
                    "type": "string",
                    "format": "uri"
                },
                "rating": {
                    "type": "string",
                    "pattern": "^(\\d+(\\.|\\d+)?|)$"
                },
                "episode": {
                    "type": "string"
                },
                "air_time": {
                    "type": "string",
                    "pattern": "^((1[0-2]|0?[1-9]):[0-5][0-9] (AM|PM)|ALL DAY)$"
                },
                "network": {
                    "type": "string"
                }
            },
            "required": [
                "title",
                "slug",
                "url",
                "image",
                "rating",
                "episode",
                "air_time",
                "network"
            ],
            "additionalProperties": false
        }
    }
}