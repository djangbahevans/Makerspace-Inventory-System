import { useMutation } from "@apollo/client/react";
import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router";
import capitalizeWords from "../helpers/capitalizeWords";
import {
  ADD_STOCK_MUTATION,
  EDIT_STOCK_MUTATION,
  LOAD_STOCKS_QUERY,
} from "../queries/Queries";
import type {
  AddStockMutationData,
  AddStockMutationVars,
  EditStockMutationData,
  EditStockMutationVars,
  Stock,
  StocksQueryData,
} from "../queries/types";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

type Props = {
  edit?: boolean;
  onClose?: () => void;
  id?: string;
  name?: string;
  quantity?: number;
  numberInStock?: number;
};

const CreateStockModal = (props: Props) => {
  const { edit } = props;
  const navigate = useNavigate();

  const [name, setName] = useState(props.name ?? "");
  const [quantity, setQuantity] = useState<string>(
    props.quantity !== undefined ? String(props.quantity) : "1",
  );
  const [numberInStock, setNumberInStock] = useState<string>(
    props.numberInStock !== undefined ? String(props.numberInStock) : "0",
  );

  const [addStock, addState] = useMutation<
    AddStockMutationData,
    AddStockMutationVars
  >(ADD_STOCK_MUTATION, {
    update: (cache, result) => {
      const created = result.data?.createStock;
      if (!created) return;

      const prev = cache.readQuery<StocksQueryData>({
        query: LOAD_STOCKS_QUERY,
      });
      const stocks: Stock[] = prev?.stocks ?? [];
      cache.writeQuery({
        query: LOAD_STOCKS_QUERY,
        data: { stocks: [...stocks, created] },
      });
    },
    onCompleted: () => {
      navigate("/stock");
      props.onClose?.();
    },
  });

  const [editStock, editState] = useMutation<
    EditStockMutationData,
    EditStockMutationVars
  >(EDIT_STOCK_MUTATION, {
    update: (cache, result) => {
      const edited = result.data?.editStock;
      if (!edited) return;

      const prev = cache.readQuery<StocksQueryData>({
        query: LOAD_STOCKS_QUERY,
      });
      const stocks: Stock[] = prev?.stocks ?? [];
      cache.writeQuery({
        query: LOAD_STOCKS_QUERY,
        data: {
          stocks: stocks.map((s) => (s._id === edited._id ? edited : s)),
        },
      });
    },
    onCompleted: () => {
      navigate("/stock");
      props.onClose?.();
    },
  });

  const error = addState.error ?? editState.error;

  const handleAccept = async () => {
    const qty = Number.parseInt(quantity, 10);
    const nis = Number.parseInt(numberInStock, 10);

    if (edit) {
      if (!props.id) return;
      await editStock({
        variables: { quantity: qty, numberInStock: nis, id: props.id },
      });
    } else {
      await addStock({
        variables: { name, quantity: qty, numberInStock: nis },
      });
    }
  };

  return (
    <Modal open onClose={props.onClose}>
      <Box
        sx={{
          position: "absolute",
          bgcolor: "background.paper",
          boxShadow: 5,
          p: 4,
          outline: "none",
          ...getModalStyle(),
        }}
      >
        <Typography variant="h6" gutterBottom id="modal-title" align="center">
          {edit ? "Edit Stock" : "Add New Stock"}
        </Typography>
        {error && (
          <Typography
            variant="body1"
            color="error"
            id="modal-title"
            align="center"
          >
            {error.message}
          </Typography>
        )}
        <form>
          <TextField
            label="Name"
            sx={{ width: "30vw", display: "block" }}
            value={name}
            onChange={(e) => setName(capitalizeWords(e.target.value))}
            margin="normal"
            slotProps={{
              input: {
                readOnly: edit,
              },
            }}
            fullWidth
            required
            autoFocus={!edit}
            error={!name}
          />
          <TextField
            label="Quantity"
            sx={{ width: "30vw", display: "block" }}
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            margin="normal"
            type="number"
            autoFocus={edit}
            fullWidth
            required
          />
          <TextField
            label="Number in Stock"
            sx={{ width: "30vw", display: "block" }}
            value={numberInStock}
            onChange={(e) => setNumberInStock(e.target.value)}
            margin="normal"
            type="number"
            fullWidth
            required
          />
          <Button
            onClick={handleAccept}
            color="primary"
            variant="contained"
            fullWidth
          >
            Accept
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default CreateStockModal;
