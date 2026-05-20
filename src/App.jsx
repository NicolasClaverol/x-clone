import { AuthProvider, useAuth } from "./context/AuthContext";
import { AppProvider, useApp } from "./context/AppContext";
import Layout from "./components/Layout";
import LoginPage from "./pages/LoginPage";
import HomeFeed from "./pages/HomeFeed";
import ProfilePage from "./pages/ProfilePage";
import ExplorePage from "./pages/ExplorePage";

function AppContent() {
  const { currentUser } = useAuth();
  const { page } = useApp();

  if (!currentUser) return <LoginPage />;

  function renderPage() {
    switch (page.name) {
      case "home": return <HomeFeed />;
      case "profile": return <ProfilePage userId={page.userId} />;
      case "explore": return <ExplorePage />;
      default: return <HomeFeed />;
    }
  }

  return (
    <Layout>
      {renderPage()}
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