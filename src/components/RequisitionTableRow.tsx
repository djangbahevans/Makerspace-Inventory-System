import { useMutation } from "@apollo/client/react";
import { Delete, Edit } from "@mui/icons-material";
import { IconButton, TableCell, TableRow } from "@mui/material";
import {
  DELETE_REQUISITION_MUTATION,
  LOAD_REQUISITIONS_QUERY,
  LOAD_STOCKS_QUERY,
} from "../queries/Queries";
import type {
  DeleteRequisitionMutationData,
  DeleteRequisitionMutationVars,
  RequisitionsQueryData,
  StocksQueryData,
} from "../queries/types";

type EditState = {
  id: string;
  name: string;
  role: string;
  item: string;
  returnDate: string;
};

type Props = {
  id: string;
  name: string;
  role: string;
  item: string;
  itemValue?: string;
  returnDate: string;
  returnDateValue?: string;
  handleEdit: (state: EditState) => () => void;
};

const RequisitionTableRow = (props: Props) => {
  const {
    id,
    name,
    role,
    item,
    itemValue,
    returnDate,
    returnDateValue,
    handleEdit,
  } = props;

  const [deleteRequisition] = useMutation<
    DeleteRequisitionMutationData,
    DeleteRequisitionMutationVars
  >(DELETE_REQUISITION_MUTATION, {
    update: (cache, result) => {
      const deleted = result.data?.deleteRequisition;
      if (!deleted) return;

      const prevReq = cache.readQuery<RequisitionsQueryData>({
        query: LOAD_REQUISITIONS_QUERY,
      });
      const prevStocks = cache.readQuery<StocksQueryData>({
        query: LOAD_STOCKS_QUERY,
      });

      if (prevStocks?.stocks) {
        cache.writeQuery({
          query: LOAD_STOCKS_QUERY,
          data: {
            stocks: prevStocks.stocks.map((stock) => {
              if (stock._id !== deleted.item._id) return stock;
              return { ...stock, numberInStock: stock.numberInStock + 1 };
            }),
          },
        });
      }

      if (prevReq?.requisitions) {
        cache.writeQuery({
          query: LOAD_REQUISITIONS_QUERY,
          data: {
            requisitions: prevReq.requisitions.filter(
              (r) => r._id !== deleted._id,
            ),
          },
        });
      }
    },
  });

  return (
    <TableRow>
      <TableCell>{name}</TableCell>
      <TableCell>{role}</TableCell>
      <TableCell>{item}</TableCell>
      <TableCell>{returnDate}</TableCell>
      <TableCell>
        <IconButton
          aria-label="Edit"
          onClick={handleEdit({
            id,
            name,
            role,
            item: itemValue ?? item,
            returnDate: returnDateValue ?? returnDate,
          })}
        >
          <Edit />
        </IconButton>
        <IconButton
          aria-label="Delete"
          onClick={() => deleteRequisition({ variables: { id } })}
        >
          <Delete />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

export default RequisitionTableRow;
