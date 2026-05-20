import { useState } from "react";
import { useApp } from "../context/AppContext";
import TweetCard from "../components/TweetCard";

export default function ExplorePage() {
  const { tweets, users } = useApp();
  const [search, setSearch] = useState("");

  const filtered = tweets
    .filter(t => !t.parentId)
    .filter(t =>
      !search ||
      t.content.toLowerCase().includes(search.toLowerCase()) ||
      users.find(u => u.id === t.authorId)?.username.toLowerCase().includes(search.toLowerCase()) ||
      users.find(u => u.id === t.authorId)?.displayName.toLowerCase().includes(search.toLowerCase())
    )
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
      }}>
        <h2 style={{ color: "#e7e9ea", fontSize: 20, fontWeight: 700, margin: "0 0 12px" }}>
          Explorer
        </h2>

        {/* Barre de recherche */}
        <div style={{ position: "relative" }}>
          <span style={{
            position: "absolute",
            left: 12,
            top: "50%",
            transform: "translateY(-50%)",
            color: "#71767b",
          }}>
            🔍
          </span>
          <input
            type="text"
            placeholder="Rechercher des tweets, des utilisateurs..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{
              width: "100%",
              boxSizing: "border-box",
              background: "#1e2732",
              border: "none",
              borderRadius: 20,
              padding: "10px 16px 10px 36px",
              color: "#e7e9ea",
              fontSize: 15,
              outline: "none",
              fontFamily: "inherit",
            }}
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              style={{
                position: "absolute",
                right: 12,
                top: "50%",
                transform: "translateY(-50%)",
                background: "none",
                border: "none",
                color: "#71767b",
                cursor: "pointer",
                fontSize: 16,
              }}
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Résultats */}
      {filtered.length === 0 ? (
        <div style={{ padding: 40, textAlign: "center", color: "#71767b" }}>
          <p style={{ marginBottom: 8 }}>Aucun résultat pour "{search}"</p>
          <p style={{ fontSize: 13 }}>Essayez avec d'autres mots clés.</p>
        </div>
      ) : (
        filtered.map(tweet => (
          <TweetCard key={tweet.id} tweet={tweet} />
        ))
      )}
    </div>
  );
}