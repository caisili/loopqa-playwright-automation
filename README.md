# LoopQA Playwright Automation

Automated end-to-end testing project for the LoopQA
technical evaluation.

## Tech Stack

- Playwright
- TypeScript
- Node.js
- Chromium

## Test Coverage

Six automated test cases covering two projects:

### Web Application
1. User authentication task - To Do
2. Navigation bug task - To Do
3. Design system updates - In Progress

### Mobile Application
4. Push notification system - To Do
5. Offline mode - In Progress
6. App icon design - Done

## Testing Approach

The test suite uses reusable helper functions for
authentication, project navigation, and task verification.

Tests verify expected task locations and associated tags.

## Installation

npm install
npx playwright install chromium

## Run Tests

npx playwright test --project=chromium

## Run Tests with Browser

npx playwright test --project=chromium --headed

## Generate HTML Report

npx playwright test --project=chromium --reporter=html
npx playwright show-report

## Test Results

Latest local Chromium run: 6 passed, 0 failed.
