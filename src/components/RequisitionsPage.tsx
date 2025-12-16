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
import { useState } from "react";
import { LOAD_REQUISITIONS_QUERY } from "../queries/Queries";
import type { Requisition, RequisitionsQueryData } from "../queries/types";
import CreateRequisitionModal from "./CreateRequisitionModal";
import Drawer from "./Drawer";
import RequisitionTableRow from "./RequisitionTableRow";

type EditState = {
  id: string;
  name: string;
  role: string;
  item: string;
  returnDate: string;
};

const RequistionsPage = () => {
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editState, setEditState] = useState<EditState | null>(null);

  const { loading, error, data } = useQuery<RequisitionsQueryData>(
    LOAD_REQUISITIONS_QUERY,
  );
  const requisitions: Requisition[] = data?.requisitions ?? [];

  const handleClose = () => {
    setCreateModalOpen(false);
    setEditState(null);
  };

  const handleEdit =
    ({ id, name, role, item, returnDate }: EditState) =>
    () => {
      setEditState({ id, name, role, item, returnDate });
    };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Drawer />
      <Box
        component="main"
        sx={() => ({
          flexGrow: 1,
          bgcolor: "background.default",
          p: 3,
          height: "100%",
        })}
      >
        <Box sx={(theme) => theme.mixins.toolbar} />
        {createModalOpen && (
          <CreateRequisitionModal key="create" onClose={handleClose} />
        )}
        {editState && (
          <CreateRequisitionModal
            key={editState.id}
            edit
            onClose={handleClose}
            id={editState.id}
            name={editState.name}
            role={editState.role}
            returnDate={editState.returnDate}
            item={editState.item}
          />
        )}

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
                <Typography variant="h4" gutterBottom sx={{ m: "25px", px: 2 }}>
                  Requisitions
                </Typography>
              </Badge>
            </Grid>
            <Grid>
              <Button
                variant="outlined"
                color="primary"
                sx={{ mr: "40px" }}
                onClick={() => setCreateModalOpen(true)}
              >
                Create New
              </Button>
            </Grid>
          </Grid>
          <Divider variant="middle" />
          <Box sx={{ p: "30px", position: "relative" }}>
            {loading && (
              <CircularProgress
                sx={{ m: 2, position: "absolute", top: "50%", left: "50%" }}
              />
            )}
            {error && <p>{error.message}</p>}
            {!loading && !error && (
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Role</TableCell>
                    <TableCell>Item</TableCell>
                    <TableCell>Return Date</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {requisitions.map((row) => (
                    <RequisitionTableRow
                      key={row._id}
                      id={row._id}
                      name={row.name}
                      role={row.role}
                      item={row.item.name}
                      itemValue={row.item.name}
                      returnDate={moment(row.returnDate, "YYYY-MM-DD").format(
                        "Do MMMM, YYYY",
                      )}
                      returnDateValue={row.returnDate}
                      handleEdit={handleEdit}
                    />
                  ))}
                </TableBody>
              </Table>
            )}
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default RequistionsPage;
