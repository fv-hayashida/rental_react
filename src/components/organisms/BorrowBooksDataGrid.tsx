import { Box, Button, IconButton } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import DeleteForeverOutlined from "@mui/icons-material/DeleteForeverOutlined";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import SubdirectoryArrowRightIcon from "@mui/icons-material/SubdirectoryArrowRight";
type Props = {
  setBookIds: any;
  allBooks: any;
};

const columns: GridColDef[] = [
  { field: "title", headerName: "タイトル", width: 300, editable: false },
  { field: "author", headerName: "著者", width: 150, editable: false },
  { field: "return", headerName: "返却日", type: "date", width: 100, editable: false },
  {
    field: "deleteIcon",
    headerName: "削除",
    sortable: false,
    width: 130,
    // disableClickEventBubbling: true,
    renderCell: (params) => (
      <Box>
        <IconButton aria-label="delete">
          <DeleteForeverOutlined />
        </IconButton>
        <IconButton aria-label="delete">
          <BorderColorOutlinedIcon />
        </IconButton>
        <IconButton aria-label="delete">
          <SubdirectoryArrowRightIcon />
        </IconButton>
      </Box>
    ),
  },
];

export const BorrowBooksDataGrid = (props: Props) => {
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
