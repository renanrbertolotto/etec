import { useState } from "react";
import { PageHeader, Card, Field, Input, Button, ResultBox, ErrBox, fmt, wrap } from "../../components/ui";
import { calcDecimo } from "../../services/api";

export default function DecimoScreen() {
  const [bruto, setBruto]     = useState("");
  const [meses, setMeses]     = useState("12");
  const [result, setResult]   = useState(null);
  const [erro, setErro]       = useState("");
  const [loading, setLoading] = useState(false);

  async function handleCalc(e) {
    e.preventDefault();
    setErro(""); setResult(null);
    const b = parseFloat(bruto.replace(",", "."));
    const m = parseInt(meses);
    if (!b || b <= 0) return setErro("Informe um salário bruto válido.");
    if (!m || m < 1 || m > 12) return setErro("Meses trabalhados deve ser entre 1 e 12.");
    try {
      setLoading(true);
      const data = await calcDecimo(b, m);
      setResult(formatResult(data));
    } catch (e) {
      setErro(e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={wrap}>
      <PageHeader title="13° Salário" desc="Calcule o valor do décimo terceiro salário proporcional ou integral." />
      <Card>
        <form onSubmit={handleCalc} style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <Field label="Salário Bruto (R$)">
              <Input
                type="number" step="0.01" min="0" placeholder="ex: 3500.00"
                value={bruto} onChange={e => setBruto(e.target.value)}
              />
            </Field>
            <Field label="Meses Trabalhados">
              <Input
                type="number" min="1" max="12" placeholder="1 – 12"
                value={meses} onChange={e => setMeses(e.target.value)}
              />
            </Field>
          </div>

          <div style={infoBox}>
            São considerados meses completos com ao menos 15 dias trabalhados.
          </div>

          <Button loading={loading} type="submit">Calcular 13°</Button>
          <ErrBox msg={erro} />
          <ResultBox data={result} />
        </form>
      </Card>
    </div>
  );
}

function formatResult(data) {
  return {
    "Salário Bruto":      fmt(data.salarioBruto),
    "Meses Trabalhados":  data.mesesTrabalhados,
    "Total Bruto":        fmt(data.totalBruto),
    "1ª Parcela":         fmt(data.primeiraParcela),
    "Desconto INSS":      fmt(data.inssEmpregado),
    "2ª Parcela":      fmt(data.segundaParcela),
    "Observação":         data.observacao,
  };
}

const infoBox = {
  background: "#F0FDF4", border: "1px solid #BBF7D0",
  borderRadius: 10, padding: "10px 14px",
  fontSize: ".82rem", color: "#15803D",
};