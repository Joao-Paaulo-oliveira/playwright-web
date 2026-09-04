import { expect } from "@playwright/test";

const abrirModalCadastro = async (page) => {
  await page.goto("/");
  await page.getByRole("link", { name: "Sign up" }).click();
  await expect(page.getByRole("heading", { name: "Sign up" })).toBeVisible();
};

const preencherFormularioCadastro = async (page, username, password) => {
  await page.getByRole("textbox", { name: "Username:" }).click();
  await page.getByRole("textbox", { name: "Username:" }).fill(username);
  await page.getByRole("textbox", { name: "Password:" }).click();
  await page.getByRole("textbox", { name: "Password:" }).fill(password);
};

const capturarMensagemAlerta = async (page) => {
  const dialog = await page.waitForEvent("dialog");
  const mensagem = dialog.message();
  await dialog.accept();
  return mensagem;
};

const clicarBotaoCadastro = async (page) => {
  await page.getByRole("button", { name: "Sign up" }).click();
};

export {
  abrirModalCadastro,
  preencherFormularioCadastro,
  capturarMensagemAlerta,
  clicarBotaoCadastro,
};
