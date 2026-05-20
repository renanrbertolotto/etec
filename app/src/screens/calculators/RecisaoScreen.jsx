import { useState } from "react";
import { PageHeader, Card, Field, Input, Select, Button, ResultBox, ErrBox, fmt, wrap } from "../../components/ui";
import { calcRecisao } from "../../services/api";

export default function RecisaoScreen() {
  const [bruto, setBruto]         = useState("");
  const [admissao, setAdmissao]   = useState("");
  const [rescisao, setRescisao]   = useState("");
  const [dias, setDias]           = useState("30");
  const [tipo, setTipo]           = useState("semJustaCausa");
  const [result, setResult]       = useState(null);
  const [erro, setErro]           = useState("");
  const [loading, setLoading]     = useState(false);

  async function handleCalc(e) {
    e.preventDefault();
    setErro(""); setResult(null);
    const b = parseFloat(bruto.replace(",", "."));
    if (!b || b <= 0)  return setErro("Informe um salário bruto válido.");
    if (!admissao)     return setErro("Informe a data de admissão.");
    if (!rescisao)     return setErro("Informe a data de rescisão.");
    try {
      setLoading(true);
      const data = await calcRecisao(b, admissao, rescisao, tipo, parseInt(dias));
      setResult(formatResult(data));
    } catch (e) {
      setErro(e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={wrap}>
      <PageHeader title="Rescisão Contratual" desc="Calcule as verbas rescisórias conforme a CLT." />
      <Card>
        <form onSubmit={handleCalc} style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <Field label="Salário Bruto (R$)">
              <Input type="number" step="0.01" placeholder="ex: 3500.00"
                value={bruto} onChange={e => setBruto(e.target.value)} />
            </Field>
            <Field label="Dias Trabalhados no Mês">
              <Input type="number" min="1" max="31" placeholder="ex: 30"
                value={dias} onChange={e => setDias(e.target.value)} />
            </Field>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <Field label="Data de Admissão">
              <Input type="date" value={admissao} onChange={e => setAdmissao(e.target.value)} />
            </Field>
            <Field label="Data de Rescisão">
              <Input type="date" value={rescisao} onChange={e => setRescisao(e.target.value)} />
            </Field>
          </div>

          <Field label="Tipo de Rescisão">
            <Select value={tipo} onChange={e => setTipo(e.target.value)}>
              <option value="semJustaCausa">Demissão sem justa causa</option>
              <option value="comJustaCausa">Demissão com justa causa</option>
              <option value="pedidoDemissao">Pedido de demissão</option>
              <option value="acordoComum">Acordo mútuo (§6° CLT)</option>
            </Select>
          </Field>

          <Button loading={loading} type="submit">Calcular Rescisão</Button>
          <ErrBox msg={erro} />
          <ResultBox data={result} />
        </form>
      </Card>
    </div>
  );
}

function formatResult(data) {
  const out = {
    "Salário Bruto":          fmt(data.salarioBruto),
    "Anos Completos":         data.anosCompletos,
    "Saldo de Salário":       fmt(data.saldoSalario),
    "Férias Proporcionais":   fmt(data.feriasProporcionais),
    "13° Proporcional":       fmt(data.decimoTerceiro),
    "Desconto INSS":          fmt(data.descontos?.inss),
    "Total Bruto":            fmt(data.totalBruto),
    "Total Líquido":       fmt(data.totalLiquido),
  };
  if (data.avisoPrevioIndenizado)
    out["Aviso Prévio Indenizado"] = fmt(data.avisoPrevioIndenizado);
  if (data.observacaoFGTS)
    out["FGTS"] = data.observacaoFGTS;
  return out;
}