const { test, expect } = require('@playwright/test');
const path = require('path');
const fs = require('fs');
const ImportPage = require('../page-objects/ImportPage');
const TransactionsPage = require('../page-objects/TransactionsPage');

test.describe('Import and Categorize Transactions', () => {
  let testFilePath;
  let uniqueDescription;

  test.beforeAll(() => {
    // Create a unique test data file
    const timestamp = Date.now();
    uniqueDescription = `TestTransaction-${timestamp}`;
    
    const csvContent = `Date,Description,Amount,Merchant,Notes
2026-02-15,${uniqueDescription},-25.50,Test Merchant,Test import transaction
2026-02-14,Another Transaction-${timestamp},-15.00,Another Merchant,Second test transaction
2026-02-13,Third Transaction-${timestamp},-10.75,Third Merchant,Third test transaction`;

    // Save to a temp file
    const testDataDir = path.join(__dirname, '../test-data');
    if (!fs.existsSync(testDataDir)) {
      fs.mkdirSync(testDataDir, { recursive: true });
    }
    
    testFilePath = path.join(testDataDir, `test-import-${timestamp}.csv`);
    fs.writeFileSync(testFilePath, csvContent);
  });

  test.afterAll(() => {
    // Clean up the test file
    if (testFilePath && fs.existsSync(testFilePath)) {
      fs.unlinkSync(testFilePath);
    }
  });

  test('should import transactions and assign category to uncategorized transaction', async ({ page, request }) => {
    const importPage = new ImportPage(page);
    const transactionsPage = new TransactionsPage(page);

    // Step 1: Navigate to import page
    await importPage.navigate();

    // Step 2: Upload the CSV file
    await importPage.uploadFile(testFilePath);

    // Step 3: Wait for mapping step
    await importPage.waitForMapping();

    // Step 4: Verify auto-mapping worked (columns should be auto-detected)
    // The columns in our CSV match common patterns, so they should be auto-mapped
    // If not, we can manually map them, but let's try auto-mapping first

    // Step 5: Click validate and continue
    await importPage.clickValidateAndContinue();

    // Step 6: Wait for validation
    await importPage.waitForValidation();

    // Step 7: Verify all transactions are valid
    const validCount = await importPage.getValidTransactionsCount();
    expect(validCount).toBe(3);

    const errorCount = await importPage.getValidationErrorsCount();
    expect(errorCount).toBe(0);

    // Step 8: Click import
    await importPage.clickImport();

    // Step 9: Wait for import to complete
    await importPage.waitForImportComplete();

    // Step 10: Verify import count
    const importedCount = await importPage.getImportedCount();
    expect(importedCount).toBe(3);

    // Step 11: Navigate to transactions page
    await transactionsPage.navigate();
    await transactionsPage.waitForTableLoad();

    // Step 12: Find the transaction with our unique description
    const transactionRow = await transactionsPage.findTransactionByDescription(uniqueDescription);
    expect(transactionRow).not.toBeNull();

    // Step 13: Verify transaction is initially uncategorized or has a category
    const initialCategory = await transactionsPage.getCategoryInRow(transactionRow);
    console.log('Initial category:', initialCategory);

    // Step 14: Open edit modal for the transaction
    await transactionsPage.openEditModal(transactionRow);

    // Step 15: Get available categories from the API
    const categoriesResponse = await request.get('http://localhost:5001/api/categories');
    expect(categoriesResponse.ok()).toBeTruthy();
    const categories = await categoriesResponse.json();
    expect(categories.length).toBeGreaterThan(0);

    // Step 16: Select the first available category
    const firstCategory = categories[0];
    await transactionsPage.selectFirstCategory();

    // Step 17: Save the transaction
    await transactionsPage.saveTransaction();

    // Step 18: Verify the category was updated
    // Find the transaction row again after the update
    const updatedRow = await transactionsPage.findTransactionByDescription(uniqueDescription);
    expect(updatedRow).not.toBeNull();

    // Wait for the category badge to update
    await transactionsPage.waitForCategoryUpdate(updatedRow, firstCategory.name);

    // Step 19: Verify the category is now displayed
    const updatedCategory = await transactionsPage.getCategoryInRow(updatedRow);
    expect(updatedCategory).toContain(firstCategory.name);

    console.log(`✓ Successfully imported 3 transactions and assigned category "${firstCategory.name}" to transaction "${uniqueDescription}"`);
  });
});
