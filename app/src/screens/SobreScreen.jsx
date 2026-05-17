import { wrap } from "../components/ui";
import { PageHeader } from "../components/ui";

const INTEGRANTES = [
  { nome: "Gabriel Adorno Simoso",       sigla: "GAS", cor: "#16A34A"},
  { nome: "Renan Ribeiro Bertolotto",     sigla: "RRB", cor: "#DC2626" },
  { nome: "Vitor Manzano Villela Dias",   sigla: "MVD", cor: "#2563EB" },
];

export default function SobreScreen() {
  return (
    <div style={wrap}>
      <PageHeader title="Sobre o Projeto" desc="Conheça a equipe por trás do Sistema de Encargos Trabalhistas da Empregada Domésica." />

      {/* FOTO DA EQUIPE */}
      <div style={photoBox}>
        {/*
          ╔══════════════════════════════════════════╗
          ║  COLOQUE A FOTO DA EQUIPE AQUI           ║
          ║                                          ║
          ║  Duas opções:                            ║
          ║                                          ║
          ║  1) Importe o arquivo:                   ║
          ║     import foto from "../assets/equipe.jpg"  ║
          ║     e use: <img src={foto} ... />        ║
          ║                                          ║
          ║  2) URL externa:                         ║
          ║     <img src="https://..." ... />        ║
          ╚══════════════════════════════════════════╝
        */}
        <div style={photoPlaceholder}>
          <span style={{ fontSize: 48 }}>📸</span>
          <p style={{ color: "#64748B", fontSize: ".85rem", marginTop: 8 }}>
            Foto da equipe aqui
          </p>
          <p style={{ color: "#94A3B8", fontSize: ".75rem" }}>
            Substitua este bloco por: &lt;img src="..." style=&#123;photoImg&#125; alt="Equipe" /&gt;
          </p>
        </div>
        {/* Quando tiver a foto, use: */}
        {/* <img src={fotoEquipe} style={photoImg} alt="Foto da equipe" /> */}
      </div>

      {/* INTEGRANTES */}
      <div style={grid}>
        {INTEGRANTES.map(p => (
          <div key={p.nome} style={card}>
            <div style={{ ...avatar, background: p.cor }}>{p.sigla}</div>
            <div>
              <p style={nome}>{p.nome}</p>
              <p style={role}>Desenvolvedor</p>
            </div>
          </div>
        ))}
      </div>

      {/* INFO DO PROJETO */}
      <div style={infoCard}>
        <h3 style={{ fontWeight: 700, fontSize: "1rem", marginBottom: 14 }}> Sobre o Projeto</h3>
        <p style={infoText}>
          O <b>ETEC</b> é um sistema web de cálculos trabalhistas desenvolvido como projeto
          acadêmico. A aplicação consome uma API REST em Node.js que realiza os cálculos de
          salário líquido, 13° salário, férias e rescisão contratual conforme a legislação brasileira.
        </p>
        <div style={tags}>
          {["React", "Node.js", "JavaScript"].map(t => (
            <span key={t} style={tag}>{t}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

const photoBox = {
  background: "#fff", border: "1px solid var(--border)",
  borderRadius: 16, overflow: "hidden", marginBottom: 24,
  boxShadow: "var(--shadow)",
};
const photoPlaceholder = {
  height: 260, display: "flex", flexDirection: "column",
  alignItems: "center", justifyContent: "center",
  background: "#F8FAFC", textAlign: "center",
};
// eslint-disable-next-line no-unused-vars
const photoImg = {
  width: "100%", height: 300, objectFit: "cover", display: "block",
};
const grid = {
  display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
  gap: 14, marginBottom: 24,
};
const card = {
  background: "#fff", border: "1px solid var(--border)",
  borderRadius: 14, padding: "20px 18px",
  display: "flex", alignItems: "center", gap: 14,
  boxShadow: "var(--shadow)",
};
const avatar = {
  width: 46, height: 46, borderRadius: 14, flexShrink: 0,
  display: "flex", alignItems: "center", justifyContent: "center",
  color: "#fff", fontWeight: 700, fontSize: ".85rem",
};
const nome = { fontWeight: 600, fontSize: ".88rem", color: "var(--text)" };
const role = { fontSize: ".75rem", color: "var(--muted)", marginTop: 2 };
const infoCard = {
  background: "#fff", border: "1px solid var(--border)",
  borderRadius: 16, padding: "24px 24px",
  boxShadow: "var(--shadow)",
};
const infoText = { fontSize: ".875rem", color: "var(--muted)", lineHeight: 1.7, marginBottom: 16 };
const tags = { display: "flex", gap: 8, flexWrap: "wrap" };
const tag = {
  background: "var(--accent-lt)", color: "var(--accent)",
  padding: "4px 12px", borderRadius: 99, fontSize: ".78rem", fontWeight: 600,
};