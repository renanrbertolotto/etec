import { useState } from "react";
import { PageHeader, Card, Field, Input, Select, Button, ResultBox, ErrBox, fmt, wrap } from "../../components/ui";
import { calcFerias } from "../../services/api";

export default function FeriasScreen() {
  const [bruto, setBruto]     = useState("");
  const [dias, setDias]       = useState("30");
  const [result, setResult]   = useState(null);
  const [erro, setErro]       = useState("");
  const [loading, setLoading] = useState(false);

  async function handleCalc(e) {
    e.preventDefault();
    setErro(""); setResult(null);
    const b = parseFloat(bruto.replace(",", "."));
    if (!b || b <= 0) return setErro("Informe um salário bruto válido.");
    const d = parseInt(dias);
    try {
      setLoading(true);
      const data = await calcFerias(b, d);
      setResult(formatResult(data));
    } catch (e) {
      setErro(e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={wrap}>
      <PageHeader title="Cálculo de Férias" desc="Calcule o valor das férias com abono de 1/3 e descontos legais." />
      <Card>
        <form data-testid="ferias-form" onSubmit={handleCalc} style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <Field label="Salário Bruto (R$)">
              <Input
                data-testid="salario-bruto" 
                type="number" step="0.01" min="1621.00" placeholder="ex: 3500.00"
                value={bruto} onChange={e => setBruto(e.target.value)}
              />
            </Field>
            <Field label="Dias de Férias">
              <Input data-testid="dias-de-ferias" type="number" min="10" max="30" placeholder="ex: 30"
                value={dias}  onChange={e => setDias(e.target.value)} />
            </Field>
          </div>

          <div style={infoBox}>
            O valor inclui automaticamente o adicional de 1/3 constitucional.
          </div>

          <Button data-testid="ferias-submit" loading={loading} type="submit">Calcular Férias</Button>
          <ErrBox data-testid="ferias-error" msg={erro} />
          <ResultBox data-testid="ferias-result" data={result} />
        </form>
      </Card>
    </div>
  );
}

function formatResult(data) {
  return {
    "Salário Bruto":       fmt(data.salarioBruto),
    "Dias Concedidos":     data.diasConcedidos,
    "Valor das Férias":    fmt(data.valorFerias),
    "Adicional 1/3":       fmt(data.umTercoConstitucional),
    "Total Bruto":         fmt(data.totalBruto),
    "Desconto INSS":       fmt(data.inssEmpregado),
    "Total Líquido":    fmt(data.totalLiquido),
    "Observação":          data.observacao,
  };
}

const infoBox = {
  background: "#FFFBEB", border: "1px solid #FDE68A",
  borderRadius: 10, padding: "10px 14px",
  fontSize: ".82rem", color: "#92400E",
};
