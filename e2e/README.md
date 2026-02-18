# Finance Categorizer E2E Tests

End-to-end tests for the Finance Categorizer application using Playwright.

## Overview

This test suite provides comprehensive e2e testing for the Finance Categorizer application, covering:

1. **Import and Categorize** - Import transactions from CSV files and assign categories
2. **Rules CRUD** - Create, edit, toggle visibility (active/inactive), and delete categorization rules

## Prerequisites

Before running the tests, ensure:

1. **Backend is seeded with categories**: Run `cd ../backend && npm run seed` to populate the database with default categories
2. **All dependencies installed**: Both backend and frontend dependencies must be installed
3. **Ports 5001 and 5173 are available**: Tests will automatically start the backend and frontend servers

## Installation

```bash
cd e2e
npm install
npx playwright install --with-deps
```

## Running Tests

### Run all tests (headless mode)
```bash
npm test
```

### Run tests with UI mode (recommended for development)
```bash
npm run test:ui
```

### Run tests in headed mode (see the browser)
```bash
npm run test:headed
```

### Run tests in debug mode
```bash
npm run test:debug
```

### Run a specific test file
```bash
npx playwright test tests/import-and-categorize.spec.js
```

### Run tests in specific browser
```bash
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
```

## Viewing Test Results

After running tests, view the HTML report:

```bash
npm run report
```

This will open an interactive HTML report with:
- Test pass/fail status
- Screenshots of failures
- Video recordings (when tests fail)
- Step-by-step traces

## Test Structure

```
e2e/
├── tests/                          # Test files
│   ├── import-and-categorize.spec.js  # Import and category assignment tests
│   └── rules-crud.spec.js             # Rules create/edit/delete/toggle tests
├── page-objects/                   # Page Object Models
│   ├── ImportPage.js              # Import page interactions
│   ├── TransactionsPage.js        # Transactions page interactions
│   └── RulesPage.js               # Rules page interactions
├── test-data/                      # Generated test data (auto-created)
├── playwright.config.js            # Playwright configuration
├── package.json                    # Dependencies and scripts
└── README.md                       # This file
```

## Test Descriptions

### Import and Categorize Test

This test verifies the complete import workflow:

1. Generates a unique CSV file with test transactions
2. Uploads the file through the Import page
3. Verifies auto-mapping of CSV columns
4. Validates the transactions
5. Imports the transactions
6. Navigates to the Transactions page
7. Finds the imported transaction
8. Assigns a category to an uncategorized transaction
9. Verifies the category assignment

**Key Features:**
- Uses randomized data to avoid conflicts
- Works with any database state (empty or populated)
- Cleans up test files after completion

### Rules CRUD Test

This test suite includes two test cases:

#### Test 1: Full CRUD Cycle
1. Creates a new rule with unique name
2. Verifies the rule appears in the table
3. Toggles the rule inactive (eye icon off)
4. Toggles the rule active (eye icon on)
5. Edits the rule with new values
6. Verifies the updates
7. Deletes the rule
8. Verifies deletion

#### Test 2: Toggle Visibility Multiple Times
1. Creates a test rule
2. Toggles visibility (active/inactive) 3 times
3. Verifies each toggle operation
4. Cleans up by deleting the rule

**Key Features:**
- Uses randomized rule names and values
- Tests the "visibility" (isActive) toggle functionality
- Verifies rule persistence after edits
- Comprehensive cleanup to avoid test pollution

## Configuration

### playwright.config.js

The Playwright configuration includes:

- **Browsers**: Chromium, Firefox, and WebKit
- **Base URL**: http://localhost:5173
- **Auto-start servers**: Backend (port 5001) and Frontend (port 5173)
- **Timeouts**: 30s default with 120s server startup timeout
- **Reports**: HTML reporter with screenshots and videos on failure
- **Parallel execution**: Tests run in parallel for speed

### Modifying Configuration

To change test behavior, edit `playwright.config.js`:

```javascript
use: {
  // Change base URL
  baseURL: 'http://localhost:5173',
  
  // Change screenshot behavior
  screenshot: 'only-on-failure', // or 'on' / 'off'
  
  // Change video recording
  video: 'retain-on-failure', // or 'on' / 'off'
  
  // Change default timeout
  timeout: 30000, // milliseconds
}
```

## Troubleshooting

### Port Already in Use

If you see errors about ports 5001 or 5173 being in use:

1. Stop any running instances of the backend or frontend
2. Or change `reuseExistingServer` to `false` in `playwright.config.js`

### Database Not Seeded

If tests fail because categories are missing:

```bash
cd ../backend
npm run seed
```

### Tests Failing on CI

The configuration automatically adjusts for CI environments:
- Retries: 2 attempts on CI, 0 locally
- Workers: 1 on CI, parallel locally
- Server reuse: Disabled on CI, enabled locally

### Slow Test Execution

To speed up tests:

1. Run specific tests: `npx playwright test tests/import-and-categorize.spec.js`
2. Use headed mode only when debugging: `npm run test:headed`
3. Reduce browser coverage: `npx playwright test --project=chromium`

### Debugging Failed Tests

1. **View report**: `npm run report`
2. **Run in UI mode**: `npm run test:ui`
3. **Run in debug mode**: `npm run test:debug`
4. **Add console logs**: Insert `console.log()` statements in tests
5. **Take screenshots**: Add `await page.screenshot({ path: 'debug.png' })`

## Writing New Tests

### Using Page Objects

Always use the page object pattern for maintainability:

```javascript
const { test } = require('@playwright/test');
const ImportPage = require('../page-objects/ImportPage');

test('my test', async ({ page }) => {
  const importPage = new ImportPage(page);
  await importPage.navigate();
  // ... rest of test
});
```

### Generating Random Data

For tests that create data, always use timestamps or UUIDs:

```javascript
const uniqueId = Date.now();
const testName = `TestItem-${uniqueId}`;
```

### Cleanup

Tests should clean up their own data:

```javascript
test.afterAll(async () => {
  // Clean up files, database records, etc.
});
```

## Best Practices

1. **Use Page Objects**: Encapsulate page interactions in page object classes
2. **Generate Unique Data**: Use timestamps or UUIDs to avoid test conflicts
3. **Wait Appropriately**: Use `waitFor` methods instead of fixed timeouts when possible
4. **Independent Tests**: Each test should be runnable independently
5. **Descriptive Names**: Use clear, descriptive test and variable names
6. **Clean Up**: Always clean up test data after test completion
7. **Assertions**: Include meaningful assertions with helpful error messages

## CI/CD Integration

To integrate with CI/CD pipelines:

### GitHub Actions Example

```yaml
name: E2E Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      
      # Install dependencies
      - name: Install backend dependencies
        run: cd backend && npm install
      
      - name: Install frontend dependencies
        run: cd frontend && npm install
      
      - name: Install e2e dependencies
        run: cd e2e && npm install
      
      # Setup database
      - name: Run database migrations
        run: cd backend && npx prisma migrate deploy
      
      - name: Seed database
        run: cd backend && npm run seed
      
      # Run tests
      - name: Run Playwright tests
        run: cd e2e && npm test
      
      # Upload report
      - uses: actions/upload-artifact@v2
        if: always()
        with:
          name: playwright-report
          path: e2e/playwright-report/
```

## Support

For issues or questions:

1. Check the [Playwright documentation](https://playwright.dev)
2. Review test failure reports and traces
3. Check console output for error messages
4. Verify prerequisites (seeded database, correct ports)

## License

This test suite is part of the Finance Categorizer project.
