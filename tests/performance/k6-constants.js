export const BASE_URL = "https://my-drama-list-api-ten.vercel.app/";

const name = "Alchemy of Souls";
const param = "52939-can-this-person-be-translated";
const person = "5346-moon-ga-young";
const quarter = "2026/1";

export const performanceTestingEndpoints = [
    {
        name: "Search",
        path: `/api/search/q/${name}`,
        tier: "standard",
        threshold: 2000
    },
    {
        name: "Drama Details",
        path: `/api/id/${param}`,
        tier: "standard",
        threshold: 2000
    },
    {
        name: "Recommendations",
        path: `/api/id/${param}/recs`,
        tier: "heavy",
        threshold: 4000
    },
    {
        name: "Cast",
        path: `/api/id/${param}/cast`,
        tier: "standard",
        threshold: 2000
    },
    {
        name: "Episodes",
        path: `/api/id/${param}/episodes`,
        tier: "standard",
        threshold: 2000
    },
    {
        name: "Episode Details",
        path: `/api/id/${param}/episodes/1`,
        tier: "fast",
        threshold: 500
    },
    {
        name: "Episodes All",
        path: `/api/id/${param}/episodes/all`,
        tier: "large-payload",
        threshold: 5000
    },
    {
        name: "Reviews",
        path: `/api/id/${param}/reviews`,
        tier: "standard",
        threshold: 2000
    },
    {
        name: "Person",
        path: `/api/people/${person}`,
        tier: "standard",
        threshold: 2000
    },
    {
        name: "Seasonal",
        path: `/api/seasonal/${quarter}`,
        tier: "standard",
        threshold: 2000
    },
    {
        name: "Calendar",
        path: `/api/calendar`,
        tier: "standard",
        threshold: 2000
    }
];

const fastEndpoints = performanceTestingEndpoints.filter(
    endpoint => endpoint.tier === "fast"
);

const standardEndpoints = performanceTestingEndpoints.filter(
    endpoint => endpoint.tier === "standard"
);

const heavyEndpoints = performanceTestingEndpoints.filter(
    endpoint => endpoint.tier === "heavy"
);

const largePayloadEndpoints = performanceTestingEndpoints.filter(
    endpoint => endpoint.tier === "large-payload"
);