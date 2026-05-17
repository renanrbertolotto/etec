/* Componente reutilizável para os cards de cálculo */
export function PageHeader({ icon, title, desc }) {
  return (
    <div style={{ marginBottom: 28 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 6 }}>
        <div style={{
          width: 44, height: 44, borderRadius: 13,
          background: "var(--accent-lt)", display: "flex",
          alignItems: "center", justifyContent: "center", fontSize: 22,
        }}>{icon}</div>
        <h1 style={{ fontSize: "1.5rem", fontWeight: 700, letterSpacing: "-.02em" }}>{title}</h1>
      </div>
      <p style={{ color: "var(--muted)", fontSize: ".875rem", paddingLeft: 56 }}>{desc}</p>
    </div>
  );
}

export function Card({ children, style }) {
  return (
    <div style={{
      background: "var(--surface)", borderRadius: "var(--radius)",
      border: "1px solid var(--border)", boxShadow: "var(--shadow)",
      padding: "28px 28px", ...style,
    }}>
      {children}
    </div>
  );
}

export function Field({ label, children }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <label style={{ fontSize: ".78rem", fontWeight: 600, color: "var(--muted)",
                      textTransform: "uppercase", letterSpacing: ".04em" }}>
        {label}
      </label>
      {children}
    </div>
  );
}

export function Input({ ...props }) {
  return (
    <input
      style={{
        border: "1.5px solid var(--border)", borderRadius: 10,
        padding: "11px 14px", fontSize: ".92rem", width: "100%",
        background: "var(--bg)", color: "var(--text)",
        transition: "border-color .2s",
        fontFamily: "var(--font)",
      }}
      {...props}
    />
  );
}

export function Select({ children, ...props }) {
  return (
    <select
      style={{
        border: "1.5px solid var(--border)", borderRadius: 10,
        padding: "11px 14px", fontSize: ".92rem", width: "100%",
        background: "var(--bg)", color: "var(--text)",
        fontFamily: "var(--font)", cursor: "pointer",
      }}
      {...props}
    >
      {children}
    </select>
  );
}

export function Button({ children, loading, ...props }) {
  return (
    <button
      style={{
        padding: "13px 28px", borderRadius: 11,
        background: loading ? "#93C5FD" : "var(--accent)",
        color: "#fff", fontWeight: 600, fontSize: ".92rem",
        transition: "background .2s", cursor: loading ? "wait" : "pointer",
        fontFamily: "var(--font)",
      }}
      disabled={loading}
      {...props}
    >
      {loading ? "Calculando..." : children}
    </button>
  );
}

export function ResultBox({ data }) {
  if (!data) return null;
  return (
    <div style={{
      background: "var(--accent-lt)", borderRadius: 12,
      border: "1.5px solid #BFDBFE", padding: "20px 22px",
      display: "flex", flexDirection: "column", gap: 10,
      animation: "fadeUp .3s ease",
    }}>
      <style>{`@keyframes fadeUp{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}`}</style>
      <p style={{ fontSize: ".75rem", fontWeight: 700, color: "var(--accent)",
                  textTransform: "uppercase", letterSpacing: ".06em" }}>
        Resultado
      </p>
      {Object.entries(data).map(([k, v]) => (
        <div key={k} style={{ display: "flex", justifyContent: "space-between",
                               alignItems: "center", borderBottom: "1px solid #BFDBFE",
                               paddingBottom: 8 }}>
          <span style={{ fontSize: ".875rem", color: "var(--text)", fontWeight: 500 }}>{k}</span>
          <span style={{ fontSize: ".95rem", fontWeight: 700, color: "var(--accent)",
                         fontFamily: "var(--mono)" }}>{v}</span>
        </div>
      ))}
    </div>
  );
}

export function ErrBox({ msg }) {
  if (!msg) return null;
  return (
    <div style={{
      background: "#FEF2F2", border: "1.5px solid #FECACA",
      borderRadius: 10, padding: "12px 16px",
      color: "var(--danger)", fontSize: ".85rem", fontWeight: 500,
    }}>
      ⚠️ {msg}
    </div>
  );
}

export const fmt = v =>
  typeof v === "number"
    ? v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })
    : String(v);

export const wrap = { padding: "36px 40px", maxWidth: 760 };