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
    username: "ulysse",
    displayName: "Ulysse",
    bio: "Frontend engineer. React lover ⚛️",
    avatar: "UL",
    avatarColor: "#7c3aed",
  },
  {
    id: "u3",
    username: "agamemnon",
    displayName: "Agamemnon",
    bio: "Roi des rois. Amateur de grandes epopees.",
    avatar: "AG",
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