import { useQuery } from "@apollo/client/react";
import { Box, CircularProgress, CssBaseline, Grid } from "@mui/material";
import type { FC } from "react";
import { LOAD_STOCKS_QUERY } from "../queries/Queries";
import type { StocksQueryData, Stock as StockType } from "../queries/types";
import Drawer from "./Drawer";
import Stock from "./Stock";

const StockPage: FC = () => {
  const { loading, error, data } = useQuery<StocksQueryData>(LOAD_STOCKS_QUERY);
  const stocks: StockType[] = data?.stocks ?? [];

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
          position: "relative",
        }}
      >
        <Box sx={(theme) => theme.mixins.toolbar} />
        {loading && (
          <CircularProgress
            sx={{ m: 2, position: "absolute", top: "50%", left: "50%" }}
          />
        )}
        {error && <p>Error occured</p>}
        {!loading && !error && (
          <Grid container spacing={40}>
            {stocks.map((stock) => (
              <Stock
                key={stock._id}
                image={`./img/${stock.name.toLowerCase()}.jpg`}
                id={stock._id}
                title={stock.name}
                header={stock.name}
                quantity={stock.quantity}
                numberInStock={stock.numberInStock}
              />
            ))}
          </Grid>
        )}
      </Box>
    </Box>
  );
};

export default StockPage;
