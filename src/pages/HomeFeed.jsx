import { useAuth } from "../context/AuthContext";
import { useApp } from "../context/AppContext";
import TweetComposer from "../components/TweetComposer";
import TweetCard from "../components/TweetCard";

export default function HomeFeed() {
  const { currentUser } = useAuth();
  const { tweets } = useApp();

  const feedTweets = tweets
    .filter(t => {
      if (t.parentId) return false;
      return (
        t.authorId === currentUser.id ||
        currentUser.following?.includes(t.authorId)
      );
    })
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
        <h2 style={{ color: "#e7e9ea", fontSize: 20, fontWeight: 700 }}>
          Accueil
        </h2>
      </div>

      {/* Composeur */}
      <TweetComposer />

      {/* Liste des tweets */}
      {feedTweets.length === 0 ? (
        <div style={{ padding: 40, textAlign: "center", color: "#71767b" }}>
          <p style={{ marginBottom: 8 }}>Aucun tweet pour l'instant.</p>
          <p style={{ fontSize: 13 }}>
            Abonnez-vous à des comptes ou publiez votre premier tweet !
          </p>
        </div>
      ) : (
        feedTweets.map(tweet => (
          <TweetCard key={tweet.id} tweet={tweet} />
        ))
      )}
    </div>
  );
}