import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

const USERS = [
  {
    id: "u1",
    username: "nicolas",
    displayName: "Nicolas",
    bio: "Développeur web en formation 🚀",
    avatar: "NC",
    avatarColor: "#1d9bf0",
  },
  {
    id: "u2",
    username: "saradev",
    displayName: "Sara Dev",
    bio: "Frontend engineer. React lover ⚛️",
    avatar: "SD",
    avatarColor: "#7c3aed",
  },
  {
    id: "u3",
    username: "codingwolf",
    displayName: "Coding Wolf 🐺",
    bio: "Full-stack dev. Open source contributor.",
    avatar: "CW",
    avatarColor: "#059669",
  },
];

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem("xclone_user");
    return saved ? JSON.parse(saved) : null;
  });

  function login(user) {
    setCurrentUser(user);
    localStorage.setItem("xclone_user", JSON.stringify(user));
  }

  function logout() {
    setCurrentUser(null);
    localStorage.removeItem("xclone_user");
  }

  return (
    <AuthContext.Provider value={{ currentUser, login, logout, USERS }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}