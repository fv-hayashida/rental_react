import { Box } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

type Props = {
  setBookIds: any;
  allBooks: any;
};

const columns: GridColDef[] = [
  { field: "title", headerName: "タイトル", width: 300, editable: false },
  { field: "author", headerName: "著者", width: 150, editable: false },
  { field: "price", headerName: "価格", type: "number", width: 100, editable: false },
];

export const RentalBooksDataGrid = (props: Props) => {
  const { setBookIds = [], allBooks } = props;

  return (
    <Box sx={{ maxHeight: 400, width: "100%" }}>
      <DataGrid
        rows={allBooks}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        autoHeight
        density="compact"
        disableColumnFilter={false}
        disableColumnMenu={false}
        // disableSelectionOnClick
        onSelectionModelChange={(RowId) => {
          setBookIds(RowId);
        }}
      />
    </Box>
  );
};
