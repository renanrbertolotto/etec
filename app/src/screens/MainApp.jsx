import { useState } from "react";
import SalarioScreen    from "./calculators/SalarioScreen";
import DecimoScreen     from "./calculators/DecimoScreen";
import FeriasScreen     from "./calculators/FeriasScreen";
import RecisaoScreen    from "./calculators/RecisaoScreen";
import SobreScreen      from "./SobreScreen";
import HelpScreen       from "./HelpScreen";

const NAV = [
  { id: "salario",  icon: null, label: "Salário" },
  { id: "decimo",   icon: null, label: "13° Salário" },
  { id: "ferias",   icon: null, label: "Férias" },
  { id: "recisao",  icon: null, label: "Rescisão" },
  { id: "divider" },
  { id: "sobre",    icon: null, label: "Sobre" },
  { id: "help",     icon: null, label: "Ajuda" },
];

export default function MainApp() {
  const [active, setActive] = useState("salario");

  const screens = {
    salario: <SalarioScreen />,
    decimo:  <DecimoScreen />,
    ferias:  <FeriasScreen />,
    recisao: <RecisaoScreen />,
    sobre:   <SobreScreen />,
    help:    <HelpScreen />,
  };

  return (
    <div style={s.wrap}>
      {/* SIDEBAR */}
      <nav style={s.nav}>
        <div style={s.navBrand}>
          <div style={s.navIcon}>🧽</div>
          <span style={s.navTitle}>ETEC</span>
        </div>

        <div style={s.navItems}>
          {NAV.map((item, i) =>
            item.id === "divider"
              ? <div key={i} style={s.divider} />
              : (
                <button
                  key={item.id}
                  onClick={() => setActive(item.id)}
                  style={{
                    ...s.navBtn,
                    ...(active === item.id ? s.navBtnActive : {}),
                  }}
                >
                  <span style={s.navBtnIcon}>{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              )
          )}
        </div>

        <div style={s.navFooter}>
          <div style={s.avatar}>AD</div>
          <div>
            <div style={s.avatarName}>Admin</div>
            <div style={s.avatarRole}>Usuário</div>
          </div>
        </div>
      </nav>

      {/* CONTENT */}
      <main style={s.main}>
        {screens[active]}
      </main>
    </div>
  );
}

const s = {
  wrap: { display: "flex", minHeight: "100vh" },
  nav: {
    width: 220, background: "#0F172A", flexShrink: 0,
    display: "flex", flexDirection: "column",
    padding: "0 12px", position: "fixed",
    top: 0, left: 0, bottom: 0, zIndex: 10,
  },
  navBrand: {
    display: "flex", alignItems: "center", gap: 10,
    padding: "24px 8px 20px",
    borderBottom: "1px solid #1E293B",
  },
  navIcon: {
    width: 38, height: 38, borderRadius: 11,
    background: "linear-gradient(135deg,#2563EB,#60A5FA)",
    display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: 18,
  },
  navTitle: { color: "#F1F5F9", fontWeight: 700, fontSize: "1rem" },
  navItems: { flex: 1, paddingTop: 16, display: "flex", flexDirection: "column", gap: 2 },
  navBtn: {
    display: "flex", alignItems: "center", gap: 10,
    padding: "10px 12px", borderRadius: 10,
    background: "transparent", color: "#64748B",
    fontSize: ".875rem", fontWeight: 500, width: "100%",
    textAlign: "left", transition: "all .15s",
    border: "none", cursor: "pointer",
  },
  navBtnActive: {
    background: "#1E3A8A", color: "#93C5FD",
  },
  navBtnIcon: { fontSize: "1.1rem", width: 22, textAlign: "center" },
  divider: { height: 1, background: "#1E293B", margin: "10px 0" },
  navFooter: {
    display: "flex", alignItems: "center", gap: 10,
    padding: "16px 8px 24px", borderTop: "1px solid #1E293B",
  },
  avatar: {
    width: 34, height: 34, borderRadius: 99,
    background: "#2563EB", color: "#fff",
    display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: ".75rem", fontWeight: 700, flexShrink: 0,
  },
  avatarName: { color: "#F1F5F9", fontSize: ".82rem", fontWeight: 600 },
  avatarRole: { color: "#475569", fontSize: ".72rem" },
  main: {
    flex: 1, marginLeft: 220,
    minHeight: "100vh", background: "var(--bg)",
    overflow: "auto",
  },
};