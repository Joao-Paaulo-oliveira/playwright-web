import { expect } from "@playwright/test";

const paginaCadastro = async (page) => {
  await page.goto("https://www.demoblaze.com/index.html");
  await page.getByRole("link", { name: "Sign up" }).click();
};

const preencherCadastro = async (page, username, password) => {
  await page.getByRole("textbox", { name: "Username:" }).click();
  await page.getByRole("textbox", { name: "Username:" }).fill(username);
  await page.getByRole("textbox", { name: "Password:" }).click();
  await page.getByRole("textbox", { name: "Password:" }).fill(password);
};

const prepararAlerta = async (page, mensagemEsperada) => {
  const dialog = await page.waitForEvent("dialog");

  expect(dialog.message()).toBe(mensagemEsperada);

  await dialog.accept();
};

const clicarBotaoSignUp = async (page) => {
  await page.getByRole("button", { name: "Sign up" }).click();
};

export { paginaCadastro, preencherCadastro, prepararAlerta, clicarBotaoSignUp };
