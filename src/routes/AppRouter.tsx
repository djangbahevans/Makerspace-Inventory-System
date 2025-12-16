import { CssBaseline } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router";
import Calender from "../components/CalenderPage";
import Dashboard from "../components/DashboardPage";
import Login from "../components/LoginPage";
import NotFoundPage from "../components/NotFoundPage";
import Requisitions from "../components/RequisitionsPage";
import Stocks from "../components/StockPage";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";

// import { MuiThemeProvider } from '@material-ui/core/styles';
// import theme from './theme/theme';

const AppRouter = () => (
  <BrowserRouter>
    <CssBaseline />
    <Routes>
      <Route
        path="/"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/requisitions"
        element={
          <PrivateRoute>
            <Requisitions />
          </PrivateRoute>
        }
      />
      <Route
        path="/stock"
        element={
          <PrivateRoute>
            <Stocks />
          </PrivateRoute>
        }
      />
      <Route
        path="/calender"
        element={
          <PrivateRoute>
            <Calender />
          </PrivateRoute>
        }
      />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </BrowserRouter>
);

export default AppRouter;
