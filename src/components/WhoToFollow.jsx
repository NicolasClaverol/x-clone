import { useAuth } from "../context/AuthContext";
import { useApp } from "../context/AppContext";

export default function WhoToFollow() {
  const { currentUser } = useAuth();
  const { users, navigate, toggleFollow } = useApp();

  const suggestions = users.filter(u =>
    u.id !== currentUser?.id &&
    !users.find(u2 => u2.id === currentUser?.id)?.following?.includes(u.id)
  ).slice(0, 3);

  if (suggestions.length === 0) return null;

  return (
    <div style={{
      background: "#16181c",
      borderRadius: 16,
      padding: 16,
    }}>
      <h3 style={{ color: "#e7e9ea", fontSize: 19, fontWeight: 800, margin: "0 0 12px" }}>
        Qui suivre
      </h3>
      {suggestions.map(user => (
        <div key={user.id} style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          padding: "10px 0",
        }}>
          {/* Avatar */}
          <div
            onClick={() => navigate("profile", { userId: user.id })}
            style={{
              width: 40,
              height: 40,
              borderRadius: "50%",
              background: user.avatarColor,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              fontWeight: 700,
              fontSize: 14,
              cursor: "pointer",
              flexShrink: 0,
            }}
          >
            {user.avatar}
          </div>

          {/* Infos */}
          <div
            onClick={() => navigate("profile", { userId: user.id })}
            style={{ flex: 1, cursor: "pointer" }}
          >
            <div style={{ color: "#e7e9ea", fontWeight: 700, fontSize: 15 }}>
              {user.displayName}
            </div>
            <div style={{ color: "#71767b", fontSize: 13 }}>
              @{user.username}
            </div>
          </div>

          {/* Bouton suivre */}
          <button
            onClick={() => toggleFollow(currentUser.id, user.id)}
            style={{
              background: "#e7e9ea",
              color: "#000",
              border: "none",
              borderRadius: 20,
              padding: "6px 16px",
              fontSize: 14,
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            Suivre
          </button>
        </div>
      ))}
    </div>
  );
}