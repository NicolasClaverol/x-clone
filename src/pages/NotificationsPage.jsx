import { useApp } from "../context/AppContext";
import { useAuth } from "../context/AuthContext";

export default function NotificationsPage() {
  const { tweets, users } = useApp();
  const { currentUser } = useAuth();

  // Récupère tous les tweets de l'utilisateur connecté
  const myTweets = tweets.filter(t => t.authorId === currentUser.id && !t.parentId);

  // Génère les notifications à partir des likes et réponses
  const notifications = [];

  myTweets.forEach(tweet => {
    // Likes reçus
    tweet.likes.forEach(likerId => {
      if (likerId !== currentUser.id) {
        const liker = users.find(u => u.id === likerId);
        if (liker) {
          notifications.push({
            id: `like-${tweet.id}-${likerId}`,
            type: "like",
            actor: liker,
            tweet,
            date: tweet.createdAt,
          });
        }
      }
    });

    // Réponses reçues
    tweet.replies.forEach(replyId => {
      const reply = tweets.find(t => t.id === replyId);
      if (reply && reply.authorId !== currentUser.id) {
        const replier = users.find(u => u.id === reply.authorId);
        if (replier) {
          notifications.push({
            id: `reply-${replyId}`,
            type: "reply",
            actor: replier,
            tweet,
            reply,
            date: reply.createdAt,
          });
        }
      }
    });
  });

  // Trie par date décroissante
  notifications.sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div style={{ color: "white" }}>
      <div style={{
        padding: "16px 20px",
        borderBottom: "1px solid #2f3336",
        fontSize: "20px",
        fontWeight: "bold",
      }}>
        Notifications
      </div>

      {notifications.length === 0 ? (
        <div style={{
          padding: "40px 20px",
          textAlign: "center",
          color: "#71767b",
        }}>
          Aucune notification pour l'instant.
        </div>
      ) : (
        notifications.map(notif => (
          <div key={notif.id} style={{
            display: "flex",
            gap: "12px",
            padding: "16px 20px",
            borderBottom: "1px solid #2f3336",
          }}>
            {/* Icône */}
            <div style={{ fontSize: "24px", minWidth: "32px", textAlign: "center" }}>
              {notif.type === "like" ? "❤️" : "💬"}
            </div>

            {/* Contenu */}
            <div>
              {/* Avatar + nom */}
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                <div style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "50%",
                  backgroundColor: notif.actor.avatarColor,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "12px",
                  fontWeight: "bold",
                  color: "white",
                }}>
                  {notif.actor.avatar}
                </div>
                <span style={{ fontWeight: "bold" }}>{notif.actor.displayName}</span>
              </div>

              {/* Message */}
              <div style={{ color: "#e7e9ea", marginBottom: "4px" }}>
                {notif.type === "like"
                  ? "a aimé votre tweet"
                  : "a répondu à votre tweet"}
              </div>

              {/* Tweet original */}
              <div style={{ color: "#71767b", fontSize: "14px" }}>
                {notif.tweet.content.slice(0, 80)}{notif.tweet.content.length > 80 ? "…" : ""}
              </div>

              {/* Contenu de la réponse */}
              {notif.type === "reply" && (
                <div style={{
                  marginTop: "8px",
                  padding: "8px 12px",
                  border: "1px solid #2f3336",
                  borderRadius: "12px",
                  fontSize: "14px",
                  color: "#e7e9ea",
                }}>
                  {notif.reply.content}
                </div>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
