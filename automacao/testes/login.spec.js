import { test, expect } from "@playwright/test";
import dadosLogin from "../data/login-cases.json" with { type: "json" };
import {
  obterCasoPorTipo,
  substituirVariaveisAmbiente,
} from "../utils/test-data.js";
import {
  abrirModalLogin,
  preencherFormularioLogin,
  clicarBotaoLogin,
  obterCampoBoasVindas,
  capturarMensagemAlerta,
} from "../pages/login.pages.js";

// Substitui variáveis de ambiente nos dados de teste
const dados = substituirVariaveisAmbiente(dadosLogin);
const loginValido = obterCasoPorTipo(dados.cases, "valido");
const senhaIncorreta = obterCasoPorTipo(dados.cases, "senha_incorreta");
const usuarioInexistente = obterCasoPorTipo(
  dados.cases,
  "usuario_inexistente",
);

test.describe("Login", () => {
  test("[LOGIN-01] Login com Sucesso", async ({ page }) => {
    const usuario = loginValido.username;
    const senha = loginValido.password;

    await abrirModalLogin(page);
    await preencherFormularioLogin(page, usuario, senha);
    await clicarBotaoLogin(page);
    await expect(obterCampoBoasVindas(page)).toContainText(usuario);
  });

  test("[LOGIN-05] Login com senha incorreta", async ({ page }) => {
    await abrirModalLogin(page);
    await preencherFormularioLogin(
      page,
      senhaIncorreta.username,
      senhaIncorreta.password,
    );
    const alerta = capturarMensagemAlerta(page);
    await clicarBotaoLogin(page);
    expect(await alerta).toBe("Wrong password.");
  });

  test("[LOGIN-02] Login sem username", async ({ page }) => {
    await abrirModalLogin(page);
    await preencherFormularioLogin(page, "", loginValido.password);
    const alerta = capturarMensagemAlerta(page);
    await clicarBotaoLogin(page);
    expect(await alerta).toBe("Please fill out Username and Password.");
  });

  test("[LOGIN-03] Login sem senha", async ({ page }) => {
    await abrirModalLogin(page);
    await preencherFormularioLogin(page, loginValido.username, "");
    const alerta = capturarMensagemAlerta(page);
    await clicarBotaoLogin(page);
    expect(await alerta).toBe("Please fill out Username and Password.");
  });

  test("[LOGIN-04] Usuario sem cadastro", async ({ page }) => {
    await abrirModalLogin(page);
    await preencherFormularioLogin(
      page,
      usuarioInexistente.username,
      usuarioInexistente.password,
    );
    const alerta = capturarMensagemAlerta(page);
    await clicarBotaoLogin(page);
    expect(await alerta).toBe("User does not exist.");
  });
});
