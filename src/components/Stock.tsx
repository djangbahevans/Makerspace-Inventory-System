import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import { useState } from "react";
import CreateStockModal from "./CreateStockModal";

type Props = {
  id: string;
  image: string;
  title: string;
  header?: string;
  quantity: number;
  numberInStock: number;
};

const Stock = (props: Props) => {
  const [editModalOpen, setEditModalOpen] = useState(false);

  return (
    <Grid size={{ md: 3, xs: 6 }}>
      {editModalOpen && (
        <CreateStockModal
          edit
          id={props.id}
          name={props.title}
          quantity={props.quantity}
          numberInStock={props.numberInStock}
          onClose={() => setEditModalOpen(false)}
        />
      )}

      <Card>
        <CardActionArea>
          <CardMedia
            sx={{ height: 200 }}
            image={props.image}
            title={props.title}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {props.title}
            </Typography>
            <Grid container spacing={8}>
              <Grid size={6}>
                <Typography>Total: </Typography>
              </Grid>
              <Grid size={6}>{props.quantity}</Grid>
              <Grid size={6}>
                <Typography>Number in Stock: </Typography>
              </Grid>
              <Grid size={6}>{props.numberInStock}</Grid>
            </Grid>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button
            size="small"
            color="primary"
            fullWidth
            onClick={() => setEditModalOpen(true)}
          >
            Edit
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default Stock;
