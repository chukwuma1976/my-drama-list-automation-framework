export function smokeOptions(threshold) {
    return {
        vus: 5,
        duration: '10s',
        thresholds: {
            http_req_duration: [`p(95)<${threshold}`],
            http_req_failed: ["rate<0.01"]
        }
    };
}

export function loadOptions(threshold) {
    return {
        vus: 50,
        duration: '30s',
        thresholds: {
            http_req_duration: [`p(95)<${threshold}`],
            http_req_failed: ["rate<0.01"]
        }
    };
}

export function spikeOptions(threshold) {
    return {
        stages: [
            { duration: '10s', target: 10 },
            { duration: '5s', target: 200 },
            { duration: '10s', target: 10 }
        ],
        thresholds: {
            http_req_duration: [`p(95)<${threshold}`],
            http_req_failed: ["rate<0.01"]
        }
    };
}