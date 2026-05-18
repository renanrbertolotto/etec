import { useState } from "react";

// Credenciais fixas
const USUARIO = "admin";
const SENHA   = "1234";

export default function LoginScreen({ onLogin }) {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [erro, setErro] = useState("");
  const [shake, setShake] = useState(false);

  function handleLogin(e) {
    e.preventDefault();
    if (user === USUARIO && pass === SENHA) {
      onLogin();
    } else {
      setErro("Usuário ou senha incorretos.");
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
  }

  return (
    <>
      <style>{css}</style>
      <div style={s.wrap}>
        <div style={s.left}>
          <div style={s.brand}>
            <div style={s.icon}>🧽</div>
            <span style={s.brandName}>ETEC</span>
          </div>
          <div style={s.tagline}>
            Encargos Trabalhistas<br />da Empregada Domésica
          </div>
          <div style={s.badges}>
            {["Salário","13° Salário","Férias","Rescisão"].map(b => (
              <span key={b} style={s.badge}>{b}</span>
            ))}
          </div>
        </div>

        <div style={s.right}>
          <form
            data-testid="login-form"
            onSubmit={handleLogin}
            style={{...s.card, animation: shake ? "shake .4s ease" : "slideIn .4s ease"}}
          >
            <h2 style={s.title}>Entrar</h2>
            <p style={s.sub}>Acesse com suas credenciais</p>

            <label style={s.label}>Usuário</label>
            <input
              data-testid="login-user"
              style={s.input}
              type="text"
              placeholder="usuário"
              value={user}
              onChange={e => { setUser(e.target.value); setErro(""); }}
              autoFocus
            />

            <label style={s.label}>Senha</label>
            <input
              data-testid="login-pass"
              style={s.input}
              type="password"
              placeholder="••••••"
              value={pass}
              onChange={e => { setPass(e.target.value); setErro(""); }}
            />

            {erro && <p data-testid="login-error" style={s.erro}>{erro}</p>}

            <button data-testid="login-submit" style={s.btn} type="submit">Entrar</button>

            <p style={s.hint}>
              <span style={{color:"var(--muted)"}}>Dica: </span>
              usuário <b>admin</b> · senha <b>1234</b>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}

const s = {
  wrap: {
    minHeight: "100vh", display: "flex",
    background: "var(--bg)",
  },
  left: {
    flex: 1, background: "#0F172A",
    display: "flex", flexDirection: "column",
    justifyContent: "center", padding: "60px 64px",
    gap: 32,
  },
  brand: { display: "flex", alignItems: "center", gap: 14 },
  icon: {
    width: 52, height: 52, borderRadius: 16,
    background: "linear-gradient(135deg,#2563EB,#60A5FA)",
    display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: 24,
  },
  brandName: { color: "#F1F5F9", fontSize: "1.5rem", fontWeight: 700 },
  tagline: {
    color: "#F1F5F9", fontSize: "2.2rem", fontWeight: 700,
    lineHeight: 1.3, letterSpacing: "-.02em",
  },
  badges: { display: "flex", flexWrap: "wrap", gap: 10 },
  badge: {
    background: "#1E293B", color: "#94A3B8",
    padding: "6px 14px", borderRadius: 99,
    fontSize: ".8rem", fontWeight: 500,
  },
  right: {
    width: 440, display: "flex", alignItems: "center",
    justifyContent: "center", padding: 32,
  },
  card: {
    background: "var(--surface)", borderRadius: 20,
    padding: "40px 36px", width: "100%",
    boxShadow: "var(--shadow)",
    border: "1px solid var(--border)",
    display: "flex", flexDirection: "column", gap: 6,
  },
  title: { fontSize: "1.5rem", fontWeight: 700, marginBottom: 2 },
  sub: { color: "var(--muted)", fontSize: ".85rem", marginBottom: 16 },
  label: { fontSize: ".78rem", fontWeight: 600, color: "var(--muted)", marginTop: 8 },
  input: {
    border: "1.5px solid var(--border)", borderRadius: 10,
    padding: "11px 14px", fontSize: ".92rem",
    width: "100%", marginTop: 4,
    transition: "border-color .2s",
  },
  erro: { color: "var(--danger)", fontSize: ".82rem", marginTop: 4 },
  btn: {
    marginTop: 20, padding: "13px", borderRadius: 11,
    background: "var(--accent)", color: "#fff",
    fontWeight: 600, fontSize: ".95rem",
    transition: "background .2s",
  },
  hint: {
    textAlign: "center", fontSize: ".78rem",
    color: "var(--muted)", marginTop: 12,
  },
};

const css = `
@keyframes slideIn { from { opacity:0; transform:translateY(20px) } to { opacity:1; transform:translateY(0) } }
@keyframes shake {
  0%,100% { transform:translateX(0) }
  20%,60%  { transform:translateX(-8px) }
  40%,80%  { transform:translateX(8px) }
}
`;