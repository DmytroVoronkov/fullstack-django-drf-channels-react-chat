import Home from "./pages/Home";
import Server from "./pages/Server";
import Explore from "./pages/Explore";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import ToggleColorMode from "./components/ToggleColorMode";
import Login from "./pages/Login";
import { AuthServiceProvider } from "./context/AuthContext";
import TestLogin from "./pages/TestLogin";
import ProtectedRoute from "./services/ProtectedRoute";

const App = () => {
  // const theme = createMuiTheme();
  return (
    <>
      <BrowserRouter>
        <AuthServiceProvider>
          <ToggleColorMode>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route
                path="/server/:serverId/:channelId?"
                element={
                  <ProtectedRoute>
                    <Server />
                  </ProtectedRoute>
                }
              />
              <Route path="/explore/:categoryName" element={<Explore />} />
              <Route
                path="/testLogin"
                element={
                  <ProtectedRoute>
                    <TestLogin />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </ToggleColorMode>
        </AuthServiceProvider>
      </BrowserRouter>
    </>
  );
};

export default App;
