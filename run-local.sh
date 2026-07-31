#!/bin/bash

echo "Starting mock MDL server..."

cd mock-mdl-server
node index.js &
SERVER_PID=$!

echo "Waiting for server..."
sleep 2

cd ..

echo "Running Playwright..."

npx playwright test "$@"

echo "Stopping server..."

kill $SERVER_PID