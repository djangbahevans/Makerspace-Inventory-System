import { useApolloClient, useMutation } from "@apollo/client/react";
import {
  AddShoppingCart,
  CalendarToday,
  Dashboard,
  ExitToApp,
  LibraryAdd,
  Report,
  Search,
  Store,
} from "@mui/icons-material";
import {
  AppBar,
  Box,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  InputBase,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Tooltip,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { LOG_OUT_MUTATION } from "../queries/Queries";
import type { LogoutMutationData } from "../queries/types";
import CreateStockModal from "./CreateStockModal";

const drawerWidth = 240;

const SideDrawer = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const apolloClient = useApolloClient();
  const [logout] = useMutation<LogoutMutationData>(LOG_OUT_MUTATION);

  const pathname = location.pathname.toLowerCase();
  const icons = [
    <Dashboard key="dashboard" />,
    <AddShoppingCart key="requisitions" />,
    <Store key="stock" />,
    <CalendarToday key="calender" />,
    <Report key="reports" />,
  ];

  const handleLogout = async () => {
    await logout();
    await apolloClient.resetStore();
    navigate("/", { replace: true });
  };

  return (
    <Box>
      <CssBaseline />
      {modalOpen && <CreateStockModal onClose={() => setModalOpen(false)} />}
      <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
      >
        <Toolbar>
          <Box
            sx={(theme) => ({
              position: "relative",
              borderRadius: theme.shape.borderRadius,
              backgroundColor: alpha(theme.palette.common.white, 0.15),
              "&:hover": {
                backgroundColor: alpha(theme.palette.common.white, 0.25),
              },
              ml: 0,
              width: "100%",
              [theme.breakpoints.up("sm")]: {
                ml: 1,
                width: "auto",
              },
            })}
          >
            <Box
              sx={(theme) => ({
                width: theme.spacing(9),
                height: "100%",
                position: "absolute",
                pointerEvents: "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              })}
            >
              <Search />
            </Box>
            <InputBase
              placeholder="Search for anything..."
              sx={(theme) => ({
                color: "inherit",
                width: "100%",
                "& .MuiInputBase-input": {
                  paddingTop: theme.spacing(1),
                  paddingRight: theme.spacing(1),
                  paddingBottom: theme.spacing(1),
                  paddingLeft: theme.spacing(10),
                  transition: theme.transitions.create("width"),
                  width: "100%",
                  [theme.breakpoints.up("sm")]: {
                    width: "40vw",
                    "&:focus": {
                      width: "60vw",
                    },
                  },
                },
              })}
            />
          </Box>
          <Box sx={{ flexGrow: 1 }} />
          <Tooltip title="Add new stock">
            <IconButton
              color="secondary"
              onClick={() => setModalOpen(true)}
              sx={{ color: "common.white" }}
            >
              <LibraryAdd />
            </IconButton>
          </Tooltip>
          <Tooltip title="Log Out">
            <IconButton onClick={handleLogout} sx={{ color: "common.white" }}>
              <ExitToApp />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        anchor="left"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
          },
        }}
      >
        <Box sx={(theme) => theme.mixins.toolbar} />
        <Divider />
        <List>
          {["Dashboard", "Requisitions", "Stock", "Calender", "Reports"].map(
            (text, index) => {
              const to = `/${text.toLowerCase()}`;
              const isActive = pathname.endsWith(text.toLowerCase());
              return (
                <ListItemButton component={Link} to={to} key={text}>
                  <ListItemIcon>
                    {React.cloneElement(
                      icons[index],
                      isActive ? { color: "primary" } : {},
                    )}
                  </ListItemIcon>
                  <ListItemText
                    primary={text}
                    primaryTypographyProps={
                      isActive ? { color: "primary" } : {}
                    }
                  />
                </ListItemButton>
              );
            },
          )}
        </List>
      </Drawer>
    </Box>
  );
};

export default SideDrawer;
