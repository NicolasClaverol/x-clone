import { useAuth } from "../context/AuthContext";

export default function LoginPage() {
  const { login, USERS } = useAuth();

  return (
    <div style={{
      minHeight: "100vh",
      background: "#000",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}>
      <div style={{ width: "100%", maxWidth: 400, padding: 24 }}>

        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <svg viewBox="0 0 24 24" width={44} height={44} fill="#1d9bf0">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
          </svg>
          <h1 style={{ color: "#e7e9ea", fontSize: 26, fontWeight: 800, margin: "12px 0 4px" }}>
            Bienvenue sur X Clone
          </h1>
          <p style={{ color: "#71767b", fontSize: 14 }}>
            Choisissez un compte pour vous connecter
          </p>
        </div>

        {/* Liste des comptes */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {USERS.map(user => (
            <button
              key={user.id}
              onClick={() => login(user)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "14px 16px",
                background: "#0a0a0a",
                border: "1px solid #2f3336",
                borderRadius: 12,
                cursor: "pointer",
                textAlign: "left",
                transition: "border-color 0.15s",
              }}
              onMouseEnter={e => e.currentTarget.style.borderColor = "#1d9bf0"}
              onMouseLeave={e => e.currentTarget.style.borderColor = "#2f3336"}
            >
              {/* Avatar */}
              <div style={{
                width: 44,
                height: 44,
                borderRadius: "50%",
                background: user.avatarColor,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                fontWeight: 700,
                fontSize: 16,
                flexShrink: 0,
              }}>
                {user.avatar}
              </div>
              {/* Infos */}
              <div>
                <div style={{ color: "#e7e9ea", fontWeight: 700, fontSize: 15 }}>
                  {user.displayName}
                </div>
                <div style={{ color: "#71767b", fontSize: 13 }}>
                  @{user.username}
                </div>
              </div>
            </button>
          ))}
        </div>

      </div>
    </div>
  );
}