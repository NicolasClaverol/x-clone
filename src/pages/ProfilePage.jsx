import { useAuth } from "../context/AuthContext";
import { useApp } from "../context/AppContext";
import TweetCard from "../components/TweetCard";

export default function ProfilePage({ userId }) {
  const { currentUser } = useAuth();
  const { users, tweets, navigate, toggleFollow } = useApp();

  const user = users.find(u => u.id === userId);
  if (!user) return <div style={{ padding: 40, color: "#71767b" }}>Utilisateur introuvable.</div>;

  const isMe = currentUser?.id === userId;
  const isFollowing = currentUser?.following?.includes(userId) ||
    users.find(u => u.id === currentUser?.id)?.following?.includes(userId);

  const userTweets = tweets
    .filter(t => t.authorId === userId && !t.parentId)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  return (
    <div>
      {/* En-tête */}
      <div style={{
        padding: "16px",
        borderBottom: "1px solid #2f3336",
        position: "sticky",
        top: 0,
        background: "rgba(0,0,0,0.85)",
        backdropFilter: "blur(8px)",
        zIndex: 10,
        display: "flex",
        alignItems: "center",
        gap: 16,
      }}>
        <button
          onClick={() => navigate("home")}
          style={{
            background: "none",
            border: "none",
            color: "#e7e9ea",
            cursor: "pointer",
            padding: 4,
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="19" y1="12" x2="5" y2="12"/>
            <polyline points="12 19 5 12 12 5"/>
          </svg>
        </button>
        <div>
          <h2 style={{ color: "#e7e9ea", fontSize: 20, fontWeight: 700 }}>
            {user.displayName}
          </h2>
          <p style={{ color: "#71767b", fontSize: 13 }}>
            {userTweets.length} tweet{userTweets.length !== 1 ? "s" : ""}
          </p>
        </div>
      </div>

      {/* Bannière */}
      <div style={{ height: 120, background: "linear-gradient(135deg, #1d3a5e, #1a1a2e)" }} />

      {/* Infos profil */}
      <div style={{ padding: "0 16px 16px", borderBottom: "1px solid #2f3336" }}>
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          marginTop: -28,
          marginBottom: 12,
        }}>
          {/* Avatar */}
          <div style={{
            width: 72,
            height: 72,
            borderRadius: "50%",
            background: user.avatarColor,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
            fontWeight: 700,
            fontSize: 26,
            border: "4px solid #000",
          }}>
            {user.avatar}
          </div>

          {/* Bouton suivre */}
          {!isMe && (
            <button
              onClick={() => toggleFollow(currentUser.id, userId)}
              style={{
                background: isFollowing ? "none" : "#e7e9ea",
                color: isFollowing ? "#e7e9ea" : "#000",
                border: isFollowing ? "1px solid #536471" : "none",
                borderRadius: 20,
                padding: "8px 20px",
                fontSize: 15,
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              {isFollowing ? "Suivi ✓" : "Suivre"}
            </button>
          )}
        </div>

        <div style={{ color: "#e7e9ea", fontSize: 20, fontWeight: 800 }}>
          {user.displayName}
        </div>
        <div style={{ color: "#71767b", fontSize: 14, marginBottom: 8 }}>
          @{user.username}
        </div>
        {user.bio && (
          <p style={{ color: "#e7e9ea", fontSize: 15, margin: "8px 0" }}>
            {user.bio}
          </p>
        )}

        {/* Stats */}
        <div style={{ display: "flex", gap: 20, marginTop: 12 }}>
          <span style={{ fontSize: 14 }}>
            <b style={{ color: "#e7e9ea" }}>{user.following.length}</b>{" "}
            <span style={{ color: "#71767b" }}>Abonnements</span>
          </span>
          <span style={{ fontSize: 14 }}>
            <b style={{ color: "#e7e9ea" }}>{user.followers.length}</b>{" "}
            <span style={{ color: "#71767b" }}>Abonnés</span>
          </span>
        </div>
      </div>

      {/* Tweets */}
      {userTweets.length === 0 ? (
        <div style={{ padding: 40, textAlign: "center", color: "#71767b" }}>
          Aucun tweet pour l'instant.
        </div>
      ) : (
        userTweets.map(tweet => (
          <TweetCard key={tweet.id} tweet={tweet} />
        ))
      )}
    </div>
  );
}