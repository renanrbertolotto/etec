import { useState } from "react";
import { PageHeader, Card, Field, Input, Button, ResultBox, ErrBox, fmt, wrap } from "../../components/ui";
import { calcSalario } from "../../services/api";

export default function SalarioScreen() {
  const [bruto, setBruto]     = useState("");
  const [result, setResult]   = useState(null);
  const [erro, setErro]       = useState("");
  const [loading, setLoading] = useState(false);

  async function handleCalc(e) {
    e.preventDefault();
    setErro(""); setResult(null);
    const b = parseFloat(bruto.replace(",", "."));
    if (!b || b <= 0) return setErro("Informe um salário bruto válido.");
    if (b < 1621) return setErro("Informe um salário bruto válido.");
    try {-
      setLoading(true);
      const data = await calcSalario(b);
      setResult(formatResult(data));
    } catch (e) {
      setErro(e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={wrap}>
      <PageHeader title="Cálculo de Salário" desc="Calcule o salário líquido e o custo total para o empregador." />
      <Card>
        <form data-testid="salario-form"  onSubmit={handleCalc}  style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <Field label="Salário Bruto (R$)">
            <Input
              data-testid="salario-bruto"
              type="number" step="0.01" placeholder="ex: 3500.00"
              value={bruto} onChange={e => setBruto(e.target.value)}
            />
          </Field>
          <Button data-testid="salario-submit"  loading={loading} type="submit">Calcular Salário</Button>
          <ErrBox data-testid="salario-error" msg={erro} />
          <ResultBox data={result} />
        </form>
      </Card>
    </div>
  );
}

function formatResult(data) {
  return {
    "Salário Bruto":              fmt(data.salarioBruto),
    "Desconto INSS":              fmt(data.inssEmpregado),
    "Salário Líquido":         fmt(data.salarioLiquido),
    "INSS Patronal (8%)":         fmt(data.encargosEmpregador?.inssPatronal),
    "FGTS (8%)":                  fmt(data.encargosEmpregador?.fgts),
    "Reserva Indenizatória (3,2%)": fmt(data.encargosEmpregador?.reservaIndenizatoria),
    "Seguro Acidente (0,8%)":     fmt(data.encargosEmpregador?.seguroAcidente),
    "Custo Total Empregador":  fmt(data.encargosEmpregador?.custoTotalEmpregador),
  };
}
