import Sidebar from "./Sidebar";
import WhoToFollow from "./WhoToFollow";
import { useAuth } from "../context/AuthContext";

export default function Layout({ children }) {
  const { currentUser } = useAuth();

  return (
    <div style={{
      display: "flex",
      maxWidth: 1100,
      margin: "0 auto",
      minHeight: "100vh",
    }}>
      <Sidebar />

      <main style={{
        flex: 1,
        borderRight: "1px solid #2f3336",
        minHeight: "100vh",
        minWidth: 0,
      }}>
        {children}
      </main>

      <aside style={{
        width: 280,
        padding: 16,
      }}>
        {currentUser && <WhoToFollow />}
      </aside>
    </div>
  );
}