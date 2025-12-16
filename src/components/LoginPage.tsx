import { useMutation } from "@apollo/client/react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Button,
  FormControl,
  Grid,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router";
import { GET_USER_QUERY, LOGIN_MUTATION } from "../queries/Queries";
import type {
  GetUserQueryData,
  LoginMutationData,
  LoginMutationVars,
} from "../queries/types";

const LoginPage = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [login] = useMutation<LoginMutationData, LoginMutationVars>(
    LOGIN_MUTATION,
    {
      update: (cache, result) => {
        const loggedIn = result.data?.login;
        if (!loggedIn) return;
        cache.writeQuery<GetUserQueryData>({
          query: GET_USER_QUERY,
          data: { currentUser: loggedIn },
        });
      },
      onCompleted: () => navigate("/dashboard"),
    },
  );

  return (
    <Grid
      container
      sx={{ overflow: "hidden", height: "100vh", width: "100vw" }}
      alignItems="center"
    >
      <Grid size={8}>
        <Paper sx={{ height: "80vh", overflow: "hidden" }} elevation={24}>
          <Grid container sx={{ height: "100%" }}>
            <Grid size={8}>
              <Box sx={{ height: "100%", overflow: "hidden" }}>
                <Box
                  component="img"
                  sx={{ height: "100%", width: "auto" }}
                  src="./img/action-artisan-burnt-1145434.jpg"
                  alt="login"
                />
              </Box>
            </Grid>
            <Grid size={4}>
              <Box sx={{ m: "200px 60px 0 60px" }}>
                <Typography
                  variant="h6"
                  gutterBottom
                  align="center"
                  color="primary"
                >
                  Kumasi Hive Makerspace
                </Typography>
                <Typography variant="subtitle1" align="center" gutterBottom>
                  Inventory Management System
                </Typography>
                <form>
                  <TextField
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    fullWidth
                    id="username"
                    label="Username"
                  />
                  <FormControl fullWidth>
                    <InputLabel htmlFor="adornment-password">
                      Password
                    </InputLabel>
                    <Input
                      id="adornment-password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="Toggle password visibility"
                            onClick={() => setShowPassword((s) => !s)}
                          >
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                  </FormControl>
                  <Button variant="text" color="primary" sx={{ mt: "20px" }}>
                    Forgot password?
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{ mt: "50px" }}
                    onClick={() => login({ variables: { username, password } })}
                  >
                    Submit
                  </Button>
                </form>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
      <Grid size={4}>
        <Typography variant="h1" align="center">
          Login
        </Typography>
      </Grid>
    </Grid>
  );
};

export default LoginPage;
