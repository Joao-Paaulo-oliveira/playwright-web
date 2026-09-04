import { test, expect } from "@playwright/test";
import dadosCadastro from "../data/cadastro-cases.json" with { type: "json" };
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

const dados = substituirVariaveisAmbiente(dadosCadastro);
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
  const alerta = prepararAlerta(page);
  await clicarBotaoSignUp(page);
  expect(await alerta).toBe("This user already exist.");
});

test("Não deve cadastrar sem username", async ({ page }) => {
  await paginaCadastro(page);
  await preencherCadastro(
    page,
    camposVazios.username,
    cadastroUsernameExistente.password,
  );
  const alerta = prepararAlerta(page);
  await clicarBotaoSignUp(page);
  expect(await alerta).toBe("Please fill out Username and Password.");
});

test("Não deve cadastrar sem password", async ({ page }) => {
  await paginaCadastro(page);
  await preencherCadastro(
    page,
    cadastroUsernameExistente.username,
    camposVazios.password,
  );
  const alerta = prepararAlerta(page);
  await clicarBotaoSignUp(page);
  expect(await alerta).toBe("Please fill out Username and Password.");
});
