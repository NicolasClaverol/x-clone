import { useAuth } from "../context/AuthContext";
import { useApp } from "../context/AppContext";

export default function Sidebar() {
  const { currentUser, logout } = useAuth();
  const { navigate, page } = useApp();

  const links = [
    { label: "Accueil", icon: "🏠", name: "home" },
    { label: "Explorer", icon: "🔍", name: "explore" },
    { label: "Notifications", icon: "🔔", name: "notifications" },
    { label: "Profil", icon: "👤", name: "profile", userId: currentUser?.id },
  ];

  return (
    <nav style={{ width: 240, padding: "8px 12px", display: "flex", flexDirection: "column", height: "100vh", position: "sticky", top: 0, borderRight: "1px solid #2f3336" }}>
      <div style={{ padding: "8px 12px 16px" }}>
        <svg viewBox="0 0 24 24" width={30} height={30} fill="#1d9bf0">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      </div>
      {links.map(link => {
        const isActive = page.name === link.name;
        return (
          <button key={link.name} onClick={() => navigate(link.name, link.userId ? { userId: link.userId } : {})}
            style={{ display: "flex", alignItems: "center", gap: 16, padding: "12px", background: "none", border: "none", borderRadius: 30, color: isActive ? "#e7e9ea" : "#71767b", fontWeight: isActive ? 700 : 400, fontSize: 17, textAlign: "left", cursor: "pointer", transition: "background 0.15s" }}
            onMouseEnter={e => e.currentTarget.style.background = "#1d1f23"}
            onMouseLeave={e => e.currentTarget.style.background = "none"}
          >
            <span>{link.icon}</span>
            {link.label}
          </button>
        );
      })}
      <div style={{ flex: 1 }} />
      <button onClick={logout}
        style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 12px", background: "none", border: "none", borderRadius: 30, cursor: "pointer", marginBottom: 8, color: "#71767b", fontSize: 14 }}
        onMouseEnter={e => e.currentTarget.style.background = "#1d1f23"}
        onMouseLeave={e => e.currentTarget.style.background = "none"}
      >
        <div style={{ width: 36, height: 36, borderRadius: "50%", background: currentUser?.avatarColor, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, fontSize: 13 }}>
          {currentUser?.avatar}
        </div>
        <span>Se déconnecter</span>
      </button>
    </nav>
  );
}
