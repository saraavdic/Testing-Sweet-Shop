import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { CartPage } from '../pages/CartPage';

test.describe('Sweet Shop Tests', () => {

  test('TC01 - Homepage loads successfully', async ({ page }) => {
    const homePage = new HomePage(page);

    await homePage.navigate();
    await expect(page).toHaveURL(/sweetshop/);
  });

  test('TC04 - Add product to cart', async ({ page }) => {
    const homePage = new HomePage(page);
    const cartPage = new CartPage(page);

    await homePage.navigate();
    await homePage.addFirstProductToCart();

    await expect(cartPage.cartIcon).toBeVisible();
  });

  test('TC07 - Invalid quantity input', async ({ page }) => {
    const homePage = new HomePage(page);
    const cartPage = new CartPage(page);

    await homePage.navigate();
    await homePage.addFirstProductToCart();
    await cartPage.enterQuantity('-1');

    await expect(cartPage.quantityInput).toHaveValue('0');
  });

});

