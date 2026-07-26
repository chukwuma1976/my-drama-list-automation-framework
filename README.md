# 🎬 MyDramaList Automation Framework

A comprehensive end-to-end automation framework built with **Playwright**, **TypeScript**, and **REST API testing** against the public MyDramaList API.

This project demonstrates modern SDET practices, combining **UI automation**, **API validation**, **integration testing**, **accessibility testing**, **visual regression testing**, **network interception**, **authentication management**, and **performance testing**.

---

## 🚀 Tech Stack

* Playwright
* TypeScript
* Node.js
* REST API Testing
* Axe-Core Accessibility Testing
* Visual Regression Testing
* GitHub Actions (CI Ready)
* k6 Performance Testing

---

## ✅ Framework Features

### 🖥️ UI Automation

* Login / Logout
* Registration validation
* Search functionality
* Drama Details pages
* User Drama Lists
* Review management
* Ratings
* Responsive UI validation

---

### 🔌 API Testing

* 13 public REST endpoints
* Positive testing
* Negative testing
* Header validation
* Response validation
* Health endpoint testing

---

### 🔄 Integration Testing

The framework demonstrates true UI/API integration.

**Example workflow:**

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

### 🔐 Authentication

Playwright Storage State is used to eliminate repeated UI logins.

Separate browser configurations exist for:

* Authenticated flows
* Login testing
* Logout testing
* Registration testing
* Accessibility testing
* Visual regression testing

---

### ♿ Accessibility Testing

Accessibility testing is implemented using **axe-core/playwright**.

Pages are automatically scanned for:

* Missing labels
* ARIA violations
* Color contrast issues
* Keyboard accessibility
* Landmark violations

---

### 📸 Visual Regression Testing

Visual snapshot testing verifies UI consistency across stable pages.

Example pages:

* Login
* Landing Page
* Registration

---

### 🌐 Network Interception

Implemented scenarios include:

* Blocking third-party advertisements
* Mocking HTTP 403 responses
* Mocking HTTP 404 responses
* Mocking HTTP 500 responses
* Simulating network failures

This significantly improves test stability while reducing flaky tests.

---

### 🛡️ Header Validation

Security and response headers are validated, including:

* Content-Type
* Cache-Control
* Strict-Transport-Security
* Content-Encoding
* Server

---

### 📊 Data Validation

Frontend and backend values are normalized before comparison.

Examples include:

* Title formatting
* Date formatting
* Status values
* Whitespace normalization
* Capitalization differences

---

### 📚 Large Dataset Handling

Large MyDramaList collections contain hundreds of records.

Instead of validating every record, the framework intelligently partitions validation by inspecting every *n*th record, dramatically reducing execution time while maintaining meaningful coverage.

---

### ⏳ Eventual Consistency

Some backend updates are asynchronous.

The framework uses Playwright's `expect.poll()` to wait for API responses to reflect UI changes instead of relying on arbitrary delays.

---

### ⚡ Performance Testing

Performance testing is implemented using **k6**.

Current scenarios include:

* Smoke Testing
* Load Testing
* Spike Testing
* Stress Testing
* Soak Testing

---

## 📁 Project Structure

```text
tests/
 ├── api/
 ├── auth/
 ├── accessibility/
 ├── integration/
 ├── ui/
 └── visualRegression/

main/
 ├── api/
 ├── pages/
 └── utils/

playwright/
 └── auth/

performance/
```

---

## 💡 Design Principles

This framework emphasizes:

* Maintainability
* Reusability
* Readability
* Separation of Concerns
* DRY Principles
* Reliable Synchronization
* Stable Locator Strategies

---

## 🛠️ Skills Demonstrated

* Playwright
* TypeScript
* REST APIs
* UI Automation
* API Automation
* Integration Testing
* Accessibility Testing
* Visual Regression Testing
* Network Interception
* Authentication
* Polling
* Data Validation
* Performance Testing
* CI/CD Readiness

---

## 🔮 Future Enhancements

Potential future additions include:

* Appium Mobile Automation
* GraphQL Testing
* Database Validation
* AI-Assisted Test Generation
* Distributed Test Execution
* Contract Testing

---

## 🎯 Purpose

This project serves as a portfolio-quality automation framework designed to demonstrate modern SDET skills and enterprise automation practices using real-world workflows and publicly available APIs.

---

#SDET #QA #TestAutomation #Playwright #TypeScript #APItesting #IntegrationTesting #AccessibilityTesting #VisualRegression #PerformanceTesting #k6 #CI_CD #AutomationFramework #SoftwareTesting #QualityEngineering
