import { test, expect } from "@playwright/test";
import dadosCadastro from "../data/cadastro-cases.json" with { type: "json" };
import {
  obterCasoPorTipo,
  substituirVariaveisAmbiente,
} from "../utils/test-data.js";
import {
  abrirModalCadastro,
  preencherFormularioCadastro,
  capturarMensagemAlerta,
  clicarBotaoCadastro,
} from "../pages/cadastro.pages.js";

const dados = substituirVariaveisAmbiente(dadosCadastro);
const camposVazios = obterCasoPorTipo(dados.cases, "campos_vazios");
const cadastroUsernameExistente = obterCasoPorTipo(
  dados.cases,
  "cadastro_username_existente",
);

test.describe("Cadastro", () => {
  test("[CAD-01] Cadastro usuário existente", async ({ page }) => {
    await abrirModalCadastro(page);
    await preencherFormularioCadastro(
      page,
      cadastroUsernameExistente.username,
      cadastroUsernameExistente.password,
    );
    const alerta = capturarMensagemAlerta(page);
    await clicarBotaoCadastro(page);
    expect(await alerta).toBe("This user already exist.");
  });

  test("[CAD-02] Não deve cadastrar sem username", async ({ page }) => {
    await abrirModalCadastro(page);
    await preencherFormularioCadastro(
      page,
      camposVazios.username,
      cadastroUsernameExistente.password,
    );
    const alerta = capturarMensagemAlerta(page);
    await clicarBotaoCadastro(page);
    expect(await alerta).toBe("Please fill out Username and Password.");
  });

  test("[CAD-03] Não deve cadastrar sem password", async ({ page }) => {
    await abrirModalCadastro(page);
    await preencherFormularioCadastro(
      page,
      cadastroUsernameExistente.username,
      camposVazios.password,
    );
    const alerta = capturarMensagemAlerta(page);
    await clicarBotaoCadastro(page);
    expect(await alerta).toBe("Please fill out Username and Password.");
  });
});
