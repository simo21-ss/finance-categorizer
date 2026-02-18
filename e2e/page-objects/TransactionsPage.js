/**
 * Page Object for the Transactions page
 */
class TransactionsPage {
  constructor(page) {
    this.page = page;
  }

  async navigate() {
    await this.page.goto('/transactions');
    await this.page.waitForLoadState('networkidle');
  }

  async waitForTableLoad() {
    await this.page.waitForSelector('.transactions-table', { timeout: 10000 });
    // Wait a bit for data to load
    await this.page.waitForTimeout(1000);
  }

  async getTransactionRows() {
    return await this.page.locator('.transactions-table tbody tr').all();
  }

  async findTransactionByDescription(description) {
    // Find row containing the description
    const rows = await this.page.locator('.transactions-table tbody tr').all();
    
    for (const row of rows) {
      const descText = await row.locator('td').nth(3).textContent(); // Description column
      if (descText && descText.includes(description)) {
        return row;
      }
    }
    return null;
  }

  async openEditModal(row) {
    // Click the edit button (pencil icon)
    await row.locator('button.btn-icon:has(svg)').first().click();
    
    // Wait for modal to appear
    await this.page.waitForSelector('.editModalOverlay', { timeout: 5000 });
  }

  async getCategoryInRow(row) {
    const categoryBadge = row.locator('.category-badge');
    if (await categoryBadge.count() > 0) {
      return await categoryBadge.textContent();
    }
    return null;
  }

  async selectFirstCategory() {
    // Find the category dropdown in the modal (nested inside label with "Category" text)
    const categorySelect = this.page.locator('.editModal__field:has-text("Category") select');
    
    // Wait for select to be visible and interactive
    await categorySelect.waitFor({ state: 'visible', timeout: 5000 });
    
    // Select the first actual category (index 1, since 0 is "Uncategorized")
    await categorySelect.selectOption({ index: 1 });
    
    // Wait a bit for the value to be set
    await this.page.waitForTimeout(300);
  }

  async saveTransaction() {
    // Click the save button in modal
    await this.page.click('.editModal button:has-text("Save")');
    
    // Wait for modal to close
    await this.page.waitForSelector('.editModalOverlay', { state: 'hidden', timeout: 5000 });
    
    // Wait for update to complete
    await this.page.waitForTimeout(500);
  }

  async getTransactionCount() {
    const rows = await this.getTransactionRows();
    return rows.length;
  }

  async waitForCategoryUpdate(row, expectedCategory) {
    // Wait for the category badge to update
    await row.locator(`.category-badge:has-text("${expectedCategory}")`).waitFor({ timeout: 5000 });
  }
}

module.exports = TransactionsPage;
