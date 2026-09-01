import { expect } from "@playwright/test";

const paginaLogin = async (page) => {
  await page.goto("https://www.demoblaze.com/index.html");
  await page.getByRole("link", { name: "Log in" }).click();
  await expect(page.getByRole("heading", { name: "Log in" })).toBeVisible();
};

const preencherLogin = async (page, username, password) => {
  await page.locator("#loginusername").fill(username);
  await page.locator("#loginpassword").fill(password);
};

const botaoLogin = async (page) => {
  await page.locator('button[onclick="logIn()"]').click();
};

const validarCampoWelcome = async (page, usernameEsperado) => {
  await expect(page.locator("#nameofuser")).toContainText(usernameEsperado);
};

const validarAlerta = async (page, mensagemEsperada) => {
  const dialog = await page.waitForEvent("dialog");
  expect(dialog.message()).toBe(mensagemEsperada);
  await dialog.accept();
};

export {
  paginaLogin,
  preencherLogin,
  botaoLogin,
  validarCampoWelcome,
  validarAlerta,
};
