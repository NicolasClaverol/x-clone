import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useApp } from "../context/AppContext";
import TweetComposer from "./TweetComposer";

function timeAgo(dateStr) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const s = Math.floor(diff / 1000);
  if (s < 60) return `${s}s`;
  const m = Math.floor(s / 60);
  if (m < 60) return `${m}m`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h`;
  const d = Math.floor(h / 24);
  return `${d}j`;
}

export default function TweetCard({ tweet }) {
  const { currentUser } = useAuth();
  const { users, likeTweet, deleteTweet } = useApp();
  const [replying, setReplying] = useState(false);

  const author = users.find(u => u.id === tweet.authorId);
  if (!author) return null;

  const liked = tweet.likes.includes(currentUser?.id);
  const isOwner = tweet.authorId === currentUser?.id;

  return (
    <div style={{ borderBottom: "1px solid #2f3336" }}>
      <div
        style={{
          display: "flex",
          gap: 12,
          padding: "12px 16px",
          transition: "background 0.15s",
        }}
        onMouseEnter={e => e.currentTarget.style.background = "#080808"}
        onMouseLeave={e => e.currentTarget.style.background = "none"}
      >
        {/* Avatar */}
        <div style={{
          width: 40,
          height: 40,
          borderRadius: "50%",
          background: author.avatarColor,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#fff",
          fontWeight: 700,
          fontSize: 14,
          flexShrink: 0,
        }}>
          {author.avatar}
        </div>

        {/* Contenu */}
        <div style={{ flex: 1, minWidth: 0 }}>

          {/* En-tête */}
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            marginBottom: 4,
            flexWrap: "wrap",
          }}>
            <span style={{ fontWeight: 700, color: "#e7e9ea", fontSize: 15 }}>
              {author.displayName}
            </span>
            <span style={{ color: "#71767b", fontSize: 14 }}>
              @{author.username}
            </span>
            <span style={{ color: "#71767b", fontSize: 14 }}>·</span>
            <span style={{ color: "#71767b", fontSize: 14 }}>
              {timeAgo(tweet.createdAt)}
            </span>
          </div>

          {/* Texte */}
          <p style={{
            color: "#e7e9ea",
            fontSize: 15,
            lineHeight: 1.5,
            margin: "0 0 12px",
            wordBreak: "break-word",
          }}>
            {tweet.content}
          </p>

          {/* Actions */}
          <div
            style={{ display: "flex", gap: 24, alignItems: "center" }}
          >
            {/* Répondre */}
            <button
              onClick={() => setReplying(r => !r)}
              style={{
                background: "none",
                border: "none",
                color: replying ? "#1d9bf0" : "#71767b",
                display: "flex",
                alignItems: "center",
                gap: 6,
                fontSize: 13,
                cursor: "pointer",
                padding: 0,
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
              </svg>
              {tweet.replies.length > 0 && <span>{tweet.replies.length}</span>}
            </button>

            {/* Liker */}
            <button
              onClick={() => likeTweet(tweet.id, currentUser.id)}
              style={{
                background: "none",
                border: "none",
                color: liked ? "#f91880" : "#71767b",
                display: "flex",
                alignItems: "center",
                gap: 6,
                fontSize: 13,
                cursor: "pointer",
                padding: 0,
                transition: "color 0.15s",
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill={liked ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.5">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
              {tweet.likes.length > 0 && <span>{tweet.likes.length}</span>}
            </button>

            {/* Supprimer — uniquement pour l'auteur */}
            {isOwner && (
              <button
                onClick={() => deleteTweet(tweet.id)}
                style={{
                  background: "none",
                  border: "none",
                  color: "#71767b",
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  fontSize: 13,
                  cursor: "pointer",
                  padding: 0,
                  marginLeft: "auto",
                }}
                onMouseEnter={e => e.currentTarget.style.color = "#f4212e"}
                onMouseLeave={e => e.currentTarget.style.color = "#71767b"}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <polyline points="3,6 5,6 21,6"/>
                  <path d="M19,6l-1,14H6L5,6"/>
                  <path d="M10,11v6"/>
                  <path d="M14,11v6"/>
                  <path d="M9,6V4h6v2"/>
                </svg>
              </button>
            )}
          </div>

          {/* Composeur de réponse */}
          {replying && (
            <div style={{ marginTop: 12 }}>
              <TweetComposer
                parentId={tweet.id}
                onDone={() => setReplying(false)}
              />
            </div>
          )}

        </div>
      </div>
    </div>
  );
}