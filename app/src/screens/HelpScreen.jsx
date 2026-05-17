import { PageHeader, wrap } from "../components/ui";

const TOPICOS = [
  {
    titulo: "Cálculo de Salário",
    desc: "Calcula o salário líquido a partir do salário bruto, aplicando os descontos de INSS e IRRF conforme tabelas vigentes.",
    passos: [
      "Informe o salário bruto mensal.",
      "Informe o número de dependentes (para dedução do IRRF).",
      "Clique em Calcular Salário.",
    ],
  },
  {
    titulo: "13° Salário",
    desc: "Calcula o valor do décimo terceiro salário integral ou proporcional ao número de meses trabalhados.",
    passos: [
      "Informe o salário bruto mensal.",
      "Informe os meses trabalhados no ano (1 a 12).",
      "Clique em Calcular 13°.",
    ],
  },
  {
    titulo: "Férias",
    desc: "Calcula o valor bruto e líquido das férias, incluindo o adicional de 1/3 constitucional.",
    passos: [
      "Informe o salário bruto mensal.",
      "Selecione a quantidade de dias de férias.",
      "Clique em Calcular Férias.",
    ],
  },
  {
    titulo: "Rescisão Contratual",
    desc: "Calcula as verbas rescisórias conforme o tipo de demissão: sem justa causa, com justa causa, pedido de demissão ou acordo mútuo.",
    passos: [
      "Informe o salário bruto e os meses trabalhados.",
      "Selecione o tipo de rescisão e a situação do aviso prévio.",
      "Clique em Calcular Rescisão.",
    ],
  },
];

export default function HelpScreen() {
  return (
    <div style={wrap}>
      <PageHeader title="Central de Ajuda" desc="Tire suas dúvidas sobre como usar o Sistema." />

      <h2 style={sectionTitle}>Como usar cada calculadora</h2>
      <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 32 }}>
        {TOPICOS.map(t => (
          <div key={t.titulo} style={card}>
            <div style={cardHead}>
              <span style={{ fontSize: 22 }}>{t.icon}</span>
              <div>
                <p style={cardTitle}>{t.titulo}</p>
                <p style={cardDesc}>{t.desc}</p>
              </div>
            </div>
            <ol style={list}>
              {t.passos.map((p, i) => <li key={i} style={listItem}>{p}</li>)}
            </ol>
          </div>
        ))}
      </div>
    </div>
  );
}

const sectionTitle = {
  fontSize: "1rem", fontWeight: 700, color: "var(--text)",
  marginBottom: 14, paddingBottom: 8,
  borderBottom: "2px solid var(--border)",
};
const card = {
  background: "#fff", border: "1px solid var(--border)",
  borderRadius: 14, padding: "20px 20px",
  boxShadow: "var(--shadow)",
};
const cardHead = { display: "flex", gap: 14, alignItems: "flex-start", marginBottom: 12 };
const cardTitle = { fontWeight: 700, fontSize: ".92rem", marginBottom: 3 };
const cardDesc = { fontSize: ".82rem", color: "var(--muted)", lineHeight: 1.5 };
const list = { paddingLeft: 20, display: "flex", flexDirection: "column", gap: 5 };
const listItem = { fontSize: ".83rem", color: "var(--muted)", lineHeight: 1.5 };
const faqCard = {
  background: "#fff", border: "1px solid var(--border)",
  borderRadius: 12, padding: "16px 18px",
  boxShadow: "var(--shadow)",
};
const faqQ = { fontWeight: 600, fontSize: ".88rem", marginBottom: 6 };
const faqA = { fontSize: ".83rem", color: "var(--muted)", lineHeight: 1.6 };