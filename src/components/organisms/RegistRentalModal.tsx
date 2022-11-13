import { Box, Button, Modal, Typography } from "@mui/material";
import { FC } from "react";
import { BookType } from "../../types/book";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

type Props = {
  selectedBooks: Array<BookType>;
  isOpen: boolean;
  onClose: () => void;
  onRegistBooks: () => void;
  totalPrice: number;
};

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export const RegistRentalModal: FC<Props> = (props) => {
  const { selectedBooks, isOpen, onClose, onRegistBooks, totalPrice } = props;

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            レンタル一覧
          </Typography>

          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
              <TableHead>
                <TableRow>
                  <TableCell>タイトル</TableCell>
                  <TableCell align="right">著者</TableCell>
                  <TableCell align="right">値段</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {selectedBooks.map((row) => (
                  <TableRow key={row.id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                    <TableCell component="th" scope="row">
                      {row.title}
                    </TableCell>
                    <TableCell align="right">{row.author}</TableCell>
                    <TableCell align="right">{row.price}</TableCell>
                  </TableRow>
                ))}

                <TableRow key={0} sx={{ "&:last-child td, &:last-child th": { borderTop: 2 } }}>
                  <TableCell component="th" scope="row"></TableCell>
                  <TableCell align="right">合計</TableCell>
                  <TableCell align="right">{totalPrice}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <Box sx={{ pt: 2, pr: 2, textAlign: "right" }}>
            <Button variant="contained" color="primary" onClick={onRegistBooks}>
              レンタルする
            </Button>
          </Box>
        </>
      </Box>
    </Modal>
  );
};
