# 🎬 MyDramaList Automation Framework

![Version](https://img.shields.io/badge/version-v1.0.0-blue)

A comprehensive end-to-end automation framework built with **Playwright**, **TypeScript**, **REST API testing**, and **k6** against the public MyDramaList API.

This project demonstrates modern SDET practices by combining **UI automation**, **API testing**, **integration testing**, **security testing**, **accessibility testing**, **visual regression testing**, **network interception**, **authentication management**, and **performance testing**.

## 🎬 YouTube Demo

[![YouTube Demo](https://img.youtube.com/vi/1BpcZvjPPCw/maxresdefault.jpg)](https://youtu.be/1BpcZvjPPCw)

---

# 🚀 Tech Stack

- Playwright
- TypeScript
- Node.js
- REST API Testing
- AJV Schema Validation
- Axe-Core Accessibility Testing
- Visual Regression Testing
- k6 Performance Testing
- GitHub Actions (CI/CD Ready)

---

# ✅ Framework Features

## Framework Overview

- UI Automation (Playwright & Selenium)
- API Automation
- End-to-End Testing
- Integration Testing
- Security Testing
- Performance Testing (k6)
- Accessibility Testing
- Visual Regression Testing
- AJV JSON Schema Validation
- Authentication State Management
- CI/CD Ready
- Allure Reporting
- Parallel Test Execution
- Docker Support
- Page Object Model (POM)
- Modular Test Architecture

---

## 🖥️ UI Automation

Current UI automation coverage includes:

- Login / Logout
- Registration validation
- Search functionality
- Drama Details pages
- User Drama Lists
- Review management
- Ratings
- Responsive UI validation

---

## 🔌 API Testing

Current API coverage includes:

- 13 Public REST Endpoints
- Positive Testing
- Negative Testing
- Header Validation
- Response Validation
- Health Endpoint Testing

---

## 🔄 Integration Testing

The framework demonstrates true UI/API integration.

### Example Workflow

```text
Login
   ↓
Add Drama
   ↓
Verify through API
   ↓
Edit Rating
   ↓
Verify Updated Rating through API
   ↓
Delete Drama
   ↓
Verify Removal
```

This validates both frontend behavior and backend consistency.

---

## 🔐 Authentication

Playwright Storage State is used to eliminate repeated UI logins.

Separate browser configurations exist for:

- Authenticated workflows
- Login testing
- Logout testing
- Registration testing
- Accessibility testing
- Visual regression testing

---

## ♿ Accessibility Testing

Accessibility testing is implemented using **axe-core/playwright**.

Automated scans validate:

- Missing labels
- ARIA violations
- Color contrast
- Keyboard accessibility
- Landmark violations

---

## 📸 Visual Regression Testing

Visual snapshot testing verifies UI consistency across stable pages.

Current coverage includes:

- Login
- Landing Page
- Registration

---

## 🌐 Network Interception

Implemented scenarios include:

- Blocking third-party advertisements
- Mocking HTTP 403 responses
- Mocking HTTP 404 responses
- Mocking HTTP 500 responses
- Simulating network failures

Network interception improves test stability while reducing flaky tests.

---

## 🛡️ Header Validation

Security and response headers are validated, including:

- Content-Type
- Cache-Control
- Strict-Transport-Security
- Content-Encoding
- Server

---

## 📊 Data Validation

Frontend and backend values are normalized before comparison.

Normalization includes:

- Title formatting
- Date formatting
- Status values
- Whitespace normalization
- Capitalization differences

---

## 📚 Large Dataset Handling

Large MyDramaList collections contain hundreds of records.

Rather than validating every record, the framework intelligently samples every *n*th record, significantly reducing execution time while maintaining meaningful coverage.

---

## ⏳ Eventual Consistency

Some backend operations complete asynchronously.

The framework uses Playwright's `expect.poll()` to wait for API responses to reflect UI changes rather than relying on arbitrary delays.

---

# ⚡ Performance Testing

Performance testing is implemented using **k6** to evaluate application responsiveness under varying workloads.

## Performance Profiles

| Test Type | Purpose |
|------------|---------|
| Smoke Test | Verifies application availability and basic responsiveness using a small number of virtual users. |
| Load Test | Simulates expected production traffic under normal operating conditions. |
| Spike Test | Simulates sudden increases in traffic to evaluate application recovery and scalability. |

## Metrics Captured

Performance tests collect:

- Response Time
- Request Duration
- HTTP Status Codes
- Failure Rate
- Throughput

Performance tests are maintained independently from UI and API automation and can be executed as part of regression or release validation.

---

# 🔒 Security Testing

The framework includes a dedicated **Security Testing** module that validates application behavior against common attack vectors.

## Current Security Coverage

| Test | Purpose |
|------|---------|
| SQL Injection | Verifies SQL injection attempts are blocked without exposing database information. |
| Cross-Site Scripting (XSS) | Validates malicious JavaScript payloads are rejected or sanitized. |
| HTTP Method Validation | Confirms API endpoints only allow supported HTTP methods. |
| Path Traversal | Verifies directory traversal attacks are rejected. |
| Security Headers | Validates expected HTTP security headers are returned. |
| Special Character Injection | Tests server handling of unexpected special characters. |
| Unicode Input | Validates Unicode character handling. |
| URL Encoding | Ensures encoded payloads are processed safely. |
| Very Long Input | Verifies safe handling of excessively long input strings. |

## Security Testing Strategy

Whenever possible, security testing is performed at the **API layer** because:

- API tests execute significantly faster than UI tests.
- Backend validation isolates server-side behavior.
- API responses are easier to validate using schema assertions.

For user-facing attack vectors such as **SQL Injection** and **Cross-Site Scripting (XSS)**, complementary UI tests verify that the frontend properly blocks or sanitizes malicious input.

This layered approach validates security controls from both the client and server perspectives.

---

# 📁 Project Structure

```text
tests/
├── accessibility/
├── api/
├── auth/
├── db/
├── integration/
├── performance/
├── security/
├── ui/
└── visualRegression/

main/
├── components/
├── pages/
├── api/
├── resources/
├── schemas/
└── config.ts

playwright/
└── .auth/
```

---

# ▶️ Test Execution

## Playwright Projects

| Project | Purpose |
|---------|---------|
| **setup** | Performs authentication and stores the authenticated browser session. |
| **chromium-auth** | Executes authenticated test scenarios. |
| **chromium-clean** | Executes authentication, API, accessibility, and other clean-session tests. |

### Run Entire Test Suite

```bash
npx playwright test
```

### Run Authenticated Tests

```bash
npx playwright test --project=chromium-auth
```

### Run Clean Session Tests

```bash
npx playwright test --project=chromium-clean
```

### Execute Authentication Setup

```bash
npx playwright test --project=setup
```

### Execute a Single Test File

```bash
npx playwright test tests/ui/search/search.spec.ts
```

### Run in Headed Mode

```bash
npx playwright test --headed
```

### Debug Tests

```bash
npx playwright test --debug
```

### View HTML Report

```bash
npx playwright show-report
```
### Run Entire Test Suite and Mock Server with Helper Script

```bash
scripts/run-local.sh
```
---

# ⚡ Running Performance Tests

Performance tests can be executed directly using **k6** or via the included helper script.

## Execute Directly

### Smoke Test

```bash
k6 run tests/performance/smoke/standard.js
```

### Load Test

```bash
k6 run tests/performance/load/standard.js
```

### Spike Test

```bash
k6 run tests/performance/spike/standard.js
```

## Execute Using the Helper Script

```bash
scripts/run-performance-test.sh
```

The helper script provides a single entry point for launching performance test profiles.

---
## Mock API

The public MyDramaList API exposes only read-only GET endpoints.

To support full CRUD automation scenarios, this project includes an Express.js mock API that simulates common application behavior.

Supported endpoints include:

- GET Drama List
- GET Drama Details
- POST Add Drama
- PATCH Update Rating/Status
- DELETE Remove Drama
- Health Check

The mock API was validated using Postman before being integrated into the Playwright API test suite.

This enables realistic end-to-end API automation using all major HTTP verbs while preserving business logic similar to the production application.

### Authenticated API Testing

Due to Cloudflare bot protection on the public MyDramaList API, authenticated API workflows were validated using Postman collections executed with Newman. The framework also includes a mock Express.js API that supports full CRUD operations for automated REST API testing without external authentication restrictions.

---

# 💡 Design Principles

The framework emphasizes:

- Maintainability
- Reusability
- Readability
- Separation of Concerns
- DRY Principles
- Reliable Synchronization
- Stable Locator Strategies

---

# 🛠️ Skills Demonstrated

- Playwright
- Selenium
- TypeScript
- REST API Testing
- UI Automation
- Integration Testing
- Security Testing
- Accessibility Testing
- Visual Regression Testing
- Network Interception
- Authentication Management
- Performance Testing
- AJV Schema Validation
- CI/CD Readiness

---
## 📬 Postman API Testing

In addition to automated API testing with **REST Assured** and the **Playwright Request API**, this project also includes a **Postman collection** for the mock MyDramaList server.

The collection demonstrates complete API workflow validation, including:

- Health Check
- Retrieve Drama List
- Retrieve Individual Drama
- Add Drama (POST)
- Update Drama Rating (PATCH)
- Delete Drama (DELETE)
- Collection Variables
- Environment Variables
- Automated Test Assertions

The requests are organized to simulate a realistic end-to-end user workflow, making the collection useful for manual API exploration as well as automated execution.

### Running the Collection in Postman

Import both:

- `postman/mock-mdl-postman-collection.json`
- `postman/mock-mdl-postman-env.json`

Then execute the collection using the Collection Runner.

### Running the Collection with Newman

The collection can also be executed from the command line using Newman.

```bash
newman run postman/mock-mdl-postman-collection.json \
-e postman/mock-mdl-postman-env.json
```

### Running the Collection and Mock Server

```bash
scripts/run-postman
```

This executes the complete API workflow outside of Postman and is suitable for local validation or CI/CD integration.
---
## 🗄️ Database Validation with Testcontainers

The framework includes database-level validation using **Testcontainers** to verify that the application's read and update operations correctly interact with the underlying database.

Database tests validate both expected business behavior and database constraints, including:

* Reading individual drama records by slug
* Retrieving collections of dramas and verifying unique IDs
* Updating drama status and ratings and verifying persistence
* Validating `NULL` ratings for unrated dramas
* Verifying database constraints reject invalid status values
* Validating data type enforcement for rating values
* Confirming non-existent drama records return no results

The database is started in an isolated **Testcontainers** environment for the test suite and stopped after execution.

This provides an additional layer of validation beyond UI and API testing, allowing the framework to verify that data is not only displayed correctly but also **persisted and constrained correctly at the database level**.
---

# 🔮 Future Enhancements

Potential future additions include:

- Appium Mobile Automation
- GraphQL Testing
- Database Validation
- AI-Assisted Test Generation
- Distributed Test Execution
- Contract Testing

---

# 📈 Current Framework Metrics

- **169 Automated Tests**
- **167 Passing**
- **2 Known Timing-Related Tests**
- **0 Failing Tests**
- **~8 Minute Full Suite Execution**

---

# 🎯 Purpose

This project serves as a portfolio-quality automation framework designed to demonstrate modern SDET skills and enterprise automation practices through real-world workflows and publicly available APIs.