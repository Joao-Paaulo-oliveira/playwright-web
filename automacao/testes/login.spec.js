import { test, expect } from "@playwright/test";
import dadosLogin from "../data/login-cases.json" with { type: "json" };
import {
  obterCasoPorTipo,
  substituirVariaveisAmbiente,
} from "../utils/test-data.js";
import {
  paginaLogin,
  preencherLogin,
  botaoLogin,
  validarCampoWelcome,
  validarAlerta,
} from "../pages/login.pages.js";

// Substitui variáveis de ambiente nos dados de teste
const dados = substituirVariaveisAmbiente(dadosLogin);
const loginValido = obterCasoPorTipo(dados.cases, "valido");
const senhaIncorreta = obterCasoPorTipo(dados.cases, "senha_incorreta");
const usuarioInexistente = obterCasoPorTipo(
  dados.cases,
  "usuario_inexistente",
);

test("Login com Sucesso", async ({ page }) => {
  const usuario = loginValido.username;
  const senha = loginValido.password;

  await paginaLogin(page);
  await preencherLogin(page, usuario, senha);
  await botaoLogin(page);
  await validarCampoWelcome(page, usuario);
});

test("Login com senha incorreta", async ({ page }) => {
  await paginaLogin(page);
  await preencherLogin(page, senhaIncorreta.username, senhaIncorreta.password);
  const alerta = validarAlerta(page, "Wrong password.");
  await botaoLogin(page);
  await alerta;
});

test("Login sem username", async ({ page }) => {
  await paginaLogin(page);
  await preencherLogin(page, "", loginValido.password);
  const alerta = validarAlerta(page, "Please fill out Username and Password.");
  await botaoLogin(page);
  await alerta;
});

test("Login sem senha", async ({ page }) => {
  await paginaLogin(page);
  await preencherLogin(page, loginValido.username, "");
  const alerta = validarAlerta(page, "Please fill out Username and Password.");
  await botaoLogin(page);
  await alerta;
});

test("Usuario sem cadastro", async ({ page }) => {
  await paginaLogin(page);
  await preencherLogin(
    page,
    usuarioInexistente.username,
    usuarioInexistente.password,
  );
  const alerta = validarAlerta(page, "User does not exist.");
  await botaoLogin(page);
  await alerta;
});
