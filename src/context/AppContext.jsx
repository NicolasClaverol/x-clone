import { createContext, useContext, useState } from "react";

const AppContext = createContext(null);

const INITIAL_USERS = [
  { id: "u1", username: "nicolas", displayName: "Nicolas", bio: "Developpeur web en formation", avatar: "NC", avatarColor: "#1d9bf0", followers: ["u2"], following: ["u2", "u3"] },
  { id: "u2", username: "ulysse", displayName: "Ulysse", bio: "Voyageur infatigable. Toujours en route vers Ithaque.", avatar: "UL", avatarColor: "#7c3aed", followers: ["u1", "u3"], following: ["u1"] },
  { id: "u3", username: "agamemnon", displayName: "Agamemnon", bio: "Roi des rois. Amateur de grandes epopees.", avatar: "AG", avatarColor: "#059669", followers: ["u1"], following: ["u2"] },
];

const TWO_HOURS = 2 * 60 * 60 * 1000;
const FIVE_HOURS = 5 * 60 * 60 * 1000;
const EIGHT_HOURS = 8 * 60 * 60 * 1000;

const INITIAL_TWEETS = [
  { id: "t1", authorId: "u2", content: "Le voyage est long mais chaque etape vaut le detour.", createdAt: new Date(Date.now() - TWO_HOURS).toISOString(), likes: ["u1", "u3"], replies: [], parentId: null },
  { id: "t2", authorId: "u3", content: "Les grandes choses prennent du temps. La patience est la premiere des vertus.", createdAt: new Date(Date.now() - FIVE_HOURS).toISOString(), likes: ["u1"], replies: [], parentId: null },
  { id: "t3", authorId: "u2", content: "Nouvelle journee, nouvelles aventures. Pret pour la suite !", createdAt: new Date(Date.now() - EIGHT_HOURS).toISOString(), likes: [], replies: [], parentId: null },
];

function genId() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

export function AppProvider({ children }) {
  const [users, setUsers] = useState(() => {
    const saved = localStorage.getItem("xclone_users");
    return saved ? JSON.parse(saved) : INITIAL_USERS;
  });
  const [tweets, setTweets] = useState(() => {
    const saved = localStorage.getItem("xclone_tweets");
    return saved ? JSON.parse(saved) : INITIAL_TWEETS;
  });
  const [page, setPage] = useState({ name: "home" });

  function navigate(name, params = {}) {
    setPage({ name, ...params });
  }

  function saveUsers(newUsers) {
    setUsers(newUsers);
    localStorage.setItem("xclone_users", JSON.stringify(newUsers));
  }

  function saveTweets(newTweets) {
    setTweets(newTweets);
    localStorage.setItem("xclone_tweets", JSON.stringify(newTweets));
  }

  function postTweet(content, authorId, parentId = null) {
    const newTweet = { id: genId(), authorId, content, createdAt: new Date().toISOString(), likes: [], replies: [], parentId };
    let updated = [newTweet, ...tweets];
    if (parentId) {
      updated = updated.map(t => t.id === parentId ? { ...t, replies: [...t.replies, newTweet.id] } : t);
    }
    saveTweets(updated);
    return newTweet;
  }

  function deleteTweet(tweetId) {
    const tweet = tweets.find(t => t.id === tweetId);
    let updated = tweets.filter(t => t.id !== tweetId);
    if (tweet?.parentId) {
      updated = updated.map(t => t.id === tweet.parentId ? { ...t, replies: t.replies.filter(r => r !== tweetId) } : t);
    }
    saveTweets(updated);
  }

  function likeTweet(tweetId, userId) {
    const updated = tweets.map(t => {
      if (t.id !== tweetId) return t;
      const liked = t.likes.includes(userId);
      return { ...t, likes: liked ? t.likes.filter(l => l !== userId) : [...t.likes, userId] };
    });
    saveTweets(updated);
  }

  function toggleFollow(currentUserId, targetUserId) {
    const me = users.find(u => u.id === currentUserId);
    const isFollowing = me.following.includes(targetUserId);
    const updated = users.map(u => {
      if (u.id === currentUserId) return { ...u, following: isFollowing ? u.following.filter(f => f !== targetUserId) : [...u.following, targetUserId] };
      if (u.id === targetUserId) return { ...u, followers: isFollowing ? u.followers.filter(f => f !== currentUserId) : [...u.followers, currentUserId] };
      return u;
    });
    saveUsers(updated);
  }

  return (
    <AppContext.Provider value={{ users, tweets, page, navigate, postTweet, deleteTweet, likeTweet, toggleFollow }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}