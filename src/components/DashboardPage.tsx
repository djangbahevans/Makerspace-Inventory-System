import { useQuery } from "@apollo/client/react";
import {
  Badge,
  Box,
  Button,
  CircularProgress,
  CssBaseline,
  Divider,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import moment from "moment";
import { useNavigate } from "react-router";
import { LOAD_REQUISITIONS_QUERY, LOAD_STOCKS_QUERY } from "../queries/Queries";
import type {
  Requisition,
  RequisitionsQueryData,
  Stock,
  StocksQueryData,
} from "../queries/types";
import Drawer from "./Drawer";

const DashboardPage = () => {
  const navigate = useNavigate();

  const requisitionsQuery = useQuery<RequisitionsQueryData>(
    LOAD_REQUISITIONS_QUERY,
  );
  const stocksQuery = useQuery<StocksQueryData>(LOAD_STOCKS_QUERY);

  const requisitions: Requisition[] =
    requisitionsQuery.data?.requisitions ?? [];
  const stocks: Stock[] = stocksQuery.data?.stocks ?? [];

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Drawer />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: "background.default",
          p: 3,
          height: "100%",
        }}
      >
        <Box sx={(theme) => theme.mixins.toolbar} />
        <Grid container spacing={24}>
          <Grid size={12}>
            <Paper>
              <Grid
                container
                sx={{ justifyContent: "space-between", alignItems: "center" }}
              >
                <Grid>
                  <Badge
                    badgeContent={requisitions.length}
                    color="primary"
                    sx={{ m: "25px" }}
                  >
                    <Typography
                      variant="h4"
                      gutterBottom
                      sx={{ m: "25px", px: 2 }}
                    >
                      Requisitions
                    </Typography>
                  </Badge>
                </Grid>
                <Grid>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => navigate("/requisitions")}
                    sx={{ mr: "40px" }}
                  >
                    See All
                  </Button>
                </Grid>
              </Grid>
              <Divider variant="middle" />
              <Box sx={{ p: "30px", position: "relative" }}>
                {requisitionsQuery.loading && (
                  <CircularProgress
                    sx={{ m: 2, position: "absolute", top: "50%", left: "50%" }}
                  />
                )}
                {requisitionsQuery.error && (
                  <p>{requisitionsQuery.error.message}</p>
                )}
                {!requisitionsQuery.loading && !requisitionsQuery.error && (
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Role</TableCell>
                        <TableCell>Item</TableCell>
                        <TableCell>Return Date</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {requisitions.slice(0, 5).map((row) => (
                        <TableRow key={row._id}>
                          <TableCell>{row.name}</TableCell>
                          <TableCell>{row.role}</TableCell>
                          <TableCell>{row.item.name}</TableCell>
                          <TableCell>
                            {moment(row.returnDate, "YYYY-MM-DD").format(
                              "Do MMMM, YYYY",
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </Box>
            </Paper>
          </Grid>
          <Grid size={6}>
            <Paper>
              <Grid
                container
                sx={{ justifyContent: "space-between", alignItems: "center" }}
              >
                <Grid>
                  <Typography
                    variant="h4"
                    gutterBottom
                    sx={{ m: "25px", px: 2 }}
                  >
                    Stock
                  </Typography>
                </Grid>
                <Grid>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => navigate("/stock")}
                    sx={{ mr: "40px" }}
                  >
                    See All
                  </Button>
                </Grid>
              </Grid>
              <Divider variant="middle" />
              <Box sx={{ p: "30px", position: "relative" }}>
                {stocksQuery.loading && (
                  <CircularProgress
                    sx={{ m: 2, position: "absolute", top: "50%", left: "50%" }}
                  />
                )}
                {stocksQuery.error && <p>{stocksQuery.error.message}</p>}
                {!stocksQuery.loading && !stocksQuery.error && (
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Item</TableCell>
                        <TableCell>Quantity</TableCell>
                        <TableCell>No in Stock</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {stocks.slice(0, 3).map((row) => (
                        <TableRow key={row._id}>
                          <TableCell>{row.name}</TableCell>
                          <TableCell>{row.quantity}</TableCell>
                          <TableCell>{row.numberInStock}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </Box>
            </Paper>
          </Grid>
          <Grid size={6}>
            <Paper>
              <Typography variant="h1" sx={{ m: "25px", px: 2 }}>
                Hello, world
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default DashboardPage;
