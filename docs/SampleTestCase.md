# Test Case

## Test Case ID

TC-MDL-001

## Title

Verify complete CRUD workflow for Mock MyDramaList Server

## Objective

Validate that a drama can be successfully created, retrieved, updated, and deleted through the API.

## Priority

High

## Test Type

Integration Test

## Preconditions

* Express.js mock server is running on port 5000.
* Health endpoint returns HTTP 200.
* Test drama does not already exist.

## Test Data

Single valid drama object:

* title
* slug
* status
* rating
* image
* url

## Test Steps

| Step | Action                                          | Expected Result                       |
| ---- | ----------------------------------------------- | ------------------------------------- |
| 1    | Verify server health using GET /health          | HTTP 200                              |
| 2    | Submit POST request to create a new drama       | HTTP 201 Created                      |
| 3    | Retrieve drama using GET /:slug                 | Drama is returned with correct values |
| 4    | Submit PATCH request updating status and rating | HTTP 200 OK                           |
| 5    | Retrieve drama again using GET /:slug           | Updated values are returned           |
| 6    | Submit DELETE request                           | HTTP 204 No Content                   |
| 7    | Retrieve deleted drama using GET /:slug         | HTTP 404 Not Found                    |

## Expected Result

The drama is successfully:

* Created
* Retrieved
* Updated
* Deleted

All responses return the expected HTTP status codes, and the data remains consistent throughout the workflow.

## Actual Result

Pass / Fail / Blocked

## Notes

This test validates endpoint interaction across the complete CRUD lifecycle and serves as an integration test rather than an isolated endpoint validation.
