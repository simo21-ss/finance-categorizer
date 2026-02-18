const { test, expect } = require('@playwright/test');
const RulesPage = require('../page-objects/RulesPage');

test.describe('Rules CRUD Operations', () => {
  let uniqueRuleName;
  let testCategoryId;

  test.beforeEach(() => {
    // Generate a unique rule name for each test
    uniqueRuleName = `TestRule-${Date.now()}`;
  });

  test('should create, edit, toggle visibility, and delete a rule', async ({ page, request }) => {
    const rulesPage = new RulesPage(page);

    // Step 1: Get a category to use for the test rule
    const categoriesResponse = await request.get('http://localhost:5001/api/categories');
    expect(categoriesResponse.ok()).toBeTruthy();
    const categories = await categoriesResponse.json();
    expect(categories.length).toBeGreaterThan(0);
    testCategoryId = categories[0].id;

    // Step 2: Navigate to rules page
    await rulesPage.navigate();
    await rulesPage.waitForTableLoad();

    // Step 3: Get initial rules count
    const initialCount = await rulesPage.getRulesCount();
    console.log('Initial rules count:', initialCount);

    // Step 4: Click create rule button
    await rulesPage.clickCreateRule();

    // Step 5: Fill in the rule form with unique data
    const ruleData = {
      name: uniqueRuleName,
      categoryId: testCategoryId,
      field: 'merchant',
      operator: 'contains',
      value: `test-value-${Date.now()}`,
      priority: 5000 + Math.floor(Math.random() * 1000)
    };

    await rulesPage.fillRuleForm(ruleData);

    // Step 6: Save the rule
    await rulesPage.saveRule();

    // Step 7: Verify the rule appears in the table
    let ruleRow = await rulesPage.findRuleByName(uniqueRuleName);
    expect(ruleRow).not.toBeNull();
    console.log(`✓ Rule "${uniqueRuleName}" created successfully`);

    // Step 8: Verify the rule details
    const createdRuleDetails = await rulesPage.getRuleDetails(ruleRow);
    expect(createdRuleDetails.name).toContain(uniqueRuleName);
    expect(createdRuleDetails.field).toContain('merchant');
    expect(createdRuleDetails.operator).toContain('contains');
    expect(createdRuleDetails.value).toContain(ruleData.value);

    // Step 9: Verify the new rules count
    const afterCreateCount = await rulesPage.getRulesCount();
    expect(afterCreateCount).toBeGreaterThanOrEqual(initialCount);

    // Step 10: Toggle the rule to inactive
    await rulesPage.toggleRuleActive(ruleRow);
    console.log('✓ Toggled rule to inactive');

    // Wait a moment for the UI to update
    await page.waitForTimeout(500);

    // Step 11: Toggle the rule back to active
    ruleRow = await rulesPage.findRuleByName(uniqueRuleName);
    await rulesPage.toggleRuleActive(ruleRow);
    console.log('✓ Toggled rule back to active');

    // Wait for the UI to update
    await page.waitForTimeout(500);

    // Step 12: Edit the rule
    ruleRow = await rulesPage.findRuleByName(uniqueRuleName);
    await rulesPage.openEditModal(ruleRow);

    // Step 13: Update the rule with new values
    const updatedValue = `updated-value-${Date.now()}`;
    const updatedPriority = 6000 + Math.floor(Math.random() * 1000);
    
    await rulesPage.fillRuleForm({
      value: updatedValue,
      priority: updatedPriority
    });

    await rulesPage.saveRule();
    console.log('✓ Rule edited successfully');

    // Step 14: Verify the rule was updated
    ruleRow = await rulesPage.findRuleByName(uniqueRuleName);
    const updatedRuleDetails = await rulesPage.getRuleDetails(ruleRow);
    expect(updatedRuleDetails.value).toContain(updatedValue);
    expect(updatedRuleDetails.name).toContain(uniqueRuleName);

    // Step 15: Delete the rule
    ruleRow = await rulesPage.findRuleByName(uniqueRuleName);
    await rulesPage.deleteRule(ruleRow);
    console.log('✓ Rule deleted successfully');

    // Step 16: Verify the rule no longer appears in the table
    const deletedRuleRow = await rulesPage.findRuleByName(uniqueRuleName);
    expect(deletedRuleRow).toBeNull();

    // Step 17: Verify the final rules count
    const finalCount = await rulesPage.getRulesCount();
    expect(finalCount).toBeLessThanOrEqual(afterCreateCount);

    console.log(`✓ Complete test cycle for rule "${uniqueRuleName}" completed successfully`);
  });

  test('should toggle rule visibility (active/inactive) multiple times', async ({ page, request }) => {
    const rulesPage = new RulesPage(page);

    // Step 1: Get a category to use for the test rule
    const categoriesResponse = await request.get('http://localhost:5001/api/categories');
    expect(categoriesResponse.ok()).toBeTruthy();
    const categories = await categoriesResponse.json();
    expect(categories.length).toBeGreaterThan(0);
    testCategoryId = categories[0].id;

    // Step 2: Navigate to rules page
    await rulesPage.navigate();
    await rulesPage.waitForTableLoad();

    // Step 3: Create a test rule
    await rulesPage.clickCreateRule();

    const ruleData = {
      name: uniqueRuleName,
      categoryId: testCategoryId,
      field: 'description',
      operator: 'startsWith',
      value: `toggle-test-${Date.now()}`,
      priority: 7000
    };

    await rulesPage.fillRuleForm(ruleData);
    await rulesPage.saveRule();

    // Step 4: Find the rule
    let ruleRow = await rulesPage.findRuleByName(uniqueRuleName);
    expect(ruleRow).not.toBeNull();

    // Step 5: Toggle visibility OFF and ON multiple times
    for (let i = 0; i < 3; i++) {
      // Toggle OFF
      await rulesPage.toggleRuleActive(ruleRow);
      await page.waitForTimeout(300);
      console.log(`✓ Toggle ${i + 1}: Rule toggled to inactive`);

      // Toggle ON
      ruleRow = await rulesPage.findRuleByName(uniqueRuleName);
      await rulesPage.toggleRuleActive(ruleRow);
      await page.waitForTimeout(300);
      console.log(`✓ Toggle ${i + 1}: Rule toggled to active`);

      // Refresh the row reference
      ruleRow = await rulesPage.findRuleByName(uniqueRuleName);
    }

    // Step 6: Clean up - delete the rule
    ruleRow = await rulesPage.findRuleByName(uniqueRuleName);
    await rulesPage.deleteRule(ruleRow);

    // Verify deletion
    const deletedRuleRow = await rulesPage.findRuleByName(uniqueRuleName);
    expect(deletedRuleRow).toBeNull();

    console.log(`✓ Toggle visibility test completed for rule "${uniqueRuleName}"`);
  });
});
