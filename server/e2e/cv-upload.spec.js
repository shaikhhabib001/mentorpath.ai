const { test, expect } = require('@playwright/test');

test.describe('CV Upload Flow', () => {
  test('should upload CV and show analysis', async ({ page }) => {
    // Navigate to upload page
    await page.goto('http://localhost:3000/upload-cv');
    
    // Wait for page to load
    await page.waitForSelector('text=Upload Your CV for AI Analysis');
    
    // Upload file
    const fileInput = page.locator('input[type="file"]');
    await fileInput.setInputFiles('e2e/fixtures/sample-cv.pdf');
    
    // Wait for upload to complete
    await page.waitForSelector('text=CV Ready for Analysis');
    
    // Verify file details are shown
    await expect(page.locator('text=sample-cv.pdf')).toBeVisible();
    
    // Submit for analysis
    await page.click('text=Analyze CV');
    
    // Wait for analysis to complete and redirect
    await page.waitForURL('**/skill-gap');
    
    // Verify analysis page loads
    await expect(page.locator('text=Skill Gap Analysis')).toBeVisible();
    await expect(page.locator('text=Your Current Skills')).toBeVisible();
  });

  test('should show error for invalid file type', async ({ page }) => {
    await page.goto('http://localhost:3000/upload-cv');
    
    // Upload invalid file
    const fileInput = page.locator('input[type="file"]');
    await fileInput.setInputFiles('e2e/fixtures/invalid.txt');
    
    // Verify error message
    await expect(page.locator('text=Please upload a PDF or Word document')).toBeVisible();
  });
});