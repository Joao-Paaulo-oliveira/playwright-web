const paginaCadastro = async (page) => {
  await page.goto("/");
  await page.getByRole("link", { name: "Sign up" }).click();
};

const preencherCadastro = async (page, username, password) => {
  await page.getByRole("textbox", { name: "Username:" }).click();
  await page.getByRole("textbox", { name: "Username:" }).fill(username);
  await page.getByRole("textbox", { name: "Password:" }).click();
  await page.getByRole("textbox", { name: "Password:" }).fill(password);
};

const prepararAlerta = async (page) => {
  const dialog = await page.waitForEvent("dialog");
  const mensagem = dialog.message();
  await dialog.accept();
  return mensagem;
};

const clicarBotaoSignUp = async (page) => {
  await page.getByRole("button", { name: "Sign up" }).click();
};

export { paginaCadastro, preencherCadastro, prepararAlerta, clicarBotaoSignUp };
