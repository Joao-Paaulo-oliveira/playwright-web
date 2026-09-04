import { test, expect } from "@playwright/test";
import dadosLogin from "../data/login-cases.json" with { type: "json" };
import { substituirVariaveisAmbiente } from "../utils/test-data.js";
import {
  paginaLogin,
  preencherLogin,
  botaoLogin,
  validarCampoWelcome,
  validarAlerta,
} from "../pages/login.pages.js";

// Substitui variáveis de ambiente nos dados de teste
const dados = substituirVariaveisAmbiente(dadosLogin);

test("Login com Sucesso", async ({ page }) => {
  const usuario = dados.cases[0].username;
  const senha = dados.cases[0].password;

  await paginaLogin(page);
  await preencherLogin(page, usuario, senha);
  await botaoLogin(page);
  await validarCampoWelcome(page, usuario);
});

test("Login com senha incorreta", async ({ page }) => {
  await paginaLogin(page);
  await preencherLogin(page, dados.cases[1].username, dados.cases[1].password);
  const alerta = validarAlerta(page, "Wrong password.");
  await botaoLogin(page);
  await alerta;
});

test("Login sem username", async ({ page }) => {
  await paginaLogin(page);
  await preencherLogin(page, "", dados.cases[0].password);
  const alerta = validarAlerta(page, "Please fill out Username and Password.");
  await botaoLogin(page);
  await alerta;
});

test("Login sem senha", async ({ page }) => {
  await paginaLogin(page);
  await preencherLogin(page, dados.cases[0].username, "");
  const alerta = validarAlerta(page, "Please fill out Username and Password.");
  await botaoLogin(page);
  await alerta;
});

test("Usuario sem cadastro", async ({ page }) => {
  await paginaLogin(page);
  await preencherLogin(page, dados.cases[2].username, dados.cases[2].password);
  const alerta = validarAlerta(page, "User does not exist.");
  await botaoLogin(page);
  await alerta;
});
