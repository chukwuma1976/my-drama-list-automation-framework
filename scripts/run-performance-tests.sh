#!/usr/bin/env bash

set -e

TEST_TYPES=("smoke" "load" "spike")
TIERS=("fast" "standard" "heavy" "large-payload")

REPORT_DIR="reports/performance"

mkdir -p "$REPORT_DIR"

echo "========================================="
echo "Running k6 Performance Test Suite"
echo "========================================="

for testType in "${TEST_TYPES[@]}"
do
    for tier in "${TIERS[@]}"
    do
        SCRIPT="tests/performance/${testType}/${tier}.js"
        REPORT="${REPORT_DIR}/${testType}-${tier}.html"

        echo ""
        echo "Running ${SCRIPT}"

        k6 run \
            --out web-dashboard \
            --summary-export="${REPORT_DIR}/${testType}-${tier}.json" \
            "${SCRIPT}"

        if [ -f report.html ]; then
            mv report.html "${REPORT}"
        fi
    done
done

echo ""
echo "========================================="
echo "Performance Test Suite Complete"
echo "Reports saved to ${REPORT_DIR}"
echo "========================================="