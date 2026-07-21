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

export const actors = [
    '960-ryu-seung-ryong',
    '300-han-hyo-joo',
    '433-jo-in-sung',
    '284-cha-tae-hyun',
    '1271-ryu-seung-beom',
    '3044-kim-sung-kyun',
    '3622-kim-hee-won',
    '2520-moon-seung-geun',
    '16597-lee-jung-ha',
    '22074-go-yoon-jung',
    '19380-kim-do-hoon'
]

export const dramaListCodes = ["MLOPW2Z3", "LAlEwM51", "1zEmx8V4", "74KzbNr3"]

export const userListCode = "CASmooth"