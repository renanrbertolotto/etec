import { useEffect, useState } from "react";

const s = {
  wrap: {
    height: "100vh", display: "flex", flexDirection: "column",
    alignItems: "center", justifyContent: "center",
    background: "#0F172A", gap: "20px",
    animation: "fadeIn .5s ease",
  },
  icon: {
    width: 80, height: 80, borderRadius: 24,
    background: "linear-gradient(135deg, #2563EB, #60A5FA)",
    display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: 38, boxShadow: "0 8px 32px rgba(37,99,235,.45)",
    animation: "popIn .6s cubic-bezier(.34,1.56,.64,1) .2s both",
  },
  title: {
    fontFamily: "'Sora', sans-serif", color: "#F1F5F9",
    fontSize: "1.9rem", fontWeight: 700, letterSpacing: "-.02em",
    animation: "slideUp .5s ease .5s both",
  },
  sub: {
    fontFamily: "'Sora', sans-serif", color: "#64748B",
    fontSize: ".85rem", fontWeight: 400,
    animation: "slideUp .5s ease .65s both",
  },
  bar: {
    width: 160, height: 3, borderRadius: 99,
    background: "#1E293B", overflow: "hidden",
    marginTop: 16,
    animation: "slideUp .5s ease .8s both",
  },
  fill: {
    height: "100%", borderRadius: 99,
    background: "linear-gradient(90deg, #2563EB, #60A5FA)",
    animation: "loadBar 2s ease .9s both",
  },
};

const css = `
@keyframes fadeIn { from { opacity:0 } to { opacity:1 } }
@keyframes popIn  { from { transform:scale(.5); opacity:0 } to { transform:scale(1); opacity:1 } }
@keyframes slideUp{ from { transform:translateY(12px); opacity:0 } to { transform:translateY(0); opacity:1 } }
@keyframes loadBar{ from { width:0 } to { width:100% } }
`;

export default function SplashScreen() {
  return (
    <>
      <style>{css}</style>
      <div style={s.wrap}>
        <div style={s.icon}>🧽</div>
        <div style={s.title}>ETEC</div>
        <div style={s.sub}>Sistema de Encargos Trabalhistas da Empregada Domésica</div>
        <div style={s.bar}><div style={s.fill} /></div>
      </div>
    </>
  );
}