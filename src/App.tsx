import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { PopupProvider } from "./context/PopupContext";
import { PopupContainer } from "./components/ui/PopupContainer";
import { AppRouter } from "./routes/AppRouter";
import "./App.css";

function AppContent() {
  return (
    <>
      <AppRouter />
      <PopupContainer />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <PopupProvider>
          <AppContent />
        </PopupProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
