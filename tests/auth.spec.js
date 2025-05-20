import { test, expect } from "@playwright/test";
import { email, password } from "../user.js";

test("Успешная авторизация", async ({ page }) => {
  await page.goto("https://netology.ru");
  await page.click("text=Войти");

  const emailInput = page.locator('input[name="email"]');
  const passwordInput = page.locator('input[name="password"]');

  await expect(emailInput).toBeVisible();
  await emailInput.fill(email);

  await expect(passwordInput).toBeVisible();
  await passwordInput.fill(password);

  await page.fill('input[type="email"]', email);
  await page.fill('input[type="password"]', password);
  await page.click('button:has-text("ОК")');
  await page.click('button:has-text("Войти")');

  await expect(page.locator("h2", { hasText: "Моё обучение" })).toBeVisible({
    timeout: 10000,
  });
});

test("Неуспешная авторизация", async ({ page }) => {
  await page.goto("https://netology.ru");
  await page.click("text=Войти");

  const emailInput = page.locator('input[name="email"]');
  const passwordInput = page.locator('input[name="password"]');

  await expect(emailInput).toBeVisible();
  await emailInput.fill(email);

  await expect(passwordInput).toBeVisible();
  await passwordInput.fill(password);

  await page.fill('input[type="email"]', "wrong@example.com");
  await page.fill('input[type="password"]', "wrongpassword");
  await page.click('button:has-text("ОК")');
  await page.click('button:has-text("Войти")');

  const error = page.locator('[data-testid="login-error-hint"]');

  await expect(error).toContainText("Вы ввели неправильно логин или пароль.");
});
