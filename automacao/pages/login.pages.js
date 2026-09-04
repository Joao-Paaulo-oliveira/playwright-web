import { expect } from "@playwright/test";

const paginaLogin = async (page) => {
  await page.goto("/");
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

const campoWelcome = (page) => page.locator("#nameofuser");

const capturarMensagemAlerta = async (page) => {
  const dialog = await page.waitForEvent("dialog");
  const mensagem = dialog.message();
  await dialog.accept();
  return mensagem;
};

export {
  paginaLogin,
  preencherLogin,
  botaoLogin,
  campoWelcome,
  capturarMensagemAlerta,
};
