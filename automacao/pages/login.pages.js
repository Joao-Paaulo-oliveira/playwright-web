import { expect } from "@playwright/test";

const abrirModalLogin = async (page) => {
  await page.goto("/");
  await page.getByRole("link", { name: "Log in" }).click();
  await expect(page.getByRole("heading", { name: "Log in" })).toBeVisible();
};

const preencherFormularioLogin = async (page, username, password) => {
  await page.locator("#loginusername").fill(username);
  await page.locator("#loginpassword").fill(password);
};

const clicarBotaoLogin = async (page) => {
  await page.getByRole("button", { name: "Log in" }).click();
};

const obterCampoBoasVindas = (page) => page.locator("#nameofuser");

const capturarMensagemAlerta = async (page) => {
  const dialog = await page.waitForEvent("dialog");
  const mensagem = dialog.message();
  await dialog.accept();
  return mensagem;
};

export {
  abrirModalLogin,
  preencherFormularioLogin,
  clicarBotaoLogin,
  obterCampoBoasVindas,
  capturarMensagemAlerta,
};
