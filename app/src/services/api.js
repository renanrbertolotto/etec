// ============================================================
// Camada de serviço — consome a API Node em localhost:3000
// ============================================================

const BASE = "http://localhost:3000";

async function post(route, body) {
  const res = await fetch(`${BASE}/${route}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || `Erro ${res.status}`);
  }
  return res.json();
}

export const calcSalario = (salarioBruto) =>
  post("ETEC/salario", { salarioBruto });

export const calcDecimo = (salarioBruto, mesesTrabalhados) =>
  post("ETEC/decimo-terceiro", { salarioBruto, mesesTrabalhados });

export const calcFerias = (salarioBruto, diasConcedidos) =>
  post("ETEC/ferias", { salarioBruto, diasConcedidos });

export const calcRecisao = (salarioBruto, dataAdmissao, dataRescisao, tipoRescisao, diasTrabalhados) =>
  post("ETEC/rescisao", { salarioBruto, dataAdmissao, dataRescisao, tipoRescisao, diasTrabalhados });