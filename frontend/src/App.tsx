import Home from "./pages/Home";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { ThemeProvider } from "@mui/material";
import createMuiTheme from './theme/theme';
import Explore from "./pages/Explore";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route element={<Home />} path={"/"} />
      <Route element={<Explore />} path={"/explore/:categoryName"} />
    </Route>
  )
);

const App = () => {
  const theme = createMuiTheme();
  return (
      <ThemeProvider theme={theme}>
        <RouterProvider router={router}/>
      </ThemeProvider>
  );
};

export default App;
