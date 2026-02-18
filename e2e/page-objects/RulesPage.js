/**
 * Page Object for the Rules page
 */
class RulesPage {
  constructor(page) {
    this.page = page;
  }

  async navigate() {
    await this.page.goto('/rules');
    await this.page.waitForLoadState('networkidle');
  }

  async waitForTableLoad() {
    await this.page.waitForSelector('.rulesTable', { timeout: 10000 });
    await this.page.waitForTimeout(500);
  }

  async clickCreateRule() {
    await this.page.click('button:has-text("Create Rule")');
    
    // Wait for modal to appear
    await this.page.waitForSelector('.ruleFormModal', { timeout: 5000 });
  }

  async fillRuleForm({ name, categoryId, field, operator, value, priority }) {
    // Fill in the form fields
    if (name) {
      await this.page.fill('input[name="name"]', name);
    }
    
    if (categoryId) {
      await this.page.selectOption('select[name="categoryId"]', categoryId);
    }
    
    if (field) {
      await this.page.selectOption('select[name="field"]', field);
    }
    
    if (operator) {
      await this.page.selectOption('select[name="operator"]', operator);
    }
    
    if (value) {
      await this.page.fill('input[name="value"]', value);
    }
    
    if (priority !== undefined) {
      await this.page.fill('input[name="priority"]', priority.toString());
    }
  }

  async saveRule() {
    // Click save button (text is "Create Rule" or "Update Rule")
    await this.page.click('.ruleFormModal button[type="submit"]');
    
    // Wait for modal to close
    await this.page.waitForSelector('.ruleFormModal', { state: 'hidden', timeout: 5000 });
    
    // Wait for table to update - wait for at least one row to appear
    await this.page.waitForLoadState('networkidle');
    await this.page.waitForTimeout(500);
  }

  async findRuleByName(name) {
    // Wait for table to have at least one row
    try {
      await this.page.waitForSelector('.rulesTable__body .rulesTable__row', { timeout: 5000 });
    } catch (e) {
      console.log('No rows found in table');
      return null;
    }
    
    // Try to find the row directly using text matching
    const row = this.page.locator('.rulesTable__body .rulesTable__row', { hasText: name });
    
    // Check if it exists
    const count = await row.count();
    if (count > 0) {
      return row.first();
    }
    
    return null;
  }

  async getRuleDetails(row) {
    // The table uses div elements with specific classes, not td elements
    const priority = await row.locator('.rulesTable__col--priority').textContent();
    const name = await row.locator('.rulesTable__col--name').textContent();
    const field = await row.locator('.rulesTable__col--field').textContent();
    const ruleCondition = await row.locator('.rulesTable__col--rule').textContent();
    const category = await row.locator('.rulesTable__col--category').textContent();
    
    // Parse operator and value from the rule condition (format: "operator \"value\"")
    const conditionMatch = ruleCondition.match(/(\w+)\s+"([^"]+)"/);
    const operator = conditionMatch ? conditionMatch[1] : '';
    const value = conditionMatch ? conditionMatch[2] : '';
    
    return {
      name: name.trim(),
      field: field.trim(),
      operator: operator.trim(),
      value: value.trim(),
      category: category.trim(),
      priority: priority.trim(),
    };
  }

  async isRuleActive(row) {
    // Check if the toggle button shows Eye (active) or EyeOff (inactive)
    const toggleBtn = row.locator('.ruleAction--toggle');
    const classList = await toggleBtn.getAttribute('class');
    
    // Check aria-label or data attribute if available
    const ariaLabel = await toggleBtn.getAttribute('aria-label');
    if (ariaLabel) {
      return ariaLabel.toLowerCase().includes('deactivate');
    }
    
    // Otherwise check if it has the active class or state
    return classList && classList.includes('active');
  }

  async toggleRuleActive(row) {
    // Click the toggle button (eye icon)
    await row.locator('.ruleAction--toggle').click();
    
    // Wait for the state to update
    await this.page.waitForTimeout(500);
  }

  async openEditModal(row) {
    // Click the edit button
    await row.locator('.ruleAction--edit').click();
    
    // Wait for modal to appear
    await this.page.waitForSelector('.ruleFormModal', { timeout: 5000 });
  }

  async deleteRule(row) {
    // Click delete button
    await row.locator('.ruleAction--delete').click();
    
    // Wait for confirmation modal
    await this.page.waitForSelector('.deleteConfirmOverlay', { timeout: 3000 });
    
    // Click confirm
    await this.page.click('.deleteConfirmModal button:has-text("Delete")');
    
    // Wait for modal to close
    await this.page.waitForSelector('.deleteConfirmOverlay', { state: 'hidden', timeout: 3000 });
    
    // Wait for table to update
    await this.page.waitForTimeout(500);
  }

  async getRulesCount() {
    const rows = await this.page.locator('.rulesTable__body .rulesTable__row').all();
    return rows.length;
  }
}

module.exports = RulesPage;
