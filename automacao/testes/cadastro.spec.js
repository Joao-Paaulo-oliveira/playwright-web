import { test, expect } from "@playwright/test";
import dadosLogin from "../data/login-cases.json" with { type: "json" };
import {
  obterCasoPorTipo,
  substituirVariaveisAmbiente,
} from "../utils/test-data.js";
import {
  paginaCadastro,
  preencherCadastro,
  prepararAlerta,
  clicarBotaoSignUp,
} from "../pages/cadastro.pages.js";

const dados = substituirVariaveisAmbiente(dadosLogin);
const camposVazios = obterCasoPorTipo(dados.cases, "campos_vazios");
const cadastroUsernameExistente = obterCasoPorTipo(
  dados.cases,
  "cadastro_username_existente",
);

test("Cadastro usuário existente", async ({ page }) => {
  await paginaCadastro(page);
  await preencherCadastro(
    page,
    cadastroUsernameExistente.username,
    cadastroUsernameExistente.password,
  );
  const alerta = prepararAlerta(page, "This user already exist.");
  await clicarBotaoSignUp(page);
  await alerta;
});

test("Não deve cadastrar sem username", async ({ page }) => {
  await paginaCadastro(page);
  await preencherCadastro(
    page,
    camposVazios.username,
    cadastroUsernameExistente.password,
  );
  const alerta = prepararAlerta(page, "Please fill out Username and Password.");
  await clicarBotaoSignUp(page);
  await alerta;
});

test("Não deve cadastrar sem password", async ({ page }) => {
  await paginaCadastro(page);
  await preencherCadastro(
    page,
    cadastroUsernameExistente.username,
    camposVazios.password,
  );
  const alerta = prepararAlerta(page, "Please fill out Username and Password.");
  await clicarBotaoSignUp(page);
  await alerta;
});
