import { test, expect } from "@playwright/test";
import dadosLogin from "../data/login-cases.json" with { type: "json" };
import { substituirVariaveisAmbiente } from "../utils/test-data.js";
import {
  paginaCadastro,
  preencherCadastro,
  prepararAlerta,
  clicarBotaoSignUp,
} from "../pages/cadastro.pages.js";

const dados = substituirVariaveisAmbiente(dadosLogin);

test("Cadastro usuário existente", async ({ page }) => {
  await paginaCadastro(page);
  await preencherCadastro(
    page,
    dados.cases[4].username,
    dados.cases[4].password,
  );
  const alerta = prepararAlerta(page, "This user already exist.");
  await clicarBotaoSignUp(page);
  await alerta;
});

test("Não deve cadastrar sem username", async ({ page }) => {
  await paginaCadastro(page);
  await preencherCadastro(
    page,
    dados.cases[3].username,
    dados.cases[4].password,
  );
  const alerta = prepararAlerta(page, "Please fill out Username and Password.");
  await clicarBotaoSignUp(page);
  await alerta;
});

test("Não deve cadastrar sem password", async ({ page }) => {
  await paginaCadastro(page);
  await preencherCadastro(
    page,
    dados.cases[4].username,
    dados.cases[3].password,
  );
  const alerta = prepararAlerta(page, "Please fill out Username and Password.");
  await clicarBotaoSignUp(page);
  await alerta;
});
