import Home from "./pages/Home";
import Server from "./pages/Server";
import Explore from "./pages/Explore";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import ToggleColorMode from "./components/ToggleColorMode";
import Login from "./pages/Login";
import { AuthServiceProvider } from "./context/AuthContext";
import TestLogin from "./pages/TestLogin";
import ProtectedRoute from "./services/ProtectedRoute";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
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
    </Route>
  )
);

const App = () => {
  // const theme = createMuiTheme();
  return (
    <>
      <AuthServiceProvider>
        <ToggleColorMode>
          <RouterProvider router={router} />
        </ToggleColorMode>
      </AuthServiceProvider>
    </>
  );
};

export default App;
