/**
 * Page Object for the Import page
 */
class ImportPage {
  constructor(page) {
    this.page = page;
  }

  async navigate() {
    await this.page.goto('/import');
    await this.page.waitForLoadState('networkidle');
  }

  async uploadFile(filePath) {
    // Use file input to upload
    const fileInput = this.page.locator('#file-input');
    await fileInput.setInputFiles(filePath);
    
    // Wait for parsing to complete
    await this.page.waitForTimeout(500);
  }

  async waitForMapping() {
    // Wait for mapping step to appear
    await this.page.waitForSelector('.import-mapping', { timeout: 10000 });
  }

  async getMappedColumn(field) {
    const select = this.page.locator(`select[value="${field}"]`).first();
    return await select.inputValue();
  }

  async mapColumn(field, columnName) {
    // Find the select for the specific field
    const selects = await this.page.locator('.mapping-field select').all();
    
    for (const select of selects) {
      const label = await select.locator('xpath=ancestor::div[contains(@class, "mapping-field")]//label').textContent();
      if (label.toLowerCase().includes(field.toLowerCase())) {
        await select.selectOption(columnName);
        break;
      }
    }
  }

  async clickValidateAndContinue() {
    await this.page.click('button:has-text("Validate & Continue")');
  }

  async waitForValidation() {
    // Wait for validation step with summary cards
    await this.page.waitForSelector('.validation-summary', { timeout: 10000 });
  }

  async getValidTransactionsCount() {
    const countText = await this.page.locator('.summary-card.success .summary-number').textContent();
    return parseInt(countText, 10);
  }

  async getValidationErrorsCount() {
    const countText = await this.page.locator('.summary-card.error .summary-number').textContent();
    return parseInt(countText, 10);
  }

  async clickImport() {
    await this.page.click('button:has-text("Import")');
  }

  async waitForImportComplete() {
    // Wait for the complete step
    await this.page.waitForSelector('.import-complete', { timeout: 30000 });
  }

  async getImportedCount() {
    const summaryValue = await this.page.locator('.summary-item:has-text("Imported:") .summary-value').textContent();
    return parseInt(summaryValue, 10);
  }

  async clickViewTransactions() {
    await this.page.click('button:has-text("View Transactions")');
  }
}

module.exports = ImportPage;
