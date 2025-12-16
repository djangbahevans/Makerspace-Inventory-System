import { Box, CssBaseline, Typography } from "@mui/material";
import Drawer from "./Drawer";

const CalenderPage = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Drawer />
      <Box
        component="main"
        sx={(theme) => ({
          flexGrow: 1,
          backgroundColor: theme.palette.background.default,
          padding: theme.spacing(3),
          height: "100%",
        })}
      >
        <Box sx={(theme) => theme.mixins.toolbar} />
        <Typography variant="h1">This is the calender page</Typography>
      </Box>
    </Box>
  );
};

export default CalenderPage;
