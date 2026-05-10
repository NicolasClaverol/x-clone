import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useApp } from "../context/AppContext";

const MAX = 280;

export default function TweetComposer({ parentId = null, onDone }) {
  const { currentUser } = useAuth();
  const { postTweet } = useApp();
  const [text, setText] = useState("");

  function handleSubmit() {
    if (!text.trim()) return;
    postTweet(text.trim(), currentUser.id, parentId);
    setText("");
    if (onDone) onDone();
  }

  return (
    <div style={{
      display: "flex",
      gap: 12,
      padding: "12px 16px",
      borderBottom: "1px solid #2f3336",
    }}>

      {/* Avatar */}
      <div style={{
        width: 40,
        height: 40,
        borderRadius: "50%",
        background: currentUser.avatarColor,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#fff",
        fontWeight: 700,
        fontSize: 14,
        flexShrink: 0,
      }}>
        {currentUser.avatar}
      </div>

      {/* Zone de texte */}
      <div style={{ flex: 1 }}>
        <textarea
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder={parentId ? "Votre réponse..." : "Quoi de neuf ?"}
          maxLength={MAX}
          style={{
            width: "100%",
            background: "none",
            border: "none",
            outline: "none",
            color: "#e7e9ea",
            fontSize: 18,
            resize: "none",
            minHeight: 80,
            fontFamily: "inherit",
            lineHeight: 1.5,
          }}
        />

        {/* Barre du bas */}
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          paddingTop: 8,
          borderTop: "1px solid #2f3336",
        }}>

          {/* Compteur de caractères */}
          <span style={{
            fontSize: 13,
            color: text.length > MAX * 0.8 ? "#f4212e" : "#71767b",
          }}>
            {MAX - text.length}
          </span>

          {/* Bouton publier */}
          <button
            onClick={handleSubmit}
            disabled={!text.trim()}
            style={{
              background: text.trim() ? "#1d9bf0" : "#1a4a6b",
              color: text.trim() ? "#fff" : "#71767b",
              border: "none",
              borderRadius: 20,
              padding: "8px 18px",
              fontSize: 15,
              fontWeight: 700,
              cursor: text.trim() ? "pointer" : "default",
              transition: "background 0.15s",
            }}
          >
            {parentId ? "Répondre" : "Tweeter"}
          </button>

        </div>
      </div>
    </div>
  );
}