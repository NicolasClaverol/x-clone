import { AuthProvider, useAuth } from "./context/AuthContext";
import { AppProvider } from "./context/AppContext";
import Layout from "./components/Layout";
import LoginPage from "./pages/LoginPage";
import TweetComposer from "./components/TweetComposer";

function AppContent() {
  const { currentUser, logout } = useAuth();

  if (!currentUser) {
    return <LoginPage />;
  }

  return (
    <Layout>
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

      {/* Composeur de tweet */}
      <TweetComposer />

    </Layout>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppProvider>
        <AppContent />
      </AppProvider>
    </AuthProvider>
  );
}