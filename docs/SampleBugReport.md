# Sample Bug Report

## Bug Summary

**Bug ID:** API-SEARCH-001

**Title:** Search API returns HTTP 400 for special-character searches while UI successfully processes the same request.

---

# Overview

During API validation of the search functionality, an inconsistency was discovered between the application's user interface and the backend API.

Searching for dramas using special characters returns a **400 Bad Request** response when executed directly through the API using Playwright.

The exact same search succeeds when performed through the web UI and through the Vercel API Explorer.

This indicates inconsistent handling of special-character input across different clients.

---

# Environment

| Property | Value |
|----------|-------|
| Framework | Playwright |
| API Client | Playwright APIRequestContext |
| API Explorer | Vercel API Explorer |
| Browser | Chromium |
| Endpoint | `/search` |

---

# Preconditions

- Search endpoint is available.
- API is reachable.
- Drama search endpoint accepts query parameters.

---

# Steps to Reproduce

1. Execute the following request through Playwright.

```
GET /search?q=!!!
```

*(Use any special-character search that reproduces the issue.)*

2. Observe the HTTP response.

3. Perform the exact same search through:

- Web UI
- Vercel API Explorer

---

# Expected Result

The API should process the request successfully and return:

- HTTP 200 OK
- An empty result set (if no matches exist)

or

- Matching dramas

The behavior should be identical regardless of whether the request originates from:

- UI
- API automation
- API Explorer
- Third-party clients

---

# Actual Result

Playwright API Request

```
HTTP 400 Bad Request
```

UI Search

```
Search completes successfully.
```

Vercel API Explorer

```
HTTP 200 OK
```

---

# Comparison

| Client | Result |
|---------|--------|
| Web UI | ✅ Pass |
| Vercel API Explorer | ✅ Pass |
| Playwright API Request | ❌ HTTP 400 |

---

# Impact

This issue may affect:

- Automated API testing
- Third-party API consumers
- Integration services
- Consistency between frontend and backend behavior

Applications interacting directly with the API may experience failures that are not visible through the web interface.

---

# Possible Root Causes

Potential areas for investigation include:

- URL encoding differences
- Request parsing
- Middleware validation
- API gateway configuration
- Input sanitization
- Special-character handling

---

# Supporting Evidence

### Playwright API

```
Status: 400 Bad Request
```

### UI

```
Search succeeds.
```

### Vercel API Explorer

```
Status: 200 OK
```

---

# Recommendation

The search endpoint should consistently process special-character input regardless of the client making the request.

Input validation and request parsing should be reviewed to ensure parity between:

- Web UI
- API automation
- API Explorer
- External API consumers

---

# Notes

This bug was discovered while performing API search validation covering the following scenarios:

- Exact match
- Partial match
- Lowercase search
- Uppercase search
- Leading spaces
- Trailing spaces
- Long search strings
- Emoji search
- Special-character search
- Nonexistent drama search

All scenarios returned the expected behavior except the direct API special-character request.