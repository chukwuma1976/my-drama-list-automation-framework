#!/bin/bash

echo "Starting mock MDL server..."

cd mock-mdl-server
node index.js &
SERVER_PID=$!

echo "Waiting for server..."
sleep 2

cd ..

echo "Running Postman with Newman..."

newman run postman/mock-mdl-postman-collection.json -e postman/mock-mdl-postman-env.json

echo "Stopping server..."

kill $SERVER_PID