import { AuthProvider, useAuth } from "./context/AuthContext";
import Layout from "./components/Layout";
import LoginPage from "./pages/LoginPage";

function AppContent() {
  const { currentUser, logout } = useAuth();

  if (!currentUser) {
    return <LoginPage />;
  }

  return (
    <Layout>
      <div style={{ padding: 24 }}>
        <p style={{ color: "#71767b", marginBottom: 16 }}>
          Connecté en tant que <strong style={{ color: "#e7e9ea" }}>@{currentUser.username}</strong>
        </p>
        <button
          onClick={logout}
          style={{
            background: "none",
            border: "1px solid #2f3336",
            borderRadius: 20,
            color: "#e7e9ea",
            padding: "8px 20px",
            fontSize: 14,
            cursor: "pointer",
          }}
        >
          Se déconnecter
        </button>
      </div>
    </Layout>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}