import { useMutation, useQuery } from "@apollo/client/react";
import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import moment from "moment";
import type React from "react";
import { useMemo, useState } from "react";
import capitalizeWords from "../helpers/capitalizeWords";
import {
  CREATE_REQUISITION_MUTATION,
  EDIT_REQUISITION_MUTATION,
  GET_NAMES_QUERY,
  LOAD_REQUISITIONS_QUERY,
  LOAD_STOCKS_QUERY,
} from "../queries/Queries";
import type {
  CreateRequisitionMutationData,
  CreateRequisitionMutationVars,
  EditRequisitionMutationData,
  EditRequisitionMutationVars,
  GetNamesQueryData,
  RequisitionsQueryData,
  StocksQueryData,
} from "../queries/types";
import AutoSuggest from "./Autosuggest";

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
  role?: string;
  item?: string;
  returnDate?: string;
};

const CreateRequisitionModal = (props: Props) => {
  const { edit, onClose } = props;

  const [id] = useState(props.id ? props.id : "");
  const [name, setName] = useState(props.name ? props.name : "");
  const [role, setRole] = useState(props.role ? props.role : "");
  const [item, setItem] = useState(props.item ? props.item : "");
  const [returnDate, setReturnDate] = useState(
    props.returnDate ? moment(props.returnDate, "YYYY-MM-DD") : moment(),
  );
  const [dateError, setDateError] = useState(false);
  const [localError, setLocalError] = useState("");

  const {
    loading: namesLoading,
    error: namesError,
    data: namesData,
  } = useQuery<GetNamesQueryData>(GET_NAMES_QUERY);
  const stockOptions = useMemo(() => {
    const stocks = namesData?.stocks ?? [];
    return stocks.map((stock) => ({ label: stock.name }));
  }, [namesData]);

  const [createRequisition, createState] = useMutation<
    CreateRequisitionMutationData,
    CreateRequisitionMutationVars
  >(CREATE_REQUISITION_MUTATION, {
    update: (cache, result) => {
      const created = result.data?.createRequisition;
      if (!created) return;

      try {
        const prevReq = cache.readQuery<RequisitionsQueryData>({
          query: LOAD_REQUISITIONS_QUERY,
        });
        cache.writeQuery({
          query: LOAD_REQUISITIONS_QUERY,
          data: {
            requisitions: [...(prevReq?.requisitions ?? []), created],
          },
        });
      } catch {
        // ignore if query not in cache
      }

      try {
        const prevStocks = cache.readQuery<StocksQueryData>({
          query: LOAD_STOCKS_QUERY,
        });
        if (prevStocks?.stocks) {
          cache.writeQuery({
            query: LOAD_STOCKS_QUERY,
            data: {
              stocks: prevStocks.stocks.map((stock) => {
                if (stock._id !== created.item._id) return stock;
                return { ...stock, numberInStock: stock.numberInStock - 1 };
              }),
            },
          });
        }
      } catch {
        // ignore if query not in cache
      }
    },
    onCompleted: onClose,
  });

  const [editRequisition, editState] = useMutation<
    EditRequisitionMutationData,
    EditRequisitionMutationVars
  >(EDIT_REQUISITION_MUTATION, {
    update: (cache, result) => {
      const updated = result.data?.editRequisition;
      if (!updated) return;

      try {
        const prevReq = cache.readQuery<RequisitionsQueryData>({
          query: LOAD_REQUISITIONS_QUERY,
        });
        if (prevReq?.requisitions) {
          cache.writeQuery({
            query: LOAD_REQUISITIONS_QUERY,
            data: {
              requisitions: prevReq.requisitions.map((requisition) =>
                requisition._id === updated._id ? updated : requisition,
              ),
            },
          });
        }
      } catch {
        // ignore if query not in cache
      }
    },
    onCompleted: onClose,
  });

  const saving = createState.loading || editState.loading;
  const saveError = createState.error ?? editState.error;

  const handleReturnDateChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const next = moment(event.target.value, "YYYY-MM-DD");
    const today = moment(moment().format("DD MM YYYY"), "DD MM YYYY");
    if (next.diff(today) < 0) {
      setDateError(true);
      setLocalError("The date must be today or in the future");
      return;
    }
    setDateError(false);
    setLocalError("");
    setReturnDate(next);
  };

  const handleAccept = async () => {
    const formattedReturnDate = returnDate.format("YYYY-MM-DD");

    if (dateError) return;
    if (!edit && (!name || !item)) {
      setLocalError("Please provide a name and item");
      return;
    }
    if (edit && !id) {
      setLocalError("Missing requisition id");
      return;
    }

    setLocalError("");
    if (edit) {
      await editRequisition({
        variables: { role, returnDate: formattedReturnDate, id },
      });
    } else {
      await createRequisition({
        variables: { name, item, role, returnDate: formattedReturnDate },
      });
    }
  };

  return (
    <Modal open onClose={onClose}>
      <Box
        sx={() => ({
          position: "absolute",
          bgcolor: "background.paper",
          boxShadow: 5,
          p: 4,
          outline: "none",
          ...getModalStyle(),
        })}
      >
        <Typography variant="h6" gutterBottom id="modal-title" align="center">
          {edit ? "Edit Requisition" : "Add New Requisition"}
        </Typography>
        {saveError && (
          <Typography
            variant="body1"
            color="error"
            id="modal-title"
            align="center"
          >
            {saveError.message}
          </Typography>
        )}
        {localError && (
          <Typography
            variant="body1"
            color="error"
            id="modal-title"
            align="center"
          >
            {localError}
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
            autoFocus={!edit}
            fullWidth
            required
            error={!name}
          />
          <TextField
            label="Role"
            sx={{ width: "30vw", display: "block" }}
            value={role}
            onChange={(e) => setRole(capitalizeWords(e.target.value))}
            autoFocus={edit}
            margin="normal"
            fullWidth
          />

          <AutoSuggest
            options={namesLoading || namesError ? [] : stockOptions}
            onChange={(value: string) => {
              setLocalError("");
              setItem(capitalizeWords(value));
            }}
            value={item}
            readOnly={edit}
            label="Item *"
          />

          <TextField
            label="Return Date"
            type="date"
            sx={{ width: "30vw", display: "block" }}
            value={returnDate.format("YYYY-MM-DD")}
            onChange={handleReturnDateChange}
            margin="normal"
            fullWidth
            required
            error={dateError}
          />
          <Button
            onClick={handleAccept}
            color="primary"
            variant="contained"
            fullWidth
            disabled={saving}
          >
            Accept
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default CreateRequisitionModal;
