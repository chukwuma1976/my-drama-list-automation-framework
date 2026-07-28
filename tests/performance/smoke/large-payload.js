import http from "k6/http";
import { check } from "k6";
import { performanceTestingEndpoints, BASE_URL } from "../k6-constants.js";
import { Trend } from "k6/metrics";
import { smokeOptions } from "../utils/options.js";
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

const endpointDuration = new Trend("endpoint_duration");

export default function () {

    performanceTestingEndpoints
        .filter(el => el.tier === "large-payload")
        .forEach(endpoint => {
            const options = smokeOptions(endpoint.threshold);

            const response = http.get(`${BASE_URL}${endpoint.path}`);

            endpointDuration.add(response.timings.duration, {
                endpoint: endpoint.name,
                tier: endpoint.tier
            });

            console.log(
                `${endpoint.name} (${endpoint.tier}) -> ${response.timings.duration.toFixed(2)} ms`
            );

            check(response, {
                "status is 200": r => r.status === 200,
                [`under ${endpoint.threshold} ms`]: r =>
                    r.timings.duration < endpoint.threshold
            });
        });

}

export function handleSummary(data) {
    return {
        "reports/performance/smoke-report-large-payload.html": htmlReport(data),
    };
}