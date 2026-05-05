import Sidebar from "./Sidebar";

export default function Layout({ children }) {
  return (
    <div style={{
      display: "flex",
      maxWidth: 1100,
      margin: "0 auto",
      minHeight: "100vh",
    }}>

      {/* Colonne gauche — Sidebar */}
      <Sidebar />

      {/* Colonne centrale — Contenu principal */}
      <main style={{
        flex: 1,
        borderRight: "1px solid #2f3336",
        minHeight: "100vh",
        minWidth: 0,
      }}>
        {children}
      </main>

      {/* Colonne droite — Panneau info */}
      <aside style={{
        width: 280,
        padding: 16,
      }}>
        <div style={{
          background: "#16181c",
          borderRadius: 16,
          padding: 16,
        }}>
          <p style={{ color: "#71767b", fontSize: 14 }}>
            Panneau droit — bientôt disponible
          </p>
        </div>
      </aside>

    </div>
  );
}