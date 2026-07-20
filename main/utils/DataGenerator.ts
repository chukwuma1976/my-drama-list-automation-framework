import { username, password } from "../config"

export const missingCredentials = [
    { username, password: "", scenario: "username with missing password" },
    { username: "", password, scenario: "password with missing username" },
    { username: "", password: "", scenario: "missing username and password" }
];

export const invalidCredentials = [
    { username, password: "invalid", scenario: "username with invalid password" },
    { username: "invalid", password, scenario: "password with invalid username" },
    { username: "invalid", password: "invalid", scenario: "invalid username and password" }
]

export const dramaList = [
    "Crash Landing on You",
    "Reply 1988",
    "Guardian: The Lonely and Great God",
    "Flower of Evil",
    "My Mister",
    "The Glory",
    "Signal",
    "Alchemy of Souls",
    "Twenty-Five Twenty-One",
    "It's Okay to Not Be Okay",
    "Moving"
]

export const dramaSlug = "25560-moving";