/**
 * Utilitário para substituir variáveis de ambiente nos dados de teste
 * Exemplo: "${USUARIO_TESTE}" é substituído por process.env.USUARIO_TESTE
 */

export function substituirVariaveisAmbiente(objeto) {
  if (typeof objeto === "string") {
    // Substitui ${VAR_NAME} por process.env.VAR_NAME
    return objeto.replace(/\$\{([^}]+)\}/g, (_match, varName) => {
      const valor = process.env[varName];
      if (!valor) {
        throw new Error(`Variável de ambiente obrigatória ausente: ${varName}`);
      }
      return valor;
    });
  }

  if (Array.isArray(objeto)) {
    return objeto.map((item) => substituirVariaveisAmbiente(item));
  }

  if (typeof objeto === "object" && objeto !== null) {
    const novoObjeto = {};
    for (const [chave, valor] of Object.entries(objeto)) {
      novoObjeto[chave] = substituirVariaveisAmbiente(valor);
    }
    return novoObjeto;
  }

  return objeto;
}

export function obterCasoPorTipo(casos, tipo) {
  const caso = casos.find((item) => item.type === tipo);

  if (!caso) {
    throw new Error(`Caso de teste não encontrado: ${tipo}`);
  }

  return caso;
}
