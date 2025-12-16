import { Box, CssBaseline, Typography } from "@mui/material";
import Drawer from "./Drawer";

const NotFoundPage = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Drawer />
      <Box
        sx={(theme) => ({
          flexGrow: 1,
          backgroundColor: theme.palette.background.default,
          padding: theme.spacing(3),
          height: "100%",
        })}
      >
        <Box sx={(theme) => theme.mixins.toolbar} />
        <Typography
          variant="h1"
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          404 Not found
        </Typography>
      </Box>
    </Box>
  );
};

export default NotFoundPage;
