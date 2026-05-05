export default function Sidebar() {
  const links = [
    { label: "Accueil", icon: "🏠" },
    { label: "Explorer", icon: "🔍" },
    { label: "Notifications", icon: "🔔" },
    { label: "Profil", icon: "👤" },
  ];

  return (
    <nav style={{
      width: 240,
      padding: "8px 12px",
      display: "flex",
      flexDirection: "column",
      height: "100vh",
      position: "sticky",
      top: 0,
      borderRight: "1px solid #2f3336",
    }}>

      {/* Logo */}
      <div style={{ padding: "8px 12px 16px" }}>
        <svg viewBox="0 0 24 24" width={30} height={30} fill="#1d9bf0">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      </div>

      {/* Liens */}
      {links.map(link => (
        <button
          key={link.label}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            padding: "12px",
            background: "none",
            border: "none",
            borderRadius: 30,
            color: "#e7e9ea",
            fontSize: 17,
            textAlign: "left",
            transition: "background 0.15s",
          }}
          onMouseEnter={e => e.currentTarget.style.background = "#1d1f23"}
          onMouseLeave={e => e.currentTarget.style.background = "none"}
        >
          <span>{link.icon}</span>
          {link.label}
        </button>
      ))}

      <div style={{ flex: 1 }} />

      {/* Bouton tweeter */}
      <button style={{
        background: "#1d9bf0",
        color: "#fff",
        border: "none",
        borderRadius: 30,
        padding: "14px",
        fontSize: 16,
        fontWeight: 700,
        marginBottom: 16,
      }}>
        Tweeter
      </button>

    </nav>
  );
}