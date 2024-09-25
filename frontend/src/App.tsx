import Home from "./pages/Home";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { ThemeProvider } from "@mui/material";
import createMuiTheme from './theme/theme';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route element={<Home />} path={"/"} />
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
