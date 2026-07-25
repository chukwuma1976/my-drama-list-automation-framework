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

export const daysOfTheWeek = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday'
]

export const searchableDrama = {
    title: "The WONDERfools",
    slug: "768853-the-b-team"
}

export const searchableActress = {
    name: "Park Eun Bin",
    slug: "1897-park-eun-bin"
}

export const searchableActressForAccessiblity = {
    slug: "490-kim-tae-hee",
    url: "https://mydramalist.com/people/490-kim-tae-hee",
    name: "Kim Tae Hee",
}

export const updateInfo = {
    location: "Somewhere in automation land",
    biography: "I am an automation tester who enjoys the Asian drama experience."
}

export const dramaToAdd = {
    title: "Crash Landing on You",
    slug: "35729-emergency-lands-of-love",
    url: "https://mydramalist.com/35729-emergency-lands-of-love"
}

export const dramaForAccessibility = {
    slug: "47-iris",
    url: "https://mydramalist.com/47-iris",
    title: "Iris",
}

export const statusesUnableToBeRated = ["Plan to watch", "Undecided", "Not Interested"]

export const dramasToNotRate = [
    {
        title: "Flex X Cop Season 2",
        slug: "766325-flex-x-cop-season-2",
        url: "https://mydramalist.com/766325-flex-x-cop-season-2",
        status: "Plan to watch"
    },
    {
        title: "Siren's Kiss",
        slug: "788532-siren",
        url: "https://mydramalist.com/788532-siren",
        status: "Undecided"
    },
    {
        title: "Love for You",
        slug: "760407-ye-gou-gu-tou",
        url: "https://mydramalist.com/760407-ye-gou-gu-tou",
        status: "Not Interested"
    }
]

export const watchStatus = [
    "Currently Watching",
    "Completed",
    "On Hold",
    "Dropped",
    "Plan to Watch",
    "Undecided",
    "Not Interested"
]

export const dramaMyDemon = {
    title: "My Demon",
    slug: "746993-my-demon",
    year: "2023",
    image: "https://i.mydramalist.com/0w0mZ6_4s.jpg?v=1",
    rating: "8.3",
    url: "https://mydramalist.com/746993-my-demon"
}

export const dramaToBeIntercepted = {
    slug: "784484-i-give-it-to-you",
    url: "https://mydramalist.com/784484-i-give-it-to-you",
    title: "Dream to You",
    status: "Plan to watch"
}

export const dramaForIntegrationTesting = {
    slug: "18452-goblin",
    url: "https://mydramalist.com/18452-goblin",
    title: "Guardian: The Lonely and Great God (2016)",
    status: "Completed",
    rating: "10",
    updatedStatus: "Plan to watch"
}